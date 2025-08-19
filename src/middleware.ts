import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  SESSION_TIMEOUT,
  TOKEN_REFRESH_BUFFER_SECONDS,
} from "@/constants";
import { jwtDecode, JwtPayload } from "jwt-decode";

const privatePaths = ["/community", "/profile", "/media", "/artists"];
const authPaths = ["/login", "/register"];

const matchPath = (pathname: string, paths: string[]): boolean => {
  return paths.some((path) => {
    // Exact match
    if (pathname === path) return true;
    // Path with trailing slash
    if (pathname === path + "/") return true;
    // Nested paths (e.g., /me/settings matches /me)
    if (pathname.startsWith(path + "/")) return true;
    return false;
  });
};

const getPathnameWithoutLocale = (pathname: string): string => {
  const locales = routing.locales;
  const segments = pathname.split("/");

  // If first segment is a locale, remove it
  if (segments[1] && locales.includes(segments[1] as "en" | "vi")) {
    return "/" + segments.slice(2).join("/") || "/";
  }

  return pathname === "/" ? "/" : pathname;
};

const intlMiddleware = createMiddleware(routing);

interface TokenPayload {
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp! <= currentTime + TOKEN_REFRESH_BUFFER_SECONDS;
  } catch {
    return true;
  }
};

const clearCookiesAndRedirect = (
  request: NextRequest,
  redirectPath: string
): NextResponse => {
  const response = NextResponse.redirect(new URL(redirectPath, request.url));

  response.cookies.delete(ACCESS_TOKEN_KEY);
  response.cookies.delete(REFRESH_TOKEN_KEY);

  return response;
};

const updateCookies = (
  response: NextResponse,
  accessToken: string,
  refreshToken: string
): void => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };

  console.log("🔄 Updating cookies with new tokens");

  response.cookies.set(ACCESS_TOKEN_KEY, accessToken, {
    ...cookieOptions,
    maxAge: SESSION_TIMEOUT,
  });

  response.cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    ...cookieOptions,
    maxAge: SESSION_TIMEOUT * 2, // Refresh token lives longer
  });
};

let isRefreshing = false;
let refreshPromise: Promise<TokenPayload> | null = null;

export const refreshAccessToken = async (
  refreshToken: string
): Promise<TokenPayload> => {
  // If already refreshing, return the existing promise
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;

  refreshPromise = (async () => {
    try {
      console.log("🔄 Attempting to refresh access token...");

      const response = await fetch(
        "https://dapi-pmen.aiaracorp.com/api/v1/auth/refresh",
        {
          method: "POST",
          body: JSON.stringify({ refresh_token: refreshToken }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Refresh failed: ${response.status}`);
      }

      const data = await response.json();

      console.log("✅ Token refresh successful");

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token || refreshToken, // Use new refresh token if provided
        expiresIn: data.expires_in,
      };
    } catch (error) {
      console.error("❌ Token refresh failed:", error);
      throw error;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

export default async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Skip static files and API routes
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt"
  ) {
    return NextResponse.next();
  }

  // Check if the pathname starts with a locale
  const segments = pathname.split("/");
  const firstSegment = segments[1];
  const hasLocale =
    firstSegment && routing.locales.includes(firstSegment as "en" | "vi");

  // If no locale in the path and not root path, redirect to default locale
  if (!hasLocale && pathname !== "/") {
    const redirectUrl = new URL(
      `/${routing.defaultLocale}${pathname}${search}`,
      request.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  const locale =
    firstSegment && hasLocale ? firstSegment : routing.defaultLocale;

  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname);
  const isPrivatePath = matchPath(pathnameWithoutLocale, privatePaths);
  const isAuthPath = matchPath(pathnameWithoutLocale, authPaths);

  // Get tokens from cookies
  const sessionToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_KEY)?.value;

  // If no tokens at all
  if (!sessionToken || !refreshToken) {
    if (isPrivatePath) {
      console.log("🚫 No tokens found, redirecting to home");
      const homeUrl = new URL(`/${locale}/home`, request.url);
      homeUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(homeUrl);
    }
    return intlMiddleware(request);
  }

  // Check if user is trying to access auth pages while already authenticated
  if (isAuthPath && !isTokenExpired(sessionToken)) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  let response: NextResponse;
  let currentAccessToken = sessionToken;
  let currentRefreshToken = refreshToken;

  // Check if access token is expired
  if (isTokenExpired(sessionToken)) {
    console.log("⏰ Access token expired, attempting refresh");

    try {
      const newTokens = await refreshAccessToken(refreshToken);

      if (newTokens.accessToken) {
        currentAccessToken = newTokens.accessToken;
        if (newTokens.refreshToken) {
          currentRefreshToken = newTokens.refreshToken;
        }

        console.log("✅ Using refreshed tokens");
      } else {
        throw new Error("No access token received from refresh");
      }
    } catch (error) {
      console.error("❌ Failed to refresh token:", error);

      if (isPrivatePath) {
        console.log(
          "🚫 Token refresh failed for private route, redirecting to home"
        );
        const homeUrl = new URL(`/${locale}/home`, request.url);
        homeUrl.searchParams.set("callbackUrl", pathname);
        return clearCookiesAndRedirect(request, homeUrl.toString());
      }

      // For non-private routes, clear cookies but continue
      response = intlMiddleware(request);
      response.cookies.delete(ACCESS_TOKEN_KEY);
      response.cookies.delete(REFRESH_TOKEN_KEY);
      return response;
    }
  }

  // Now check if the current token (original or refreshed) is valid
  if (isPrivatePath && isTokenExpired(currentAccessToken)) {
    console.log("🚫 Current token is still expired, redirecting to home");
    const homeUrl = new URL(`/${locale}/home`, request.url);
    homeUrl.searchParams.set("callbackUrl", pathname);
    return clearCookiesAndRedirect(request, homeUrl.toString());
  }

  // Create response with intl middleware
  response = intlMiddleware(request);

  // If we have new tokens, update cookies
  if (
    currentAccessToken !== sessionToken ||
    currentRefreshToken !== refreshToken
  ) {
    updateCookies(response, currentAccessToken, currentRefreshToken);
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|manifest|api).*)",
  ],
};

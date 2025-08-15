import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_KEY } from "@/constants";

const privatePaths = ["/community"];
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
  // Import your locales from routing config
  const locales = routing.locales; // Use from routing config
  const segments = pathname.split("/");

  // If first segment is a locale, remove it
  if (segments[1] && locales.includes(segments[1] as "en" | "vi")) {
    return "/" + segments.slice(2).join("/") || "/";
  }

  return pathname === "/" ? "/" : pathname;
};

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
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

  // Continue with existing logic only if we have a locale or it's root path
  const sessionToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value;
  const locale =
    firstSegment && hasLocale ? firstSegment : routing.defaultLocale;

  console.log("sessionToken", sessionToken);

  const pathnameWithoutLocale = getPathnameWithoutLocale(pathname);
  const isPrivatePath = matchPath(pathnameWithoutLocale, privatePaths);
  const isAuthPath = matchPath(pathnameWithoutLocale, authPaths);

  if (isPrivatePath && !sessionToken) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPath && sessionToken) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|manifest|api).*)",
  ],
};

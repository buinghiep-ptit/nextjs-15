import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants";

export async function POST(request: Request) {
  const body = await request.json();
  const sessionToken = body.accessToken as string;
  const refreshToken = body.refreshToken as string;
  const expiresIn = body.expiresIn as number;

  if (!sessionToken || !refreshToken) {
    return Response.json(
      { message: "Không nhận được session token" },
      {
        status: 400,
      }
    );
  }

  const expiresDate = new Date(Date.now() + expiresIn * 30).toUTCString();

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `${ACCESS_TOKEN_KEY}=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`
  );
  headers.append(
    "Set-Cookie",
    `${REFRESH_TOKEN_KEY}=${refreshToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`
  );

  return Response.json(body, {
    status: 200,
    headers,
  });
}

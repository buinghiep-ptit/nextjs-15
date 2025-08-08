import { ACCESS_TOKEN_KEY } from "@/constants";

export async function POST(request: Request) {
  const body = await request.json();
  const sessionToken = body.accessToken as string;
  const expiresIn = body.expiresIn as number;
  if (!sessionToken) {
    return Response.json(
      { message: "Không nhận được session token" },
      {
        status: 400,
      }
    );
  }

  const expiresDate = new Date(Date.now() + expiresIn * 1000).toUTCString();

  return Response.json(body, {
    status: 200,
    headers: {
      "Set-Cookie": `${ACCESS_TOKEN_KEY}=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`,
    },
  });
}

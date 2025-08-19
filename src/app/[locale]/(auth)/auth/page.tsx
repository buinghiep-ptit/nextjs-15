"use client";
import { useAuthContext } from "@/providers/auth-provider";
import { validateCode } from "@/services/auth.service";
import { redirect, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const { setSessionToken } = useAuthContext();

  const verify = useCallback(
    async (code: string) => {
      const data = await validateCode({
        code: code,
        state: "M-6blxOrBmBnE-DGvbpEPlUGH8cvrPl0It1vfFRAtDM",
        deviceId: "1c82f687-0647-42c9-af1d-18ac4b36457c",
        rememberMe: true,
      });

      if (data.content) {
        const response = await fetch("/api/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessToken: data.content.access_token,
            refreshToken: data.content.refresh_token,
            expiresIn: data.content.expires_in,
          }),
        });

        const { accessToken } = await response.json();
        setSessionToken(accessToken);
        redirect("/");
      }
    },
    [setSessionToken]
  );

  useEffect(() => {
    if (code) {
      verify(code);
    }
  }, [code, verify]);

  return <div>AuthPage</div>;
}

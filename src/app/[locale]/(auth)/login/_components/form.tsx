"use client";

import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import React from "react";
import { useSearchParams } from "next/navigation";
import { setSession } from "@/lib/utils";

export default function LoginForm() {
  const callbackUrl = useSearchParams().get("callbackUrl");

  const handleLogin = async () => {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken:
          "eyJhbGciOiJIUzUxMiJ9.eyJhdXRoIjoiUk9MRV9NQU5BR0VSIiwidXNlcl9pZCI6MTAsImNyZWF0ZWQiOjE3NTQ1NTA5NzYsImVtYWlsIjoibmdoaWVwYnYyLnRlc3RAZnB0LmNvbSIsInN1YiI6Im5naGllcGJ2Mi50ZXN0QGZwdC5jb20iLCJleHAiOjE3NTQ2MzczNzZ9.PUeGwOY5tJXzeBKef-B9ZMK3_qyG3U7hOOyGfFIhYohQbFRaBC9iBf9lIJCTRQLc1JObClKdk6ItPI5eazr9BA",
        expiresIn: 86400,
      }),
    });

    if (response.ok) {
      const { accessToken } = await response.json();
      setSession(accessToken);

      redirect(callbackUrl || "/");
    }
  };

  return (
    <div>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}

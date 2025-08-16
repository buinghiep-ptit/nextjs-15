"use client";

import { login } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/components/ui/button-gradient";
import { useAuthContext } from "@/providers/auth-provider";
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";
import { SESSION_TIMEOUT } from "@/constants";
import Link from "next/link";

export default function HeaderRight() {
  const { sessionToken, setSessionToken } = useAuthContext();
  const isAuthenticated = !!sessionToken;
  const callbackUrl = useSearchParams().get("callbackUrl");

  const handleLogin = async () => {
    const data = await login({
      idAddress: "admin.doe@example.com",
      password: "password123",
    });

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: SESSION_TIMEOUT,
      }),
    });

    if (response.ok) {
      const { accessToken } = await response.json();
      setSessionToken(accessToken);
      redirect(callbackUrl || "/home");
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon">
            <Image
              src="/icons/search-icon.svg"
              alt="Search"
              width={24}
              height={24}
            />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Image
              src="/icons/notification-icon.svg"
              alt="Notifications"
              width={24}
              height={24}
            />
            <span
              className="absolute top-1.75 right-1.75 text-white text-[10px] rounded-full w-2.5 h-2.5 flex items-center justify-center"
              style={{
                border: "1.5px solid #fff",
                background:
                  "linear-gradient(113deg, #27BEFF -16.18%, #01CB41 117.89%)",
              }}
            ></span>
            <span className="sr-only">Notifications</span>
          </Button>
          <Link href="/profile/1">
            <Button variant="ghost" size="icon">
              <Image
                src="/icons/user-icon.svg"
                alt="Profile"
                width={24}
                height={24}
              />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
        </div>
      ) : (
        <ButtonGradient
          className="h-[44px] font-semibold text-white text-[13px]"
          onClick={handleLogin}
        >
          Đăng nhập
        </ButtonGradient>
      )}
    </>
  );
}

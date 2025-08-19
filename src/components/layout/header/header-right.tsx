"use client";

import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/components/ui/button-gradient";
import { useAuthContext } from "@/providers/auth-provider";
import { getOauthURL } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";

export default function HeaderRight() {
  const { sessionToken } = useAuthContext();
  const isAuthenticated = !!sessionToken;

  // Simple function to replace production domain with localhost:3000
  const replaceDomain = (url: string) => {
    return url.replace(
      /redirect_uri=http%3A%2F%2Ffan-dev\.fpt\.net%2Fauth/g,
      "redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Fauth"
    );
  };

  const handleOauthLogin = async () => {
    try {
      const data = await getOauthURL();

      if (data?.content?.url) {
        // Replace production domain with localhost:3000
        const modifiedUrl =
          process.env.NODE_ENV === "development"
            ? replaceDomain(data.content.url)
            : data.content.url;

        // Redirect to OAuth provider
        window.location.href = modifiedUrl;
      }
    } catch (error) {
      console.error("Failed to get OAuth URL:", error);
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
          <Link href="/profile/me">
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
          onClick={handleOauthLogin}
        >
          Đăng nhập
        </ButtonGradient>
      )}
    </>
  );
}

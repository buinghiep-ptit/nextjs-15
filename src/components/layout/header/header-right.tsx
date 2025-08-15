"use client";

import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/components/ui/button-gradient";
import Image from "next/image";

export default function HeaderRight() {
  const isAuthenticated = true;
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
          <Button variant="ghost" size="icon">
            <Image
              src="/icons/user-icon.svg"
              alt="Profile"
              width={24}
              height={24}
            />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      ) : (
        <ButtonGradient
          className="h-[44px] font-semibold text-white text-[13px]"
          onClick={() => {}}
        >
          Đăng nhập
        </ButtonGradient>
      )}
    </>
  );
}

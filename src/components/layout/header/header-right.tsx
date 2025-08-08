"use client";

import { Button } from "@/components/ui/button";
import { ButtonGradient } from "@/components/ui/button-gradient";
import { Bell, Search, User } from "lucide-react";

export default function HeaderRight() {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      ) : (
        <ButtonGradient
          className="h-[44px] font-semibold text-white text-[13px]"
          onClick={() => {}}
        >
          Đăng ký
        </ButtonGradient>
      )}
    </>
  );
}

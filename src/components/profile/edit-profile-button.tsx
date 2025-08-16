"use client";

import React from "react";
import Image from "next/image";

interface EditProfileButtonProps {
  onClick: () => void;
}

export default function EditProfileButton({ onClick }: EditProfileButtonProps) {
  return (
    <button
      onClick={onClick}
      className="h-9 sm:h-10 md:h-11 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white rounded-lg bg-[rgba(255,255,255,0.10)] hover:bg-[rgba(255,255,255,0.20)] transition-all duration-200 flex items-center cursor-pointer"
    >
      <Image
        src="/icons/edit.svg"
        alt="Edit"
        width={16}
        height={16}
        className="w-4 h-4 sm:w-[18px] sm:h-[18px] mr-1.5 sm:mr-2"
      />
      Chỉnh sửa trang cá nhân
    </button>
  );
}

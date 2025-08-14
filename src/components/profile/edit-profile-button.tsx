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
      className="h-11 px-4 py-2 text-sm font-bold text-white rounded-lg bg-[rgba(255,255,255,0.10)] hover:bg-[rgba(255,255,255,0.20)] transition-all duration-200 flex items-center cursor-pointer"
    >
      <Image
        src="/icons/edit.svg"
        alt="Edit"
        width={18}
        height={18}
        className="mr-2"
      />
      Chỉnh sửa trang cá nhân
    </button>
  );
}

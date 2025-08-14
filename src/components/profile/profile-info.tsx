"use client";

import React from "react";
import Image from "next/image";

interface ProfileInfoProps {
  name: string;
  description?: string;
  birthday?: string;
  isKOL: boolean;
  isVerified: boolean;
}

export default function ProfileInfo({
  name,
  description,
  birthday,
  isKOL,
  isVerified,
}: ProfileInfoProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Name and Verification */}
      <div className="flex items-center gap-2">
        <h1 className="text-[32px] font-bold text-white leading-[40px]">
          {name}
        </h1>
        {isVerified && (
          <Image src="/icons/tick.svg" alt="Verified" width={24} height={24} />
        )}
      </div>

      {/* Birthday - Only show for KOL */}
      {isKOL && birthday && (
        <div className="flex items-center gap-2">
          <Image
            src="/icons/bod-icon.svg"
            alt="Birthday"
            width={24}
            height={24}
          />
          <span className="text-[#bfadf9] text-[14px] font-semibold leading-[20px]">
            {birthday}
          </span>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="text-[#f1edfe] text-[14px] font-normal leading-[20px] whitespace-pre-line">
          {description}
        </div>
      )}
    </div>
  );
}

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
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* Name and Verification */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl sm:text-2xl md:text-[32px] font-bold text-white leading-tight sm:leading-[32px] md:leading-[40px]">
          {name}
        </h1>
        {isVerified && (
          <Image
            src="/icons/tick.svg"
            alt="Verified"
            width={20}
            height={20}
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6"
          />
        )}
      </div>

      {/* Birthday - Only show for KOL */}
      {isKOL && birthday && (
        <div className="flex items-center gap-2">
          <Image
            src="/icons/bod-icon.svg"
            alt="Birthday"
            width={20}
            height={20}
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
          <span className="text-[#bfadf9] text-xs sm:text-sm font-semibold leading-tight sm:leading-[18px] md:leading-[20px]">
            {birthday}
          </span>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="text-[#f1edfe] text-xs sm:text-sm font-normal leading-tight sm:leading-[18px] md:leading-[20px] whitespace-pre-line">
          {description}
        </div>
      )}
    </div>
  );
}

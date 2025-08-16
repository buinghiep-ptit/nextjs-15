"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

interface ProfileMoreMenuProps {
  onReport: () => void;
  onBlock: () => void;
}

export default function ProfileMoreMenu({
  onReport,
  onBlock,
}: ProfileMoreMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="w-7 h-7 sm:w-8 sm:h-8 cursor-pointer flex items-center justify-center rounded-full hover:bg-white/30 transition-colors"
          aria-label="More options"
        >
          <Image
            src="/icons/more-circle.svg"
            alt="More"
            width={28}
            height={28}
            className="w-6 h-6 sm:w-7 sm:h-7"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-primary border-0 rounded-tl-[16px] rounded-bl-[16px] rounded-br-[16px] rounded-tr-[0px] shadow-lg"
        align="end"
        sideOffset={8}
      >
        <div className="flex flex-col gap-3 pl-4 pr-6 py-3">
          {/* Báo cáo */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onReport}
              className="flex items-center cursor-pointer gap-2 w-full text-primary-foreground hover:opacity-80 transition-opacity"
            >
              <Image
                src="/icons/bell.svg"
                alt="Report"
                width={20}
                height={20}
              />
              <span className="text-xs sm:text-sm font-normal text-primary-foreground leading-tight sm:leading-[20px]">
                Báo cáo
              </span>
            </button>

            {/* Divider */}
            <div className="w-full h-px bg-[#343a40]" />
          </div>

          {/* Chặn người dùng */}
          <button
            onClick={onBlock}
            className="flex items-center cursor-pointer gap-2 w-full text-left hover:opacity-80 transition-opacity"
          >
            <Image
              src="/icons/block-user.png"
              alt="Block"
              width={24}
              height={24}
            />
            <span className="text-xs sm:text-sm font-normal text-primary-foreground leading-tight sm:leading-[20px]">
              Chặn người dùng
            </span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

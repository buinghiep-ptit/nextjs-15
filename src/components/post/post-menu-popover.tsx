"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

interface PostMenuPopoverProps {
  onEdit: () => void;
  onDelete: () => void;
  children: React.ReactNode;
}

export default function PostMenuPopover({
  onEdit,
  onDelete,
  children,
}: PostMenuPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-primary border-0 rounded-tl-[16px] rounded-bl-[16px] rounded-br-[16px] rounded-tr-[0px] shadow-lg"
        align="end"
        sideOffset={8}
      >
        <div className="flex flex-col gap-3 pl-4 pr-6 py-3">
          {/* Chỉnh sửa bài viết */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onEdit}
              className="flex items-center cursor-pointer gap-2 w-full text-primary-foreground hover:opacity-80 transition-opacity"
            >
              <Image src="/icons/edit.svg" alt="Edit" width={20} height={20} />
              <span className="text-sm font-normal text- leading-[20px]">
                Chỉnh sửa bài viết
              </span>
            </button>

            {/* Divider */}
            <div className="w-full h-px bg-[#343a40]" />
          </div>

          {/* Xoá bài viết */}
          <button
            onClick={onDelete}
            className="flex items-center cursor-pointer gap-2 w-full text-left hover:opacity-80 transition-opacity"
          >
            <Image
              src="/icons/eraser.svg"
              alt="Delete"
              width={20}
              height={20}
            />
            <span className="text-sm font-normal text-primary-foreground leading-[20px]">
              Xóa
            </span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

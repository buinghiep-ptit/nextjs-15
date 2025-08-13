"use client";

import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
        className="w-auto p-0 bg-[#212529] border-0 rounded-tl-[16px] rounded-bl-[16px] rounded-br-[16px] shadow-lg"
        align="end"
        sideOffset={8}
      >
        <div className="flex flex-col gap-3 pl-4 pr-6 py-3">
          {/* Chỉnh sửa bài viết */}
          <div className="flex flex-col gap-3">
            <button
              onClick={onEdit}
              className="flex items-center gap-2 w-full text-left hover:opacity-80 transition-opacity"
            >
              <div className="w-7 h-7 flex items-center justify-center">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <path
                    d="M2.625 15.3125V18.375H5.6875L15.2063 8.85625L12.1438 5.79375L2.625 15.3125Z"
                    fill="white"
                  />
                  <path
                    d="M17.7188 6.34375C18.0563 6.00625 18.0563 5.46875 17.7188 5.13125L16.2188 3.63125C15.8813 3.29375 15.3438 3.29375 15.0063 3.63125L13.8438 4.79375L16.9063 7.85625L17.7188 6.34375Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="text-[14px] font-normal text-white leading-[20px]">
                Chỉnh sửa bài viết
              </span>
            </button>

            {/* Divider */}
            <div className="w-full h-px bg-[#343a40]" />
          </div>

          {/* Xoá bài viết */}
          <div>
            <button
              onClick={onDelete}
              className="flex items-center gap-2 w-full text-left hover:opacity-80 transition-opacity"
            >
              <div className="w-7 h-7 flex items-center justify-center">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <path
                    d="M6.5625 2.625C6.5625 1.17188 7.73438 0 9.1875 0H11.8125C13.2656 0 14.4375 1.17188 14.4375 2.625V3.9375H18.375C18.9844 3.9375 19.6875 4.64062 19.6875 5.25C19.6875 5.85938 18.9844 6.5625 18.375 6.5625H17.0625V15.75C17.0625 18.6562 14.7188 21 11.8125 21H9.1875C6.28125 21 3.9375 18.6562 3.9375 15.75V6.5625H2.625C2.01562 6.5625 1.3125 5.85938 1.3125 5.25C1.3125 4.64062 2.01562 3.9375 2.625 3.9375H6.5625V2.625ZM9.1875 2.625V3.9375H11.8125V2.625H9.1875ZM6.5625 6.5625V15.75C6.5625 17.2031 7.73438 18.375 9.1875 18.375H11.8125C13.2656 18.375 14.4375 17.2031 14.4375 15.75V6.5625H6.5625Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="text-[14px] font-normal text-white leading-[20px]">
                Xóa
              </span>
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ButtonGradient } from "../ui/button-gradient";
import { ButtonGradientOutlined } from "../ui/button-gradient-outlined";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Xác nhận xoá bài viết",
  message = "Bạn có chắc chắn muốn xoá bài viết này? Hành động này không thể hoàn tác.",
}: DeleteConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[400px] w-full bg-white rounded-2xl border-0 p-0 overflow-hidden"
        overlayClassName="bg-[rgba(14,15,17,0.50)] backdrop-blur-[8px]"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>

        {/* Content */}
        <div className="p-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path
                  d="M10 4C10 1.79 11.79 0 14 0H18C20.21 0 22 1.79 22 4V6H28C28.97 6 30 7.03 30 8C30 8.97 28.97 10 28 10H26V24C26 28.42 22.42 32 18 32H14C9.58 32 6 28.42 6 24V10H4C3.03 10 2 8.97 2 8C2 7.03 3.03 6 4 6H10V4ZM14 4V6H18V4H14ZM10 10V24C10 26.21 11.79 28 14 28H18C20.21 28 22 26.21 22 24V10H10Z"
                  fill="#EF4444"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-[20px] font-bold text-[#212529] text-center mb-2">
            {title}
          </h3>

          {/* Message */}
          <p className="text-[14px] text-[#6C757D] text-center leading-[20px] mb-6">
            {message}
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <ButtonGradientOutlined onClick={onClose} className="flex-1">
              Huỷ bỏ
            </ButtonGradientOutlined>

            <ButtonGradient
              onClick={handleConfirm}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            >
              Xoá bài viết
            </ButtonGradient>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

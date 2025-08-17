"use client";

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { ButtonGradient } from "@/components/ui/button-gradient";
import { H4 } from "@/components/ui/typography";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { nickname: string; avatar?: File }) => void;
  initialData: {
    nickname: string;
    avatar: string;
  };
}

export default function JoinCommunityModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: EditProfileModalProps) {
  const [nickname, setNickname] = useState(initialData.nickname);
  const [avatarPreview] = useState(initialData.avatar);

  const maxNicknameLength = 20;

  const handleSave = () => {
    onSave({
      nickname,
    });
    onClose();
  };

  const handleClose = () => {
    // Reset form data when closing
    setNickname(initialData.nickname);

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(14,15,17,0.50)] backdrop-blur-[8px] flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 max-w-[486px] w-full mx-4 max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute cursor-pointer top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 z-10"
        >
          <Image
            src="/icons/close-circle.svg"
            alt="Close"
            width={32}
            height={32}
          />
        </button>

        <div className="flex flex-col gap-8 items-center">
          {/* Profile Info Section */}
          <div className="flex flex-col gap-6 items-center w-full">
            {/* Avatar with Camera Button */}
            <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] rounded-full overflow-hidden">
              <Avatar className="w-full h-full">
                <AvatarImage
                  src={avatarPreview}
                  alt="Profile Avatar"
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl bg-gray-200">
                  {nickname.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-4">
              <H4 className="text-center font-bold text-2xl">
                Tham gia cộng đồng
              </H4>
              <div className="space-y-1 text-[15px]">
                <span className="text-center text-primary">
                  Nhận thông tin cập nhật và nội dung mới nhất từ
                </span>
                <div
                  className="text-center"
                  style={{
                    background:
                      "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  <span className=" font-bold leading-[24px] text-transparent">
                    Hoàng Thùy Linh Fanverse
                  </span>
                </div>
              </div>
            </div>

            {/* Input Section */}
            <div className="flex flex-col gap-8 w-full">
              {/* Nickname Input */}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-start w-full">
                  <label className="text-[#212529] text-[15px] font-normal leading-[20px]">
                    Nhập biệt danh của bạn để tiếp tục!
                  </label>
                  <span className="text-[#868E96] text-[14px] leading-[20px]">
                    {nickname.length}/{maxNicknameLength}
                  </span>
                </div>
                <div className="bg-[#F1F3F5] rounded-xl p-4 w-full">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => {
                      if (e.target.value.length <= maxNicknameLength) {
                        setNickname(e.target.value);
                      }
                    }}
                    className="w-full bg-transparent text-[#212529] text-[15px] font-semibold leading-[20px] outline-none placeholder-[#868E96]"
                    placeholder="Nhập nickname của bạn"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="w-full">
            <ButtonGradient
              onClick={handleSave}
              className="h-12 w-full font-bold text-white text-[15px]"
            >
              Đăng ký ngay
            </ButtonGradient>
          </div>
        </div>
      </div>
    </div>
  );
}

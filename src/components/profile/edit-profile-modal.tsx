"use client";

import React, { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { ButtonGradient } from "../ui/button-gradient";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { nickname: string; bio: string; avatar?: File }) => void;
  initialData: {
    nickname: string;
    bio: string;
    avatar: string;
  };
}

export default function EditProfileModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: EditProfileModalProps) {
  const [nickname, setNickname] = useState(initialData.nickname);
  const [bio, setBio] = useState(initialData.bio);
  const [avatarPreview, setAvatarPreview] = useState(initialData.avatar);
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxNicknameLength = 20;
  const maxBioLength = 100;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedAvatar(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({
      nickname,
      bio,
      avatar: selectedAvatar || undefined,
    });
    onClose();
  };

  const handleClose = () => {
    // Reset form data when closing
    setNickname(initialData.nickname);
    setBio(initialData.bio);
    setAvatarPreview(initialData.avatar);
    setSelectedAvatar(null);
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
          <div className="flex flex-col gap-8 items-center w-full">
            {/* Avatar with Camera Button */}
            <div className="relative">
              <div className="w-[140px] h-[140px] rounded-full overflow-hidden">
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

              {/* Camera Button */}
              <div className="absolute bottom-0 right-0 w-12 h-12 p-0.5 bg-white rounded-full">
                <button
                  onClick={handleAvatarClick}
                  className="rounded-full w-11 h-11 flex items-center justify-center cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(316deg, rgba(255, 47, 193, 0.10) -11.37%, rgba(116, 77, 241, 0.10) 63.98%, rgba(0, 0, 85, 0.10) 113.46%)",
                  }}
                >
                  <Image
                    src="/icons/camera-icon.svg"
                    alt="Change Avatar"
                    width={24}
                    height={24}
                  />
                </button>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            {/* Input Section */}
            <div className="flex flex-col gap-8 w-full">
              {/* Nickname Input */}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-start w-full">
                  <label className="text-[#212529] text-[15px] font-normal leading-[20px]">
                    Nickname
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

              {/* Bio Input */}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-start w-full">
                  <label className="text-[#212529] text-[15px] font-normal leading-[20px]">
                    Giới thiệu về bạn (không bắt buộc)
                  </label>
                  <span className="text-[#868E96] text-[14px] leading-[20px]">
                    {bio.length}/{maxBioLength}
                  </span>
                </div>
                <div className="bg-[#F1F3F5] rounded-xl p-4 h-28 w-full">
                  <textarea
                    value={bio}
                    onChange={(e) => {
                      if (e.target.value.length <= maxBioLength) {
                        setBio(e.target.value);
                      }
                    }}
                    className="w-full h-full bg-transparent text-[#212529] text-[15px] font-normal leading-[20px] outline-none resize-none placeholder-[#868E96]"
                    placeholder="Viết một chút về bản thân bạn..."
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
              Lưu
            </ButtonGradient>
          </div>
        </div>
      </div>
    </div>
  );
}

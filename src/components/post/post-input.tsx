"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import PostCreateModal from "./post-create-modal";

interface PostInputProps {
  onSubmit?: (content: string) => void;
  onCreatePost?: (content: string, images: File[]) => void;
  placeholder?: string;
  replyTo?: string;
  autoFocus?: boolean;
  isReply?: boolean;
  showCreateModal?: boolean;
}

export default function PostInput({
  onSubmit,
  onCreatePost,
  placeholder = "Chia sẻ bài viết trên Fanverse...",
  replyTo,
  autoFocus = false,
  isReply = false,
  showCreateModal = false,
}: PostInputProps) {
  const [comment, setComment] = useState(replyTo ? `@${replyTo} ` : "");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = () => {
    if (comment.trim()) {
      let cleanContent = comment.trim();
      if (replyTo && cleanContent.startsWith(`@${replyTo}`)) {
        cleanContent = cleanContent.replace(`@${replyTo}`, "").trim();
      }
      onSubmit?.(cleanContent);
      setComment(replyTo ? `@${replyTo} ` : "");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputFocus = () => {
    if (showCreateModal && !isReply) {
      setIsModalOpen(true);
    }
  };

  const handleCreatePost = (content: string, images: File[]) => {
    onCreatePost?.(content, images);
  };

  return (
    <div className="box-border flex flex-row gap-3 items-start justify-start relative w-full">
      <div
        className="flex-1 relative group rounded-[20px] p-0.25"
        style={{
          background:
            "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)",
        }}
      >
        <div
          className={`relative flex flex-row gap-3 items-center ${
            isReply ? "h-9" : "h-12 md:h-18"
          } px-4 bg-white rounded-[20px] hover:bg-gray-50 focus-within:bg-gray-50 transition-colors duration-300`}
        >
          <div className="flex flex-row gap-4 items-center">
            <Avatar
              className={isReply ? "w-9 h-9 shrink-0" : "w-10 h-10 shrink-0"}
            >
              <AvatarImage src="/icons/profile-icon.svg" alt="Your avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className="flex-1 border-0 text-[15px] font-normal leading-[20px] focus-visible:ring-0 p-0 h-full bg-transparent placeholder:text-[var(--muted-foreground)]"
            autoFocus={autoFocus}
          />
          <div className="flex flex-row gap-4 items-center">
            <button className="w-6 h-6 grid place-items-start hover:scale-110 transition-transform duration-200">
              <Image
                src="/icons/gallery-img.svg"
                alt="Add emoji"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <PostCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
}

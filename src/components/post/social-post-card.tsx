"use client";

import React from "react";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ButtonGradientOutlined } from "@/components/ui/button-gradient-outlined";
import { ButtonGradientOutlinedGreen } from "@/components/ui/button-gradient-outlined-green";

interface SocialPostCardProps {
  author: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  timestamp: string;
  views: number;
  comments: number;
  content: string;
  image?: string;
  reactions: {
    emoji: string;
    count: number;
    isActive?: boolean;
  }[];
  onCommentClick: () => void;
  onImageClick: () => void;
}

export default function SocialPostCard({
  author,
  timestamp,
  views,
  comments,
  content,
  image,
  reactions,
  onCommentClick,
  onImageClick,
}: SocialPostCardProps) {
  return (
    <div className="bg-white rounded-[20px] overflow-hidden py-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-3 px-4">
        <div className="flex items-start space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>

          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-bold text-[15px]">{author.name}</h3>
              {author.isVerified && (
                <Image
                  src="/icons/tick.svg"
                  alt="Verified"
                  width={16}
                  height={16}
                />
              )}
            </div>

            <div className="flex items-center space-x-2.5 text-sm text-[var(--muted-foreground)]">
              <span>{timestamp}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Image
                  src="/icons/smile.svg"
                  alt="Smile"
                  width={12}
                  height={12}
                />
                <span>{views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Image
                  src="/icons/comment.svg"
                  alt="Comment"
                  width={14}
                  height={12}
                />
                <span>{comments}</span>
              </div>
            </div>
          </div>
        </div>

        <Button variant="ghost">
          <MoreHorizontal className="w-6 h-6" />
        </Button>
      </div>

      {/* Content */}
      <div className="mb-4 px-4">
        <p className="text-sm">{content}</p>
      </div>

      {/* Image */}
      {image && (
        <div className="mb-4 cursor-pointer" onClick={onImageClick}>
          <div className="relative w-full" style={{ aspectRatio: "1.75" }}>
            <Image
              src={image}
              alt="Post image"
              fill
              className="object-cover hover:opacity-95 transition-opacity"
            />
          </div>
        </div>
      )}

      {/* Reactions */}
      <div className="flex items-center space-x-2 mb-0 px-4">
        {reactions.map((reaction, index) => (
          <ButtonGradientOutlined
            className="rounded-full h-8.5 px-3 font-normal text-sm"
            key={index}
            isActive={reaction.isActive}
          >
            <Image
              src={`/icons/emoji/${reaction.emoji}.svg`}
              alt="Emoji"
              width={20}
              height={20}
            />
            <span>{reaction.count}</span>
          </ButtonGradientOutlined>
        ))}

        <div className="flex items-center space-x-2">
          <ButtonGradientOutlined className="rounded-full h-8.5 px-2">
            <Image
              src="/icons/add-emoji.svg"
              alt="Add Emoji"
              width={24}
              height={24}
            />
          </ButtonGradientOutlined>

          <ButtonGradientOutlinedGreen className="rounded-full h-7.5">
            <Image
              src="/icons/share-icon.png"
              alt="Share"
              width={18}
              height={14}
            />
          </ButtonGradientOutlinedGreen>

          {/* Comment Button */}
          <Button
            variant="ghost"
            onClick={onCommentClick}
            className="text-sm text-[var(--muted-foreground)] font-normal h-auto p-2 hover:bg-gray-100 rounded-full"
          >
            <Image
              src="/icons/comment.svg"
              alt="Comment"
              width={16}
              height={14}
              className="mr-1"
            />
            Bình luận
          </Button>
        </div>
      </div>
    </div>
  );
}

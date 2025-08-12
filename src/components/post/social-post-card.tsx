"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ButtonGradientOutlined } from "@/components/ui/button-gradient-outlined";
import { ButtonGradientOutlinedGreen } from "@/components/ui/button-gradient-outlined-green";
import { useReactions } from "@/hooks/use-reactions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  content: string;
  timestamp: string;
  reactions: {
    emoji: string;
    count: number;
    isActive?: boolean;
  }[];
  replies?: Comment[];
  level: number;
  replyTo?: string;
}

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
  variant?: "home" | "community";
  commentList?: Comment[];
  isPremium?: boolean;
}

const EMOJI_LIST = [
  { id: "1", src: "/icons/emoji/1.svg" },
  { id: "7", src: "/icons/emoji/7.svg" },
  { id: "16", src: "/icons/emoji/16.svg" },
  { id: "19", src: "/icons/emoji/19.svg" },
  { id: "20", src: "/icons/emoji/20.svg" },
];

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
  variant = "home",
  commentList = [],
  isPremium = false,
}: SocialPostCardProps) {
  const {
    reactions: postReactions,
    toggleReaction: togglePostReaction,
    addNewReaction: addPostReaction,
  } = useReactions(reactions);
  return (
    <div
      className={`bg-white rounded-[20px] overflow-hidden pt-4 ${
        isPremium ? "pb-0" : "pb-4"
      }`}
    >
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

        {!isPremium && (
          <Button variant="ghost" className="px-1">
            <Image
              src="/icons/more-icon.svg"
              alt="More"
              width={20}
              height={4}
            />
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="mb-4 px-4">
        <div
          className="text-sm relative"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {content}
          {content.length > 150 && (
            <button
              onClick={onCommentClick}
              className="text-[var(--muted-foreground)] hover:underline ml-1 inline-flex items-center"
            >
              ...xem thêm
            </button>
          )}
        </div>
      </div>

      {/* Image */}
      {image && (
        <div
          className={`${isPremium ? "mb-0" : "mb-4"} relative ${
            !isPremium ? "cursor-pointer" : ""
          }`}
          onClick={!isPremium ? onImageClick : undefined}
        >
          <div className="relative w-full" style={{ aspectRatio: "1.75" }}>
            <Image
              src={image}
              alt="Post image"
              fill
              className="object-cover hover:opacity-95 transition-opacity"
            />
            {isPremium && (
              <div className="absolute inset-0 backdrop-blur-md bg-[rgba(0, 0, 0, 0.50)] ">
                <div
                  className="flex items-center justify-center rounded-full w-9 h-9 m-4"
                  style={{
                    background:
                      "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #0000B7 113.46%)",
                  }}
                >
                  <Image
                    src="/icons/crown-icon.svg"
                    alt="Premium content"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reactions */}
      {!isPremium && (
        <div className="flex items-center space-x-2 mb-0 px-4">
          {postReactions.map((reaction, index) => (
            <ButtonGradientOutlined
              className="rounded-full h-8.5 px-3 font-normal text-sm"
              key={index}
              isActive={reaction.isActive}
              onClick={() => togglePostReaction(reaction.emoji)}
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
            <Popover>
              <PopoverTrigger asChild>
                <ButtonGradientOutlined className="rounded-full h-8.5 px-2">
                  <Image
                    src="/icons/add-emoji.svg"
                    alt="Add Emoji"
                    width={24}
                    height={24}
                  />
                </ButtonGradientOutlined>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="start">
                <div className="flex gap-1">
                  {EMOJI_LIST.map((emoji) => (
                    <button
                      key={emoji.id}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      onClick={() => addPostReaction(emoji.id)}
                    >
                      <Image
                        src={emoji.src}
                        alt="Emoji"
                        width={24}
                        height={24}
                      />
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <ButtonGradientOutlinedGreen className="rounded-full h-7.5">
              <Image
                src="/icons/share-icon.png"
                alt="Share"
                width={18}
                height={14}
              />
            </ButtonGradientOutlinedGreen>

            {variant === "home" ? (
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
            ) : null}
          </div>
        </div>
      )}

      {/* Comments Preview for Community variant */}
      {variant === "community" && commentList.length > 0 && (
        <>
          <div className="h-0.25 bg-[#E9ECEF] mt-4" />

          {/* Level 0 Comments Preview */}
          <div className="px-4 py-4 space-y-4">
            {commentList.slice(0, 2).map((comment) => (
              <div
                key={comment.id}
                onClick={onCommentClick}
                className="cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={comment.author.avatar}
                      alt={comment.author.name}
                    />
                    <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="px-4 py-3 bg-[var(--background)] rounded-2xl">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-bold text-[15px]">
                          {comment.author.name}
                        </h4>
                        {comment.author.isVerified && (
                          <Image
                            src="/icons/tick.svg"
                            alt="Verified"
                            width={16}
                            height={16}
                          />
                        )}
                      </div>
                      <p className="text-[15px]">{comment.content}</p>
                    </div>

                    <div className="flex items-center space-x-2 px-4 text-sm mt-2">
                      <span className="text-[var(--muted-foreground)]">
                        {comment.timestamp}
                      </span>

                      <Button
                        variant="ghost"
                        className="font-normal text-sm h-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCommentClick();
                        }}
                      >
                        Trả lời
                      </Button>

                      <div className="flex items-center space-x-2">
                        {comment.reactions.map((reaction, index) => (
                          <ButtonGradientOutlined
                            key={index}
                            className="rounded-full h-8 px-3 font-normal text-sm"
                            isActive={reaction.isActive}
                            onClick={(e) => {
                              e.stopPropagation();
                              onCommentClick();
                            }}
                          >
                            <Image
                              src={`/icons/emoji/${reaction.emoji}.svg`}
                              alt="Emoji"
                              width={16}
                              height={16}
                            />
                            <span>{reaction.count}</span>
                          </ButtonGradientOutlined>
                        ))}
                        <Popover>
                          <PopoverTrigger asChild>
                            <ButtonGradientOutlined
                              className="rounded-full h-8 px-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Image
                                src="/icons/add-emoji.svg"
                                alt="Add Emoji"
                                width={20}
                                height={20}
                              />
                            </ButtonGradientOutlined>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-2" align="start">
                            <div className="flex gap-1">
                              {EMOJI_LIST.map((emoji) => (
                                <button
                                  key={emoji.id}
                                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onCommentClick();
                                  }}
                                >
                                  <Image
                                    src={emoji.src}
                                    alt="Emoji"
                                    width={24}
                                    height={24}
                                  />
                                </button>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {/* Show replies count if any */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="flex flex-row gap-1 items-center justify-start mt-2">
                        <div className="w-6 h-0.25 bg-[var(--muted-foreground)] rounded-full" />
                        <span className="text-[15px] text-[var(--muted-foreground)] font-normal">
                          Xem thêm {comment.replies.length} bình luận
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Show more comments button */}
            {commentList.length > 2 && (
              <Button
                variant="ghost"
                onClick={onCommentClick}
                className="text-sm text-[var(--muted-foreground)] font-normal w-full"
              >
                Xem thêm {commentList.length - 2} bình luận
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

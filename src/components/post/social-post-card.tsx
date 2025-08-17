"use client";

import React, { useRef, useEffect, useState } from "react";
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
import ImageDisplayView from "./image-display-view";
import PostMenuPopover from "./post-menu-popover";
import EditPostModal from "./edit-post-modal";
import DeleteConfirmationModal from "./delete-confirmation-modal";

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
  images?: string[];
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
  onEdit?: () => void;
  onDelete?: () => void;
}

const EMOJI_LIST = [
  { id: "1", src: "/icons/emoji/1.svg" },
  { id: "7", src: "/icons/emoji/7.svg" },
  { id: "16", src: "/icons/emoji/16.svg" },
  { id: "19", src: "/icons/emoji/19.svg" },
  { id: "20", src: "/icons/emoji/20.svg" },
];

const CommentReactions = ({
  reactions,
}: {
  reactions: { emoji: string; count: number; isActive?: boolean }[];
}) => {
  const {
    reactions: commentReactions,
    toggleReaction: toggleCommentReaction,
    addNewReaction: addCommentReaction,
  } = useReactions(reactions);

  return (
    <div className="flex flex-wrap items-center gap-1 sm:gap-2">
      {commentReactions.map((reaction, index) => (
        <ButtonGradientOutlined
          key={index}
          className="rounded-full h-7 sm:h-8 px-2 sm:px-3 font-normal text-xs sm:text-sm md:text-sm"
          isActive={reaction.isActive}
          onClick={(e) => {
            e.stopPropagation();
            toggleCommentReaction(reaction.emoji);
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
            className="rounded-full h-7 sm:h-8 px-1 sm:px-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/icons/add-emoji.svg"
              alt="Add Emoji"
              width={18}
              height={18}
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </ButtonGradientOutlined>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-primary border-0 rounded-2xl"
          align="center"
          sideOffset={8}
        >
          <div className="flex gap-1 p-2">
            {EMOJI_LIST.map((emoji) => (
              <button
                key={emoji.id}
                className="p-2 cursor-pointer hover:bg-gray-600 rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  addCommentReaction(emoji.id);
                }}
              >
                <Image
                  src={emoji.src}
                  alt="Emoji"
                  width={20}
                  height={20}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

const ContentWithReadMore = React.memo(
  ({ content, onReadMore }: { content: string; onReadMore: () => void }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [showReadMore, setShowReadMore] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
      if (!isChecked && contentRef.current) {
        const element = contentRef.current;
        const hasOverflow = element.scrollHeight > element.clientHeight;
        setShowReadMore(hasOverflow);
        setIsChecked(true);
      }
    }, [isChecked]);

    // Reset check when content changes
    useEffect(() => {
      setIsChecked(false);
    }, [content]);

    return (
      <div className="text-xs sm:text-sm md:text-[15px] relative">
        <div
          ref={contentRef}
          className="text-xs sm:text-sm md:text-[15px]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: "20px",
            wordBreak: "break-word",
            textOverflow: "ellipsis",
          }}
        >
          {content}
        </div>
        {showReadMore && (
          <div className="text-right mt-1">
            <button
              onClick={onReadMore}
              className="text-[var(--muted-foreground)] hover:underline text-xs sm:text-sm md:text-[15px]"
            >
              ...Xem thêm
            </button>
          </div>
        )}
      </div>
    );
  }
);

ContentWithReadMore.displayName = "ContentWithReadMore";

export default function SocialPostCard({
  author,
  timestamp,
  views,
  comments,
  content,
  images,
  reactions,
  onCommentClick,
  onImageClick,
  variant = "home",
  commentList = [],
  isPremium = false,
  onEdit,
  onDelete,
}: SocialPostCardProps) {
  const {
    reactions: postReactions,
    toggleReaction: togglePostReaction,
    addNewReaction: addPostReaction,
  } = useReactions(reactions);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleEditSubmit = (newContent: string, newImages: File[]) => {
    onEdit?.();
    // TODO: Handle actual edit logic
    console.log("Edit post:", newContent, newImages);
  };

  const handleDeleteConfirm = () => {
    onDelete?.();
    // TODO: Handle actual delete logic
    console.log("Delete post");
  };
  return (
    <div
      className={`bg-white rounded-[16px] sm:rounded-[20px] overflow-hidden pt-3 sm:pt-4 ${
        isPremium ? "pb-0" : "pb-3 sm:pb-4"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2 sm:mb-3 px-3 sm:px-4">
        <div className="flex items-start space-x-2 sm:space-x-3">
          <Avatar className="w-10 h-10 sm:w-12 sm:h-12">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>

          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-bold text-[13px] sm:text-[15px] md:text-[15px]">
                {author.name}
              </h3>
              {author.isVerified && (
                <Image
                  src="/icons/tick.svg"
                  alt="Verified"
                  width={14}
                  height={14}
                  className="w-3 h-3 sm:w-4 sm:h-4"
                />
              )}
            </div>

            <div className="flex items-center space-x-1.5 sm:space-x-2.5 text-xs sm:text-sm md:text-sm text-[var(--muted-foreground)]">
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
          <PostMenuPopover onEdit={handleEdit} onDelete={handleDelete}>
            <Button variant="ghost" className="px-1">
              <Image
                src="/icons/more-icon.svg"
                alt="More"
                width={20}
                height={4}
              />
            </Button>
          </PostMenuPopover>
        )}
      </div>

      {/* Content */}
      <div className="mb-3 sm:mb-4 px-3 sm:px-4">
        <ContentWithReadMore content={content} onReadMore={onCommentClick} />
      </div>

      {/* Images */}
      {images && images.length > 0 && (
        <div className={`${isPremium ? "mb-0" : "mb-3 sm:mb-4"} relative`}>
          <ImageDisplayView
            images={images}
            onImageClick={!isPremium ? onImageClick : undefined}
          />
          {isPremium && (
            <div className="absolute inset-0 backdrop-blur-md bg-[rgba(0, 0, 0, 0.50)]">
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
      )}

      {/* Reactions */}
      {!isPremium && (
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-0 px-3 sm:px-4">
          {postReactions.map((reaction, index) => (
            <ButtonGradientOutlined
              className="rounded-full h-7 sm:h-8 px-2 sm:px-3 font-normal text-xs sm:text-sm md:text-sm"
              key={index}
              isActive={reaction.isActive}
              onClick={() => togglePostReaction(reaction.emoji)}
            >
              <Image
                src={`/icons/emoji/${reaction.emoji}.svg`}
                alt="Emoji"
                width={16}
                height={16}
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
              <span>{reaction.count}</span>
            </ButtonGradientOutlined>
          ))}

          <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1 sm:mt-0">
            <Popover>
              <PopoverTrigger asChild>
                <ButtonGradientOutlined className="rounded-full h-7 sm:h-8 px-1 sm:px-2">
                  <Image
                    src="/icons/add-emoji.svg"
                    alt="Add Emoji"
                    width={18}
                    height={18}
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                </ButtonGradientOutlined>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-primary border-0 rounded-2xl"
                align="center"
                sideOffset={8}
              >
                <div className="flex gap-1 p-2">
                  {EMOJI_LIST.map((emoji) => (
                    <button
                      key={emoji.id}
                      className="p-2 cursor-pointer hover:bg-gray-600 rounded-lg transition-colors"
                      onClick={() => addPostReaction(emoji.id)}
                    >
                      <Image
                        src={emoji.src}
                        alt="Emoji"
                        width={20}
                        height={20}
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <ButtonGradientOutlinedGreen className="rounded-full h-7 sm:h-8">
              <Image
                src="/icons/share-icon.png"
                alt="Share"
                width={16}
                height={12}
                className="w-4 h-3 sm:w-[18px] sm:h-[14px]"
              />
            </ButtonGradientOutlinedGreen>

            {variant === "home" ? (
              <Button
                variant="ghost"
                onClick={onCommentClick}
                className="text-xs sm:text-sm md:text-sm text-[var(--muted-foreground)] font-normal h-auto p-1.5 sm:p-2 hover:bg-gray-100 rounded-full"
              >
                <Image
                  src="/icons/comment.svg"
                  alt="Comment"
                  width={14}
                  height={12}
                  className="w-3.5 h-3 sm:w-4 sm:h-3.5 mr-0.5 sm:mr-1"
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
          <div className="h-0.25 bg-[#E9ECEF] mt-3 sm:mt-4" />

          {/* Level 0 Comments Preview */}
          <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4">
            {commentList.slice(0, 2).map((comment) => (
              <div key={comment.id}>
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                    <AvatarImage
                      src={comment.author.avatar}
                      alt={comment.author.name}
                    />
                    <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 flex flex-col items-start">
                    <div className="px-3 sm:px-4 py-2 sm:py-3 bg-[var(--background)] rounded-xl sm:rounded-2xl">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-bold text-[13px] sm:text-[15px] md:text-[15px]">
                          {comment.author.name}
                        </h4>
                        {comment.author.isVerified && (
                          <Image
                            src="/icons/tick.svg"
                            alt="Verified"
                            width={14}
                            height={14}
                            className="w-3 h-3 sm:w-4 sm:h-4"
                          />
                        )}
                      </div>
                      <p className="text-xs sm:text-sm md:text-[15px]">
                        {comment.content}
                      </p>
                    </div>

                    <div className="flex items-center flex-wrap gap-2 px-2 sm:px-4 text-xs sm:text-sm md:text-sm mt-1 sm:mt-2">
                      <span className="text-[var(--muted-foreground)]">
                        {comment.timestamp}
                      </span>

                      <Button
                        variant="ghost"
                        className="font-normal text-xs sm:text-sm md:text-sm h-auto p-1 sm:p-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCommentClick();
                        }}
                      >
                        Trả lời
                      </Button>

                      <CommentReactions reactions={comment.reactions} />
                    </div>

                    {/* Show replies count if any */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="flex flex-row gap-1 items-center justify-start mt-1 sm:mt-2">
                        <div className="w-6 h-0.25 bg-[var(--muted-foreground)] rounded-full" />
                        <span
                          className="text-xs sm:text-sm md:text-[15px] text-[var(--muted-foreground)] font-normal cursor-pointer"
                          onClick={onCommentClick}
                        >
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
                className="text-xs sm:text-sm md:text-sm text-[var(--muted-foreground)] font-normal w-full py-1 sm:py-2"
              >
                Xem thêm {commentList.length - 2} bình luận
              </Button>
            )}
          </div>
        </>
      )}

      {/* Edit Post Modal */}
      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialContent={content}
        initialImages={images}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

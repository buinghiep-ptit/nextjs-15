"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ButtonGradientOutlined } from "@/components/ui/button-gradient-outlined";
import { ButtonGradientOutlinedGreen } from "@/components/ui/button-gradient-outlined-green";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useReactions } from "@/hooks/use-reactions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ImageDisplayView from "./image-display-view";

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
  level: number; // 0 hoặc 1 (chỉ 2 cấp)
  replyTo?: string; // @mention cho replies
}

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
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
    commentList?: Comment[];
  };
}

const CommentInput = ({
  onSubmit,
  placeholder = "Viết bình luận...",
  replyTo,
  autoFocus = false,
  isReply = false,
}: {
  onSubmit: (content: string) => void;
  placeholder?: string;
  replyTo?: string;
  autoFocus?: boolean;
  isReply?: boolean;
}) => {
  const [comment, setComment] = useState(replyTo ? `@${replyTo} ` : "");

  const handleSubmit = () => {
    if (comment.trim()) {
      // Loại bỏ @mention khỏi content trước khi submit (để tránh duplicate)
      let cleanContent = comment.trim();
      if (replyTo && cleanContent.startsWith(`@${replyTo}`)) {
        cleanContent = cleanContent.replace(`@${replyTo}`, "").trim();
      }

      onSubmit(cleanContent);
      setComment(replyTo ? `@${replyTo} ` : "");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="box-border flex flex-row gap-3 items-start justify-start relative w-full">
      <Avatar className={isReply ? "w-9 h-9 shrink-0" : "w-12 h-12 shrink-0"}>
        <AvatarImage src="/images/user-avatar.png" alt="Your avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div
        className="flex-1 relative group rounded-[360px] p-0.25"
        style={{
          background:
            "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)",
        }}
      >
        <div
          className={`relative flex flex-row gap-3 items-center ${
            isReply ? "h-9" : "h-12"
          } px-4 bg-white rounded-[360px] hover:bg-gray-50 focus-within:bg-gray-50 transition-colors duration-300`}
        >
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            className="flex-1 border-0 text-[15px] font-normal leading-[20px] focus-visible:ring-0 p-0 h-full bg-transparent placeholder:text-[var(--muted-foreground)]"
            autoFocus={autoFocus}
          />
          <div className="flex flex-row gap-4 items-center">
            <button className="w-6 h-6 grid place-items-start hover:scale-110 transition-transform duration-200">
              <Image
                src="/icons/add-emoji.svg"
                alt="Add emoji"
                width={24}
                height={24}
                className="w-full h-full object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommentItem = ({
  comment,
  onReply,
  showReplyInput,
  onToggleReply,
  visibleRepliesCount,
  onLoadMoreReplies,
  newlyAddedReplies,
}: {
  comment: Comment;
  onReply: (parentId: string, content: string, replyToName: string) => void;
  showReplyInput: string | null;
  onToggleReply: (commentId: string | null) => void;
  visibleRepliesCount: { [key: string]: number };
  onLoadMoreReplies: (commentId: string) => void;
  newlyAddedReplies: Set<string>;
}) => {
  const {
    reactions: commentReactions,
    toggleReaction: toggleCommentReaction,
    addNewReaction: addCommentReaction,
  } = useReactions(comment.reactions);
  const hasReplies = comment.replies && comment.replies.length > 0;
  const visibleCount = visibleRepliesCount[comment.id] || 0;

  // Logic hiển thị replies
  const getDisplayedReplies = () => {
    if (!hasReplies) return [];

    const newRepliesInRange = comment
      .replies!.slice(0, visibleCount)
      .filter((reply) => newlyAddedReplies.has(reply.id)).length;

    const adjustedVisibleCount = Math.max(0, visibleCount - newRepliesInRange);

    const oldReplies = comment
      .replies!.filter((reply) => !newlyAddedReplies.has(reply.id))
      .slice(0, adjustedVisibleCount);

    const newReplies = comment.replies!.filter((reply) =>
      newlyAddedReplies.has(reply.id)
    );

    return [...oldReplies, ...newReplies];
  };

  const displayedReplies = getDisplayedReplies();

  const oldRepliesCount =
    comment.replies?.filter((reply) => !newlyAddedReplies.has(reply.id))
      .length || 0;

  const displayedOldRepliesCount = displayedReplies.filter(
    (reply) => !newlyAddedReplies.has(reply.id)
  ).length;

  const hiddenRepliesCount = oldRepliesCount - displayedOldRepliesCount;

  return (
    <div>
      <div className="flex items-start space-x-3">
        <Avatar className={comment.level === 0 ? "w-12 h-12" : "w-8 h-8"}>
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2 flex flex-col items-start">
          <div className="px-4 py-3 bg-[var(--background)] w-auto rounded-2xl">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-bold text-[15px]">{comment.author.name}</h4>
              {comment.author.isVerified && (
                <Image
                  src="/icons/tick.svg"
                  alt="Verified"
                  width={16}
                  height={16}
                />
              )}
            </div>
            <p className="text-[15px]">
              {comment.replyTo && (
                <span className="text-blue-600 font-medium">
                  @{comment.replyTo}{" "}
                </span>
              )}
              {comment.content}
            </p>
          </div>

          <div className="flex items-center space-x-2 px-4 text-sm">
            <span className="text-[var(--muted-foreground)]">
              {comment.timestamp}
            </span>

            <Button
              variant="ghost"
              className="font-normal text-sm h-auto"
              onClick={() =>
                onToggleReply(showReplyInput === comment.id ? null : comment.id)
              }
            >
              Trả lời
            </Button>

            <div className="flex items-center space-x-2">
              {commentReactions.map((reaction, index) => (
                <ButtonGradientOutlined
                  key={index}
                  className="rounded-full h-8 px-3 font-normal text-sm"
                  isActive={reaction.isActive}
                  onClick={() => toggleCommentReaction(reaction.emoji)}
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
                  <ButtonGradientOutlined className="rounded-full h-8 px-2">
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
                        onClick={() => addCommentReaction(emoji.id)}
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

          {showReplyInput === comment.id && (
            <CommentInput
              onSubmit={(content) => {
                onReply(comment.id, content, comment.author.name);
                onToggleReply(null);
              }}
              placeholder={`Trả lời ${comment.author.name}...`}
              replyTo={comment.level === 1 ? comment.author.name : undefined}
              autoFocus={true}
              isReply={true}
            />
          )}

          {comment.level === 0 && hasReplies && hiddenRepliesCount > 0 && (
            <div className="flex flex-row gap-1 items-center justify-start">
              <div className="w-6 h-0.25 bg-[var(--muted-foreground)] rounded-full" />
              <Button
                variant="ghost"
                onClick={() => onLoadMoreReplies(comment.id)}
                className="text-[15px] text-[var(--muted-foreground)] font-normal h-auto px-1"
              >
                {visibleCount === 0
                  ? `Xem ${oldRepliesCount} bình luận`
                  : `Xem thêm ${Math.min(hiddenRepliesCount, 10)} bình luận`}
              </Button>
            </div>
          )}

          {comment.level === 0 && displayedReplies.length > 0 && (
            <div className="space-y-4 mt-4 ml-8">
              {displayedReplies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  showReplyInput={showReplyInput}
                  onToggleReply={onToggleReply}
                  visibleRepliesCount={visibleRepliesCount}
                  onLoadMoreReplies={onLoadMoreReplies}
                  newlyAddedReplies={newlyAddedReplies}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EMOJI_LIST = [
  { id: "1", src: "/icons/emoji/1.svg" },
  { id: "7", src: "/icons/emoji/7.svg" },
  { id: "16", src: "/icons/emoji/16.svg" },
  { id: "19", src: "/icons/emoji/19.svg" },
  { id: "20", src: "/icons/emoji/20.svg" },
];

export default function PostModal({ isOpen, onClose, post }: PostModalProps) {
  const {
    reactions: postReactions,
    toggleReaction: togglePostReaction,
    addNewReaction: addPostReaction,
  } = useReactions(post.reactions);
  const [commentsData, setCommentsData] = useState<Comment[]>(
    post.commentList || []
  );
  const [showReplyInput, setShowReplyInput] = useState<string | null>(null);
  const [visibleCommentsCount, setVisibleCommentsCount] = useState(10);
  const [visibleRepliesCount, setVisibleRepliesCount] = useState<{
    [key: string]: number;
  }>({});
  const [newlyAddedComments, setNewlyAddedComments] = useState<Set<string>>(
    new Set()
  );
  const [newlyAddedReplies, setNewlyAddedReplies] = useState<Set<string>>(
    new Set()
  );

  const addComment = (content: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: {
        name: "Bạn",
        avatar: "/images/user-avatar.png",
        isVerified: false,
      },
      content,
      timestamp: "Vừa xong",
      reactions: [],
      level: 0,
    };
    setCommentsData([newComment, ...commentsData]);
    setNewlyAddedComments((prev) => new Set([...prev, newComment.id]));
  };

  const addReply = (parentId: string, content: string, replyToName: string) => {
    const newReplyId = `reply-${Date.now()}`;

    const updateComments = (comments: Comment[]): Comment[] => {
      return comments.map((comment) => {
        if (comment.id === parentId && comment.level === 0) {
          const newReply: Comment = {
            id: newReplyId,
            author: {
              name: "Bạn",
              avatar: "/images/user-avatar.png",
              isVerified: false,
            },
            content,
            timestamp: "Vừa xong",
            reactions: [],
            level: 1,
          };

          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }

        if (comment.replies) {
          let foundTarget = false;

          comment.replies.forEach((reply) => {
            if (reply.id === parentId && reply.level === 1) {
              foundTarget = true;
            }
          });

          if (foundTarget) {
            const newReply: Comment = {
              id: newReplyId,
              author: {
                name: "Bạn",
                avatar: "/images/user-avatar.png",
                isVerified: false,
              },
              content,
              timestamp: "Vừa xong",
              reactions: [],
              level: 1,
              replyTo: replyToName,
            };

            return {
              ...comment,
              replies: [...comment.replies, newReply],
            };
          }
        }

        return comment;
      });
    };

    setCommentsData(updateComments(commentsData));
    setNewlyAddedReplies((prev) => new Set([...prev, newReplyId]));
  };

  const loadMoreComments = () => {
    setVisibleCommentsCount((prev) => prev + 10);
  };

  const loadMoreReplies = (commentId: string) => {
    setVisibleRepliesCount((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || 0) + 10,
    }));
  };

  const getDisplayedComments = () => {
    const newCommentsInRange = commentsData
      .slice(0, visibleCommentsCount)
      .filter((comment) => newlyAddedComments.has(comment.id)).length;

    const adjustedVisibleCount = Math.max(
      0,
      visibleCommentsCount - newCommentsInRange
    );

    const oldComments = commentsData
      .filter((comment) => !newlyAddedComments.has(comment.id))
      .slice(0, adjustedVisibleCount);

    const newComments = commentsData.filter((comment) =>
      newlyAddedComments.has(comment.id)
    );

    return [...oldComments, ...newComments];
  };

  const displayedComments = getDisplayedComments();

  const oldCommentsCount = commentsData.filter(
    (comment) => !newlyAddedComments.has(comment.id)
  ).length;

  const displayedOldCommentsCount = displayedComments.filter(
    (comment) => !newlyAddedComments.has(comment.id)
  ).length;

  const hiddenCommentsCount = oldCommentsCount - displayedOldCommentsCount;

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-w-2xl lg:w-1/2 h-screen py-4 px-0 border-0 bg-white overflow-hidden rounded-none"
        overlayClassName="bg-[rgba(14,15,17,0.50)] backdrop-blur-[8px]"
      >
        <DialogTitle className="sr-only">Chi tiết bài viết</DialogTitle>

        <div className="h-full overflow-y-auto px-6">
          {/* Main Post */}
          <div className="bg-white">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={post.author.avatar}
                    alt={post.author.name}
                  />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>

                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-bold text-[15px]">
                      {post.author.name}
                    </h3>
                    {post.author.isVerified && (
                      <Image
                        src="/icons/tick.svg"
                        alt="Verified"
                        width={16}
                        height={16}
                      />
                    )}
                  </div>

                  <div className="flex items-center space-x-2.5 text-sm text-[var(--muted-foreground)]">
                    <span>{post.timestamp}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Image
                        src="/icons/smile.svg"
                        alt="Smile"
                        width={12}
                        height={12}
                      />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Image
                        src="/icons/comment.svg"
                        alt="Comment"
                        width={14}
                        height={12}
                      />
                      <span>{post.comments + commentsData.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="ghost" className="px-1">
                <Image
                  src="/icons/more-icon.svg"
                  alt="More"
                  width={20}
                  height={4}
                />
              </Button>
            </div>

            {/* Content */}
            <div className="mb-4">
              <p className="text-sm">{post.content}</p>
            </div>

            {/* Images */}
            {post.images && post.images.length > 0 && (
              <div className="mb-4">
                <ImageDisplayView images={post.images} />
              </div>
            )}

            {/* Reactions */}
            <div className="flex items-center space-x-2 mb-4">
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
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="flex-1 overflow-y-auto pb-[76px]">
            {commentsData.length > 0 && (
              <>
                <div className="h-0.25 bg-[#E9ECEF]" />

                <div className="py-4 space-y-4 bg-white">
                  {displayedComments.map((comment) => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      onReply={addReply}
                      showReplyInput={showReplyInput}
                      onToggleReply={setShowReplyInput}
                      visibleRepliesCount={visibleRepliesCount}
                      onLoadMoreReplies={loadMoreReplies}
                      newlyAddedReplies={newlyAddedReplies}
                    />
                  ))}

                  {hiddenCommentsCount > 0 && (
                    <Button
                      variant="ghost"
                      onClick={loadMoreComments}
                      className="text-sm text-[var(--muted-foreground)] font-normal"
                    >
                      Xem thêm {Math.min(hiddenCommentsCount, 10)} bình luận
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Fixed Comment Input at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 bg-white px-6 py-4">
            <CommentInput onSubmit={addComment} autoFocus={false} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

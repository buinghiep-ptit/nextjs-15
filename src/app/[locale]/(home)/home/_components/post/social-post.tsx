"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MoreHorizontal, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ButtonGradientOutlined } from "@/components/ui/button-gradient-outlined";
import { ButtonGradientOutlinedGreen } from "@/components/ui/button-gradient-outlined-green";
import { Input } from "@/components/ui/input";

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

interface SocialPostProps {
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
  commentList?: Comment[];
}

const CommentInput = ({
  onSubmit,
  placeholder = "Viết bình luận...",
  replyTo,
  autoFocus = false,
}: {
  onSubmit: (content: string) => void;
  placeholder?: string;
  replyTo?: string;
  autoFocus?: boolean;
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
    <div className="flex items-center space-x-3 mt-3">
      <Avatar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
        <AvatarImage src="/images/user-avatar.png" alt="Your avatar" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex items-center space-x-2">
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 rounded-full border-gray-300 text-sm"
          autoFocus={autoFocus}
        />
        <Button
          onClick={handleSubmit}
          disabled={!comment.trim()}
          size="sm"
          className="rounded-full px-3 py-1"
        >
          <Send className="w-4 h-4" />
        </Button>
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
  const hasReplies = comment.replies && comment.replies.length > 0;
  const visibleCount = visibleRepliesCount[comment.id] || 0;

  // Logic hiển thị replies
  const getDisplayedReplies = () => {
    if (!hasReplies) return [];

    // Tính số replies cũ cần hiển thị (trừ đi newly added để tránh double count)
    const newRepliesInRange = comment
      .replies!.slice(0, visibleCount)
      .filter((reply) => newlyAddedReplies.has(reply.id)).length;

    const adjustedVisibleCount = Math.max(0, visibleCount - newRepliesInRange);

    // Lấy replies cũ (không phải newly added)
    const oldReplies = comment
      .replies!.filter((reply) => !newlyAddedReplies.has(reply.id))
      .slice(0, adjustedVisibleCount);

    // Lấy replies mới (luôn hiển thị)
    const newReplies = comment.replies!.filter((reply) =>
      newlyAddedReplies.has(reply.id)
    );

    // Merge: old replies trước, new replies ở cuối
    return [...oldReplies, ...newReplies];
  };

  const displayedReplies = getDisplayedReplies();

  // Tính hidden count chỉ từ replies cũ (không tính newly added)
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
        <Avatar className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="px-4 py-3 bg-[var(--background)] rounded-2xl">
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
              className="font-normal text-sm h-auto p-0"
              onClick={() =>
                onToggleReply(showReplyInput === comment.id ? null : comment.id)
              }
            >
              Trả lời
            </Button>

            <div className="flex items-center space-x-2">
              {comment.reactions.map((reaction, index) => (
                <ButtonGradientOutlined
                  key={index}
                  className="rounded-full h-8 px-3 font-normal text-sm"
                  isActive={reaction.isActive}
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
              <ButtonGradientOutlined className="rounded-full h-8 px-2">
                <Image
                  src="/icons/add-emoji.svg"
                  alt="Add Emoji"
                  width={20}
                  height={20}
                />
              </ButtonGradientOutlined>
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
            />
          )}

          {/* Hiển thị nút "Xem thêm" cho replies nếu có replies ẩn */}
          {comment.level === 0 && hasReplies && hiddenRepliesCount > 0 && (
            <Button
              variant="ghost"
              onClick={() => onLoadMoreReplies(comment.id)}
              className="text-sm text-[var(--muted-foreground)] font-normal ml-4 p-0 h-auto"
            >
              {visibleCount === 0
                ? `Xem ${oldRepliesCount} bình luận`
                : `Xem thêm ${Math.min(hiddenRepliesCount, 10)} bình luận`}
            </Button>
          )}

          {/* Hiển thị replies - chỉ cho comment level 0 */}
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

export default function EnhancedSocialPost({
  author,
  timestamp,
  views,
  comments,
  content,
  image,
  reactions,
  commentList = [],
}: SocialPostProps) {
  const [commentsData, setCommentsData] = useState<Comment[]>(commentList);
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

    // Đánh dấu comment mới để luôn hiển thị
    setNewlyAddedComments((prev) => new Set([...prev, newComment.id]));
  };

  const addReply = (parentId: string, content: string, replyToName: string) => {
    const newReplyId = `reply-${Date.now()}`;

    const updateComments = (comments: Comment[]): Comment[] => {
      return comments.map((comment) => {
        // Nếu reply vào comment level 0
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
            replies: [...(comment.replies || []), newReply], // Thêm vào cuối list
          };
        }

        // Nếu reply vào comment level 1 - thêm vào cuối list replies
        if (comment.replies) {
          let foundTarget = false;

          // Kiểm tra xem có reply nào là target không
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
              replies: [...comment.replies, newReply], // Thêm vào cuối list
            };
          }
        }

        return comment;
      });
    };

    setCommentsData(updateComments(commentsData));

    // Đánh dấu reply mới để luôn hiển thị
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

  // Logic hiển thị comments với newly added
  const getDisplayedComments = () => {
    // Tính số comments cũ cần hiển thị (trừ đi newly added để tránh double count)
    const newCommentsInRange = commentsData
      .slice(0, visibleCommentsCount)
      .filter((comment) => newlyAddedComments.has(comment.id)).length;

    const adjustedVisibleCount = Math.max(
      0,
      visibleCommentsCount - newCommentsInRange
    );

    // Lấy comments cũ (không phải newly added)
    const oldComments = commentsData
      .filter((comment) => !newlyAddedComments.has(comment.id))
      .slice(0, adjustedVisibleCount);

    // Lấy comments mới (luôn hiển thị)
    const newComments = commentsData.filter((comment) =>
      newlyAddedComments.has(comment.id)
    );

    // Merge: old comments trước, new comments ở cuối
    return [...oldComments, ...newComments];
  };

  const displayedComments = getDisplayedComments();

  // Tính hidden count chỉ từ comments cũ (không tính newly added)
  const oldCommentsCount = commentsData.filter(
    (comment) => !newlyAddedComments.has(comment.id)
  ).length;

  const displayedOldCommentsCount = displayedComments.filter(
    (comment) => !newlyAddedComments.has(comment.id)
  ).length;

  const hiddenCommentsCount = oldCommentsCount - displayedOldCommentsCount;

  return (
    <div className="bg-white rounded-[20px] overflow-hidden py-4">
      {/* Main Post */}
      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-3 px-4">
          <div className="flex items-start space-x-3">
            <Avatar className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
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
                  <span>{comments + commentsData.length}</span>
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
          <div className="mb-4">
            <div className="relative w-full" style={{ aspectRatio: "1.75" }}>
              <Image
                src={image}
                alt="Post image"
                fill
                className="object-cover"
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
          </div>
        </div>

        {/* Comment Input */}
        <div className="px-4">
          <CommentInput onSubmit={addComment} autoFocus={false} />
        </div>
      </div>

      {/* Comments Section */}
      {commentsData.length > 0 && (
        <>
          <div className="h-0.25 bg-[#E9ECEF] my-4" />

          <div className="px-4 space-y-4">
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

            {/* Nút "Xem thêm" cho comments level 0 */}
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
  );
}

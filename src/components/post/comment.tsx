import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ButtonGradientOutlined } from "@/components/ui/button-gradient-outlined";
import { EnhancedReply } from "./reply";
import { Comment, Author } from "@/types/post.type";

interface EnhancedCommentSectionProps {
  comment: Comment;
  onReply: (commentId: string, author: Author) => void;
  onToggleReplies: (commentId: string) => void;
  onReactionClick: (
    commentId: string,
    emoji: string,
    isActive: boolean
  ) => void;
  onAddEmoji: (commentId: string) => void;
  onReplyReactionClick: (
    replyId: string,
    emoji: string,
    isActive: boolean
  ) => void;
  onReplyAddEmoji: (replyId: string) => void;
  onReplyToReply: (replyId: string, author: Author) => void;
}

export function EnhancedCommentSection({
  comment,
  onReply,
  onToggleReplies,
  onReactionClick,
  onAddEmoji,
  onReplyReactionClick,
  onReplyAddEmoji,
  onReplyToReply,
}: EnhancedCommentSectionProps) {
  return (
    <div className="px-4">
      <div className="flex items-start space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          {/* Comment Content - giữ nguyên style như reply cũ */}
          <div className="px-4 py-3 bg-[var(--background)] rounded-2xl space-y-1 text-[15px]">
            <div className="flex items-center space-x-2">
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

            <p>{comment.content}</p>
          </div>

          {/* Comment Actions - giống reply cũ */}
          <div className="flex items-center space-x-2 px-4 text-sm">
            <span className="text-[var(--muted-foreground)]">
              {comment.timestamp}
            </span>

            {comment.replyLabel && (
              <Button
                variant="ghost"
                className="font-normal"
                onClick={() => onReply(comment.id, comment.author)}
              >
                {comment.replyLabel}
              </Button>
            )}

            {/* Comment Reactions - giữ nguyên style */}
            <div className="flex items-center space-x-2">
              {comment.reactions.map((reaction, index) => (
                <ButtonGradientOutlined
                  key={index}
                  className="rounded-full h-8.5 px-3 font-normal text-sm"
                  isActive={reaction.isActive}
                  onClick={() =>
                    onReactionClick(
                      comment.id,
                      reaction.emoji,
                      reaction.isActive || false
                    )
                  }
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

              <ButtonGradientOutlined
                className="rounded-full h-8.5 px-2"
                onClick={() => onAddEmoji(comment.id)}
              >
                <Image
                  src="/icons/add-emoji.svg"
                  alt="Add Emoji"
                  width={24}
                  height={24}
                />
              </ButtonGradientOutlined>
            </div>
          </div>

          {/* Show/Hide Replies Button */}
          {comment.replyCount > 0 && (
            <div className="px-4">
              <button
                className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                onClick={() => onToggleReplies(comment.id)}
              >
                <div className="w-8 h-px bg-gray-300"></div>
                <span>
                  {comment.showReplies
                    ? "Ẩn phản hồi"
                    : `Xem ${comment.replyCount} bình luận`}
                </span>
              </button>
            </div>
          )}

          {/* Replies */}
          {comment.showReplies &&
            comment.replies.map((reply) => (
              <EnhancedReply
                key={reply.id}
                reply={reply}
                onReply={onReplyToReply}
                onReactionClick={onReplyReactionClick}
                onAddEmoji={onReplyAddEmoji}
                canReply={reply.level < 2} // Max 3 levels
              />
            ))}

          {/* Show more replies */}
          {comment.showReplies &&
            comment.replyCount > comment.replies.length && (
              <button className="ml-12 text-sm text-blue-600 hover:text-blue-800 font-medium">
                Xem thêm {comment.replyCount - comment.replies.length} bình luận
              </button>
            )}
        </div>
      </div>
    </div>
  );
}

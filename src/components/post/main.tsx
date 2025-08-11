import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ButtonGradientOutlined } from "@/components/ui/button-gradient-outlined";
import { ButtonGradientOutlinedGreen } from "@/components/ui/button-gradient-outlined-green";
import { EnhancedCommentSection } from "./comment";
import { Author, Reaction, BaseComment, Comment } from "@/types/post.type";
import { ReplyInputEnhanced } from "./reply-input";

interface ReplyState {
  isActive: boolean;
  parentId: string;
  parentType: "post" | "comment" | "reply";
  replyToUser?: Author;
  level: 0 | 1 | 2;
}

interface EnhancedSocialPostProps {
  author: Author;
  timestamp: string;
  views: number;
  comments: number;
  content: string;
  image?: string;
  reactions: Reaction[];

  // Legacy single reply support
  reply?: BaseComment;

  // New comments system
  commentsList?: Comment[];
  showComments?: boolean;

  // Event handlers - giữ nguyên API cũ
  onMoreClick?: () => void;
  onImageClick?: () => void;
  onReactionClick?: (emoji: string, isActive: boolean) => void;
  onAddEmojiClick?: () => void;
  onShareClick?: () => void;
  onReplyClick?: () => void;
  onReplyReactionClick?: (emoji: string, isActive: boolean) => void;
  onReplyAddEmojiClick?: () => void;

  // New handlers cho comments system
  onCommentReply?: (commentId: string, author: Author) => void;
  onToggleReplies?: (commentId: string) => void;
  onCommentReaction?: (
    commentId: string,
    emoji: string,
    isActive: boolean
  ) => void;
  onCommentAddEmoji?: (commentId: string) => void;
  onReplyToReply?: (replyId: string, author: Author) => void;
  onReplyReactionClick2?: (
    replyId: string,
    emoji: string,
    isActive: boolean
  ) => void;
  onReplyAddEmoji?: (replyId: string) => void;
  onToggleComments?: () => void;

  //
  replyState?: ReplyState;
  currentUser?: Author;
  availableUsers?: Array<Author & { id: string }>;

  // Reply input handlers
  onStartReply?: (
    parentId: string,
    parentType: "post" | "comment" | "reply",
    replyToUser?: Author,
    level?: number
  ) => void;
  onCancelReply?: () => void;
  onSubmitReply?: (
    content: string,
    mentions: Author[],
    parentId: string,
    parentType: "post" | "comment" | "reply"
  ) => void;
}

export default function EnhancedSocialPost({
  author,
  timestamp,
  views,
  comments,
  content,
  image,
  reactions,
  reply,
  commentsList = [],
  showComments = false,
  onMoreClick,
  onImageClick,
  onReactionClick,
  onAddEmojiClick,
  onShareClick,
  onReplyClick,
  onReplyReactionClick,
  onReplyAddEmojiClick,
  onCommentReply,
  onToggleReplies,
  onCommentReaction,
  onCommentAddEmoji,
  onReplyToReply,
  onReplyReactionClick2,
  onReplyAddEmoji,
  onToggleComments,

  //

  replyState,
  currentUser,
  availableUsers = [],
  onStartReply,
  onCancelReply,
  onSubmitReply,
}: EnhancedSocialPostProps) {
  return (
    <div className="bg-white rounded-[20px] overflow-hidden py-4">
      {/* Main Post - giữ nguyên UI cũ */}
      <div>
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

          <Button variant="ghost" onClick={onMoreClick}>
            <MoreHorizontal className="w-6 h-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="mb-4 px-4">
          <p className="text-sm">{content}</p>
        </div>

        {/* Image */}
        {image && (
          <div className="mb-4" onClick={onImageClick}>
            <div
              className="relative w-full cursor-pointer"
              style={{ aspectRatio: "1.75" }}
            >
              <Image
                src={image}
                alt="Post image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Post Reactions - giữ nguyên */}
        <div className="flex items-center space-x-2 mb-0 px-4">
          {reactions.map((reaction, index) => (
            <ButtonGradientOutlined
              className="rounded-full h-8.5 px-3 font-normal text-sm"
              key={index}
              isActive={reaction.isActive}
              onClick={() =>
                onReactionClick?.(reaction.emoji, reaction.isActive || false)
              }
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
            <ButtonGradientOutlined
              className="rounded-full h-8.5 px-2"
              onClick={onAddEmojiClick}
            >
              <Image
                src="/icons/add-emoji.svg"
                alt="Add Emoji"
                width={24}
                height={24}
              />
            </ButtonGradientOutlined>

            <ButtonGradientOutlinedGreen
              className="rounded-full h-7.5"
              onClick={onShareClick}
            >
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

      {/* Legacy Reply Section - giữ nguyên cho backward compatibility */}
      {reply && !commentsList.length && (
        <>
          <div className="h-0.25 bg-[#E9ECEF] my-4" />
          <div className="px-4">
            <div className="flex items-start space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={reply.author.avatar}
                  alt={reply.author.name}
                />
                <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div className="px-4 py-3 bg-[var(--background)] rounded-2xl space-y-1 text-[15px]">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-[15px]">
                      {reply.author.name}
                    </h4>
                    {reply.author.isVerified && (
                      <Image
                        src="/icons/tick.svg"
                        alt="Verified"
                        width={16}
                        height={16}
                      />
                    )}
                  </div>
                  <p>{reply.content}</p>
                </div>

                <div className="flex items-center space-x-2 px-4 text-sm">
                  <span className="text-[var(--muted-foreground)]">
                    {reply.timestamp}
                  </span>
                  {reply.replyLabel && (
                    <Button
                      variant="ghost"
                      className="font-normal"
                      onClick={onReplyClick}
                    >
                      {reply.replyLabel}
                    </Button>
                  )}

                  <div className="flex items-center space-x-2">
                    {reply.reactions.map((reaction, index) => (
                      <ButtonGradientOutlined
                        key={index}
                        className="rounded-full h-8.5 px-3 font-normal text-sm"
                        isActive={reaction.isActive}
                        onClick={() =>
                          onReplyReactionClick?.(
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
                      onClick={onReplyAddEmojiClick}
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
              </div>
            </div>
          </div>
        </>
      )}

      {/* New Comments System */}
      {commentsList.length > 0 && (
        <>
          <div className="h-0.25 bg-[#E9ECEF] my-4" />

          {/* Toggle Comments Button */}
          <div className="px-4 mb-3">
            <button
              onClick={onToggleComments}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {showComments
                ? "Ẩn bình luận"
                : `Xem ${commentsList.length} bình luận`}
            </button>
          </div>

          {/* Comments List */}
          {showComments && (
            <div className="space-y-4">
              {commentsList.map((comment, index) => (
                <div key={comment.id}>
                  <EnhancedCommentSection
                    comment={comment}
                    onReply={onCommentReply || (() => {})}
                    onToggleReplies={onToggleReplies || (() => {})}
                    onReactionClick={onCommentReaction || (() => {})}
                    onAddEmoji={onCommentAddEmoji || (() => {})}
                    onReplyReactionClick={onReplyReactionClick2 || (() => {})}
                    onReplyAddEmoji={onReplyAddEmoji || (() => {})}
                    onReplyToReply={onReplyToReply || (() => {})}
                  />

                  {/* Divider between comments */}
                  {index < commentsList.length - 1 && (
                    <div className="h-px bg-gray-100 mx-4 mt-4"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {/* Post-level reply input */}
      {replyState?.isActive &&
        replyState.parentType === "post" &&
        currentUser && (
          <div className="px-4 mt-4">
            <ReplyInputEnhanced
              currentUser={currentUser}
              placeholder="Viết bình luận..."
              onSubmit={(content, mentions) =>
                onSubmitReply?.(content, mentions, replyState.parentId, "post")
              }
              onCancel={() => onCancelReply?.()}
              availableUsers={availableUsers}
              parentType="post"
            />
          </div>
        )}

      {/* Comments Section với reply inputs */}
      {commentsList.length > 0 && (
        <>
          <div className="h-0.25 bg-[#E9ECEF] my-4" />

          {/* Add Comment Button */}
          {!replyState?.isActive && currentUser && (
            <div className="px-4 mb-3">
              <button
                onClick={() =>
                  onStartReply?.("new-comment", "post", undefined, 0)
                }
                className="w-full text-left text-sm text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl px-4 py-3 transition-colors"
              >
                Viết bình luận...
              </button>
            </div>
          )}

          {/* Toggle Comments Button */}
          <div className="px-4 mb-3">
            <button
              onClick={onToggleComments}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {showComments
                ? "Ẩn bình luận"
                : `Xem ${commentsList.length} bình luận`}
            </button>
          </div>

          {/* Comments List */}
          {showComments && (
            <div className="space-y-4">
              {commentsList.map((comment, index) => (
                <div key={comment.id}>
                  <EnhancedCommentSection
                    comment={comment}
                    onReply={(commentId, author) =>
                      onStartReply?.(commentId, "comment", author, 1)
                    }
                    onToggleReplies={onToggleReplies || (() => {})}
                    onReactionClick={onCommentReaction || (() => {})}
                    onAddEmoji={onCommentAddEmoji || (() => {})}
                    onReplyReactionClick={onReplyReactionClick2 || (() => {})}
                    onReplyAddEmoji={onReplyAddEmoji || (() => {})}
                    onReplyToReply={(replyId, author) =>
                      onStartReply?.(replyId, "reply", author, 2)
                    }
                  />

                  {/* Comment-level reply input */}
                  {replyState?.isActive &&
                    replyState.parentType === "comment" &&
                    replyState.parentId === comment.id &&
                    currentUser && (
                      <div className="px-4 mt-3">
                        <div className="ml-12">
                          <ReplyInputEnhanced
                            currentUser={currentUser}
                            replyToUser={replyState.replyToUser}
                            onSubmit={(content, mentions) =>
                              onSubmitReply?.(
                                content,
                                mentions,
                                replyState.parentId,
                                "comment"
                              )
                            }
                            onCancel={() => onCancelReply?.()}
                            availableUsers={availableUsers}
                            parentType="comment"
                          />
                        </div>
                      </div>
                    )}

                  {/* Reply-level reply inputs */}
                  {comment.replies.map(
                    (reply) =>
                      replyState?.isActive &&
                      replyState.parentType === "reply" &&
                      replyState.parentId === reply.id &&
                      currentUser && (
                        <div
                          key={`reply-input-${reply.id}`}
                          className="px-4 mt-3"
                        >
                          <div className="ml-20">
                            <ReplyInputEnhanced
                              currentUser={currentUser}
                              replyToUser={replyState.replyToUser}
                              onSubmit={(content, mentions) =>
                                onSubmitReply?.(
                                  content,
                                  mentions,
                                  replyState.parentId,
                                  "reply"
                                )
                              }
                              onCancel={() => onCancelReply?.()}
                              availableUsers={availableUsers}
                              parentType="reply"
                            />
                          </div>
                        </div>
                      )
                  )}

                  {/* Divider */}
                  {index < commentsList.length - 1 && (
                    <div className="h-px bg-gray-100 mx-4 mt-4"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

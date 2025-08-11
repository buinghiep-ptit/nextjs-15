import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ButtonGradientOutlined } from "@/components/ui/button-gradient-outlined";
import { Reply, Author } from "@/types/post.type";

interface EnhancedReplyProps {
  reply: Reply;
  onReply: (replyId: string, author: Author) => void;
  onReactionClick: (replyId: string, emoji: string, isActive: boolean) => void;
  onAddEmoji: (replyId: string) => void;
  canReply?: boolean;
}

export function EnhancedReply({
  reply,
  onReply,
  onReactionClick,
  onAddEmoji,
  canReply = true,
}: EnhancedReplyProps) {
  const indentClass = reply.level === 1 ? "ml-12" : "ml-20";

  return (
    <div className={`${indentClass} mt-3`}>
      <div className="flex items-start space-x-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
          <AvatarFallback className="text-xs">
            {reply.author.name[0]}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          {/* Reply Content - giữ nguyên style như UI cũ */}
          <div className="px-4 py-3 bg-[var(--background)] rounded-2xl space-y-1 text-[15px]">
            <div className="flex items-center space-x-2">
              <h4 className="font-bold text-[15px]">{reply.author.name}</h4>
              {reply.author.isVerified && (
                <Image
                  src="/icons/tick.svg"
                  alt="Verified"
                  width={16}
                  height={16}
                />
              )}
            </div>

            <div>
              {/* Reply mention */}
              {reply.replyToUser && (
                <span className="text-blue-600 font-medium">
                  @{reply.replyToUser.name}{" "}
                </span>
              )}
              <span>{reply.content}</span>
            </div>
          </div>

          {/* Reply Actions - giống UI cũ */}
          <div className="flex items-center space-x-2 px-4 text-sm">
            <span className="text-[var(--muted-foreground)]">
              {reply.timestamp}
            </span>

            {canReply && reply.replyLabel && (
              <Button
                variant="ghost"
                className="font-normal"
                onClick={() => onReply(reply.id, reply.author)}
              >
                {reply.replyLabel}
              </Button>
            )}

            {/* Reactions - giữ nguyên style như UI cũ */}
            <div className="flex items-center space-x-2">
              {reply.reactions.map((reaction, index) => (
                <ButtonGradientOutlined
                  key={index}
                  className="rounded-full h-8.5 px-3 font-normal text-sm"
                  isActive={reaction.isActive}
                  onClick={() =>
                    onReactionClick(
                      reply.id,
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
                onClick={() => onAddEmoji(reply.id)}
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
  );
}

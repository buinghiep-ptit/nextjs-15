import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ButtonGradientOutlined } from "@/components/ui/button-gradient-outlined";

interface PostReplyProps {
  reply: {
    author: {
      name: string;
      avatar: string;
      isVerified?: boolean;
    };
    content: string;
    timestamp: string;
    replyLabel?: string;
    reactions: {
      emoji: string;
      count: number;
      isActive?: boolean;
    }[];
  };
  onReplyClick?: () => void;
  onReplyReactionClick?: (emoji: string, isActive: boolean) => void;
  onAddEmojiClick?: () => void;
}

export function PostReply({
  reply,
  onReplyClick,
  onReplyReactionClick,
  onAddEmojiClick,
}: PostReplyProps) {
  return (
    <div className="px-4">
      <div className="flex items-start space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
          <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-3">
          {/* Reply Content */}
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

            <p className="leading-relaxed">{reply.content}</p>
          </div>

          {/* Reply Actions */}
          <div className="flex items-center space-x-2 px-4 text-sm">
            <span className="text-[var(--muted-foreground)]">
              {reply.timestamp}
            </span>

            {reply.replyLabel && (
              <Button
                variant="ghost"
                className="font-normal hover:text-primary"
                onClick={onReplyClick}
              >
                {reply.replyLabel}
              </Button>
            )}

            <div className="flex items-center space-x-2">
              {/* Reply Reactions */}
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
                onClick={onAddEmojiClick}
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

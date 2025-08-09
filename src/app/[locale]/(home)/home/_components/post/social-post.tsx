import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ButtonGradientOutlined } from "@/components/ui/button-gradient-outlined";
import { ButtonGradientOutlinedGreen } from "@/components/ui/button-gradient-outlined-green";

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
  reply?: {
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
}

export default function ExactSocialPost({
  author,
  timestamp,
  views,
  comments,
  content,
  image,
  reactions,
  reply,
}: SocialPostProps) {
  return (
    <div className="bg-white rounded-[20px] overflow-hidden py-4">
      {/* Main Post */}
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

          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 text-gray-400 hover:bg-transparent"
          >
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="mb-4 px-4">
          <p className="text-sm leading-[1.4]">{content}</p>
        </div>

        {/* Image - Aspect ratio 1.75 (7:4) */}
        {image && (
          <div className="mb-4">
            <div className="relative w-full" style={{ aspectRatio: "1.75" }}>
              <Image
                src={image}
                alt="Post image"
                fill
                className="object-cover "
              />
            </div>
          </div>
        )}

        {/* Reactions */}
        <div className="flex items-center space-x-2 mb-0 px-4">
          {reactions.map((reaction, index) => (
            <ButtonGradientOutlined
              className="rounded-full h-8.5 px-3"
              key={index}
              //   className={cn(
              //     "flex items-center space-x-2 rounded-full px-3 py-2 text-[13px] font-medium transition-all duration-200",
              //     reaction.isActive
              //       ? "text-white"
              //       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              //   )}
              //   style={
              //     reaction.isActive
              //       ? {
              //           background:
              //             "linear-gradient(135deg, #FF6B9D 0%, #C568FF  50%, #4E44FF 100%)",
              //           border: "1px solid rgba(255,255,255,0.2)",
              //         }
              //       : {}
              //   }
            >
              <Image
                src={`/icons/emoji/${reaction.emoji}.svg`}
                alt="Emoji"
                width={20}
                height={20}
              />
              <span className="text-sm">{reaction.count}</span>
            </ButtonGradientOutlined>
          ))}

          {/* Action Icons */}
          <div className="flex items-center space-x-2">
            <ButtonGradientOutlined className="rounded-full h-8.5 px-3">
              <Image
                src="/icons/add-emoji.svg"
                alt="Add Emoji"
                width={16}
                height={16}
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
      </div>

      <div className="h-0.25 bg-[#E9ECEF] my-4" />

      {/* Reply Section */}
      {reply && (
        <div className="px-4">
          <div className="flex items-start space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
              <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3">
              <div className="px-4 py-3 bg-[var(--background)] rounded-2xl">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-bold text-[15px] text-gray-900">
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

                <p className="text-[15px] text-gray-900 leading-[1.4] mb-3">
                  {reply.content}
                </p>
              </div>

              <div className="flex items-center space-x-4 px-4 text-sm">
                <span className="text-[var(--muted-foreground)]">
                  {reply.timestamp}
                </span>
                {reply.replyLabel && (
                  <Button variant="ghost" className="font-normal">
                    {reply.replyLabel}
                  </Button>
                )}

                <div className="flex items-center space-x-2">
                  {reply.reactions.map((reaction, index) => (
                    <button
                      key={index}
                      className={cn(
                        "flex items-center space-x-1 rounded-full px-2.5 py-1.5 text-[13px] font-medium transition-all duration-200",
                        reaction.isActive
                          ? "text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      )}
                      style={
                        reaction.isActive
                          ? {
                              background:
                                "linear-gradient(135deg, #FF6B9D 0%, #C568FF 50%, #4E44FF 100%)",
                              border: "1px solid rgba(255,255,255,0.2)",
                            }
                          : {}
                      }
                    >
                      <span>{reaction.emoji}</span>
                      <span>{reaction.count}</span>
                    </button>
                  ))}
                  <ButtonGradientOutlined className="rounded-full h-8.5 px-3">
                    <Image
                      src="/icons/add-emoji.svg"
                      alt="Add Emoji"
                      width={16}
                      height={16}
                    />
                  </ButtonGradientOutlined>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

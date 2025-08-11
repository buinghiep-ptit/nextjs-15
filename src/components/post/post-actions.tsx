"use client";

import Image from "next/image";
import { ButtonGradientOutlined } from "@/components/ui/button-gradient-outlined";
import { ButtonGradientOutlinedGreen } from "@/components/ui/button-gradient-outlined-green";

interface PostActionsProps {
  reactions: {
    emoji: string;
    count: number;
    isActive?: boolean;
  }[];
  onReactionClick?: (emoji: string, isActive: boolean) => void;
  onAddEmojiClick?: () => void;
  onShareClick?: () => void;
}

export function PostActions({
  reactions,
  onReactionClick,
  onAddEmojiClick,
  onShareClick,
}: PostActionsProps) {
  return (
    <div className="flex items-center space-x-2 mb-0 px-4">
      {/* Reaction Buttons */}
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

      {/* Action Icons */}
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
  );
}

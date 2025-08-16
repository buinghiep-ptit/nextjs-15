"use client";

import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostHeaderProps {
  author: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  timestamp: string;
  views: number;
  comments: number;
  onMoreClick?: () => void;
}

export function PostHeader({
  author,
  timestamp,
  views,
  comments,
  onMoreClick,
}: PostHeaderProps) {
  return (
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
              <span>{comments}</span>
            </div>
          </div>
        </div>
      </div>

      <Button variant="ghost" onClick={onMoreClick}>
        <MoreHorizontal className="w-6 h-6" />
      </Button>
    </div>
  );
}

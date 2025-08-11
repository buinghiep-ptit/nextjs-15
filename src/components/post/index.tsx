import { PostHeader } from "./post-header";
import { PostContent } from "./post-content";
import { PostActions } from "./post-actions";
import { PostReply } from "./post-reply";

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
  // Event handlers
  onMoreClick?: () => void;
  onImageClick?: () => void;
  onReactionClick?: (emoji: string, isActive: boolean) => void;
  onAddEmojiClick?: () => void;
  onShareClick?: () => void;
  onReplyClick?: () => void;
  onReplyReactionClick?: (emoji: string, isActive: boolean) => void;
  onReplyAddEmojiClick?: () => void;
}

export default function RefactoredSocialPost({
  author,
  timestamp,
  views,
  comments,
  content,
  image,
  reactions,
  reply,
  onMoreClick,
  onImageClick,
  onReactionClick,
  onAddEmojiClick,
  onShareClick,
  onReplyClick,
  onReplyReactionClick,
  onReplyAddEmojiClick,
}: SocialPostProps) {
  return (
    <div className="bg-white rounded-[20px] overflow-hidden py-4">
      {/* Header Section */}
      <PostHeader
        author={author}
        timestamp={timestamp}
        views={views}
        comments={comments}
        onMoreClick={onMoreClick}
      />

      {/* Content Section */}
      <PostContent
        content={content}
        image={image}
        imageAspectRatio={1.75}
        onImageClick={onImageClick}
      />

      {/* Actions Section */}
      <PostActions
        reactions={reactions}
        onReactionClick={onReactionClick}
        onAddEmojiClick={onAddEmojiClick}
        onShareClick={onShareClick}
      />

      {/* Divider */}
      {reply && <div className="h-0.25 bg-[#E9ECEF] my-4" />}

      {/* Reply Section */}
      {reply && (
        <PostReply
          reply={reply}
          onReplyClick={onReplyClick}
          onReplyReactionClick={onReplyReactionClick}
          onAddEmojiClick={onReplyAddEmojiClick}
        />
      )}
    </div>
  );
}

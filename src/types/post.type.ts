// Enhanced types cho social post với reply system

export interface Author {
  name: string;
  avatar: string;
  isVerified?: boolean;
}

export interface Reaction {
  emoji: string;
  count: number;
  isActive?: boolean;
}

export interface BaseComment {
  id: string;
  author: Author;
  content: string;
  timestamp: string;
  reactions: Reaction[];
  replyLabel?: string;
}

// Reply to comment hoặc reply (Level 1-2)
export interface Reply extends BaseComment {
  parentId: string;
  replyToUser?: Author;
  level: 1 | 2;
}

// Main comment (Level 0)
export interface Comment extends BaseComment {
  replies: Reply[];
  replyCount: number;
  showReplies: boolean;
  level: 0;
}

// Post interface được mở rộng
export interface EnhancedPost {
  id: string;
  author: Author;
  timestamp: string;
  views: number;
  comments: number; // total count
  content: string;
  images?: string[];
  reactions: Reaction[];

  // Legacy reply support (single reply)
  reply?: BaseComment;

  // New comments system (multiple comments với replies)
  commentsList?: Comment[];

  // UI states
  showComments?: boolean;
  isCommenting?: boolean;
}

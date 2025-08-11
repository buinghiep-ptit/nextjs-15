"use client";

import EnhancedSocialPost from "./main";
import { Container } from "@/components/ui/container";
import { useState } from "react";
import { EnhancedPost, Author, Comment, Reply } from "@/types/post.type";

interface ReplyState {
  isActive: boolean;
  parentId: string;
  parentType: "post" | "comment" | "reply";
  replyToUser?: Author;
  level: 0 | 1 | 2;
}

export default function EnhancedSocialDemo() {
  const [posts, setPosts] = useState<EnhancedPost[]>([
    {
      id: "post-1",
      author: {
        name: "Đen Vâu",
        avatar: "/images/home/trending/artist-avatar.png",
        isVerified: true,
      },
      timestamp: "1/8 17:30",
      views: 96,
      comments: 120,
      content: `Trở thành khách mời của chương trình "Ghế không tựa", Đen Vâu - chàng rapper đình đám của cộng đồng Underground đã có những chia sẻ rất thú vị về bản thân và một vài kỷ niệm khó quên trong suốt chặng đường 10 năm làm nhạc của mình. 🔥🎤🎵`,
      image: "/images/home/feed/main-img.jpg",
      reactions: [
        { emoji: "0", count: 79, isActive: false },
        { emoji: "1", count: 245, isActive: false },
        { emoji: "7", count: 120, isActive: true },
      ],
      showComments: false,

      // New comments system với 3-level replies
      commentsList: [
        {
          id: "comment-1",
          author: {
            name: "JustaTee",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: true,
          },
          content: "Chúc mọi người hạnh phúc và mạnh khỏe ạ! 🇻🇳🙏",
          timestamp: "1/8 17:30",
          reactions: [{ emoji: "7", count: 120, isActive: true }],
          replyLabel: "Trả lời",
          replies: [],
          replyCount: 0,
          showReplies: false,
          level: 0,
        },
        {
          id: "comment-2",
          author: {
            name: "Fan chú Đen",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: false,
          },
          content: "Đen Vâu Respect 🇻🇳🙏",
          timestamp: "1/8 17:30",
          reactions: [{ emoji: "7", count: 120, isActive: false }],
          replyLabel: "Trả lời",
          replies: [
            {
              id: "reply-1",
              author: {
                name: "Music Fan",
                avatar: "/images/home/trending/artist-avatar.png",
                isVerified: false,
              },
              content: "Đồng ý! Anh Đen luôn truyền cảm hứng tích cực!",
              timestamp: "1/8 17:35",
              reactions: [{ emoji: "1", count: 25, isActive: false }],
              replyLabel: "Trả lời",
              parentId: "comment-2",
              level: 1,
            },
            {
              id: "reply-2",
              author: {
                name: "Underground Fan",
                avatar: "/images/home/trending/artist-avatar.png",
                isVerified: false,
              },
              content:
                "True! Underground scene Việt Nam cần nhiều nghệ sĩ như anh Đen!",
              timestamp: "1/8 17:40",
              reactions: [{ emoji: "7", count: 15, isActive: true }],
              replyLabel: "Trả lời",
              parentId: "comment-2",
              level: 1,
            },
          ],
          replyCount: 2,
          showReplies: true,
          level: 0,
        },
      ],
    },
    {
      id: "post-2",
      author: {
        name: "Sơn Tùng M-TP",
        avatar: "/images/home/trending/artist-avatar.png",
        isVerified: true,
      },
      timestamp: "2/8 15:45",
      views: 256,
      comments: 89,
      content:
        "Cảm ơn tất cả Sky đã luôn ủng hộ và yêu thương Tùng! Hẹn gặp lại trong dự án âm nhạc sắp tới nhé! 🎵✨",
      image: "/images/home/feed/main-img.jpg",
      reactions: [
        { emoji: "20", count: 1234, isActive: true },
        { emoji: "1", count: 567, isActive: false },
        { emoji: "7", count: 89, isActive: false },
      ],
      showComments: false,
      commentsList: [], // No comments for this post
    },
    {
      id: "post-3",
      author: {
        name: "Hoàng Thùy Linh",
        avatar: "/images/home/trending/artist-avatar.png",
        isVerified: true,
      },
      timestamp: "1/8 20:15",
      views: 178,
      comments: 45,
      content:
        "Behind the scenes từ buổi chụp hình mới nhất! Cảm ơn ekip đã làm việc cực kỳ chuyên nghiệp 📸✨",
      image: "/images/home/feed/feed-img-2.jpg",
      reactions: [
        { emoji: "7", count: 234, isActive: false },
        { emoji: "16", count: 78, isActive: false },
        { emoji: "19", count: 45, isActive: true },
      ],
      showComments: false,

      // Legacy reply support để tương thích với code cũ
      reply: {
        id: "legacy-reply-1",
        author: {
          name: "HTL Fan",
          avatar: "/images/home/trending/artist-avatar.png",
          isVerified: false,
        },
        content: "Chị đẹp quá! Mong chờ sản phẩm mới của chị ạ!",
        timestamp: "1/8 20:30",
        replyLabel: "Trả lời",
        reactions: [{ emoji: "1", count: 12, isActive: true }],
      },
    },
    {
      id: "post-4",
      author: {
        name: "BLACKPINK",
        avatar: "/images/home/trending/artist-avatar.png",
        isVerified: true,
      },
      timestamp: "3/8 10:20",
      views: 892,
      comments: 234,
      content:
        "Thank you BLINKS for all the love and support! New music coming soon 💕🖤💖 Stay tuned! #BLACKPINK #BLINK",
      image: "/images/home/feed/feed-img-3.jpg",
      reactions: [
        { emoji: "20", count: 2845, isActive: true },
        { emoji: "7", count: 1567, isActive: false },
        { emoji: "19", count: 892, isActive: false },
      ],
      showComments: false,
      commentsList: [],
    },
    {
      id: "post-5",
      author: {
        name: "Jack",
        avatar: "/images/home/trending/artist-avatar.png",
        isVerified: true,
      },
      timestamp: "2/8 22:15",
      views: 445,
      comments: 167,
      content:
        "Cảm ơn tất cả mọi người đã đồng hành cùng Jack trong hành trình âm nhạc vừa qua. Sắp tới sẽ có nhiều dự án mới thú vị! 🎵🎤",
      reactions: [
        { emoji: "1", count: 789, isActive: false },
        { emoji: "7", count: 445, isActive: true },
        { emoji: "16", count: 223, isActive: false },
      ],
      showComments: false,

      // Legacy reply support
      reply: {
        id: "legacy-reply-2",
        author: {
          name: "Jack Official Fan",
          avatar: "/images/home/trending/artist-avatar.png",
          isVerified: false,
        },
        content: "Luôn ủng hộ anh Jack! Mong chờ những sản phẩm mới! 💪❤️",
        timestamp: "3/8 08:30",
        replyLabel: "Trả lời",
        reactions: [
          { emoji: "20", count: 67, isActive: true },
          { emoji: "7", count: 34, isActive: false },
        ],
      },
    },
  ]);

  // reply

  const [replyState, setReplyState] = useState<ReplyState | null>(null);

  // Current user
  const currentUser: Author = {
    name: "Bạn",
    avatar: "/images/avatars/current-user.jpg",
    isVerified: false,
  };

  // Available users for mentions
  const availableUsers = [
    {
      id: "den-vau",
      name: "Đen Vâu",
      avatar: "/images/home/trending/artist-avatar.png",
      isVerified: true,
    },
    {
      id: "justa-tee",
      name: "JustaTee",
      avatar: "/images/home/trending/artist-avatar.png",
      isVerified: true,
    },
    {
      id: "sontung",
      name: "Sơn Tùng M-TP",
      avatar: "/images/home/trending/artist-avatar.png",
      isVerified: true,
    },
    {
      id: "htl",
      name: "Hoàng Thùy Linh",
      avatar: "/images/home/trending/artist-avatar.png",
      isVerified: true,
    },
    {
      id: "fan1",
      name: "Fan chú Đen",
      avatar: "/images/home/trending/artist-avatar.png",
      isVerified: false,
    },
    {
      id: "fan2",
      name: "Music Fan",
      avatar: "/images/home/trending/artist-avatar.png",
      isVerified: false,
    },
  ];

  const generateId = () =>
    Date.now().toString() + Math.random().toString(36).substr(2, 9);

  // Start reply action
  const handleStartReply = (
    postId: string,
    parentId: string,
    parentType: "post" | "comment" | "reply",
    replyToUser?: Author,
    level: number = 0
  ) => {
    setReplyState({
      isActive: true,
      parentId,
      parentType,
      replyToUser,
      level: level as 0 | 1 | 2,
    });
  };

  // Cancel reply
  const handleCancelReply = () => {
    setReplyState(null);
  };

  // Submit reply
  const handleSubmitReply = (
    postId: string,
    content: string,
    mentions: Author[],
    parentId: string,
    parentType: "post" | "comment" | "reply"
  ) => {
    if (parentType === "post" || parentId === "new-comment") {
      // Add new comment to post
      const newComment: Comment = {
        id: generateId(),
        author: currentUser,
        content,
        timestamp: "Vừa xong",
        reactions: [],
        replyLabel: "Trả lời",
        replies: [],
        replyCount: 0,
        showReplies: false,
        level: 0,
      };

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            const updatedCommentsList = post.commentsList || [];
            return {
              ...post,
              commentsList: [newComment, ...updatedCommentsList],
              comments: post.comments + 1,
            };
          }
          return post;
        })
      );
    } else if (parentType === "comment") {
      // Add reply to comment
      const newReply: Reply = {
        id: generateId(),
        author: currentUser,
        content,
        timestamp: "Vừa xong",
        reactions: [],
        replyLabel: "Trả lời",
        parentId,
        replyToUser: replyState?.replyToUser,
        level: 1,
      };

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId && post.commentsList) {
            return {
              ...post,
              commentsList: post.commentsList.map((comment) => {
                if (comment.id === parentId) {
                  return {
                    ...comment,
                    replies: [newReply, ...comment.replies],
                    replyCount: comment.replyCount + 1,
                    showReplies: true,
                  };
                }
                return comment;
              }),
              comments: post.comments + 1,
            };
          }
          return post;
        })
      );
    } else if (parentType === "reply") {
      // Add reply to reply (level 2)
      const newReply: Reply = {
        id: generateId(),
        author: currentUser,
        content,
        timestamp: "Vừa xong",
        reactions: [],
        replyLabel: "Trả lời",
        parentId: parentId, // Parent reply ID
        replyToUser: replyState?.replyToUser,
        level: 2,
      };

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId && post.commentsList) {
            return {
              ...post,
              commentsList: post.commentsList.map((comment) => {
                // Find the parent comment containing the reply
                const hasTargetReply = comment.replies.some(
                  (reply) => reply.id === parentId
                );
                if (hasTargetReply) {
                  return {
                    ...comment,
                    replies: [newReply, ...comment.replies],
                    replyCount: comment.replyCount + 1,
                    showReplies: true,
                  };
                }
                return comment;
              }),
              comments: post.comments + 1,
            };
          }
          return post;
        })
      );
    }

    setReplyState(null);
  };

  // Legacy event handlers - giữ nguyên API cũ
  const handleMoreClick = (postId: string) => {
    console.log("More clicked for post:", postId);
  };

  const handleImageClick = (postId: string) => {
    console.log("Image clicked for post:", postId);
  };

  const handleReactionClick = (
    postId: string,
    emoji: string,
    isActive: boolean
  ) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            reactions: post.reactions.map((reaction) => {
              if (reaction.emoji === emoji) {
                return {
                  ...reaction,
                  isActive: !isActive,
                  count: isActive ? reaction.count - 1 : reaction.count + 1,
                };
              }
              return reaction;
            }),
          };
        }
        return post;
      })
    );
  };

  const handleAddEmojiClick = (postId: string) => {
    console.log("Add emoji clicked for post:", postId);
  };

  const handleShareClick = (postId: string) => {
    console.log("Share clicked for post:", postId);
  };

  const handleReplyClick = (postId: string) => {
    console.log("Reply clicked for post:", postId);
  };

  const handleReplyReactionClick = (
    postId: string,
    emoji: string,
    isActive: boolean
  ) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId && post.reply) {
          return {
            ...post,
            reply: {
              ...post.reply,
              reactions: post.reply.reactions.map((reaction) => {
                if (reaction.emoji === emoji) {
                  return {
                    ...reaction,
                    isActive: !isActive,
                    count: isActive ? reaction.count - 1 : reaction.count + 1,
                  };
                }
                return reaction;
              }),
            },
          };
        }
        return post;
      })
    );
  };

  // New event handlers cho comments system
  const handleToggleComments = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, showComments: !post.showComments }
          : post
      )
    );
  };

  const handleCommentReply = (
    postId: string,
    commentId: string,
    author: Author
  ) => {
    console.log("Reply to comment:", { postId, commentId, author });
    // TODO: Implement reply input logic
  };

  const handleToggleReplies = (postId: string, commentId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId && post.commentsList) {
          return {
            ...post,
            commentsList: post.commentsList.map((comment) =>
              comment.id === commentId
                ? { ...comment, showReplies: !comment.showReplies }
                : comment
            ),
          };
        }
        return post;
      })
    );
  };

  const handleCommentReaction = (
    postId: string,
    commentId: string,
    emoji: string,
    isActive: boolean
  ) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId && post.commentsList) {
          return {
            ...post,
            commentsList: post.commentsList.map((comment) =>
              comment.id === commentId
                ? {
                    ...comment,
                    reactions: comment.reactions.map((reaction) =>
                      reaction.emoji === emoji
                        ? {
                            ...reaction,
                            isActive: !isActive,
                            count: isActive
                              ? reaction.count - 1
                              : reaction.count + 1,
                          }
                        : reaction
                    ),
                  }
                : comment
            ),
          };
        }
        return post;
      })
    );
  };

  const handleReplyReactionClick2 = (
    postId: string,
    replyId: string,
    emoji: string,
    isActive: boolean
  ) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId && post.commentsList) {
          return {
            ...post,
            commentsList: post.commentsList.map((comment) => ({
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId
                  ? {
                      ...reply,
                      reactions: reply.reactions.map((reaction) =>
                        reaction.emoji === emoji
                          ? {
                              ...reaction,
                              isActive: !isActive,
                              count: isActive
                                ? reaction.count - 1
                                : reaction.count + 1,
                            }
                          : reaction
                      ),
                    }
                  : reply
              ),
            })),
          };
        }
        return post;
      })
    );
  };

  const handleReplyToReply = (
    postId: string,
    replyId: string,
    author: Author
  ) => {
    console.log("Reply to reply:", { postId, replyId, author });
    // TODO: Implement reply to reply logic
  };

  return (
    <div className="bg-[#F1F3F5] pb-16">
      <Container maxWidth="md">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center py-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Enhanced Social Feed
            </h1>
            <p className="text-gray-600">
              Hỗ trợ cả legacy reply và new 3-level comments system
            </p>
          </div>

          {/* Posts */}
          {posts.map((post) => (
            <EnhancedSocialPost
              key={post.id}
              author={post.author}
              timestamp={post.timestamp}
              views={post.views}
              comments={post.comments}
              content={post.content}
              image={post.image}
              reactions={post.reactions}
              reply={post.reply}
              commentsList={post.commentsList}
              showComments={post.showComments}
              // Reply input props
              replyState={replyState}
              currentUser={currentUser}
              availableUsers={availableUsers}
              // Reply handlers
              onStartReply={(parentId, parentType, replyToUser, level) =>
                handleStartReply(
                  post.id,
                  parentId,
                  parentType,
                  replyToUser,
                  level
                )
              }
              onCancelReply={handleCancelReply}
              onSubmitReply={(content, mentions, parentId, parentType) =>
                handleSubmitReply(
                  post.id,
                  content,
                  mentions,
                  parentId,
                  parentType
                )
              }
              // Legacy event handlers
              onMoreClick={() => handleMoreClick(post.id)}
              onImageClick={() => handleImageClick(post.id)}
              onReactionClick={(emoji, isActive) =>
                handleReactionClick(post.id, emoji, isActive)
              }
              onAddEmojiClick={() => handleAddEmojiClick(post.id)}
              onShareClick={() => handleShareClick(post.id)}
              onReplyClick={() => handleReplyClick(post.id)}
              onReplyReactionClick={(emoji, isActive) =>
                handleReplyReactionClick(post.id, emoji, isActive)
              }
              onReplyAddEmojiClick={() => handleAddEmojiClick(post.id)}
              // New event handlers
              onToggleComments={() => handleToggleComments(post.id)}
              onCommentReply={(commentId, author) =>
                handleCommentReply(post.id, commentId, author)
              }
              onToggleReplies={(commentId) =>
                handleToggleReplies(post.id, commentId)
              }
              onCommentReaction={(commentId, emoji, isActive) =>
                handleCommentReaction(post.id, commentId, emoji, isActive)
              }
              onCommentAddEmoji={(commentId) =>
                console.log("Add emoji to comment:", commentId)
              }
              onReplyReactionClick2={(replyId, emoji, isActive) =>
                handleReplyReactionClick2(post.id, replyId, emoji, isActive)
              }
              onReplyAddEmoji={(replyId) =>
                console.log("Add emoji to reply:", replyId)
              }
              onReplyToReply={(replyId, author) =>
                handleReplyToReply(post.id, replyId, author)
              }
            />
          ))}

          {/* Feature Info */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="font-bold text-lg mb-3">Features:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Legacy Support:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>✅ Single reply như code cũ</li>
                  <li>✅ Giữ nguyên API handlers</li>
                  <li>✅ UI/UX không thay đổi</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">New Features:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>✅ 3-level comments system</li>
                  <li>✅ Multiple comments per post</li>
                  <li>✅ Show/hide replies</li>
                  <li>✅ Nested reactions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

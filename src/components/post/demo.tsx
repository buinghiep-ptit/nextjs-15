"use client";

import RefactoredSocialPost from "./index";
import { Container } from "@/components/ui/container";
import { useState } from "react";

export default function RefactoredSocialDemo() {
  const [posts, setPosts] = useState([
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
      images: ["/images/home/feed/main-img.jpg"],
      reactions: [
        { emoji: "0", count: 79, isActive: false },
        { emoji: "1", count: 245, isActive: false },
        { emoji: "7", count: 120, isActive: true },
      ],
      reply: {
        author: {
          name: "Đen Vâu",
          avatar: "/images/home/trending/artist-avatar.png",
          isVerified: true,
        },
        content:
          "Chúc mọi người tận hưởng, hoan hỉ những ngày được sống trong hòa bình, hạnh phúc và mạnh khỏe ạ! 🇻🇳🙏",
        timestamp: "2/8 17:30",
        replyLabel: "Trả lời",
        reactions: [
          { emoji: "1", count: 120, isActive: true },
          { emoji: "3", count: 120, isActive: false },
          { emoji: "7", count: 120, isActive: true },
        ],
      },
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
      images: ["/images/home/feed/main-img.jpg"],
      reactions: [
        { emoji: "20", count: 1234, isActive: true },
        { emoji: "1", count: 567, isActive: false },
        { emoji: "7", count: 89, isActive: false },
      ],
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
      images: ["/images/home/feed/feed-img-2.jpg"],
      reactions: [
        { emoji: "7", count: 234, isActive: false },
        { emoji: "16", count: 78, isActive: false },
        { emoji: "19", count: 45, isActive: true },
      ],
      reply: {
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
      images: ["/images/home/feed/feed-img-3.jpg"],
      reactions: [
        { emoji: "20", count: 2845, isActive: true },
        { emoji: "7", count: 1567, isActive: false },
        { emoji: "19", count: 892, isActive: false },
      ],
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
      reply: {
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

  // Event handlers
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

  return (
    <div className="bg-[#F1F3F5] pb-16">
      <Container maxWidth="md">
        <div className="space-y-6">
          {posts.map((post) => (
            <RefactoredSocialPost
              key={post.id}
              author={post.author}
              timestamp={post.timestamp}
              views={post.views}
              comments={post.comments}
              content={post.content}
              images={post.images}
              reactions={post.reactions}
              reply={post.reply}
              // Event handlers với postId
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
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

"use client";
import PostWithModal from "@/components/post/post-with-modal";
import { Container } from "@/components/ui/container";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  content: string;
  timestamp: string;
  reactions: {
    emoji: string;
    count: number;
    isActive?: boolean;
  }[];
  replies?: Comment[];
  level: number;
  replyTo?: string;
}

interface PostData {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  timestamp: string;
  views: number;
  comments: number;
  content: string;
  images?: string[];
  reactions: {
    emoji: string;
    count: number;
    isActive: boolean;
  }[];
  commentList?: Comment[];
}

interface ProfilePostsListProps {
  authorName: string;
}

export default function ProfilePostsList({
  authorName,
}: ProfilePostsListProps) {
  // Mock data for profile posts - filter by author name
  const postsData: PostData[] = [
    {
      id: "profile-post-1",
      author: {
        name: authorName,
        avatar: "/images/home/trending/artist-avatar.png",
        isVerified: true,
      },
      timestamp: "1/8 17:30",
      views: 96,
      comments: 120,
      content: `Trở thành khách mời của chương trình "Ghế không tựa", ${authorName} đã có những chia sẻ rất thú vị về bản thân và một vài kỷ niệm khó quên trong suốt chặng đường 10 năm làm nhạc của mình. 🔥🎤🎵`,
      images: ["/images/home/feed/main-img.jpg"],
      reactions: [
        { emoji: "0", count: 79, isActive: false },
        { emoji: "1", count: 245, isActive: false },
        { emoji: "7", count: 120, isActive: true },
      ],
      commentList: [
        {
          id: "comment-1",
          author: {
            name: "Minh Anh",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: false,
          },
          content: `Rất thích phong cách nhạc của ${authorName}! Mong chờ những sản phẩm mới! 🎵`,
          timestamp: "1/8 18:15",
          level: 0,
          reactions: [
            { emoji: "1", count: 45, isActive: true },
            { emoji: "7", count: 12, isActive: false },
          ],
          replies: [
            {
              id: "reply-1-1",
              author: {
                name: authorName,
                avatar: "/images/home/trending/artist-avatar.png",
                isVerified: true,
              },
              content:
                "Cảm ơn bạn rất nhiều! Sẽ cố gắng tạo ra những sản phẩm chất lượng hơn nữa! 🙏",
              timestamp: "1/8 18:30",
              level: 1,
              reactions: [
                { emoji: "20", count: 23, isActive: false },
                { emoji: "1", count: 15, isActive: true },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "profile-post-2",
      author: {
        name: authorName,
        avatar: "/images/home/trending/artist-avatar.png",
        isVerified: true,
      },
      timestamp: "2/8 15:45",
      views: 256,
      comments: 89,
      content:
        "Cảm ơn tất cả mọi người đã luôn ủng hộ và yêu thương! Hẹn gặp lại trong dự án âm nhạc sắp tới nhé! 🎵✨",
      images: [
        "/images/home/feed/main-img.jpg",
        "/images/home/feed/feed-img-2.jpg",
      ],
      reactions: [
        { emoji: "20", count: 1234, isActive: true },
        { emoji: "1", count: 567, isActive: false },
        { emoji: "7", count: 89, isActive: false },
      ],
      commentList: [
        {
          id: "comment-3",
          author: {
            name: "Fan Number 1",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: false,
          },
          content: `Luôn yêu thương và ủng hộ ${authorName}! Mong chờ sản phẩm mới! 🥰✨`,
          timestamp: "2/8 16:00",
          level: 0,
          reactions: [
            { emoji: "20", count: 156, isActive: true },
            { emoji: "1", count: 89, isActive: false },
          ],
        },
      ],
    },
    {
      id: "profile-post-3",
      author: {
        name: authorName,
        avatar: "/images/home/trending/artist-avatar.png",
        isVerified: true,
      },
      timestamp: "1/8 20:15",
      views: 178,
      comments: 45,
      content:
        "Behind the scenes từ buổi chụp hình mới nhất! Cảm ơn ekip đã làm việc cực kỳ chuyên nghiệp 📸✨",
      images: [
        "/images/home/feed/feed-img-2.jpg",
        "/images/home/feed/feed-img-3.jpg",
        "/images/home/feed/main-img.jpg",
      ],
      reactions: [
        { emoji: "7", count: 234, isActive: false },
        { emoji: "16", count: 78, isActive: false },
        { emoji: "19", count: 45, isActive: true },
      ],
      commentList: [
        {
          id: "comment-4",
          author: {
            name: "Fan HTL",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: false,
          },
          content: "Rất đẹp! Mong chờ sản phẩm mới ạ!",
          timestamp: "1/8 20:30",
          level: 0,
          reactions: [{ emoji: "1", count: 12, isActive: true }],
        },
      ],
    },
    {
      id: "profile-post-4",
      author: {
        name: authorName,
        avatar: "/images/home/trending/artist-avatar.png",
        isVerified: true,
      },
      timestamp: "2/8 22:15",
      views: 445,
      comments: 167,
      content:
        "Cảm ơn tất cả mọi người đã đồng hành trong hành trình âm nhạc vừa qua. Sắp tới sẽ có nhiều dự án mới thú vị! 🎵🎤",
      reactions: [
        { emoji: "1", count: 789, isActive: false },
        { emoji: "7", count: 445, isActive: true },
        { emoji: "16", count: 223, isActive: false },
      ],
      images: [],
      commentList: [
        {
          id: "comment-6",
          author: {
            name: "Official Fan",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: false,
          },
          content: `Luôn ủng hộ ${authorName}! Mong chờ những sản phẩm mới! 💪❤️`,
          timestamp: "3/8 08:30",
          level: 0,
          reactions: [
            { emoji: "20", count: 67, isActive: true },
            { emoji: "7", count: 34, isActive: false },
          ],
        },
      ],
    },
    {
      id: "profile-post-5",
      author: {
        name: authorName,
        avatar: "/images/home/trending/artist-avatar.png",
        isVerified: true,
      },
      timestamp: "4/8 14:30",
      views: 321,
      comments: 67,
      content: "Demo post với nhiều ảnh để test layout 📸✨🎯",
      images: [
        "/images/home/feed/main-img.jpg",
        "/images/home/feed/feed-img-2.jpg",
        "/images/home/feed/feed-img-3.jpg",
        "/images/home/trending/artist-bg.png",
        "/images/home/banner-slider-1.png",
        "/images/home/trending/trending-bg.png",
      ],
      reactions: [
        { emoji: "0", count: 45, isActive: false },
        { emoji: "1", count: 23, isActive: true },
        { emoji: "7", count: 67, isActive: false },
      ],
      commentList: [],
    },
  ];

  return (
    <div
      className="py-6"
      style={{
        background: "linear-gradient(180deg, #FFF 0%, #F1F3F5 6.28%)",
      }}
    >
      <Container maxWidth="md">
        <div className="space-y-6">
          {/* Posts List */}
          {postsData.map((post) => (
            <PostWithModal
              key={post.id}
              author={post.author}
              timestamp={post.timestamp}
              views={post.views}
              comments={post.comments}
              content={post.content}
              images={post.images}
              reactions={post.reactions}
              commentList={post.commentList}
              variant="community"
              onEdit={() => console.log("Edit post", post.id)}
              onDelete={() => console.log("Delete post", post.id)}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

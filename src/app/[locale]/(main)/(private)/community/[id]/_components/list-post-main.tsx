"use client";
import PostWithModal from "@/components/post/post-with-modal";
import { Container } from "@/components/ui/container";
import PostInput from "@/components/post/post-input";
import JoinMembershipCard from "./join-membership-card";
import IdolCard from "./idol-card";
import CurrentUserCard from "./current-user-card";

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
  level: number; // 0 hoặc 1 (chỉ 2 cấp)
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

export default function ListPostMain() {
  const postsData: PostData[] = [
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
      commentList: [
        {
          id: "comment-1",
          author: {
            name: "Minh Anh",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: false,
          },
          content:
            "Rất thích phong cách nhạc của anh Đen! Mong chờ những sản phẩm mới! 🎵",
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
                name: "Đen Vâu",
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
              replies: [
                {
                  id: "reply-1-1-1",
                  author: {
                    name: "Minh Anh",
                    avatar: "/images/home/trending/artist-avatar.png",
                    isVerified: false,
                  },
                  content: "Luôn ủng hộ anh! 💪❤️",
                  timestamp: "1/8 18:35",
                  level: 2,
                  reactions: [{ emoji: "1", count: 8, isActive: true }],
                },
                {
                  id: "reply-1-1-2",
                  author: {
                    name: "Văn Nam",
                    avatar: "/images/home/trending/artist-avatar.png",
                    isVerified: false,
                  },
                  content: "Mình cũng vậy, fan cứng của anh ấy!",
                  timestamp: "1/8 18:40",
                  level: 2,
                  replyTo: "Minh Anh", // Reply to Minh Anh nhưng cùng level 2
                  reactions: [{ emoji: "1", count: 5, isActive: false }],
                },
              ],
            },
            {
              id: "reply-1-2",
              author: {
                name: "Thu Hà",
                avatar: "/images/home/trending/artist-avatar.png",
                isVerified: false,
              },
              content: "Mình cũng rất thích nhạc của anh ấy!",
              timestamp: "1/8 19:00",
              level: 1,
              reactions: [{ emoji: "1", count: 7, isActive: false }],
            },
            {
              id: "reply-1-3",
              author: {
                name: "Phương Linh",
                avatar: "/images/home/trending/artist-avatar.png",
                isVerified: false,
              },
              content: "Chờ album mới quá! Hy vọng sớm ra mắt 🎵",
              timestamp: "1/8 19:30",
              level: 1,
              reactions: [
                { emoji: "7", count: 15, isActive: true },
                { emoji: "1", count: 8, isActive: false },
              ],
            },
          ],
        },
        {
          id: "comment-2",
          author: {
            name: "Quang Huy",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: false,
          },
          content:
            "Chương trình Ghế không tựa rất hay! Mong có thêm những khách mời thú vị khác nữa!",
          timestamp: "1/8 19:45",
          level: 0,
          reactions: [
            { emoji: "7", count: 34, isActive: true },
            { emoji: "1", count: 21, isActive: false },
          ],
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
            name: "Sky Fan",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: false,
          },
          content: "Luôn yêu thương và ủng hộ Tùng! Mong chờ MV mới! 🥰✨",
          timestamp: "2/8 16:00",
          level: 0,
          reactions: [
            { emoji: "20", count: 156, isActive: true },
            { emoji: "1", count: 89, isActive: false },
          ],
          replies: [
            {
              id: "reply-3-1",
              author: {
                name: "Lan Anh Sky",
                avatar: "/images/home/trending/artist-avatar.png",
                isVerified: false,
              },
              content: "Sky đâu rồi! Cùng ủng hộ thần tượng nào! 🎤💙",
              timestamp: "2/8 16:15",
              level: 1,
              reactions: [{ emoji: "1", count: 45, isActive: true }],
            },
            {
              id: "reply-3-2",
              author: {
                name: "Minh Tuấn Sky",
                avatar: "/images/home/trending/artist-avatar.png",
                isVerified: false,
              },
              content: "Đã là Sky thì phải ủng hộ hết mình! 💪",
              timestamp: "2/8 16:30",
              level: 1,
              reactions: [
                { emoji: "20", count: 23, isActive: false },
                { emoji: "1", count: 12, isActive: true },
              ],
            },
            {
              id: "reply-3-3",
              author: {
                name: "Thu Trang",
                avatar: "/images/home/trending/artist-avatar.png",
                isVerified: false,
              },
              content: "Mong MV mới sớm ra mắt! Rất mong chờ 🌟",
              timestamp: "2/8 17:00",
              level: 1,
              reactions: [{ emoji: "7", count: 18, isActive: true }],
            },
          ],
        },
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
            name: "HTL Fan",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: false,
          },
          content: "Chị đẹp quá! Mong chờ sản phẩm mới của chị ạ!",
          timestamp: "1/8 20:30",
          level: 0,
          reactions: [{ emoji: "1", count: 12, isActive: true }],
        },
      ],
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
      images: [
        "/images/home/feed/feed-img-3.jpg",
        "/images/home/feed/main-img.jpg",
        "/images/home/feed/feed-img-2.jpg",
        "/images/home/trending/artist-bg.png",
      ],
      reactions: [
        { emoji: "20", count: 2845, isActive: true },
        { emoji: "7", count: 1567, isActive: false },
        { emoji: "19", count: 892, isActive: false },
      ],
      commentList: [
        {
          id: "comment-5",
          author: {
            name: "BLINK Forever",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: false,
          },
          content: "We love you BLACKPINK! Can't wait for the new music! 🖤💖",
          timestamp: "3/8 10:35",
          level: 0,
          reactions: [
            { emoji: "20", count: 234, isActive: true },
            { emoji: "19", count: 156, isActive: false },
          ],
          replies: [
            {
              id: "reply-5-1",
              author: {
                name: "Lisa Stan",
                avatar: "/images/home/trending/artist-avatar.png",
                isVerified: false,
              },
              content: "Lisa's rap is always fire! 🔥🔥",
              timestamp: "3/8 11:00",
              level: 1,
              reactions: [{ emoji: "7", count: 67, isActive: true }],
              replies: [
                {
                  id: "reply-5-1-1",
                  author: {
                    name: "Jennie Queen",
                    avatar: "/images/home/trending/artist-avatar.png",
                    isVerified: false,
                  },
                  content: "All members are queens! 👑",
                  timestamp: "3/8 11:15",
                  level: 2,
                  reactions: [{ emoji: "20", count: 45, isActive: true }],
                },
              ],
            },
          ],
        },
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
      images: [],
      commentList: [
        {
          id: "comment-6",
          author: {
            name: "Jack Official Fan",
            avatar: "/images/home/trending/artist-avatar.png",
            isVerified: false,
          },
          content: "Luôn ủng hộ anh Jack! Mong chờ những sản phẩm mới! 💪❤️",
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
      id: "post-6",
      author: {
        name: "Demo User",
        avatar: "/images/home/trending/artist-avatar.png",
        isVerified: false,
      },
      timestamp: "4/8 14:30",
      views: 321,
      comments: 67,
      content:
        "Demo post với 6 ảnh để test layout 5+ ảnh với overlay +X 📸✨🎯",
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
  const handleAddComment = (comment: string) => {
    console.log(comment);
  };
  return (
    <div
      className="py-6"
      style={{
        background: "linear-gradient(180deg, #FFF 0%, #F1F3F5 6.28%)",
      }}
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-14">
          <div className="space-y-6 col-span-1 md:col-span-2">
            <div className="mb-6">
              <PostInput
                onSubmit={handleAddComment}
                onCreatePost={(content, images) => {
                  console.log("Create post:", content, images);
                  // TODO: Implement create post logic
                }}
                placeholder="Chia sẻ bài viết trên Fanverse..."
                showCreateModal={true}
              />
            </div>
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
          <div className="space-y-6 col-span-1">
            <IdolCard
              artistName="HOÀNG THÙY LINH"
              memberCount="100"
              imageUrl="/images/communities/idol-card-right.jpg"
            />
            <JoinMembershipCard />
            <CurrentUserCard
              userName="Hian1170"
              userAvatar="/icons/avatar-icon.svg"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

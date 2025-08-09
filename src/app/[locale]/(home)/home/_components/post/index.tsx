import ExactSocialPost from "./social-post";
import { Container } from "@/components/ui/container";

export default function ExactSocialDemo() {
  const postData = {
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
        { emoji: "🔥", count: 120, isActive: true },
        { emoji: "🔥", count: 120, isActive: true },
        { emoji: "🔥", count: 120, isActive: true },
      ],
    },
  };

  return (
    <div className="bg-[#F1F3F5] pb-16">
      <Container maxWidth="md">
        <div className="space-y-6">
          <ExactSocialPost {...postData} />

          {/* Additional posts for variety */}
          <ExactSocialPost
            author={{
              name: "Sơn Tùng M-TP",
              avatar: "/images/home/trending/artist-avatar.png",
              isVerified: true,
            }}
            timestamp="2/8 15:45"
            views={256}
            comments={89}
            content="Cảm ơn tất cả Sky đã luôn ủng hộ và yêu thương Tùng! Hẹn gặp lại trong dự án âm nhạc sắp tới nhé! 🎵✨"
            image="/images/home/feed/main-img.jpg"
            reactions={[
              { emoji: "20", count: 1234, isActive: true },
              { emoji: "1", count: 567, isActive: false },
              { emoji: "7", count: 89, isActive: false },
            ]}
          />

          <ExactSocialPost
            author={{
              name: "Hoàng Thùy Linh",
              avatar: "/images/home/trending/artist-avatar.png",
              isVerified: true,
            }}
            timestamp="1/8 20:15"
            views={178}
            comments={45}
            content="Behind the scenes từ buổi chụp hình mới nhất! Cảm ơn ekip đã làm việc cực kỳ chuyên nghiệp 📸✨"
            image="/images/home/feed/feed-img-2.jpg"
            reactions={[
              { emoji: "7", count: 234, isActive: false },
              { emoji: "16", count: 78, isActive: false },
              { emoji: "19", count: 45, isActive: true },
            ]}
            reply={{
              author: {
                name: "HTL Fan",
                avatar: "/images/home/trending/artist-avatar.png",
                isVerified: false,
              },
              content: "Chị đẹp quá! Mong chờ sản phẩm mới của chị ạ!",
              timestamp: "1/8 20:30",
              replyLabel: "Trả lời",
              reactions: [{ emoji: "🔥", count: 12, isActive: true }],
            }}
          />
        </div>
      </Container>
    </div>
  );
}

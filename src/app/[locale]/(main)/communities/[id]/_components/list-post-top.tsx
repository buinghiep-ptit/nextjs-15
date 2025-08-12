import { Container } from "@/components/ui/container";
import PostCardTop from "./post-card-top";

export default function ListPostTop() {
  const samplePosts = [
    {
      author: {
        name: "Hoàng Thúy Linh",
        avatar: "/images/info/avatar.jpg",
        isVerified: true,
      },
      timestamp: "3/8 14:20",
      content:
        "Hẹn gặp khán giả yêu nhạc và The Phoenix của Linh tại V Concert Rạng Rỡ Việt Nam nhé! 😍🇻🇳",
      image: "/images/info/bg.jpg",
    },
    {
      author: {
        name: "Sơn Tùng M-TP",
        avatar: "/images/info/avatar.jpg",
        isVerified: true,
      },
      timestamp: "2/8 16:45",
      content:
        "Cảm ơn tất cả Sky đã luôn đồng hành cùng Tùng! Dự án mới sắp ra mắt rồi, mọi người hãy chuẩn bị tinh thần nhé! 🎵✨",
      image: "/images/info/bg.jpg",
    },
    {
      author: {
        name: "Đen Vâu",
        avatar: "/images/info/avatar.jpg",
        isVerified: true,
      },
      timestamp: "1/8 19:30",
      content:
        "Trở thành khách mời của chương trình 'Ghế không tựa', Đen Vâu có những chia sẻ thú vị về hành trình 10 năm làm nhạc! 🔥🎤",
      image: "/images/info/bg.jpg",
    },
  ];

  return (
    <div
      className="py-10"
      style={{
        backgroundImage: "url('/images/communities/bg-post-top.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {samplePosts.map((post, index) => (
            <PostCardTop key={index} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

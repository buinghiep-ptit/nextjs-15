import { ButtonGradient } from "@/components/ui/button-gradient";
import { Container } from "@/components/ui/container";
import { Star } from "lucide-react";
import Image from "next/image";

interface BandMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  joinDate: string;
}

const bandMembers: BandMember[] = [
  {
    id: "1",
    name: "TeA",
    role: "Rapper, Producer",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "Thành viên sáng lập của TaynguyenSound, TeA là rapper chính và producer của nhóm.",
    joinDate: "2015",
  },
  {
    id: "2",
    name: "Tofu",
    role: "Rapper",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "Tofu gia nhập nhóm năm 2016, mang đến phong cách rap độc đáo và năng lượng tươi mới.",
    joinDate: "2016",
  },
  {
    id: "3",
    name: "Namlee",
    role: "Rapper, Vocalist",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "Namlee là giọng ca chính của nhóm, có khả năng rap và hát đều xuất sắc.",
    joinDate: "2016",
  },
  {
    id: "4",
    name: "PC",
    role: "Producer, DJ",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "PC chịu trách nhiệm sản xuất âm nhạc và DJ cho các buổi biểu diễn của nhóm.",
    joinDate: "2017",
  },
];

export default function BandProfile() {
  return (
    <div className="w-full mx-auto bg-[var(--accent-foreground)] text-white">
      <div className="relative w-full aspect-[8/3]">
        <Image
          src="/images/info/bg.jpg"
          alt="TaynguyenSound Band Cover"
          fill
          className="object-cover"
          priority
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" /> */}
      </div>

      <Container>
        <div className="flex items-center justify-between py-7">
          <h1 className="text-[40px] md:text-[56px] lg:text-[72px] font-bold -tracking-widest">
            HOÀNG THÙY LINH
          </h1>

          <div
            className="p-2 rounded-full transition-all duration-300 ease-in-out hover:scale-105 "
            style={{
              background: "rgba(255, 255, 255, 0.10)",
            }}
          >
            <ButtonGradient
              className="h-16 font-bold text-white text-lg flex items-center gap-2"
              isOutlined
            >
              Tham gia cộng đồng
              <Image
                src="/icons/arrow-right.svg"
                alt="Arrow Right"
                width={24}
                height={24}
              />
            </ButtonGradient>
          </div>
        </div>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
              <Star className="w-6 h-6 text-white fill-current" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Profile
            </h2>
          </div>

          <div className="flex gap-6 mb-8">
            {bandMembers.map((member) => (
              <button key={member.id} className="group relative cursor-pointer">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-3 border-gray-700 group-hover:border-purple-500 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-purple-500/30">
                  <Image
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                  {member.name}
                </div>
              </button>
            ))}
          </div>

          <div className="text-gray-300 text-base leading-relaxed space-y-6">
            <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-purple-400 first-letter:float-left first-letter:mr-2 first-letter:mt-1">
              TaynguyenSound (viết tắt là TNS) là một nhóm nhạc được yêu thương
              và thành lập từ TeA (Vũ Mạnh Tùng) vào năm 2015. Đến năm 2016, họ
              mở rộng thêm 2 bạn có là Tofu & Namlee, sau đó trở về là Pleiku,
              họ đã cùng nhau lập ra nhóm với tên chính thức là Taynguyensound.
            </p>
            <p>
              Những thành viên ban đầu của Taynguyensound bao gồm TeA, Tofu,
              Namlee, PC những thành viên của nhóm không hề có sự kết nạp ngoại
              trừ Tuyết. Bạn đầu các anh em chỉ chơi rap, làm nhạc cùng nhau và
              chưa có ý định vươn xa và sống nghiêm túc với Hip-Hop nói riêng
              hay âm nhạc nói chung.
            </p>
            <p>
              Những sản phẩm âm nhạc từ Taynguyensound mang màu sắc nổi rõng,
              kết hợp cùng những màu chuyển buồn của các thành viên trong nhóm,
              về sau này nhóm có nhiều cải tiến với mục đích là để chuyển nghiệp
              hóa các sản phẩm âm nhạc liên quan đến HipHop, cũng như phát triển
              HipHop Tây Nguyên.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

import { ButtonGradient } from "@/components/ui/button-gradient";
import { Container } from "@/components/ui/container";
import { H1, H4 } from "@/components/ui/typography";
import Image from "next/image";

interface ArtistMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  joinDate: string;
}

const artistMembers: ArtistMember[] = [
  {
    id: "1",
    name: "TeA",
    role: "Rapper, Producer",
    avatar: "/images/info/avatar.jpg",
    bio: "Thành viên sáng lập của TaynguyenSound, TeA là rapper chính và producer của nhóm.",
    joinDate: "2015",
  },
  {
    id: "2",
    name: "Tofu",
    role: "Rapper",
    avatar: "/images/info/avatar.jpg",
    bio: "Tofu gia nhập nhóm năm 2016, mang đến phong cách rap độc đáo và năng lượng tươi mới.",
    joinDate: "2016",
  },
  {
    id: "3",
    name: "Namlee",
    role: "Rapper, Vocalist",
    avatar: "/images/info/avatar.jpg",
    bio: "Namlee là giọng ca chính của nhóm, có khả năng rap và hát đều xuất sắc.",
    joinDate: "2016",
  },
  {
    id: "4",
    name: "PC",
    role: "Producer, DJ",
    avatar: "/images/info/avatar.jpg",
    bio: "PC chịu trách nhiệm sản xuất âm nhạc và DJ cho các buổi biểu diễn của nhóm.",
    joinDate: "2017",
  },
];

export default function ArtistProfile() {
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
          <H1 className="text-[40px] md:text-[56px] lg:text-[72px] font-bold font-phu-du text-primary-foreground">
            HOÀNG THÙY LINH
          </H1>

          <div
            className="p-2 rounded-full transition-all duration-300 ease-in-out hover:scale-105 "
            style={{
              background: "rgba(255, 255, 255, 0.10)",
            }}
          >
            <ButtonGradient
              className="h-16 font-bold text-lg flex items-center gap-2"
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

        <div
          className=" w-full h-0.25 my-7 rounded-[1px]"
          style={{
            background: "rgba(255, 255, 255, 0.20)",
          }}
        />

        <div className="pb-20">
          <div className="flex items-center gap-2 mb-8 mt-10">
            <Image
              src="/images/info/profile-icon.svg"
              alt="Star"
              width={28}
              height={28}
            />
            <H4 className="text-xl font-bold text-primary-foreground">
              Profile
            </H4>
          </div>

          <div className="flex gap-6 mb-8">
            {artistMembers.slice(-1).map((member) => (
              <button key={member.id} className="group relative cursor-pointer">
                <div className="relative w-24 h-24 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-110">
                  <Image
                    src={member.avatar || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                  {member.name}
                </div>
              </button>
            ))}
          </div>

          <div className="max-w-4/7 text-[#F8F9FA] text-[15px]">
            <p>
              Tên đầy đủ: Hoàng Thùy Linh
              <br />
              Ngày sinh: 11 tháng 8 năm 1988
              <br />
              Nơi sinh: Hà Nội, Việt Nam
              <br />
              Quốc tịch: Việt Nam
              <br />
              Hoàng Thùy Linh là một trong những ca sĩ và nhạc sĩ nổi bật của
              nền âm nhạc Việt Nam, được biết đến với phong cách âm nhạc kết hợp
              giữa pop, dân gian và hiện đại. Cô nổi bật với giọng hát ấn tượng,
              kỹ năng biểu diễn tốt và khả năng sáng tạo trong việc kết hợp các
              yếu tố âm nhạc truyền thống và đương đại.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

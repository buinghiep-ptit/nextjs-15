import { ButtonGradient } from "@/components/ui/button-gradient";
import Image from "next/image";
export default function JoinMembershipCard() {
  const gradientBackground =
    "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)";

  return (
    <div
      className="relative p-0.25 rounded-2xl overflow-hidden"
      style={{
        background: gradientBackground,
      }}
    >
      {/* Card content with white background */}
      <div className="relative bg-white p-6 overflow-hidden rounded-2xl">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-30 -translate-y-8 translate-x-8"></div>
        <div className="absolute top-8 right-12 w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full opacity-40"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-100 to-blue-200 rounded-full opacity-20 translate-y-8 translate-x-4"></div>

        {/* Bookmark icon */}
        <div className="relative z-10 mb-4">
          <Image
            src="/icons/membership-icon.svg"
            alt="Membership icon"
            width={40}
            height={40}
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Gói hội viên
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Gia nhập cùng{" "}
            <span className="font-semibold text-gray-900">96.456</span> hội viên
            để tận hưởng nhiều đặc quyền!
          </p>

          {/* Join button */}
          <ButtonGradient className="h-12 w-full">
            Tham gia ngay
            <Image
              src="/icons/chevron-right.svg"
              alt="Arrow right"
              width={20}
              height={20}
            />
          </ButtonGradient>
        </div>
      </div>
    </div>
  );
}

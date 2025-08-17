import { cn } from "@/lib/utils";
import Image from "next/image";

interface IdolCardProps {
  artistName: string;
  memberCount: string;
  imageUrl: string;
  className?: string;
}

export default function IdolCard({
  artistName,
  memberCount,
  imageUrl,
  className = "",
}: IdolCardProps) {
  return (
    <div className={cn("bg-white rounded-2xl overflow-hidden", className)}>
      {/* Artist Image */}
      <div className="relative aspect-[6/5] overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={artistName}
          fill
          className="object-cover"
        />
      </div>

      {/* Info Section */}
      <div
        className="p-6 pt-5 space-y-2 text-center"
        style={{
          background:
            "linear-gradient(113deg, #27BEFF -16.18%, #01CB41 117.89%)",
        }}
      >
        <div className="flex justify-center items-center text-white font-bold font-phu-du mb-2 gap-2">
          <span className="text-lg md:text-xl">{memberCount}</span>
          <span className="text-sm md:text-lg">THÀNH VIÊN</span>
        </div>
        <h3 className="text-white text-xl sm:text-2xl lg:text-[40px] font-bold font-phu-du">
          {artistName}
        </h3>
      </div>
    </div>
  );
}

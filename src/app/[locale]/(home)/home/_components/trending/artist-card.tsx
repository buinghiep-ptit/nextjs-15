import Image from "next/image";

interface ArtistCardProps {
  artistName: string;
  coverImageSrc: string;
  avatarSrc: string;
}

export function ArtistCard({
  artistName,
  coverImageSrc,
  avatarSrc,
}: ArtistCardProps) {
  return (
    <div className="relative bg-white rounded-2xl overflow-hidden group">
      {/* Main Cover Image */}
      <div className="relative w-full aspect-[1/1] overflow-hidden rounded-t-2xl">
        <Image
          src={coverImageSrc || "/placeholder.svg"}
          alt={`Cover image for ${artistName}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 group-hover:scale-105 cursor-pointer"
        />
      </div>

      {/* Avatar Image - Moved outside the image container, positioned relative to the main card */}
      {/* bottom: '8px' places it 8px from the bottom of the card. */}
      {/* -translate-y-1/2 pulls it up by half its height, centering it vertically relative to the 8px bottom offset. */}

      {/* Artist Name - Adjusted padding-top to account for avatar overlap */}
      <div className="pt-8 md:pt-11 pb-4 md:pb-5 text-center relative">
        <div className="absolute left-1/2 -translate-x-1/2 z-10 -top-6 md:-top-8">
          <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full border-3 border-white overflow-hidden">
            <Image
              src={avatarSrc || "/placeholder.svg"}
              alt={`Avatar of ${artistName}`}
              fill
              sizes="64px"
              style={{ objectFit: "cover" }}
              className="cursor-pointer"
            />
          </div>
        </div>
        {/* 32px (half avatar height) + 16px (gap) = 48px */}
        <h3 className="text-sm md:text-xl font-bold group-hover:text-purple-600 transition-colors duration-200 cursor-pointer">
          {artistName}
        </h3>
      </div>
    </div>
  );
}

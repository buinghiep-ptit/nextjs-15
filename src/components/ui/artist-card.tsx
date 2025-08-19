import Image from "next/image";
import { cn, getImageWithFallback } from "@/lib/utils";
import Link from "next/link";

interface ArtistCardProps {
  artistName: string;
  coverImageSrc: string;
  avatarSrc: string;
  isActive?: boolean;
  variant?: "slider" | "grid";
  onClick?: () => void;
  slugName?: string;
}

export function ArtistCard({
  artistName,
  coverImageSrc,
  avatarSrc,
  isActive = false,
  variant = "grid",
  slugName,
}: ArtistCardProps) {
  const gradientBackground =
    "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)";

  const isSlider = variant === "slider";

  return (
    <div
      className={cn(
        "relative bg-white rounded-2xl overflow-hidden group transition-all duration-300 ease-in-out"
      )}
      style={
        isActive
          ? {
              // padding: "2px",
              // background: gradientBackground,
            }
          : {}
      }
    >
      <div
        className={cn(
          "w-full h-full bg-white rounded-[calc(theme(borderRadius.2xl)-2px)] overflow-hidden"
        )}
      >
        {/* Main Cover Image */}
        <Link href={`/artistpedia/${slugName}`}>
          <div className="relative w-full aspect-[11/7] overflow-hidden">
            <Image
              src={getImageWithFallback(coverImageSrc, "cover")}
              alt={`Cover image for ${artistName}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Artist Name and Avatar */}
        <div
          className={cn(
            "pt-8 pb-4 text-center relative",
            isSlider ? "" : "md:pt-11 md:pb-5"
          )}
        >
          <div
            className={cn(
              "absolute left-1/2 -translate-x-1/2 z-1 -top-6",
              isSlider ? "" : "md:-top-8"
            )}
          >
            <div
              className={cn(
                "relative rounded-full border-3 border-white overflow-hidden",
                isSlider ? "w-12 h-12" : "w-12 h-12 md:w-16 md:h-16"
              )}
            >
              <Image
                src={getImageWithFallback(avatarSrc, "avatar")}
                alt={`Avatar of ${artistName}`}
                fill
                sizes={isSlider ? "48px" : "(max-width: 768px) 48px, 64px"}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <h3
            className={cn(
              "font-bold transition-colors duration-200",
              isSlider ? "text-sm" : "text-sm md:text-xl",
              isActive ? "text-transparent" : "group-hover:text-purple-600"
            )}
            style={
              isActive
                ? {
                    background: gradientBackground,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }
                : {}
            }
          >
            {artistName}
          </h3>
        </div>
      </div>
    </div>
  );
}

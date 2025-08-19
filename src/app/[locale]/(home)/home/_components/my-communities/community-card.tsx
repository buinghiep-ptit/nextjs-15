import { cn, getImageWithFallback } from "@/lib/utils";

interface CommunityCardProps {
  name: string;
  avatarSrc: string;
  badgeSrc?: string;
  isActive?: boolean;
}

export function CommunityCard({
  name,
  avatarSrc,
  badgeSrc,
  isActive = false,
}: CommunityCardProps) {
  const gradientBackground =
    "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)";

  return (
    <div
      className={cn(
        "relative w-full aspect-[200/184] flex-shrink-0 rounded-2xl transition-all duration-300 ease-in-out",
        isActive ? "" : "group-hover:p-[2px]" // Apply padding for border on hover for non-active
      )}
      style={
        isActive
          ? {
              padding: "2px", // Active state always has border
              background: gradientBackground,
            }
          : {
              background: "transparent", // Default transparent background
              ...({
                "&:hover": {
                  background: gradientBackground, // Apply gradient on hover
                },
              } as React.CSSProperties),
            }
      }
    >
      {/* Inner content wrapper */}
      <div
        className={cn(
          "w-full h-full bg-white rounded-[calc(theme(borderRadius.2xl)-2px)] flex flex-col items-center justify-center p-4",
          isActive ? "" : "group-hover:rounded-2xl" // Ensure inner content also rounds on hover
        )}
      >
        <div
          className={cn(
            "relative md:w-24 md:h-24 w-20 h-20 overflow-hidden flex items-center justify-center bg-white"
          )}
        >
          <img
            src={getImageWithFallback(avatarSrc, "cover")}
            alt={`Avatar of ${name}`}
            style={{ objectFit: "cover" }}
            className="rounded-full w-full h-full"
          />
          {badgeSrc && (
            <div className="absolute bottom-0 right-0 md:w-8 md:h-8 w-6 h-6 rounded-full bg-black border-2 border-white flex items-center justify-center">
              <img
                src={getImageWithFallback(badgeSrc, "avatar")}
                alt="Badge"
                className="object-cover rounded-full w-full h-full"
              />
            </div>
          )}
        </div>
        <h3
          className={cn(
            "md:mt-4 mt-2 text-sm md:text-lg font-bold",
            isActive
              ? "text-transparent"
              : "text-gray-800 group-hover:text-purple-600 transition-colors duration-200"
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
          {name}
        </h3>
      </div>
    </div>
  );
}

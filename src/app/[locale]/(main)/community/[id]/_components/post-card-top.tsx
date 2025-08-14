import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface PostCardTopProps {
  author: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  timestamp: string;
  content: string;
  image?: string;
}

export default function PostCardTop({
  author,
  timestamp,
  content,
  image,
}: PostCardTopProps) {
  return (
    <div className="bg-white rounded-2xl p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start space-x-3">
          <div
            style={{
              border: "1px dashed #FFF",
              background:
                "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #0052D4 113.46%)",
            }}
            className="w-14 h-14 rounded-full flex items-center justify-center"
          >
            <Avatar className="w-full h-full bg-white p-1">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-bold text-[15px]">{author.name}</h3>
              {author.isVerified && (
                <Image
                  src="/icons/tick.svg"
                  alt="Verified"
                  width={16}
                  height={16}
                />
              )}
            </div>

            <div className="flex items-center space-x-2.5 text-sm text-[var(--muted-foreground)]">
              <span>{timestamp}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mb-3">
        <p className="text-sm">{content}</p>
      </div>

      {/* Image */}
      {image && (
        <div className="relative w-full" style={{ aspectRatio: "1.75" }}>
          <Image
            src={image}
            alt="Post image"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

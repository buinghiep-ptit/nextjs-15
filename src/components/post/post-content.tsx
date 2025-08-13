"use client";

// import Image from "next/image";
import ImageDisplayView from "./image-display-view";

interface PostContentProps {
  content: string;
  images?: string[];
  imageAspectRatio?: number;
  onImageClick?: () => void;
}

export function PostContent({
  content,
  images,
  // imageAspectRatio = 1.75,
  onImageClick,
}: PostContentProps) {
  return (
    <>
      {/* Text Content */}
      <div className="mb-4 px-4">
        <p className="text-sm leading-relaxed">{content}</p>
      </div>

      {/* Images */}
      {images && images.length > 0 && (
        <div className="mb-4">
          <ImageDisplayView images={images} onImageClick={onImageClick} />
        </div>
      )}
    </>
  );
}

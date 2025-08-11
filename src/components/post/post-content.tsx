"use client";

import Image from "next/image";

interface PostContentProps {
  content: string;
  image?: string;
  imageAspectRatio?: number;
  onImageClick?: () => void;
}

export function PostContent({
  content,
  image,
  imageAspectRatio = 1.75,
  onImageClick,
}: PostContentProps) {
  return (
    <>
      {/* Text Content */}
      <div className="mb-4 px-4">
        <p className="text-sm leading-relaxed">{content}</p>
      </div>

      {/* Image */}
      {image && (
        <div className="mb-4">
          <div
            className="relative w-full cursor-pointer"
            style={{ aspectRatio: imageAspectRatio.toString() }}
            onClick={onImageClick}
          >
            <Image
              src={image}
              alt="Post image"
              fill
              className="object-cover hover:opacity-95 transition-opacity"
            />
          </div>
        </div>
      )}
    </>
  );
}

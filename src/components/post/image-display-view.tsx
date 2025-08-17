"use client";

import React from "react";
import Image from "next/image";

interface ImageDisplayViewProps {
  images: string[];
  onImageClick?: () => void;
  isPostDetail?: boolean;
}

// Component cho việc hiển thị ảnh trong view mode (danh sách bài viết và chi tiết)
// Sử dụng layout phức tạp như rule đã tạo trước đó
export default function ImageDisplayView({
  images,
  onImageClick,
  isPostDetail = false,
}: ImageDisplayViewProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full">
      {/* 1 ảnh: Full ảnh với tỷ lệ 16:9 */}
      {images.length === 1 && (
        <div
          className="relative w-full cursor-pointer"
          style={{ aspectRatio: "1.75" }}
          onClick={onImageClick}
        >
          <Image
            src={images[0]}
            alt="Post image"
            fill
            className={`object-cover hover:opacity-95 transition-opacity ${
              isPostDetail ? "rounded-lg" : ""
            }`}
          />
        </div>
      )}

      {/* 2 ảnh: Chia đôi ngang, cả 2 đều vuông */}
      {images.length === 2 && (
        <div className="flex gap-1 sm:gap-2" onClick={onImageClick}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative flex-1 aspect-square overflow-hidden cursor-pointer ${
                isPostDetail ? "rounded-lg" : ""
              }`}
            >
              <Image
                src={image}
                alt={`Post image ${index + 1}`}
                fill
                className="object-cover hover:opacity-95 transition-opacity"
              />
            </div>
          ))}
        </div>
      )}

      {/* 3 ảnh: 1 ảnh lớn bên trái, 2 ảnh nhỏ xếp dọc bên phải */}
      {images.length === 3 && (
        <div
          className="flex gap-1 sm:gap-2 cursor-pointer"
          style={{ aspectRatio: "2/1" }}
          onClick={onImageClick}
        >
          <div
            className={`relative flex-1 overflow-hidden ${
              isPostDetail ? "rounded-lg" : ""
            }`}
          >
            <Image
              src={images[0]}
              alt="Post image 1"
              fill
              className="object-cover hover:opacity-95 transition-opacity"
            />
          </div>
          <div className="flex flex-col gap-1 sm:gap-2 flex-1">
            {images.slice(1).map((image, index) => (
              <div
                key={index + 1}
                className={`relative flex-1 overflow-hidden ${
                  isPostDetail ? "rounded-lg" : ""
                }`}
              >
                <Image
                  src={image}
                  alt={`Post image ${index + 2}`}
                  fill
                  className="object-cover hover:opacity-95 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4 ảnh: Grid 2x2, tất cả đều vuông */}
      {images.length === 4 && (
        <div
          className="grid grid-cols-2 gap-1 sm:gap-2 aspect-square cursor-pointer"
          onClick={onImageClick}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative aspect-square overflow-hidden ${
                isPostDetail ? "rounded-lg" : ""
              }`}
            >
              <Image
                src={image}
                alt={`Post image ${index + 1}`}
                fill
                className="object-cover hover:opacity-95 transition-opacity"
              />
            </div>
          ))}
        </div>
      )}

      {/* 5+ ảnh: 1 ảnh lớn bên trái, 4 ảnh nhỏ bên phải (ảnh thứ 5 bị làm mờ kèm "+x") */}
      {images.length >= 5 && (
        <div
          className="flex gap-1 sm:gap-2 cursor-pointer"
          style={{ aspectRatio: "2/1" }}
          onClick={onImageClick}
        >
          <div
            className={`relative flex-1 overflow-hidden ${
              isPostDetail ? "rounded-lg" : ""
            }`}
          >
            <Image
              src={images[0]}
              alt="Post image 1"
              fill
              className="object-cover hover:opacity-95 transition-opacity"
            />
          </div>
          <div className="grid grid-cols-2 gap-1 sm:gap-2 flex-1">
            {images.slice(1, 5).map((image, index) => (
              <div
                key={index + 1}
                className={`relative aspect-square overflow-hidden ${
                  isPostDetail ? "rounded-lg" : ""
                }`}
              >
                <Image
                  src={image}
                  alt={`Post image ${index + 2}`}
                  fill
                  className="object-cover hover:opacity-95 transition-opacity"
                />
                {/* Overlay cho ảnh thứ 5 */}
                {index === 3 && images.length > 5 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white text-[13px] sm:text-[15px] font-medium leading-tight sm:leading-[20px]">
                      +{images.length - 5}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

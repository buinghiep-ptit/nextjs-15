"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ButtonGradient } from "../ui/button-gradient";
import { ButtonGradientOutlined } from "../ui/button-gradient-outlined";
import { ButtonGradientOutlinedBlue } from "../ui/button-gradient-outlined-blue";
import ImageGalleryModal from "./image-gallery-modal";

interface PostCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (content: string, images: File[]) => void;
}

// Component cho Image Preview trong create/edit mode - Hiển thị dạng list ngang như Figma
const ImagePreviewCreate = React.memo(
  ({
    selectedImages,
    removeImage,
    onImageClick,
  }: {
    selectedImages: File[];
    removeImage: (index: number) => void;
    onImageClick?: () => void;
  }) => {
    if (selectedImages.length === 0) return null;

    return (
      <div className="w-full">
        {/* Hiển thị tối đa 5 ảnh fit width, không scroll */}
        <div
          className="flex flex-row gap-0.5 items-center cursor-pointer"
          onClick={onImageClick}
        >
          {selectedImages.slice(0, 5).map((image, index) => (
            <div
              key={index}
              className="relative flex-1 max-w-[103px] aspect-square rounded-lg overflow-hidden group"
            >
              <Image
                src={URL.createObjectURL(image)}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover"
              />
              {/* Overlay +X cho ảnh cuối nếu có nhiều hơn 5 ảnh */}
              {index === 4 && selectedImages.length > 5 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white text-[15px] font-medium leading-[20px]">
                    +{selectedImages.length - 5}
                  </span>
                </div>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M9 3L3 9M3 3L9 9"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

// Component cho Image Preview trong view mode - Giữ nguyên layout phức tạp
const ImagePreview = React.memo(
  ({
    selectedImages,
    removeImage,
  }: {
    selectedImages: File[];
    removeImage: (index: number) => void;
  }) => {
    if (selectedImages.length === 0) return null;

    return (
      <div className="w-full">
        {/* 1 ảnh: Full ảnh vuông */}
        {selectedImages.length === 1 && (
          <div className="relative w-full aspect-square rounded-lg overflow-hidden group">
            <Image
              src={URL.createObjectURL(selectedImages[0])}
              alt="Preview 1"
              fill
              className="object-cover"
            />
            <button
              onClick={() => removeImage(0)}
              className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M9 3L3 9M3 3L9 9"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        )}

        {/* 2 ảnh: Chia đôi ngang, cả 2 đều vuông */}
        {selectedImages.length === 2 && (
          <div className="flex gap-1">
            {selectedImages.map((image, index) => (
              <div
                key={index}
                className="relative flex-1 aspect-square rounded-lg overflow-hidden group"
              >
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M9 3L3 9M3 3L9 9"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 3 ảnh: 1 ảnh vuông lớn bên trái, 2 ảnh vuông nhỏ xếp dọc bên phải */}
        {selectedImages.length === 3 && (
          <div className="flex gap-1" style={{ aspectRatio: "2/1" }}>
            <div className="relative flex-1 rounded-lg overflow-hidden group">
              <Image
                src={URL.createObjectURL(selectedImages[0])}
                alt="Preview 1"
                fill
                className="object-cover"
              />
              <button
                onClick={() => removeImage(0)}
                className="absolute top-2 right-2 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M9 3L3 9M3 3L9 9"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              {selectedImages.slice(1).map((image, index) => (
                <div
                  key={index + 1}
                  className="relative flex-1 rounded-lg overflow-hidden group"
                >
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => removeImage(index + 1)}
                    className="absolute top-1 right-1 w-4 h-4 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M9 3L3 9M3 3L9 9"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4 ảnh: Grid 2x2, tất cả đều vuông */}
        {selectedImages.length === 4 && (
          <div className="grid grid-cols-2 gap-1 aspect-square">
            {selectedImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden group"
              >
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M9 3L3 9M3 3L9 9"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 5+ ảnh: 1 ảnh vuông lớn bên trái, 4 ảnh vuông nhỏ bên phải */}
        {selectedImages.length >= 5 && (
          <div className="flex gap-1" style={{ aspectRatio: "2/1" }}>
            <div className="relative flex-1 rounded-lg overflow-hidden group">
              <Image
                src={URL.createObjectURL(selectedImages[0])}
                alt="Preview 1"
                fill
                className="object-cover"
              />
              <button
                onClick={() => removeImage(0)}
                className="absolute top-2 right-2 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M9 3L3 9M3 3L9 9"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1 flex-1">
              {selectedImages.slice(1, 5).map((image, index) => (
                <div
                  key={index + 1}
                  className="relative aspect-square rounded-lg overflow-hidden group"
                >
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay cho ảnh thứ 5 */}
                  {index === 3 && selectedImages.length > 5 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-[15px] font-medium leading-[20px]">
                        +{selectedImages.length - 5}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => removeImage(index + 1)}
                    className="absolute top-1 right-1 w-4 h-4 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M9 3L3 9M3 3L9 9"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

ImagePreviewCreate.displayName = "ImagePreviewCreate";
ImagePreview.displayName = "ImagePreview";

export default function PostCreateModal({
  isOpen,
  onClose,
  onSubmit,
}: PostCreateModalProps) {
  const [content, setContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (content.trim() || selectedImages.length > 0) {
      onSubmit?.(content, selectedImages);
      setContent("");
      setSelectedImages([]);
      onClose();
    }
  };

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      setSelectedImages((prev) => [...prev, ...files]);
    },
    []
  );

  const removeImage = useCallback((index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [content, adjustTextareaHeight]);

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
      // Adjust height immediately for better UX
      setTimeout(adjustTextareaHeight, 0);
    },
    [adjustTextareaHeight]
  );

  const handleOpenGalleryModal = useCallback(() => {
    setIsGalleryModalOpen(true);
  }, []);

  const handleCloseGalleryModal = useCallback(() => {
    setIsGalleryModalOpen(false);
  }, []);

  const handleGalleryImagesUpdate = useCallback((images: File[]) => {
    setSelectedImages(images);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[600px] lg:w-2/5 bg-white rounded-3xl border-0 p-0 overflow-hidden max-h-[calc(100vh-80px)] flex flex-col"
        overlayClassName="bg-[rgba(14,15,17,0.50)] backdrop-blur-[8px]"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Tạo bài viết</DialogTitle>

        {/* Header - Fixed */}
        <div className="flex-shrink-0 p-6 pt-8 pb-4 relative">
          <div className="flex flex-col gap-6 items-center">
            <div className="flex flex-col gap-3 items-start w-full relative">
              <h2 className="text-[24px] font-bold leading-[32px] text-[#212529] text-center w-full">
                Tạo bài viết
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute cursor-pointer top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 z-10"
          >
            <Image
              src="/icons/close-circle.svg"
              alt="Close"
              width={32}
              height={32}
            />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6">
          <div className="flex flex-col gap-4 pb-4">
            {/* Text Input */}
            <div className="rounded-xl">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={handleContentChange}
                placeholder="Bạn đang nghĩ gì?"
                className="w-full min-h-[60px] p-0 border-0 resize-none text-[15px] font-normal leading-[20px] text-[#212529] placeholder:text-[#868E96] focus:outline-none bg-transparent overflow-hidden"
                style={{
                  fontFamily: "Inter",
                  height: "auto",
                }}
                rows={1}
              />
            </div>

            {/* Image Preview */}
            <ImagePreviewCreate
              selectedImages={selectedImages}
              removeImage={removeImage}
              onImageClick={handleOpenGalleryModal}
            />
          </div>
        </div>

        {/* Action Container - Fixed at Bottom */}
        <div className="flex-shrink-0 bg-white border-t border-gray-100 p-6">
          <div className="flex flex-row items-center justify-between">
            {/* Media Buttons */}
            <div className="flex flex-row gap-3 items-center">
              {/* Gallery Button */}
              <label className="flex flex-row items-center">
                <input
                  id="image-input"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <ButtonGradientOutlinedBlue
                  className="rounded-full h-11 px-3"
                  onClick={() => {
                    document.getElementById("image-input")?.click();
                  }}
                >
                  <Image
                    src="/icons/gallery-gradient-blue.svg"
                    alt="Add Emoji"
                    width={24}
                    height={24}
                  />
                </ButtonGradientOutlinedBlue>
              </label>

              {/* Emoji Button */}
              <ButtonGradientOutlined className="rounded-full h-11 px-3">
                <Image
                  src="/icons/smile-gradient.svg"
                  alt="Add Emoji"
                  width={24}
                  height={24}
                />
              </ButtonGradientOutlined>
            </div>

            {/* Post Button */}
            <div className="flex-1 flex justify-end">
              <ButtonGradient
                className="h-12 w-35 font-semibold text-white text-[15px]"
                onClick={handleSubmit}
                disabled={!content.trim() && selectedImages.length === 0}
              >
                Đăng
              </ButtonGradient>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        isOpen={isGalleryModalOpen}
        onClose={handleCloseGalleryModal}
        initialImages={selectedImages}
        onImagesUpdate={handleGalleryImagesUpdate}
      />
    </Dialog>
  );
}

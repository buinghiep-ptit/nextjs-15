"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ButtonGradientOutlined } from "../ui/button-gradient-outlined";

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialImages: File[];
  onImagesUpdate: (images: File[]) => void;
}

export default function ImageGalleryModal({
  isOpen,
  onClose,
  initialImages,
  onImagesUpdate,
}: ImageGalleryModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<File[]>([]);

  // Initialize images when modal opens
  useEffect(() => {
    if (isOpen) {
      setImages([...initialImages]);
    }
  }, [isOpen, initialImages]);

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      const updatedImages = [...images, ...files];
      setImages(updatedImages);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleBack = () => {
    onClose();
  };

  const handleUpload = () => {
    // Update images in parent and close modal
    onImagesUpdate(images);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[600px] lg:w-2/5 bg-white rounded-3xl border-0 p-0 overflow-hidden"
        overlayClassName="bg-[rgba(14,15,17,0.50)] backdrop-blur-[8px]"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">Tải ảnh</DialogTitle>

        {/* Header */}
        <div className="pt-8 pb-0 px-0 relative">
          <div className="px-6 py-0 w-full">
            <h2 className="text-[24px] font-bold text-[#212529] text-center w-full leading-[32px]">
              Tải ảnh
            </h2>
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

        {/* Image Container - Grid với max 5 items per row, fit width */}
        <div className="px-[20.5px] py-8 w-full">
          <div className="grid grid-cols-5 gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group rounded-lg overflow-hidden"
              >
                <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Remove Button - chỉ hiện khi hover */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute cursor-pointer top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
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

            {/* Add Image Button */}
            <ButtonGradientOutlined
              onClick={triggerFileInput}
              className="w-full h-full aspect-square flex items-center justify-center"
              isCircle={false}
            >
              <Image
                src="/icons/add-icon.svg"
                alt="Add Emoji"
                width={36}
                height={36}
              />
            </ButtonGradientOutlined>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleAddImages}
            className="hidden"
          />
        </div>

        {/* Button Container */}
        <div className="flex flex-col items-center justify-start w-full">
          {/* Separator Line */}
          <div className="w-full h-px bg-[#DEE2E6]" />

          {/* Buttons */}
          <div className="flex flex-row w-full">
            {/* Quay lại Button */}
            <button
              onClick={handleBack}
              className="flex-1 cursor-pointer flex items-center justify-center px-6 py-4"
            >
              <span className="text-[15px] font-bold leading-[24px]">
                Quay lại
              </span>
            </button>

            {/* Vertical Separator */}
            <div className="w-px bg-[#DEE2E6] self-stretch" />

            {/* Tiếp tục Button */}
            <button
              onClick={handleUpload}
              className="flex-1 flex cursor-pointer items-center justify-center px-6 py-4 "
              style={{
                background:
                  "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
              }}
            >
              <span className="text-[15px] font-bold leading-[24px] text-transparent">
                Tiếp tục
              </span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

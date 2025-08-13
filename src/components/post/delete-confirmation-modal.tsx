"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Xác nhận xoá bài viết",
  message = "Bạn có chắc chắc muốn xóa bài viết?",
}: DeleteConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-[576px] lg:w-1/3 bg-white rounded-3xl border-0 p-0 overflow-hidden"
        overlayClassName="bg-[rgba(14,15,17,0.50)] backdrop-blur-[8px]"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>

        {/* Content */}
        <div className="">
          {/* Message */}
          <p className="text-[15px] text-center p-6">{message}</p>

          {/* Button Container */}
          <div className="flex flex-col items-center justify-start w-full">
            {/* Separator Line */}
            <div className="w-full h-px bg-[#DEE2E6]" />

            {/* Buttons */}
            <div className="flex flex-row w-full">
              {/* Quay lại Button */}
              <button
                onClick={onClose}
                className="flex-1 flex cursor-pointer items-center justify-center px-6 py-4"
              >
                <span className="text-[15px] font-bold leading-[24px]">
                  Quay lại
                </span>
              </button>

              {/* Vertical Separator */}
              <div className="w-px bg-[#DEE2E6] self-stretch" />

              {/* Tiếp tục Button */}
              <button
                onClick={handleConfirm}
                className="flex-1 flex cursor-pointer items-center justify-center px-6 py-4 "
                style={{
                  background:
                    "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                <span className="text-[15px] font-bold leading-[24px] text-transparent">
                  Xác nhận
                </span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

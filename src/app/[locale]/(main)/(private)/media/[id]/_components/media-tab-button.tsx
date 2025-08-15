import React from "react";
import Image from "next/image";

interface MediaTabButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  icon?: string | null;
}

export function MediaTabButton({
  children,
  isActive,
  onClick,
  icon,
}: MediaTabButtonProps) {
  if (isActive) {
    return (
      <button
        onClick={onClick}
        className="px-4 py-2 rounded-full font-medium text-[14px] leading-[20px] font-['Inter'] text-white transition-all duration-300 ease-in-out hover:scale-105 min-w-[144px]"
        style={{
          background:
            "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)",
        }}
      >
        <div className="flex items-center justify-center gap-2">
          {icon === "crown" && (
            <Image
              src="/icons/crown-icon.svg"
              alt="Crown"
              width={16}
              height={16}
            />
          )}
          <span>{children}</span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full font-medium text-[14px] leading-[20px] font-['Inter'] text-[#495057] bg-[#F1F3F5] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#E9ECEF] min-w-[144px]"
    >
      <div className="flex items-center justify-center gap-2">
        {icon === "crown" && (
          <Image
            src="/icons/crown-icon.svg"
            alt="Crown"
            width={16}
            height={16}
            className="opacity-60"
          />
        )}
        <span>{children}</span>
      </div>
    </button>
  );
}

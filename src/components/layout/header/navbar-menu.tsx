"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useArtist } from "@/providers/artist-provider";

export default function NavbarMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const { currentArtist, generateArtistSlug } = useArtist();

  // Extract locale from pathname (e.g., /en/artist -> en)
  const locale = pathname.split("/")[1] || "vi";

  const artistSlug = currentArtist ? generateArtistSlug(currentArtist) : "";

  const navItems = [
    {
      name: "Thông tin",
      href: `/${locale}/artistpedia/${artistSlug}`,
      basePath: "/artistpedia/",
    },
    {
      name: "Cộng đồng",
      href: `/${locale}/community/${artistSlug}`,
      basePath: "/community/",
    },
    {
      name: "Từ nghệ sĩ",
      href: `/${locale}/artists/${artistSlug}`,
      basePath: "/artists/",
    },
    {
      name: "Media",
      href: `/${locale}/media/${artistSlug}`,
      basePath: "/media/",
    },
  ];

  const handleNavClick = (item: (typeof navItems)[0]) => {
    router.push(item.href);
  };

  return (
    <div>
      <nav className="hidden md:flex space-x-4 lg:space-x-6 xl:space-x-8">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(`/${locale}${item.basePath}`);

          return (
            <button
              key={item.name}
              onClick={() => handleNavClick(item)}
              className={`relative cursor-pointer text-[13px] md:text-[14px] lg:text-[15px] font-semibold pb-2 md:pb-3 transition-all duration-300 ease-in-out ${
                isActive
                  ? "text-transparent"
                  : "text-[#495057] hover:text-[#212529]"
              }`}
              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }
                  : {}
              }
            >
              {item.name}
              {/* Gradient indicator */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ease-in-out ${
                  isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                }`}
                style={{
                  background: isActive
                    ? "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)"
                    : "transparent",
                }}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
}

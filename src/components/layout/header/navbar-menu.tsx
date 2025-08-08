"use client";

import React, { useState } from "react";

export default function NavbarMenu() {
  const [activeTab, setActiveTab] = useState("Thông tin");

  const navItems = [
    { name: "Thông tin", href: "#" },
    { name: "Cộng đồng", href: "#" },
    { name: "Từ nghệ sĩ", href: "#" },
    { name: "Media", href: "#" },
  ];

  return (
    <div>
      <nav className="hidden md:flex space-x-8">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`relative cursor-pointer text-[15px] font-semibold pb-3  transition-all duration-300 ease-in-out ${
              activeTab === item.name
                ? "text-transparent"
                : "text-[#495057] hover:text-[#212529]"
            }`}
            style={
              activeTab === item.name
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
                activeTab === item.name
                  ? "opacity-100 scale-x-100"
                  : "opacity-0 scale-x-0"
              }`}
              style={{
                background:
                  activeTab === item.name
                    ? "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)"
                    : "transparent",
              }}
            />
          </button>
        ))}
      </nav>
    </div>
  );
}

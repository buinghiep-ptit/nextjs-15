import Image from "next/image";
import React from "react";
import ListPostTop from "./_components/list-post-top";
import ListPostMain from "./_components/list-post-main";

export default function CommunityPage() {
  return (
    <div className="w-full mx-auto">
      <div className="relative w-full aspect-[8/3]">
        <Image
          src="/images/info/bg.jpg"
          alt="TaynguyenSound Band Cover"
          fill
          className="object-cover"
          priority
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" /> */}
      </div>

      <ListPostTop />
      <ListPostMain />
    </div>
  );
}

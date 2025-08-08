import React from "react";
import Image from "next/image";

export default function HeaderLeft() {
  return (
    <div className="flex-shrink-0">
      <Image src="/images/logo.svg" alt="Logo" width={132} height={28} />
      {/* <h1
        className="text-2xl font-bold text-transparent"
        style={{
          background:
            "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        Fanverse
      </h1> */}
    </div>
  );
}

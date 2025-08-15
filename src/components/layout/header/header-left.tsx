"use client";
import React from "react";
import Image from "next/image";
import ArtistDropdown from "./artist-dropdown";
import { Link } from "@/i18n/navigation";

type HeaderLeftProps = {
  showArtistDropdown?: boolean;
};

export default function HeaderLeft({
  showArtistDropdown = true,
}: HeaderLeftProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-shrink-0">
        <Link href="/home" aria-label="Home">
          <Image src="/images/logo.svg" alt="Logo" width={132} height={28} />
        </Link>
      </div>

      {showArtistDropdown && <ArtistDropdown />}
    </div>
  );
}

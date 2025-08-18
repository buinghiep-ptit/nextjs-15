"use client";

import { HStack, Stack } from "@/components/ui/layout";
import { ArtistCard } from "@/components/ui/artist-card";
import Image from "next/image";
import { GradientText } from "@/components/ui/text-gradient";
import { H1 } from "@/components/ui/typography";
import { Container } from "@/components/ui/container";
import { useState } from "react";
import { Community } from "@/types/community.type";

export default function ArtistGrid({
  communities,
}: {
  communities: Community[];
}) {
  const [activeArtist, setActiveArtist] = useState<string | null>(null);

  return (
    <div
      //   className="mt-8 md:mt-16"
      style={{
        background: `url("/images/home/trending/trending-bg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container className="py-6 md:py-16">
        <Stack align="center" gap={2}>
          <HStack align="center" justify="center" gap={2}>
            <Image
              src="/images/home/trending/fire.svg"
              alt="Artist Grid"
              width={24}
              height={24}
            />
            <GradientText className="text-sm md:text-base uppercase leading-[1.25] font-semibold">
              Trending
            </GradientText>
          </HStack>

          <H1 className="text-2xl md:text-[64px] leading-[1.5] font-bold mb-6 md:mb-16">
            Fan Community
          </H1>
        </Stack>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-x-4 gap-y-4 md:gap-y-8">
          {communities.map((artist) => (
            <button
              key={artist.id}
              onClick={() => setActiveArtist(artist.id || "")}
              onMouseEnter={() => setActiveArtist(artist.id || "")}
              onMouseLeave={() => setActiveArtist(null)}
              className="flex-shrink-0 focus:outline-none group cursor-pointer"
            >
              <ArtistCard
                artistName={artist.communityName || ""}
                coverImageSrc={artist.coverUrl || ""}
                avatarSrc={artist.imageUrl || ""}
                variant="grid"
                isActive={activeArtist === artist.id}
              />
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
}

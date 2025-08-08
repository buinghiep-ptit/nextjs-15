"use client";

import * as React from "react";
import { Crown } from "lucide-react";
import { CommunityCard } from "./community-card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Container } from "@/components/ui/container";

export default function MyCommunities() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeCommunity, setActiveCommunity] = React.useState<string | null>(
    null
  );

  const communities = [
    {
      name: "G-Dragon",
      avatar: "/images/home/trending/artist-bg.png",
      badge: "/images/home/trending/artist-avatar.png",
    },
    {
      name: "Lisa",
      avatar: "/images/home/trending/artist-bg.png",
      badge: "/images/home/trending/artist-avatar.png",
    },
    {
      name: "BTS",
      avatar: "/images/home/trending/artist-bg.png",
      badge: "/images/home/trending/artist-avatar.png",
    },
    {
      name: "Baekhyun",
      avatar: "/images/home/trending/artist-bg.png",
      badge: "/images/home/trending/artist-avatar.png",
    },
    {
      name: "Rosé",
      avatar: "/images/home/trending/artist-bg.png",
      badge: "/images/home/trending/artist-avatar.png",
    },
    {
      name: "Jennie",
      avatar: "/images/home/trending/artist-bg.png",
      badge: "/images/home/trending/artist-avatar.png",
    },
    {
      name: "Jimin",
      avatar: "/images/home/trending/artist-bg.png",
      badge: "/images/home/trending/artist-avatar.png",
    },
  ];

  return (
    <Container className="md:my-16 my-6">
      {/* Outer container replicating Stack */}
      <div
        className="rounded-2xl md:rounded-4xl border-3 md:border-6 border-white md:py-14 py-6"
        style={{
          background: "rgba(255, 255, 255, 0.30)",
        }}
      >
        {/* Header Section */}
        <div className="w-full flex items-center justify-center space-x-3 md:mb-10 mb-6">
          <div
            className="p-2 rounded-full"
            style={{
              background:
                "linear-gradient(316deg, #FF2FC1 -11.37%, #744DF1 63.98%, #005 113.46%)",
            }}
          >
            <Crown className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-base md:text-[28px] font-bold text-gray-900">
            My communities
          </h2>
        </div>

        {/* Communities Slider */}
        <div className="relative flex items-center justify-center md:px-14 px-3">
          {/* Left Arrow */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => api?.scrollPrev()}
            className="hidden absolute -left-0.75 -translate-x-1/2 md:flex w-12 h-12 z-10 rounded-full bg-white  items-center justify-center hover:bg-white/70 transition-colors duration-200 mr-4"
            aria-label="Previous slide"
          >
            <Image
              src="/images/home/previous-icon.svg"
              alt="Previous"
              width={32}
              height={32}
            />
          </Button>

          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {/* Re-added -ml-4, removed gap-x-4 */}
              {communities.map((community) => (
                <CarouselItem
                  key={community.name}
                  className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/5" // Re-added pl-4
                >
                  <button
                    onClick={() => setActiveCommunity(community.name)}
                    onMouseEnter={() => setActiveCommunity(community.name)}
                    onMouseLeave={() => setActiveCommunity(null)}
                    className="flex-shrink-0 focus:outline-none group w-full"
                  >
                    <CommunityCard
                      name={community.name}
                      avatarSrc={community.avatar}
                      badgeSrc={community.badge}
                      isActive={activeCommunity === community.name}
                    />
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Right Arrow */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => api?.scrollNext()}
            className="hidden absolute -right-0.75 translate-x-1/2 md:flex w-12 h-12 z-10 rounded-full bg-white hover:bg-white/70 transition-colors duration-200 ml-4"
            aria-label="Next slide"
          >
            <Image
              src="/images/home/next-icon.svg"
              alt="Next"
              width={32}
              height={32}
            />
          </Button>
        </div>
      </div>
    </Container>
  );
}

"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ArtistCard } from "@/components/ui/artist-card";

const MOCK_DATA = [
  {
    name: "Sơn Tùng M-TP",
    coverSrc: "/images/home/trending/artist-bg.png",
    avatarSrc: "/images/home/trending/artist-avatar.png",
  },
  {
    name: "Đen Vâu",
    coverSrc: "/images/home/trending/artist-bg.png",
    avatarSrc: "/images/home/trending/artist-avatar.png",
  },
  {
    name: "Hoàng Thùy Linh",
    coverSrc: "/images/home/trending/artist-bg.png",
    avatarSrc: "/images/home/trending/artist-avatar.png",
  },
  {
    name: "Bích Phương",
    coverSrc: "/images/home/trending/artist-bg.png",
    avatarSrc: "/images/home/trending/artist-avatar.png",
  },
  {
    name: "Tóc Tiên",
    coverSrc: "/images/home/trending/artist-bg.png",
    avatarSrc: "/images/home/trending/artist-avatar.png",
  },
  {
    name: "Chi Pu",
    coverSrc: "/images/home/trending/artist-bg.png",
    avatarSrc: "/images/home/trending/artist-avatar.png",
  },
];

export default function ArtistSlider() {
  const [api, setApi] = React.useState<CarouselApi>();
  // const [current, setCurrent] = React.useState(0);
  // const [count, setCount] = React.useState(0);
  const [activeArtist, setActiveArtist] = useState<string | null>(null);
  // React.useEffect(() => {
  //   if (!api) {
  //     return;
  //   }

  //   setCount(api.scrollSnapList().length);
  //   setCurrent(api.selectedScrollSnap());

  //   api.on("select", () => {
  //     setCurrent(api.selectedScrollSnap());
  //   });
  // }, [api]);

  return (
    <Container maxWidth="xl" className="relative w-full py-6">
      <div className="flex items-center justify-center">
        {/* Left Arrow */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => api?.scrollPrev()}
          className="hidden md:flex w-12 h-12 z-10 rounded-full bg-white items-center justify-center hover:bg-white/70 transition-colors duration-200 mr-4"
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
          className="w-full rounded-2xl md:rounded-4xl"
        >
          <CarouselContent className="-ml-4">
            {MOCK_DATA.map((artist, index) => (
              <CarouselItem
                key={index}
                onClick={() => setActiveArtist(artist.name)}
                onMouseEnter={() => setActiveArtist(artist.name)}
                onMouseLeave={() => setActiveArtist(null)}
                className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5 cursor-pointer"
              >
                <ArtistCard
                  artistName={artist.name}
                  coverImageSrc={artist.coverSrc}
                  avatarSrc={artist.avatarSrc}
                  isActive={activeArtist === artist.name}
                  variant="slider"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* <div className="flex justify-center mt-4 md:mt-8 space-x-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-1 rounded-full transition-all duration-300 ease-in-out ${
                  index === current
                    ? "w-8 bg-gradient-to-r from-[#FF2FC1] via-[#744DF1] to-[#005]"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div> */}
        </Carousel>

        {/* Right Arrow */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => api?.scrollNext()}
          className="hidden md:flex w-12 h-12 z-10 rounded-full bg-white hover:bg-white/70 transition-colors duration-200 ml-4"
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
    </Container>
  );
}

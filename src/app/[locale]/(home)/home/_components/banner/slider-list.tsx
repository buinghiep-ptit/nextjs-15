"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import SliderCard from "./slider-card";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Banner } from "@/types/banner.type";

export default function SliderList({ banners }: { banners: Banner[] }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Container maxWidth="xl" className="relative w-full">
      <div className="flex items-center justify-center">
        {/* Left Arrow - Disabled when at first slide */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => api?.scrollPrev()}
          disabled={current === 0}
          className="hidden md:flex w-12 h-12 z-10 rounded-full bg-white items-center justify-center hover:bg-white/70 transition-all duration-200 mr-4 disabled:opacity-0 disabled:cursor-not-allowed disabled:hover:bg-white"
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
            loop: false, // Disable infinite loop
          }}
          className="w-full p-0 md:p-8 bg-white rounded-2xl md:rounded-4xl"
        >
          <CarouselContent className="-ml-4">
            {banners.map((slide, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/2"
              >
                <SliderCard imageSrc={slide.imageUrl || ""} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center mt-4 md:mt-8 space-x-2">
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
          </div>
        </Carousel>

        {/* Right Arrow - Disabled when at last slide */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => api?.scrollNext()}
          disabled={current === count - 1}
          className="hidden md:flex w-12 h-12 z-10 rounded-full bg-white hover:bg-white/70 transition-all duration-200 ml-4 disabled:opacity-0 disabled:cursor-not-allowed disabled:hover:bg-white"
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

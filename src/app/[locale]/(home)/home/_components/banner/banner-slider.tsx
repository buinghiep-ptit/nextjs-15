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

export default function BannerSlider() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const slides = [
    {
      title: "Đăng ký thành viên với vô vàn quà tặng!",
      subtitle: "Hãy xem ngay các cộng đồng nghệ sĩ!",
      imageSrc: "/images/home/banner-slider-1.png",
    },
    {
      title: "Khám phá thế giới âm nhạc độc quyền!",
      subtitle: "Kết nối với nghệ sĩ yêu thích của bạn.",
      imageSrc: "/images/home/banner-slider-1.png",
    },
    {
      title: "Tham gia sự kiện trực tuyến hấp dẫn!",
      subtitle: "Đừng bỏ lỡ cơ hội gặp gỡ thần tượng.",
      imageSrc: "/images/home/banner-slider-1.png",
    },
    {
      title: "Ưu đãi đặc biệt dành cho Fanverse!",
      subtitle: "Nhận quà tặng độc quyền mỗi tháng.",
      imageSrc: "/images/home/banner-slider-1.png",
    },
  ];

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    // The design shows the *second* visible item having the border.
    // `selectedScrollSnap()` gives the index of the *first* item in the visible group.
    // So, the active item's index is `selectedScrollSnap() + 1`.
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Container maxWidth="xl" className="relative w-full">
      <div className="flex items-center justify-center">
        {/* Left Arrow - Moved outside Carousel */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => api?.scrollPrev()}
          className="hidden md:flex w-12 h-12 z-10 rounded-full bg-white  items-center justify-center hover:bg-white/70 transition-colors duration-200 mr-4"
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
          className="w-full p-0 md:p-8 bg-white rounded-2xl md:rounded-4xl" // Added max-w to control carousel width
        >
          <CarouselContent className="-ml-4">
            {slides.map((slide, index) => (
              <CarouselItem
                key={index}
                className="pl-4 md:basis-1/2 lg:basis-1/2"
              >
                <SliderCard
                  title={slide.title}
                  subtitle={slide.subtitle}
                  // `isActive` is true for the item that is `current` (which is `selectedScrollSnap() + 1`)
                  isActive={index === current}
                  imageSrc={slide.imageSrc}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Removed CarouselPrevious and CarouselNext from here */}

          <div className="flex justify-center mt-4 md:mt-8 space-x-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-1 rounded-full transition-all duration-300 ease-in-out ${
                  index === current - 1 // `current` is 1-indexed, `index` is 0-indexed
                    ? "w-8 bg-gradient-to-r from-[#FF2FC1] via-[#744DF1] to-[#005]"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>

        {/* Right Arrow - Moved outside Carousel */}
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

      {/* Indicators */}
    </Container>
  );
}

import React from "react";
import { HStack, Stack } from "@/components/ui/layout";
import Image from "next/image";
import { H1, Large } from "@/components/ui/typography";
import { Container } from "@/components/ui/container";

export default function Intro() {
  return (
    <Container className="py-8 md:py-20">
      <HStack className="items-stretch justify-between md:px-2">
        <Stack justify="end">
          <Image
            src="/images/home/gif-hero-l.png"
            alt="Hero"
            width={72}
            height={72}
          />
        </Stack>

        <Stack className="gap-2 md:gap-6" align="center" justify="center">
          <H1 className="text-2xl md:text-[64px] text-center leading-[1.125]">
            Bringing Idols & Fans <br /> Closer Than Ever!
          </H1>
          <Large
            variant="secondary"
            className="text-center font-normal leading-[1.25] text-sm md:text-lg"
          >
            A platform where you can follow, chat, get exclusive content, and
            join events with your favorite idols.
            <br />
            Made for true fans – where your love is seen and felt by your idols!
          </Large>
        </Stack>
        <Stack justify="start">
          <Image
            src="/images/home/gif-hero-r.png"
            alt="Hero"
            width={96}
            height={96}
          />
        </Stack>
      </HStack>
    </Container>
  );
}

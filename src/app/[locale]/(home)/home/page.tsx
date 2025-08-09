import React from "react";
import Intro from "./_components/intro";
import BannerSlider from "./_components/banner/banner-slider";
import ArtistGrid from "./_components/trending/artist-grid";
import MyCommunities from "./_components/my-communities";
import SocialFeedExample from "./_components/post";

export default function HomePage() {
  return (
    <>
      <div
        className="pt-25"
        style={{
          background: `url("/images/home/bg-banner.png")`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Intro />
        <BannerSlider />
        <MyCommunities />
        <ArtistGrid />
      </div>
      <SocialFeedExample />
    </>
  );
}

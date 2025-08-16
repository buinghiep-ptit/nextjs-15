import Intro from "./_components/intro";
import BannerSlider from "./_components/banner/banner-slider";
import ArtistGrid from "./_components/fan-community/artist-grid";
import MyCommunities from "./_components/my-communities";
import SocialFeedExample from "./_components/post";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "HomePage" });

  return {
    title: t("title") + " | Trang chủ",
    description: t("about") + " | Trang chủ",
  };
}

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

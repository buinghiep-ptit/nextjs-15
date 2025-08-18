import Intro from "./_components/intro";
import BannerSlider from "./_components/banner/banner-slider";
import MyCommunities from "./_components/my-communities";
import SocialFeedExample from "./_components/post";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import FanCommunity from "./_components/fan-community";
import Demo from "./_components/demo";

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
        <FanCommunity />
      </div>
      <SocialFeedExample />
      <Demo />
    </>
  );
}

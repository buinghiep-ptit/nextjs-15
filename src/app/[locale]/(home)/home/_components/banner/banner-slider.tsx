import { homeApiRequest } from "@/services/home.service";
import SliderList from "./slider-list";

export default async function BannerSlider() {
  const data = await homeApiRequest.getBanners(0, 10);

  return <SliderList banners={data.payload?.content?.content || []} />;
}

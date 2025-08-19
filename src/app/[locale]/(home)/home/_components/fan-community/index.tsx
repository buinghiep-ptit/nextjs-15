import { homeApiRequest } from "@/services/home.service";
import ArtistGrid from "./artist-grid";

export default async function FanCommunity() {
  const data = await homeApiRequest.getFanCommunities();

  return <ArtistGrid communities={data.payload?.content || []} />;
}

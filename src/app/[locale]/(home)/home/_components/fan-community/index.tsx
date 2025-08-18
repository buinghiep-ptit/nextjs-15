import { homeApiRequest } from "@/services/home.service";
import ArtistGrid from "./artist-grid";

export default async function FanCommunity() {
  const data = await homeApiRequest.getPublicCommunities();

  return <ArtistGrid communities={data.payload?.content || []} />;
}

import { communityApiRequest } from "@/services/community.servce";
import CommunityPedia from "./_components/community-pedia";

export default async function ArtistProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: communityId } = await params;

  const data = await communityApiRequest.getPublicCommunityPedia(
    communityId?.split("-")?.pop() || ""
  );

  return (
    <CommunityPedia
      community={{
        ...data.payload?.content,
        communityHashedId: communityId?.split("-")?.pop() || "",
      }}
    />
  );
}

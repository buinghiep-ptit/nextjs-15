import axiosInstance from "@/lib/axios";
import { cacheUtils, httpCached } from "@/lib/http";
import { CommunityPediaResponse } from "@/types/community.type";

export const communityApiRequest = {
  getPublicCommunityPedia: (id: string) =>
    httpCached.post<CommunityPediaResponse>(`/community/api/public/${id}`, {
      tags: [cacheUtils.tags.communityPedia],
      revalidate: 300, // 5 minutes
    }),

  joinCommunity: async (body: {
    communityHashedId?: string;
    userName?: string;
    avartarImgUrl?: string;
  }) => {
    const response = await axiosInstance.post(
      `/community/api/community/join-community`,
      body
    );
    return response.data;
  },
};

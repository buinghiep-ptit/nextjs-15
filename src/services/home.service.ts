import { cacheUtils, httpCached } from "@/lib/http";
import { BannerResponse } from "@/types/banner.type";
import { CommunityResponse } from "@/types/community.type";

export const homeApiRequest = {
  getBanners: async (page: number, size: number) => {
    try {
      return await httpCached.get<BannerResponse>(
        `/fan/api/public/banner?page=${page}&pageSize=${size}`,
        {
          tags: [cacheUtils.tags.banners],
          revalidate: 300, // 5 minutes
        }
      );
    } catch (error) {
      console.error("Error fetching banners:", error);
      throw error;
    }
  },

  getPublicCommunities: async () => {
    try {
      return await httpCached.get<CommunityResponse>(
        `/fan/api/public/community`,
        {
          tags: [cacheUtils.tags.communities],
          revalidate: 300, // 5 minutes
        }
      );
    } catch (error) {
      console.error("Error fetching communities:", error);
      throw error;
    }
  },
};

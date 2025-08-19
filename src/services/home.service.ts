import { cacheUtils, httpCached } from "@/lib/http";
import { BannerResponse } from "@/types/banner.type";
import { CommonResponse, Community } from "@/types/community.type";

export const homeApiRequest = {
  getBanners: (page: number, size: number) =>
    httpCached.get<BannerResponse>(
      `/fan/api/public/banner?page=${page}&pageSize=${size}`,
      {
        tags: [cacheUtils.tags.banners],
        revalidate: 300, // 5 minutes
      }
    ),
  getPublicCommunities: () =>
    httpCached.get<CommonResponse<Community>>(`/fan/api/public/community`, {
      tags: [cacheUtils.tags.communities],
      revalidate: 300, // 5 minutes
    }),
};

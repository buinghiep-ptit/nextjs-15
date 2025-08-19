import axiosInstance from "@/lib/axios";
import { cacheUtils, httpCached } from "@/lib/http";
import { BannerResponse } from "@/types/banner.type";
import { CommonResponse, Community } from "@/types/community.type";

export const homeApiRequest = {
  getBanners: (page: number, size: number) =>
    httpCached.get<BannerResponse>(
      `/fan/api/public/banner?page=${page}&size=${size}`,
      {
        tags: [cacheUtils.tags.banners],
        revalidate: 300, // 5 minutes
      }
    ),

  getMyCommunities: async (page: number, size: number) => {
    const response = await axiosInstance.get<{
      content?: CommonResponse<Community>;
    }>(`/fan/api/community/my-communities?page=${page}&size=${size}`);
    return response?.data?.content;
  },
  getFanCommunities: () =>
    httpCached.get<CommonResponse<Community>>(`/fan/api/public/community`, {
      tags: [cacheUtils.tags.publicCommunities],
      revalidate: 300, // 5 minutes
    }),
};

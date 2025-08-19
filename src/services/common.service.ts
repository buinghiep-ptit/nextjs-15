import axiosInstance from "@/lib/axios";
import { CommonResponse, Community } from "@/types/community.type";

const URL_PUBLIC_COMMUNITIES = "/fan/api/public/community";

export const getPublicCommunities = async () => {
  const response = await axiosInstance.get<CommonResponse<Community>>(
    URL_PUBLIC_COMMUNITIES
  );
  return response.data;
};

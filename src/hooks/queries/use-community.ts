import { getPublicCommunities } from "@/services/common.service";
import { communityApiRequest } from "@/services/community.servce";
import { homeApiRequest } from "@/services/home.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useListPublicCommunities = () =>
  useQuery({
    queryKey: ["public-communities"],
    queryFn: () => getPublicCommunities(),
    placeholderData: (old) => old,
  });

export const useListMyCommunities = (page: number, size: number) =>
  useQuery({
    queryKey: ["my-communities", page, size],
    queryFn: () => homeApiRequest.getMyCommunities(page, size), // loi await json xem co phai do page size khong?
    placeholderData: (old) => old,
  });

export const useJoinCommunity = () =>
  useMutation({
    mutationFn: (body: {
      communityHashedId?: string;
      userName?: string;
      avartarImgUrl?: string;
    }) => communityApiRequest.joinCommunity(body),
  });

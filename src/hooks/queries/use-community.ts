import { getPublicCommunities } from "@/services/common.service";
import { useQuery } from "@tanstack/react-query";

export const useListCommunities = () =>
  useQuery({
    queryKey: ["public-communities"],
    queryFn: () => getPublicCommunities(),
    placeholderData: (old) => old,
  });

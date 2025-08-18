export interface Community {
  id?: string;
  imageUrl?: string;
  coverUrl?: string;
  communityName?: string;
}

export interface CommunityResponse {
  content?: Community[];
  totalElements?: number;
  numberOfElements?: number;
  totalPages?: number;
  page?: number;
  size?: number;
}

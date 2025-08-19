export interface Community {
  id?: string;
  imageUrl?: string;
  coverUrl?: string;
  communityName?: string;
}

export interface CommunityPedia {
  communityHashedId?: string;
  id?: string;
  imageUrl?: string;
  coverUrl?: string;
  emailContact?: string;
  bioDescription?: string;
  name?: string;
  kols?: Kols[];
}

export interface CommunityPediaResponse {
  content: CommunityPedia;
}

export interface Kols {
  name?: string;
  id?: number;
  imageUrl?: string;
  coverUrl?: string;
  bioDescription?: string;
}

export interface CommonResponse<T> {
  content?: T[];
  totalElements?: number;
  numberOfElements?: number;
  totalPages?: number;
  page?: number;
  size?: number;
}

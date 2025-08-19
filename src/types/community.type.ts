export interface Community {
  id?: string;
  imageUrl?: string;
  coverUrl?: string;
  communityName?: string;
}

export interface CommonResponse<T> {
  content?: T[];
  totalElements?: number;
  numberOfElements?: number;
  totalPages?: number;
  page?: number;
  size?: number;
}

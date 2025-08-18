import { PaginationParams } from ".";

export interface Banner {
  priority?: number;
  id?: string;
  url?: string;
  title?: string;
  imageUrl?: string;
  visibleTo?: number;
}

export interface BannerResponse {
  content?: {
    content?: Banner[];
    pageable?: PaginationParams;
  };
}

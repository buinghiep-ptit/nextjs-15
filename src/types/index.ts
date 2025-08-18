export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  pageable?: {
    sort?: {
      sorted?: boolean;
      unsorted?: boolean;
      empty?: boolean;
    };
    pageNumber?: number;
    pageSize?: number;
    offset?: number;
    paged?: boolean;
    unpaged?: boolean;
  };
  last?: boolean;
  totalElements?: number;
  totalPages?: number;
  size?: number;
  page?: number;
  number?: number;
  numberOfElements?: number;
  first?: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
}

export interface PageProps {
  params: {
    locale: string;
    slug?: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

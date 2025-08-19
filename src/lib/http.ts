/* eslint-disable @typescript-eslint/no-explicit-any */
import { unstable_cache } from "next/cache";

type CustomOptions = RequestInit & {
  baseUrl?: string | undefined;
  revalidate?: number | false; // Cache time in seconds
  tags?: string[]; // Cache tags for revalidation
  cache?: RequestCache; // 'force-cache' | 'no-store' | 'reload' | 'no-cache' | 'default'
};

class HttpError extends Error {
  status: number;
  payload: any;
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeaders = {
    "Content-Type": "application/json",
  };

  const baseUrl =
    options?.baseUrl === undefined
      ? process.env.NEXT_PUBLIC_API_URL
      : options.baseUrl;

  const fullUrl = url?.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  // Setup cache options
  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  };

  // Configure cache behavior
  if (options?.cache) {
    fetchOptions.cache = options.cache;
  }

  // For GET requests, set default cache behavior if not specified
  if (method === "GET" && !options?.cache) {
    fetchOptions.cache = "default";
  }

  // For mutations (POST, PUT, DELETE), disable cache by default
  if (["POST", "PUT", "DELETE"].includes(method) && !options?.cache) {
    fetchOptions.cache = "no-store";
  }

  // Add Next.js cache tags and revalidation
  if (options?.tags || options?.revalidate !== undefined) {
    fetchOptions.next = {
      ...(fetchOptions.next as any),
      tags: options.tags,
      revalidate: options.revalidate,
    };
  }

  const res = await fetch(fullUrl, fetchOptions);

  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    throw new HttpError(data);
  }

  return data;
};

// Cached version of request for server-side caching
const cachedRequest = async <Response>(
  method: "GET",
  url: string,
  options?: CustomOptions | undefined
) => {
  if (method !== "GET") {
    // Non-GET requests should not be cached
    return request<Response>(method, url, options);
  }

  const cacheKey = `${method}-${url}-${JSON.stringify(options?.body || {})}`;
  const tags = options?.tags || ["api"];
  const revalidate = options?.revalidate ?? 3600; // Default 1 hour

  const cachedFn = unstable_cache(
    async () => request<Response>(method, url, options),
    [cacheKey],
    {
      tags,
      revalidate: revalidate === false ? false : revalidate,
    }
  );

  return cachedFn();
};

export const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body?: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body?: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body?: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};

// Enhanced version with server-side caching
export const httpCached = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return cachedRequest<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body?: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body?: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body?: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};

// Utility functions for cache management
export const cacheUtils = {
  // Revalidate specific tags
  revalidateTag: async (tag: string) => {
    if (typeof window === "undefined") {
      const { revalidateTag } = await import("next/cache");
      revalidateTag(tag);
    }
  },

  // Revalidate specific path
  revalidatePath: async (path: string, type?: "layout" | "page") => {
    if (typeof window === "undefined") {
      const { revalidatePath } = await import("next/cache");
      revalidatePath(path, type);
    }
  },

  // Common cache tags
  tags: {
    banners: "banners",
    communities: "communities",
    users: "users",
    posts: "posts",
    comments: "comments",
    profile: "profile",
    dashboard: "dashboard",
  } as const,
};

// Preset configurations for common use cases
export const httpPresets = {
  // Short cache for frequently changing data
  shortCache: {
    revalidate: 300, // 5 minutes
    tags: ["short-cache"],
  },

  // Medium cache for moderately changing data
  mediumCache: {
    revalidate: 1800, // 30 minutes
    tags: ["medium-cache"],
  },

  // Long cache for static data
  longCache: {
    revalidate: 3600, // 1 hour
    tags: ["long-cache"],
  },

  // No cache for real-time data
  noCache: {
    cache: "no-store" as RequestCache,
  },

  // Force cache for static content
  forceCache: {
    cache: "force-cache" as RequestCache,
    revalidate: false,
  },
};

// Example usage helpers
export const apiClient = {
  // User-related APIs
  users: {
    getProfile: (id: string) =>
      httpCached.get(`/users/${id}`, {
        tags: [cacheUtils.tags.users, `user-${id}`],
        revalidate: 1800, // 30 minutes
      }),

    updateProfile: (id: string, data: any) =>
      http.put(`/users/${id}`, data).then(async (result) => {
        // Revalidate related caches after update
        await cacheUtils.revalidateTag(`user-${id}`);
        await cacheUtils.revalidateTag(cacheUtils.tags.users);
        return result;
      }),
  },

  // Posts-related APIs
  posts: {
    getList: (page = 1) =>
      httpCached.get(`/posts?page=${page}`, {
        tags: [cacheUtils.tags.posts, `posts-page-${page}`],
        revalidate: 600, // 10 minutes
      }),

    getDetail: (id: string) =>
      httpCached.get(`/posts/${id}`, {
        tags: [cacheUtils.tags.posts, `post-${id}`],
        revalidate: 300, // 5 minutes
      }),

    create: (data: any) =>
      http.post("/posts", data).then(async (result) => {
        await cacheUtils.revalidateTag(cacheUtils.tags.posts);
        return result;
      }),

    update: (id: string, data: any) =>
      http.put(`/posts/${id}`, data).then(async (result) => {
        await cacheUtils.revalidateTag(`post-${id}`);
        await cacheUtils.revalidateTag(cacheUtils.tags.posts);
        return result;
      }),

    delete: (id: string) =>
      http.delete(`/posts/${id}`).then(async (result) => {
        await cacheUtils.revalidateTag(`post-${id}`);
        await cacheUtils.revalidateTag(cacheUtils.tags.posts);
        return result;
      }),
  },
};

export default http;

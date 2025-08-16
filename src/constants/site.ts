export const siteConfig = {
  name: "Fanverse",
  description:
    "A modern web application built with Next.js, TypeScript, and Tailwind CSS",
  url: "https://fanverse.com",
  ogImage: "https://your-domain.com/og.jpg",
  links: {
    twitter: "https://twitter.com/yourusername",
    github: "https://github.com/yourusername/your-repo",
  },
} as const;

export const locales = ["en", "vi"] as const;

export const ACCESS_TOKEN_KEY = "fv_access_token";
export const REFRESH_TOKEN_KEY = "fv_refresh_token";
export const USER_INFO_STORAGE_KEY = "user_info";

export const SESSION_TIMEOUT = 3600;
export const TOKEN_REFRESH_BUFFER_SECONDS = 3540;

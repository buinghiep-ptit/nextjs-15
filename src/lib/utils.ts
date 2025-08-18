import { ACCESS_TOKEN_KEY } from "@/constants";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validates if a string is a valid HTTP/HTTPS URL
 * @param url - The URL string to validate
 * @returns true if the URL is valid, false otherwise
 */
export function isValidHttpUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  return url.startsWith("http://") || url.startsWith("https://");
}

/**
 * Gets a valid image source URL or falls back to a default image
 * @param src - The source URL to validate
 * @param defaultSrc - The default image source to use if validation fails
 * @returns The validated source URL or the default image source
 */
export function getValidImageSrc(src: string, defaultSrc: string): string {
  if (!src || !isValidHttpUrl(src)) {
    return defaultSrc;
  }
  return src;
}

/**
 * Gets a valid image source URL with common fallback options
 * @param src - The source URL to validate
 * @param type - The type of image for appropriate fallback
 * @returns The validated source URL or an appropriate fallback image
 */
export function getImageWithFallback(
  src: string,
  type: "avatar" | "cover" | "general" = "general"
): string {
  if (isValidHttpUrl(src)) {
    return src;
  }

  // Return appropriate fallback based on image type
  switch (type) {
    case "avatar":
      return "/icons/avatar-icon.svg";
    case "cover":
      return "/images/image_not_available.png";
    case "general":
    default:
      return "/images/image_not_available.png";
  }
}

export function formatDate(date: Date, locale: string = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function isEqual(a: unknown, b: unknown): boolean {
  if (a === null || a === undefined || b === null || b === undefined) {
    return a === b;
  }

  if (typeof a !== typeof b) {
    return false;
  }

  if (
    typeof a === "string" ||
    typeof a === "number" ||
    typeof a === "boolean"
  ) {
    return a === b;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }

    return a.every((item, index) => isEqual(item, b[index]));
  }

  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every((key) =>
      isEqual(a[key as keyof typeof a], b[key as keyof typeof b])
    );
  }

  return false;
}

export async function setSession(accessToken?: string) {
  try {
    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    } else {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    }
  } catch (error) {
    console.error("Error during set session:", error);
    throw error;
  }
}

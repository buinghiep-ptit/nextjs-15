import { homeApiRequest } from "@/services/home.service";
import SliderList from "./slider-list";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export default async function BannerSlider() {
  try {
    // Check if API URL is configured
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.warn("NEXT_PUBLIC_API_URL is not configured");
      return (
        <ErrorBoundary>
          <SliderList banners={[]} />
        </ErrorBoundary>
      );
    }

    const data = await homeApiRequest.getBanners(0, 10);

    // Validate data structure - handle nested content structure
    const banners =
      data?.payload?.content?.content || data?.payload?.content || [];

    // Ensure banners is an array and has valid data
    if (!Array.isArray(banners)) {
      console.warn("Banners data is not an array:", banners);
      return (
        <ErrorBoundary>
          <SliderList banners={[]} />
        </ErrorBoundary>
      );
    }

    return (
      <ErrorBoundary>
        <SliderList banners={banners} />
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("Error fetching banners:", error);

    // Log additional error details for debugging
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    // Return empty slider on error to prevent render failure
    return (
      <ErrorBoundary>
        <SliderList banners={[]} />
      </ErrorBoundary>
    );
  }
}

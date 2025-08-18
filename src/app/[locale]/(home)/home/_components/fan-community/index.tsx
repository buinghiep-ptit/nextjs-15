import { homeApiRequest } from "@/services/home.service";
import ArtistGrid from "./artist-grid";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export default async function FanCommunity() {
  try {
    // Check if API URL is configured
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.warn("NEXT_PUBLIC_API_URL is not configured");
      return (
        <ErrorBoundary>
          <ArtistGrid communities={[]} />
        </ErrorBoundary>
      );
    }

    const data = await homeApiRequest.getPublicCommunities();

    // Validate data structure
    const communities = data?.payload?.content || [];

    // Ensure communities is an array and has valid data
    if (!Array.isArray(communities)) {
      console.warn("Communities data is not an array:", communities);
      return (
        <ErrorBoundary>
          <ArtistGrid communities={[]} />
        </ErrorBoundary>
      );
    }

    return (
      <ErrorBoundary>
        <ArtistGrid communities={communities} />
      </ErrorBoundary>
    );
  } catch (error) {
    console.error("Error fetching communities:", error);

    // Log additional error details for debugging
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    // Return empty grid on error to prevent render failure
    return (
      <ErrorBoundary>
        <ArtistGrid communities={[]} />
      </ErrorBoundary>
    );
  }
}

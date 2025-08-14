import QueryProvider from "./query-provider";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { ThemeProvider } from "./theme-provider";
import AuthProvider from "./auth-provider";
import { ArtistProvider } from "./artist-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="systeq"
          enableSystem
          disableTransitionOnChange
        >
          <ArtistProvider>
            <QueryProvider>{children}</QueryProvider>
          </ArtistProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

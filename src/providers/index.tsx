import QueryProvider from "./query-provider";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { ThemeProvider } from "./theme-provider";
import AuthProvider from "./auth-provider";

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
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

"use client";

import React from "react";
import { Button } from "./button";

interface Props {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const DefaultErrorFallback: React.FC<{ error: Error; reset: () => void }> = ({
  error,
  reset,
}) => (
  <div className="flex flex-col items-center justify-center min-h-[200px] p-6 text-center">
    <div className="mb-4">
      <svg
        className="w-16 h-16 text-red-500 mx-auto"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    </div>
    <h2 className="text-xl font-semibold text-gray-900 mb-2">
      Something went wrong
    </h2>
    <p className="text-gray-600 mb-4 max-w-md">
      {error.message || "An unexpected error occurred. Please try again."}
    </p>
    <div className="space-x-3">
      <Button onClick={reset} variant="default">
        Try again
      </Button>
      <Button onClick={() => window.location.reload()} variant="outline">
        Reload page
      </Button>
    </div>
    {process.env.NODE_ENV === "development" && (
      <details className="mt-4 text-left max-w-md">
        <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
          Error details (development only)
        </summary>
        <pre className="mt-2 text-xs text-red-600 bg-red-50 p-3 rounded overflow-auto">
          {error.stack}
        </pre>
      </details>
    )}
  </div>
);

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    // In production, you might want to log to an error reporting service
    if (process.env.NODE_ENV === "production") {
      console.error("Production error:", error.message);
      // Example: log to external service
      // logErrorToService(error, errorInfo);
    }
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error!} reset={this.reset} />;
    }

    return this.props.children;
  }
}

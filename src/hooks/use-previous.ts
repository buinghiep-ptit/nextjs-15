"use client";

import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

// Hook to compare if value changed
export function useChanged<T>(value: T): boolean {
  const previousValue = usePrevious(value);
  return previousValue !== value;
}

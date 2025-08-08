"use client";

import { useState, useCallback } from "react";

export function useClipboard(): {
  copiedText: string | null;
  copy: (text: string) => Promise<boolean>;
  isSupported: boolean;
} {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const isSupported =
    typeof navigator !== "undefined" && "clipboard" in navigator;

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (!isSupported) {
        console.warn("Clipboard API not supported");
        return false;
      }

      try {
        await navigator.clipboard.writeText(text);
        setCopiedText(text);

        // Clear copied text after 2 seconds
        setTimeout(() => setCopiedText(null), 2000);

        return true;
      } catch (error) {
        console.error("Failed to copy text: ", error);
        setCopiedText(null);
        return false;
      }
    },
    [isSupported]
  );

  return { copiedText, copy, isSupported };
}

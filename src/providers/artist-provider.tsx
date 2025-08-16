"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Artist {
  id: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  followerCount: string;
}

interface ArtistContextType {
  currentArtist: Artist | null;
  setCurrentArtist: (artist: Artist) => void;
  generateArtistSlug: (artist: Artist) => string;
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

interface ArtistProviderProps {
  children: ReactNode;
}

export function ArtistProvider({ children }: ArtistProviderProps) {
  const [currentArtist, setCurrentArtist] = useState<Artist | null>(null);

  // Generate URL slug from artist name + id
  const generateArtistSlug = (artist: Artist): string => {
    const nameSlug = artist.name
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^\w-]/g, "") // Remove special characters except hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .trim();

    return `${nameSlug}-${artist.id}`;
  };

  const value: ArtistContextType = {
    currentArtist,
    setCurrentArtist,
    generateArtistSlug,
  };

  return (
    <ArtistContext.Provider value={value}>{children}</ArtistContext.Provider>
  );
}

export function useArtist() {
  const context = useContext(ArtistContext);
  if (context === undefined) {
    throw new Error("useArtist must be used within an ArtistProvider");
  }
  return context;
}

export default ArtistProvider;

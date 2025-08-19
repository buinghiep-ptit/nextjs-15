"use client";

import { slugify } from "@/lib/utils";
import { Community } from "@/types/community.type";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ArtistContextType {
  currentArtist: Community | null;
  setCurrentArtist: (artist: Community) => void;
  generateArtistSlug: (artist: Community) => string;
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

interface ArtistProviderProps {
  children: ReactNode;
}

export function ArtistProvider({ children }: ArtistProviderProps) {
  const [currentArtist, setCurrentArtist] = useState<Community | null>(null);

  // Generate URL slug from artist name + id
  const generateArtistSlug = (artist: Community): string => {
    return slugify(artist?.communityName ?? "", artist.id);
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

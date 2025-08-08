import React, { Suspense } from "react";
import { SearchParamsContent } from "./_components/search";

export default function AboutPage() {
  return (
    <div>
      <h1>AboutPage Static site </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsContent />
      </Suspense>
    </div>
  );
}

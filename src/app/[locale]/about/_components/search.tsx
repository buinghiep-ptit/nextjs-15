"use client";

import { useSearchParams } from "next/navigation";

export function SearchParamsContent() {
  const searchParams = useSearchParams();
  const param = searchParams.get("example"); // Ví dụ lấy param 'example'

  return (
    <div>
      <p>Search Param (example): {param || "None"}</p>
    </div>
  );
}

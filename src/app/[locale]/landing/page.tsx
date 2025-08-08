import React from "react";
import Navbar from "./_components/navbar";

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsList = await searchParams;
  console.log(searchParamsList);
  console.log("LandingPage");
  return (
    <div>
      LandingPage
      <Navbar />
    </div>
  );
}

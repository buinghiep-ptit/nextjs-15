import React from "react";

// export async function generateStaticParams() {
//   return [{ id: "1" }];
// }

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>NewsDetailPage {id ?? "id"} </div>;
}

import { headers } from "next/headers";

export default async function Navbar() {
  const headersList = await headers();
  console.log("Navbar");
  console.log(headersList.get("cookie"));
  return <div>Navbar</div>;
}

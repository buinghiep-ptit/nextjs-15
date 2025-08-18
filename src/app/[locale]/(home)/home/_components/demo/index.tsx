import { homeApiRequest } from "@/services/home.service";
import React from "react";

export default async function Demo() {
  const data = await homeApiRequest.getDemo();

  console.log(data);

  return <div>{JSON.stringify(data)}</div>;
}

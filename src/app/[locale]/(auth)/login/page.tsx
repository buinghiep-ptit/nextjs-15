import React from "react";
import { cookies } from "next/headers";
import LoginForm from "./_components/form";

export default async function LoginPage() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token");

  console.log(token);

  return (
    <>
      <h1>LoginPage {new Date().toLocaleString()}</h1>
      <LoginForm />
    </>
  );
}

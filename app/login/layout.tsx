import { redirect } from "next/navigation";
import React from "react";
import { auth } from "../../auth";

export default async function LoginLayout({
  children,
}: React.PropsWithChildren) {
  const session = await auth();

  if (session?.user) {
    return redirect("/");
  }

  return <>{children}</>;
}

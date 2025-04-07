import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type WithAuthRedirectProps = React.PropsWithChildren<unknown>;

export function withAuthRedirect<P extends WithAuthRedirectProps>(
  WrappedComponent: React.ComponentType<P>
) {
  const Wrapper: React.FC<P> = async (props) => {
    const session = await auth();

    if (!session?.user) {
      redirect("/login");
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
}

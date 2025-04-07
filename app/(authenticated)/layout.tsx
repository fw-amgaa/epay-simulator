import { Layout } from "@/components/layout";
import React from "react";
import { withAuthRedirect } from "./auth-redirect";

const PageLayout = ({ children }: React.PropsWithChildren) => (
  <Layout>{children}</Layout>
);

export default withAuthRedirect(PageLayout);

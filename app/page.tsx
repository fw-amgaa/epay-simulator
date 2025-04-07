import { Suspense } from "react";
import { NavigateToResource } from "./navigate-to-resource";

export default function Home() {
  return (
    <Suspense>
      <NavigateToResource />
    </Suspense>
  );
}

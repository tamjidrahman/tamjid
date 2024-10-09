import PostSearch from "@/components/PostSearch"; // Your component
import { Suspense } from "react";

export default function PageWrapper() {
  return (
    <Suspense>
      <PostSearch />
    </Suspense>
  );
}

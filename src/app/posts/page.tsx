import { Suspense } from "react";
import PostPage from "./PostPage"; // Your component

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostPage />
    </Suspense>
  );
}

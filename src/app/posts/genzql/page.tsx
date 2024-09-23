import React from "react";

import TextLink from "@/components/text/text-link";

import { posts, Post, PostPage } from "@/components/postPage";

const post: Post = posts.find((post) => post.id === "genzql")!;

export default function Page() {
  return (
    <PostPage post={post}>
      <TextLink href="www.genzql.com">genzql</TextLink>
    </PostPage>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import PreviewablePostCard from "./postCard";
import { TopNavBar } from "@/components/TopNavBar";
import { posts } from "@/components/Posts";

export default function DemoPage() {
  const [isHovered, setIsHovered] = useState("");

  return (
    <div>
      <div className="flex justify-center mt-10">
        <TopNavBar />
      </div>
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <Link
              href={`/posts/${post.id}`} // Redirect to the post's detailed pagediv
              key={post.id}
              onMouseEnter={() => setIsHovered(post.id)} // Set hover to the post ID
              onMouseLeave={() => setIsHovered("")}
            >
              <PreviewablePostCard
                key={post.id}
                post={post}
                isExpanded={isHovered == post.id}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

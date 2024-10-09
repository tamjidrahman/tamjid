"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Post } from "@/components/postPage";
import Link from "next/link";

const PreviewablePostCard: React.FC<{
  post: Post;
  isExpanded: boolean;
}> = ({ post }) => {
  // Since we're nesting interactive components (the badge), we need to prevent the outer link from being triggered
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formattedDate = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
  }).format(post.date);

  const handleNestedTagClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation(); // Prevents the outer link from being triggered
  };

  return (
    <div
      className={`group overflow-hidden transition-all duration-300 ease-in-out transform`}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">{post.title}</CardTitle>
          <div className="space-x-1">
            {isClient
              ? post.tags.map((tag) => (
                  <Link href={`/posts/?tag=${tag}`} key={tag} legacyBehavior>
                    <a onClick={handleNestedTagClick}>
                      <Badge key={tag}>{tag}</Badge>
                    </a>
                  </Link>
                ))
              : post.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
          </div>
          <CardDescription className="text-secondary">
            {post.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4"></CardContent>
        <CardFooter className="text-accent">{formattedDate}</CardFooter>
      </Card>
    </div>
  );
};

export default PreviewablePostCard; // Export the component

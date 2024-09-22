"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";

export interface Post {
  id: string;
  title: string;
  description: string;
  body: string;
  date: Date;
  tags: string[];
}

const PreviewablePostCard: React.FC<{ post: Post; isExpanded: boolean }> = ({
  post,
  isExpanded,
}) => {
  const formattedDate = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
  }).format(post.date);

  return (
    <div
      className={`group overflow-hidden transition-all duration-300 ease-in-out transform`}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">{post.title}</CardTitle>
          <CardDescription className="text-secondary">
            {post.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <p>
            {post.body.slice(0, isExpanded ? 150 : 20)}{" "}
            {post.body.length > 80 ? "..." : ""}
          </p>
        </CardContent>
        <CardFooter className="text-accent">{formattedDate}</CardFooter>
      </Card>
    </div>
  );
};

export default PreviewablePostCard; // Export the component

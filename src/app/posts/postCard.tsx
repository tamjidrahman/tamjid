"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Post } from "@/components/Posts";

const PreviewablePostCard: React.FC<{ post: Post; isExpanded: boolean }> = ({
  post,
  isExpanded,
}) => {
  const formattedDate = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
  }).format(post.date);

  const textCutOff = isExpanded ? 150 : 20;
  return (
    <div
      className={`group overflow-hidden transition-all duration-300 ease-in-out transform`}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">{post.title}</CardTitle>
          <div className="space-x-1">
            {post.tags.map(
              (tag) =>
                tag && (
                  <Badge key={tag} className="w-min">
                    {tag}
                  </Badge>
                ),
            )}
          </div>
          <CardDescription className="text-secondary">
            {post.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <p>
            {post.body.slice(0, textCutOff)}{" "}
            {post.body.length > textCutOff ? "..." : ""}
          </p>
        </CardContent>
        <CardFooter className="text-accent">{formattedDate}</CardFooter>
      </Card>
    </div>
  );
};

export default PreviewablePostCard; // Export the component

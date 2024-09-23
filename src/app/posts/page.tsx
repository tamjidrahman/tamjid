"use client";

import { useState } from "react";
import Link from "next/link";
import PreviewablePostCard from "./postCard";
import { TopNavBar } from "@/components/TopNavBar";
import { posts } from "@/components/Posts";
import MultipleSelector, { Option } from "@/components/ui/multi-selector";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PostPage() {
  const [isHovered, setIsHovered] = useState("");
  const allUniqueTags = posts.reduce((acc: string[], post) => {
    post.tags.forEach((tag) => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });
    return acc;
  }, []);

  const tagOptions: Option[] = allUniqueTags.map((tag) => ({
    label: tag,
    value: tag,
  }));
  const [selectedTags, setSelectedTags] = useState(tagOptions);
  const [tagFilterIsActive, setTagFilterIsActive] = useState(false);

  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="flex justify-center mt-10">
        <TopNavBar />
      </div>
      <div className="container mx-auto py-10">
        <h1 className="text-primary text-4xl text-center">Posts</h1>
        <div className="flex justify-center items-center">
          <Input
            className="w-auto mr-4"
            onChange={handleInputChange}
            placeholder="search..."
          />
          <div className="w-auto py-10">
            <MultipleSelector
              defaultOptions={tagOptions}
              value={tagFilterIsActive ? selectedTags : []}
              onChange={(options) => {
                if (options.length > 0) {
                  setTagFilterIsActive(true);
                  setSelectedTags(options);
                } else {
                  setTagFilterIsActive(false);
                  setSelectedTags(tagOptions);
                }
              }}
              placeholder={tagFilterIsActive ? "" : "filter tags..."}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  thats all the tags!
                </p>
              }
            />
          </div>
        </div>
        <div>
          {tagFilterIsActive && (
            <div className="text-destructive">
              only showing:{" "}
              {selectedTags.map((tag) => (
                <Badge key={tag.value}>{tag.value}</Badge>
              ))}
              <Button
                className="ml-4"
                variant={"ghost"}
                onClick={() => {
                  setSelectedTags(tagOptions);
                  setTagFilterIsActive(false);
                }}
              >
                clear
              </Button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {posts.map(
            (post) =>
              post.tags.some((tag) =>
                selectedTags.map((option) => option.label).includes(tag),
              ) &&
              (!searchTerm ||
                post.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                post.title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())) && (
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
              ),
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import PreviewablePostCard from "./postCard";
import { TopNavBar } from "@/components/TopNavBar";
import { posts } from "@/components/Posts";
import MultipleSelector, { Option } from "@/components/ui/multi-selector";
import { Input } from "@/components/ui/input";

export default function DemoPage() {
  const [isHovered, setIsHovered] = useState("");
  const allUniqueTags = [...new Set(posts.map((post) => post.tags).flat())];

  const tagOptions: Option[] = allUniqueTags.map((tag) => ({
    label: tag,
    value: tag,
  }));
  const [selectedTags, setSelectedTags] = useState(tagOptions);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update state with the new input value
  };

  return (
    <div>
      <div className="flex justify-center mt-10">
        <TopNavBar />
      </div>
      <div className="container mx-auto py-10">
        <div className="flex items-center">
          <Input
            className="w-auto mr-4"
            onChange={handleInputChange}
            placeholder="Search Posts..."
          />
          <div className="w-auto py-10">
            <MultipleSelector
              defaultOptions={tagOptions}
              value={selectedTags}
              onChange={setSelectedTags}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  no results found.
                </p>
              }
            />
          </div>
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

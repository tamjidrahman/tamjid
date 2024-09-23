"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import PreviewablePostCard from "./postCard";
import { TopNavBar } from "@/components/TopNavBar";
import { posts } from "@/components/Posts";
import MultipleSelector, { Option } from "@/components/ui/multi-selector";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTagsStr: string | null = searchParams.get("tag");
  const initialTags = initialTagsStr ? initialTagsStr.split(",") : [];
  const initialSearchTerm: string | null = useSearchParams().get("search");
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

  const [selectedTags, setSelectedTags] = useState<Option[]>(
    (initialTags.map((tag) => ({
      label: tag,
      value: tag,
    })) as Option[]) || [],
  );

  useEffect(() => {
    const newTagsStr: string | null = searchParams.get("tag");
    const newTags = newTagsStr ? newTagsStr.split(",") : [];
    const newTagOptions = newTags.map((tag) => ({
      label: tag,
      value: tag,
    })) as Option[];
    const newSearchTerm: string | null = searchParams.get("search");

    let finalUrl = `/posts`;
    // add query params if needed
    const tagQuery =
      newTagOptions.length > 0
        ? `tag=${newTagOptions.map((tag) => tag.value).join(",")}`
        : "";

    const searchQuery = newSearchTerm ? `search=${newSearchTerm}` : "";

    (tagQuery || searchQuery) && (finalUrl += "?");

    finalUrl += `${tagQuery}${tagQuery && searchQuery ? "&" : ""}${searchQuery}`;

    setSelectedTags(newTagOptions);
    setSearchTerm(newSearchTerm);
    router.replace(finalUrl);
  }, [searchParams, router]);

  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const handleFilterChange = (
    tagOptions: Option[],
    searchTerm: string | null,
  ) => {
    let finalUrl = `/posts`;

    // add query params if needed
    const tagQuery =
      tagOptions.length > 0
        ? `tag=${tagOptions.map((tag) => tag.value).join(",")}`
        : "";

    const searchQuery = searchTerm ? `search=${searchTerm}` : "";

    (tagQuery || searchQuery) && (finalUrl += "?");

    finalUrl += `${tagQuery}${tagQuery && searchQuery ? "&" : ""}${searchQuery}`;

    setSelectedTags(tagOptions);
    setSearchTerm(searchTerm);
    router.replace(finalUrl);
  };

  const handleTagUpdate = (tagOptions: Option[]) => {
    handleFilterChange(tagOptions, searchTerm);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange(selectedTags, event.target.value);
  };

  return (
    <div>
      <div className="container mx-auto py-10">
        <h1 className="text-primary text-4xl text-center">Posts</h1>
        <div className="flex justify-center items-center">
          <Input
            value={searchTerm || ""}
            className="w-auto mr-4"
            onChange={handleInputChange}
            placeholder="search..."
          />
          <div className="w-auto py-10">
            <MultipleSelector
              defaultOptions={tagOptions}
              value={selectedTags}
              onChange={handleTagUpdate}
              placeholder={selectedTags.length !== 0 ? "" : "filter tags..."}
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  thats all the tags!
                </p>
              }
            />
          </div>
        </div>
        <div>
          {(selectedTags.length > 0 || searchTerm) && (
            <div className="text-destructive">
              {selectedTags.length > 0 ? "tags: " : ""}
              {selectedTags.map((tag) => (
                <Badge key={tag.value}>{tag.value}</Badge>
              ))}
              {selectedTags.length > 0 && searchTerm && " | "}
              {searchTerm && (
                <>
                  {" "}
                  search term:{" "}
                  <span className="text-primary">{searchTerm}</span>
                </>
              )}
              <Button
                className="ml-4"
                variant={"ghost"}
                onClick={() => {
                  handleFilterChange([], null);
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
              (selectedTags.length === 0 ||
                post.tags.some((tag) =>
                  selectedTags.map((option) => option.label).includes(tag),
                )) &&
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

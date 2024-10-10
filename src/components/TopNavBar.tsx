"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { posts } from "./postPage";
import { Button } from "@/components/ui/button";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function TopNavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* About Me Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-secondary">
            About Me
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/" title="About Me" className="text-primary">
                For the discerning
              </ListItem>
              <ListItem
                href="/connect"
                title="Let's Connect"
                className="text-primary"
              >
                For the eager
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Projects Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-secondary">
            Projects
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid md:w-[400px] lg:w-[500px] text-primary gap-3 p-4 md:grid-cols-2">
              {posts.map(
                (post) =>
                  post.tags.includes("projects") && (
                    <ListItem
                      key={post.title}
                      title={post.title}
                      href={`/posts/${post.id}`}
                      tags={post.tags}
                    >
                      {post.description}
                    </ListItem>
                  ),
              )}
              <ListItem
                href="/posts?tag=projects"
                title="See More!"
                className="text-primary"
              ></ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Management Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-secondary">
            Management
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid md:w-[400px] lg:w-[500px] text-primary gap-3 p-4 md:grid-cols-2">
              {posts.map(
                (post) =>
                  post.tags.includes("management") && (
                    <ListItem
                      key={post.title}
                      title={post.title}
                      href={`/posts/${post.id}`}
                      tags={post.tags}
                    >
                      {post.description}
                    </ListItem>
                  ),
              )}
              <ListItem
                href="/posts?tag=management"
                title="See More!"
                className="text-primary"
              ></ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Etc Section */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-secondary">
            Etc
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid md:w-[400px] lg:w-[500px] text-primary gap-3 p-4 md:grid-cols-2">
              {posts.map(
                (post) =>
                  !post.tags.includes("management") &&
                  !post.tags.includes("projects") && (
                    <ListItem
                      key={post.title}
                      title={post.title}
                      href={`/posts/${post.id}`}
                      tags={post.tags}
                    >
                      {post.description}
                    </ListItem>
                  ),
              )}
              <ListItem
                href="/posts"
                title="See More!"
                className="text-primary"
              ></ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Sign-In / User Section */}
        <NavigationMenuItem>
          <div className="ml-4 flex items-center">
            <SignedIn>
              {/* Show the user button when signed in */}
              <UserButton />
            </SignedIn>
            <SignedOut>
              {/* Show the sign-in button when signed out */}
              <SignInButton mode="modal">
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { tags?: string[]; external?: boolean }
>(
  ({
    className,
    title,
    children,
    tags = [],
    external = false,
    href,
    ...props
  }) => {
    const router = useRouter();
    const handleTransition = async (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
      e.preventDefault();

      const body = document.querySelector("body");
      body?.classList.add("page-transition");
      await sleep(50);
      router.push(href || "");
      await sleep(50);
      body?.classList.remove("page-transition");
    };
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            href={href}
            onClick={!external ? handleTransition : undefined}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
            {/* Render tags */}
            <div className="mt-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";

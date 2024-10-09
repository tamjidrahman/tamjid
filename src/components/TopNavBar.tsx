"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { posts } from "./postPage";
import { TransitionLink } from "./ui/utils/TransitionLink";

export function TopNavBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>About Me</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <TransitionLink
                    href="/"
                    className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium text-primary">
                      Tamjid Rahman
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {
                        "I'm a Software Engineering Manager. I live in Cambridge, MA"
                      }
                    </p>
                  </TransitionLink>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/"
                title="Mission Statement"
                className="text-primary"
              >
                ... Coming Soon!
              </ListItem>
              <ListItem href="/" title="My README" className="text-primary">
                For the discerning
              </ListItem>
              <ListItem
                href="https://tidycal.com/tamjidarrahman/connect"
                title="Let's Connect!"
                className="text-primary"
              >
                For the eager
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
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
        <NavigationMenuItem>
          <NavigationMenuTrigger>Management</NavigationMenuTrigger>
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
        <NavigationMenuItem>
          <NavigationMenuTrigger>Etc</NavigationMenuTrigger>
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
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { tags?: string[] }
>(({ className, title, children, tags = [], ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
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
});
ListItem.displayName = "ListItem";

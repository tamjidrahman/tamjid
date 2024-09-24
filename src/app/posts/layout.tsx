"use client";
import React, { Suspense, useEffect, useState } from "react";
import { TopNavBar } from "@/components/TopNavBar";
import TextLink from "@/components/text/text-link";
import { ModeToggle } from "@/components/mode-toggle";

import { usePathname } from "next/navigation";

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const [isPostHomePage, setIsPostHomePage] = useState<boolean>(
    pathName.endsWith("/posts"),
  );
  const [postId, setPostId] = useState<string>(pathName.split("/").pop() || "");

  useEffect(() => {
    setIsPostHomePage(pathName.endsWith("/posts"));
    setPostId(pathName.split("/").pop() || "");
  }, [pathName]);

  return (
    <>
      <section>
        <div className="flex justify-center mt-10">
          <TopNavBar />
        </div>
      </section>

      {isPostHomePage ? (
        children
      ) : (
        <div className="flex flex-col mt-20 mx-auto max-w-4xl text-left">
          <div className="py-10">
            <TextLink href="/posts">posts</TextLink> /{" "}
            <a className="text-primary hover:underline" href={postId}>
              {postId}
            </a>
          </div>
          {children}
        </div>
      )}
      <div className="flex justify-center mt-40">
        <ModeToggle />
      </div>
    </>
  );
}

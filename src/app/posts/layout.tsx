import React from "react";
import { TopNavBar } from "@/components/TopNavBar";
export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section>
        <div className="flex justify-center mt-10">
          <TopNavBar />
        </div>
      </section>
      {children}
    </>
  );
}

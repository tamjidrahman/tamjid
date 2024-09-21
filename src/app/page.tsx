"use client";

import * as React from "react";

import { TopNavBar } from "@/components/TopNavBar";
import { ModeToggle } from "@/components/mode-toggle";
import { SocialMediaIcons } from "@/social-media-icons";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tamjid Rahman</title>
        <meta
          name="description"
          content="I'm a Software Engineering Manager in Cambridge, MA"
          key="desc"
        />
      </Head>
      <div className="flex justify-center mt-20">
        <h1 className="text-5xl text-primary">👋, I'm Tamjid</h1>
      </div>
      <div className="flex justify-center">
        <SocialMediaIcons />
      </div>
      <div className="flex justify-center mt-10">
        <TopNavBar />
      </div>
      <div className="flex justify-center mt-40">
        <ModeToggle />
      </div>
    </div>
  );
}

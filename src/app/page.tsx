"use client";

import { TopNavBar } from "@/components/TopNavBar";
import { ModeToggle } from "@/components/mode-toggle";
import { SocialMediaIcons } from "@/social-media-icons";
import Intro from "@/components/intro";
import Head from "next/head";
import Bunny from "@/components/bunny";

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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="flex justify-center mt-20">
        <h1 className="text-4xl text-primary">👋, I&apos;m Tamjid</h1>
      </div>
      <div className="flex justify-center">
        <SocialMediaIcons />
      </div>
      <div className="flex justify-center mt-10">
        <TopNavBar />
      </div>
      <div id="intro">
        <Intro />
      </div>
      <Bunny />
      <div className="flex justify-center mt-40">
        <ModeToggle />
      </div>
    </div>
  );
}

"use client"

import { Mail, GitBranch, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"


import * as React from "react"
import Link from "next/link"

import { TopNavBar } from "@/components/TopNavBar"
import { ModeToggle } from "@/components/mode-toggle"
import { SocialMediaIcons } from "@/social-media-icons"

export default function Home() {
  return (
    <div>
      <div className="flex justify-center mt-20">
          <h1 className="text-5xl">Tamjid Rahman</h1>
      </div>
      <div className="flex justify-center">
        <SocialMediaIcons />
      </div>
      <div className="flex justify-center mt-10">
        <TopNavBar/>
      </div>
      <div className="flex justify-center mt-40">
      <ModeToggle/>
      </div>
    </div>
  )
}

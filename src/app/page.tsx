"use client"

import { Button } from "@/components/ui/button"


import * as React from "react"
import Link from "next/link"

import { TopNavBar } from "@/components/TopNavBar"


export default function Home() {
  return (
    <div>
      <div className="flex justify-center mt-20"> {/* Adjust margin as needed */}
          <h1 className="text-2xl font-bold">Tamjid Rahman</h1> {/* Style as needed */}
      </div>
      <div className="flex justify-center">
        <TopNavBar/>
      </div>
    </div>
  )
}

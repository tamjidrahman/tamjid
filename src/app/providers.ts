// app/providers.tsx
"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { ReactNode } from "react";

// Initialize PostHog only if we're in a browser environment
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST as string,
    person_profiles: "always", // 'always' to create profiles for anonymous users
  });
}

// Define the types for the CSPostHogProvider props
interface CSPostHogProviderProps {
  children: ReactNode;
}

// Create the CSPostHogProvider component with proper typing
export function CSPostHogProvider({ children }: CSPostHogProviderProps) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

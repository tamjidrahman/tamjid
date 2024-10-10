import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  UserButton,
  SignedOut,
} from "@clerk/nextjs";

import { TopNavBar } from "@/components/TopNavBar";

import { CSPostHogProvider } from "./providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tamjid Rahman",
  description: "Hello!",
};
export const dynamic = "force-dynamic";
const clerkVariables = {
  colorPrimary: "hsl(40, 100%, 47%)",
  colorDanger: "hsl(0, 60%, 45%)",
  colorSuccess: "hsl(140, 55%, 35%)",
  colorNeutral: "hsl(40, 15%, 100%)",
  colorText: "hsl(40, 30%, 75%)",
  colorTextOnPrimaryBackground: "hsl(40, 15%, 12%)",
  colorBackground: "hsl(40, 15%, 12%)",
  colorInputBackground: "hsl(40, 15%, 12%)",
  colorInputText: "hsl(40, 30%, 75%)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: clerkVariables }}>
      <html lang="en">
        <CSPostHogProvider>
          <body className={inter.className}>
            <header className="items-center flex flex-col py-10">
              <TopNavBar />
            </header>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </body>
        </CSPostHogProvider>
      </html>
    </ClerkProvider>
  );
}

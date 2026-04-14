import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import Nav from "@/components/layout/header/Header";
import ThemeProvider from "@/components/layout/theme/ThemeProvider";
import ComingSoon from "@/components/pages/ComingSoon";
import { profileInfo } from "@/lib/site";

const SITE_MODE = process.env.NEXT_PUBLIC_SITE_MODE;
import "./globals.css";

import { Inter, Geist_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profileInfo.name} | ${profileInfo.title}`,
  description: "Personal portfolio of Luis Abhram Mata",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  let content: React.ReactNode;
  if (SITE_MODE === "coming_soon") {
    content = (
      <main className="flex flex-1 flex-col">
        <ComingSoon />
      </main>
    );
  } else {
    content = (
      <>
        <Nav />
        <main className="flex flex-1 flex-col">{children}</main>
      </>
    );
  }

  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} h-full antialiased font-sans`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950">
        <ThemeProvider>{content}</ThemeProvider>
      </body>
      
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}

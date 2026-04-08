import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import Nav from "@/components/layout/nav/Nav";
import ThemeProvider from "@/components/layout/theme/ThemeProvider";
import ComingSoon from "@/components/pages/ComingSoon";
const SITE_MODE = process.env.NEXT_PUBLIC_SITE_MODE;
import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luis Abhram",
  description: "Personal portfolio of Luis Abhram Mata",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  let content: React.ReactNode;
  if (SITE_MODE === "live") {
    content = (
      <>
        <Nav />
        <main className="flex flex-1 flex-col">{children}</main>
      </>
    );
  } else {
    content = (
      <main className="flex flex-1 flex-col">
        <ComingSoon />
      </main>
    );
  }

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased font-sans`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950" suppressHydrationWarning>
        <ThemeProvider>{content}</ThemeProvider>
      </body>
      
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}

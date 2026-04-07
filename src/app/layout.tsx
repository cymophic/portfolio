import type { Metadata } from "next";

import Nav from "@/components/layout/Nav";
import ThemeProvider from "@/components/layout/ThemeProvider";
import "./globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luis Abhram",
  description: "Personal portfolio of Luis Abhram",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased font-sans`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950" suppressHydrationWarning>
        <ThemeProvider>
          <Nav />
          <main className="flex flex-1 flex-col">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

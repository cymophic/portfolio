import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter, Geist_Mono, Spline_Sans_Mono } from "next/font/google";
import { Toaster } from "sonner";

import ThemeProvider from "@/components/layout/theme/ThemeProvider";
import { TooltipProvider } from "@/components/ui/Tooltip";
import Nav from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import ComingSoon from "@/components/pages/ComingSoon";
import { profileInfo } from "@/lib/site";
import "./globals.css";

const SITE_MODE = process.env.NEXT_PUBLIC_SITE_MODE;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const splineSansMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-spline-sans-mono",
})

export const metadata: Metadata = {
  title: `${profileInfo.name}`,
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
        <Footer />
      </>
    );
  }

  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} ${splineSansMono.variable} h-full antialiased font-sans`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950" suppressHydrationWarning>
        <ThemeProvider>
          <TooltipProvider>
            {content}
            <Toaster
              position="top-center"
              toastOptions={{
                classNames: {
                  toast: "!bg-zinc-100 dark:!bg-zinc-900 !border-zinc-200 dark:!border-zinc-700 !text-zinc-800 dark:!text-zinc-200 !shadow-md !rounded-md",
                },
              }}
            />
          </TooltipProvider>
        </ThemeProvider>
      </body>
      
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}

import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter, Geist_Mono, Spline_Sans_Mono } from "next/font/google";
import { Toaster } from "sonner";

import { websiteURL, profileInfo } from "@/lib/site";
import ThemeProvider from "@/components/layout/theme/ThemeProvider";
import { TooltipProvider } from "@/components/ui/Tooltip";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const splineSansMono = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-spline-sans-mono",
});

const description =
  "Luis Abhram is a Full-Stack Developer and DevOps Engineer. He develops enterprise systems and owns full CI/CD pipelines using tools such as AWS, Docker, Django, & Next.js.";
export const metadata: Metadata = {
  metadataBase: new URL(websiteURL),
  title: {
    default: profileInfo.name,
    template: `%s | ${profileInfo.name}`,
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${profileInfo.name} | ${profileInfo.title}`,
    description,
    url: websiteURL,
    type: "website",
    images: [{ url: "/avatar.png" }],
  },
  keywords: [
    "Luis Abhram",
    "cymophic",
    "Full-Stack DevOps Engineer",
    "Philippines",
    "Django",
    "Next.js",
    "AWS",
    "Docker",
    "CI/CD",
    "DevOps",
    "Terraform",
    "GitHub Actions",
    "Grafana",
    "Prometheus",
    "Ansible",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${splineSansMono.variable} h-full antialiased font-sans`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <TooltipProvider>
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                classNames: {
                  toast:
                    "!bg-zinc-100 dark:!bg-zinc-900 !border-zinc-200 dark:!border-zinc-700 !text-zinc-800 dark:!text-zinc-200 !shadow-md !rounded-md",
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

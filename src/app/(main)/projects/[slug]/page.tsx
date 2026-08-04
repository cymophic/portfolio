import { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

import { websiteURL, projects } from "@/lib/site";
import Pill from "@/components/ui/Pill";
import {
  IconExternalLink,
  IconCodeblock,
  IconArrowLeft,
} from "@tabler/icons-react";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title}`,
    description: project.description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${websiteURL}/projects/${slug}`,
      ...(project.cover && { images: [{ url: project.cover }] }),
    },
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const contentPath = path.join(
    process.cwd(),
    "src/content/projects",
    `${slug}.md`
  );
  let markdownContent: string | null = null;
  try {
    markdownContent = fs.readFileSync(contentPath, "utf-8");
  } catch {
    // No markdown file — fall back to simple view
  }

  return (
    <section className="w-full">
      <div className="mx-auto max-w-3xl flex flex-col px-6 sm:px-10">
        {/* Cover Image */}
        {project.cover && (
          <div className="rounded-2xl mb-8">
            <Image
              src={project.cover}
              alt={`${project.title} cover`}
              width={800}
              height={450}
              priority
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
        )}

        {/* Title + Links */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-6 md:mb-4">
          <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
            {project.title}
          </h1>

          <div className="flex items-center gap-4 shrink-0 sm:mt-1">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400 underline decoration-zinc-300 dark:decoration-zinc-600 underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
              >
                <IconExternalLink size={13} className="overflow-clip" />
                View Live
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400 underline decoration-zinc-300 dark:decoration-zinc-600 underline-offset-2 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
              >
                <IconCodeblock size={13} className="overflow-clip" />
                View Repository
              </a>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-16 max-w-md">
          {project.tags.map((tag, i) => (
            <Pill key={i} text={tag} />
          ))}
        </div>

        {/* Markdown Content or Simple Fallback */}
        {markdownContent ? (
          <div className="prose-custom">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {markdownContent}
            </ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 pb-20">
            No additional content yet.
          </p>
        )}
      </div>
    </section>
  );
}

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mt-10 mb-4 pb-3 border-b border-zinc-300 dark:border-zinc-800 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-medium text-zinc-700 dark:text-zinc-300 mt-6 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 last:mb-0">
      {children}
    </p>
  ),
  img: ({ src, alt }) => (
    <Image
      src={src as string}
      alt={alt ?? ""}
      width={800}
      height={450}
      className="w-full h-auto rounded-xl my-6"
      loading="lazy"
    />
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-zinc-600 dark:text-zinc-400 underline decoration-zinc-300 dark:decoration-zinc-600 underline-offset-2 hover:text-zinc-800 dark:hover:text-zinc-200 hover:decoration-zinc-500 transition-colors"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside text-sm text-zinc-600 dark:text-zinc-400 ml-5 mb-4 space-y-1.5">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside text-sm text-zinc-600 dark:text-zinc-400 ml-5 mb-4 space-y-1.5">
      {children}
    </ol>
  ),
  code: ({ children, className }) => {
    // Code blocks contain newlines; inline code does not
    const text = children?.toString() ?? "";
    const isBlock = text.includes("\n");

    if (isBlock) {
      return (
        <code className={`font-mono text-xs ${className ?? ""}`}>
          {children}
        </code>
      );
    }

    return (
      <code className="font-mono text-xs bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-700 dark:text-zinc-300">
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="rounded-xl mb-4 border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 overflow-x-auto p-4 text-sm [&>code]:block" style={{ clipPath: "inset(0 round 0.75rem)" }}>
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm text-zinc-600 dark:text-zinc-400 border-collapse border border-zinc-200 dark:border-zinc-700">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-zinc-100 dark:bg-zinc-800/50">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-zinc-200 dark:border-zinc-700 last:border-none">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="text-left font-semibold text-zinc-700 dark:text-zinc-300 px-3 py-2.5 whitespace-nowrap">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-3 py-2.5 text-sm">{children}</td>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-zinc-300 dark:border-zinc-600 pl-4 italic text-zinc-500 dark:text-zinc-400 mb-4">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-zinc-200 dark:border-zinc-700 my-8" />,
};

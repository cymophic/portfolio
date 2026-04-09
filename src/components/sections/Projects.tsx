"use client";

import { createPortal } from "react-dom";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { MdFolder } from "react-icons/md";
import { projects } from "@/lib/site";
import AccordionItem from "@/components/ui/Accordion";
import SectionTitle from "@/components/sections/common/SectionTitle";

/** Max tags shown before "+N"; not tied to viewport breakpoints. */
const MAX_VISIBLE_TAGS = 7;

const tagPillClass =
  "inline-flex items-center rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs text-zinc-600 whitespace-nowrap dark:border-zinc-700 dark:text-zinc-300";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

/**
 * Overflow "+N": tap/click opens a small dialog with the rest of the tags (works on touch).
 * Preview is rendered outside the accordion trigger (see Accordion) so this can be a real button.
 */
function OverflowTagsTrigger({ count, hiddenTags }: { count: number; hiddenTags: string[] }) {
  const list = hiddenTags.join(", ");
  const [open, setOpen] = useState(false);
  const isClient = useIsClient();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const positionPanel = useCallback(() => {
    const trigger = triggerRef.current;
    const panel = panelRef.current;
    if (!trigger || !panel) return;

    const margin = Math.min(16, Math.max(8, window.innerWidth * 0.03));
    const gap = 8;
    const maxPanelW = Math.min(288, window.innerWidth - 2 * margin);

    panel.style.maxWidth = `${maxPanelW}px`;

    const rect = trigger.getBoundingClientRect();
    const w = panel.offsetWidth;
    const h = panel.offsetHeight;

    let left = rect.left + rect.width / 2 - w / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - w - margin));

    let top = rect.top - h - gap;
    if (top < margin) {
      top = rect.bottom + gap;
    }
    if (top + h > window.innerHeight - margin) {
      top = Math.max(margin, window.innerHeight - h - margin);
    }

    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
  }, []);

  useLayoutEffect(() => {
    if (!open || !isClient) return;
    const panel = panelRef.current;
    const trigger = triggerRef.current;
    if (!panel || !trigger) return;

    positionPanel();
    const raf = requestAnimationFrame(() => positionPanel());

    const ro = new ResizeObserver(() => positionPanel());
    ro.observe(panel);

    window.addEventListener("resize", positionPanel);
    window.addEventListener("scroll", positionPanel, true);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", positionPanel);
      window.removeEventListener("scroll", positionPanel, true);
    };
  }, [open, isClient, hiddenTags.length, positionPanel]);

  useEffect(() => {
    if (!open) return;
    const closeIfOutside = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", closeIfOutside);
    document.addEventListener("touchstart", closeIfOutside, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", closeIfOutside);
      document.removeEventListener("touchstart", closeIfOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const panel = (
    <div
      ref={panelRef}
      id={panelId}
      role="dialog"
      aria-modal="false"
      aria-label={`${count} additional tags`}
      className="fixed z-100 w-max rounded-lg border border-zinc-200 bg-zinc-50 p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
      style={{ left: 0, top: 0 }}
    >
      <ul className="flex max-h-[min(40vh,16rem)] list-none flex-wrap gap-1.5 overflow-y-auto p-0">
        {hiddenTags.map((tag, j) => (
          <li key={`${j}-${tag}`} className={tagPillClass}>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div className="inline-flex">
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-controls={panelId}
          aria-label={`${count} more tags: ${list}. Opens a list of the additional tags.`}
          className={`${tagPillClass} cursor-pointer text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/80`}
          onClick={() => setOpen((v) => !v)}
        >
          +{count}
        </button>
      </div>
      {isClient && open && createPortal(panel, document.body)}
    </>
  );
}

function ProjectTagsPreview({ tags, isExpanded }: { tags: string[]; isExpanded: boolean }) {
  if (isExpanded) {
    return (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, j) => (
          <span key={`${j}-${tag}`} className={tagPillClass}>
            {tag}
          </span>
        ))}
      </div>
    );
  }

  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenTags = tags.slice(MAX_VISIBLE_TAGS);
  const remaining = hiddenTags.length;

  return (
    <div className="flex flex-wrap gap-2">
      {visibleTags.map((tag, j) => (
        <span key={`${j}-${tag}`} className={tagPillClass}>
          {tag}
        </span>
      ))}
      {remaining > 0 && <OverflowTagsTrigger count={remaining} hiddenTags={hiddenTags} />}
    </div>
  );
}

export default function Projects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 sm:px-10">
        <SectionTitle title="Projects" />

        <div className="relative flex flex-col">
          {projects.map((project, i) => {
            const hasDetails = Boolean(project.description || project.tags.length > 0 || project.url || project.repo);

            return (
              <AccordionItem
                key={i}
                title={project.title}
                subtitle={project.description}
                disabled={!hasDetails}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                showTimeline={false}
                leftAdornment={
                  <span className="flex h-5 w-5 items-center justify-center rounded-md border border-zinc-200 bg-zinc-100 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                    <MdFolder size={12} />
                  </span>
                }
                preview={
                  project.tags.length > 0 ? (
                    <ProjectTagsPreview tags={project.tags} isExpanded={openIndex === i} />
                  ) : null
                }
              >
                {project.url && (
                  <li className="text-sm text-zinc-600 dark:text-zinc-400">
                    Live: {" "}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-700 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-100"
                    >
                      {project.url}
                    </a>
                  </li>
                )}

                {project.repo && (
                  <li className="text-sm text-zinc-600 dark:text-zinc-400">
                    Code: {" "}
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-700 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-100"
                    >
                      {project.repo}
                    </a>
                  </li>
                )}
              </AccordionItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}

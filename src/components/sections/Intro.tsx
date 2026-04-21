"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { getCalApi } from "@calcom/embed-react";

import { profileInfo } from "@/lib/site";
import SocialLinks from "@/components/ui/SocialLinks";
import ProfileImage from "@/components/ui/ProfileImage";
import AnimateText from "@/components/ui/AnimatedText";
import Button from "@/components/ui/Button";

const CONFIG = {
  wordsInterval: 3700, // how long each greeting stays before swapping
  deletingSpeed: 20, // time it takes to delete the word
};

export default function Intro() {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [bookingDisabled, setBookingDisabled] = useState(false);
  const words = useMemo(() => ["Luis Abhram"], []);

  const handleCopyEmail = () => {
    const swapTextSeconds = 3000;
    navigator.clipboard.writeText(profileInfo.emails[0]);
    setCopied(true);

    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);

    copyTimeoutRef.current = setTimeout(() => {
      requestAnimationFrame(() => setCopied(false));
    }, swapTextSeconds);
  };

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "book-a-meeting" });
      cal("ui", {
        hideEventTypeDetails: false,
      });
      cal("on", {
        action: "bookingSuccessful",
        callback: () => setBookingDisabled(true),
      });
    })();
  }, []);

  return (
    <section className="w-full">
      <div className="flex flex-col mx-auto px-6 sm:flex-row sm:justify-between sm:gap-12 sm:items-center sm:px-10">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Profile Image - Small Screens */}
          <div className="shrink-0 sm:hidden">
            <ProfileImage width={64} height={64}/>
          </div>

          {/* Name */}
          <h1 className="whitespace-nowrap -mb-2">
            <AnimateText
              words={words}
              className="font-mono text-3xl sm:text-5xl font-semibold leading-tight tracking-wide text-zinc-700 dark:text-zinc-200"
              variant="scramble"
              cursor="underscore"
              config={{
                pauseMs: CONFIG.wordsInterval,
                deletingSpeedMs: CONFIG.deletingSpeed,
              }}
            />
          </h1>

          {/* Tagline */}
          <p className="max-w-md text-base text-zinc-600 dark:text-zinc-400">
            {profileInfo.tagline}
          </p>
          
          {/* Social Links */}
          <SocialLinks iconSize={24} />

          <div className="mt-2 flex gap-4">
            <Button
              size="md"
              className="rounded-lg w-50 sm:h-11 sm:px-5 sm:text-sm whitespace-nowrap"
              disabled={bookingDisabled}
              data-cal-namespace="book-a-meeting"
              data-cal-link="luisabhram"
              data-cal-config='{"layout":"month_view"}'
            >
              {bookingDisabled ? "Meeting Scheduled" : "Schedule a Meeting"}
            </Button>

            <Button
              variant="secondary"
              size="md"
              className="rounded-lg w-40 sm:h-11 sm:px-5 sm:text-sm whitespace-nowrap active:scale-95 transition-transform"
              onClick={handleCopyEmail}
            >
              {copied ? "Copied!" : "Copy Email"}
            </Button>
          </div>
        </div>

        {/* Profile Image - Large Screens */}
        <div className="shrink-0 hidden sm:block">
          <ProfileImage width={160} height={160}/>
        </div>
      </div>
    </section>
  );
}
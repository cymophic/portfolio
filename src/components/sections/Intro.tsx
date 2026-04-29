"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { getCalApi } from "@calcom/embed-react";
import { IconQuoteOpen } from "@tabler/icons-react";

import { profileInfo } from "@/lib/site";
import SocialLinks from "@/components/ui/SocialLinks";
import ProfileImage from "@/components/ui/ProfileImage";
import { ScrambleText } from "@/components/ui/AnimatedText";
import Button from "@/components/ui/Button";
import Tooltip from "@/components/ui/Tooltip";

const CONFIG = {
  typingSpeed: 50, // time it takes to type each character
  wordsInterval: 3700, // how long each greeting stays before swapping
  deletingSpeed: 20, // time it takes to delete the word
};

export default function Intro() {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [bookingDisabled, setBookingDisabled] = useState(false);
  const words = useMemo(() => ["Luis Abhram"], []);
  const email = profileInfo.emails[0]

  const handleCopyEmail = () => {
    const swapTextSeconds = 3000;
    navigator.clipboard.writeText(email);
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
            <ScrambleText 
              words={words}
              className="font-mono text-3xl sm:text-5xl font-semibold leading-tight tracking-wide text-zinc-700 dark:text-zinc-200"
              cursor="underscore"
              config={{
                typingSpeedMs: CONFIG.typingSpeed,
                pauseMs: CONFIG.wordsInterval,
                deletingSpeedMs: CONFIG.deletingSpeed,
              }}
            />
          </h1>

          {/* Tagline */}
          <div className="max-w-md flex flex-row gap-1 text-zinc-600 dark:text-zinc-400">
            <IconQuoteOpen size={14} className="inline-block align-top overflow-clip" />
            <p className="max-w-md text-base italic">
              {profileInfo.tagline}
            </p>
          </div>
          
          {/* Social Links */}
          <SocialLinks iconSize={24} />

          <div className="mt-2 flex gap-4">
            {/* Booking Button */}
            <Button
              variant="primary"
              size="md"
              className="rounded-lg w-44 sm:w-50 sm:h-11 sm:px-5 sm:text-sm whitespace-nowrap active:scale-93 transition-transform duration-70"
              disabled={bookingDisabled}
              data-cal-namespace="book-a-meeting"
              data-cal-link="luisabhram"
              data-cal-config='{"layout":"month_view"}'
            >
              {bookingDisabled ? "Meeting Scheduled" : "Schedule a Meeting"}
            </Button>
            
            {/* Copy Email Button */}
            <Tooltip content={email}>
              <Button
                variant="secondary"
                size="md"
                className="rounded-lg w-28 sm:w-40 sm:h-11 sm:px-5 sm:text-sm whitespace-nowrap active:scale-93 transition-transform duration-70"
                onClick={handleCopyEmail}
              >
                {copied ? "Copied!" : "Copy Email"}
              </Button>
            </Tooltip>
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
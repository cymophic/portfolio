"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { getCalApi } from "@calcom/embed-react";
import { IconQuoteOpen } from "@tabler/icons-react";

import { profileInfo } from "@/lib/site";
import SocialLinks from "@/components/ui/SocialLinks";
import ProfileImage from "@/components/ui/ProfileImage";
import Button from "@/components/ui/Button";
import Tooltip from "@/components/ui/Tooltip";

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
      <div className="flex flex-col justify-center mx-auto px-6 gap-6 items-center sm:px-10">
        {/* Profile Image - Small Screens */}
        <div className="shrink-0">
          <ProfileImage width={64} height={64}/>
        </div>

        {/* Name */}
        <h1 className="whitespace-nowrap -mb-2">
          <span className="font-mono text-4xl font-semibold leading-tight tracking-wide text-zinc-700 dark:text-zinc-200">
            {words}
          </span>
        </h1>

        {/* Tagline */}
        <div className="max-w-md flex flex-row gap-2 justify-center text-zinc-600 dark:text-zinc-400">
          <IconQuoteOpen size={14} className="inline align-top overflow-clip" />
          <p className="max-w-md text-base italic">
            {profileInfo.tagline}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full sm:w-fit sm:flex-row">
          {/* Booking Button */}
          <Button
            variant="primary"
            size="md"
            className="sm:mt-0 mx-auto rounded-lg w-full max-w-94 sm:w-54 sm:h-11 sm:px-5 sm:text-sm whitespace-nowrap active:scale-93 transition-transform duration-70"
            disabled={bookingDisabled}
            data-cal-namespace="book-a-meeting"
            data-cal-link="luisabhram"
            data-cal-config='{"layout":"month_view"}'
          >
            {bookingDisabled ? "Meeting Scheduled" : "Schedule a Meeting"}
          </Button>
          
          {/* Copy Email Button */}
          <Tooltip content={email} className="flex justify-center">
            <Button
              variant="secondary"
              size="md"
              className="rounded-lg w-full max-w-94 sm:w-54 sm:h-11 sm:px-5 sm:text-sm whitespace-nowrap active:scale-93 transition-transform duration-70"
              onClick={handleCopyEmail}
            >
              {copied ? "Copied!" : "Copy Email"}
            </Button>
          </Tooltip>
        </div>

        {/* Social Links */}
        <SocialLinks iconSize={24} />
      </div>
    </section>
  );
}


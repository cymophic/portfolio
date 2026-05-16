"use client";

import { useState, useRef } from "react";

import { getCalApi } from "@calcom/embed-react";
import Button from "@/components/ui/Button";

const defaultClass =
  "rounded-lg w-full max-w-94 sm:w-54 sm:h-11 sm:px-4 sm:text-sm whitespace-nowrap active:scale-93 transition-transform duration-70";

export function ScheduleButton({
  className = defaultClass,
}: {
  className?: string;
}) {
  const [bookingDisabled, setBookingDisabled] = useState(false);
  const calLoaded = useRef(false);

  const loadCal = async () => {
    if (calLoaded.current) return;
    calLoaded.current = true;
    const cal = await getCalApi({ namespace: "book-a-meeting" });
    cal("ui", { hideEventTypeDetails: false });
    cal("on", {
      action: "bookingSuccessful",
      callback: () => setBookingDisabled(true),
    });
  };

  return (
    <Button
      variant="primary"
      size="md"
      className={className}
      data-cal-namespace="book-a-meeting"
      data-cal-link="luisabhram"
      data-cal-config='{"layout":"month_view"}'
      onMouseEnter={loadCal}
      onFocus={loadCal}
      onClick={loadCal}
      disabled={bookingDisabled}
    >
      {bookingDisabled ? "Meeting Scheduled" : "Schedule a Meeting"}
    </Button>
  );
}

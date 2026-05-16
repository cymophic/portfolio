"use client";

import { useState, useRef } from "react";

import Button from "@/components/ui/Button";
import Tooltip from "@/components/ui/Tooltip";
import { profileInfo } from "@/lib/site";

const defaultClass =
  "rounded-lg w-full max-w-94 sm:w-54 sm:h-11 sm:px-4 sm:text-sm whitespace-nowrap active:scale-93 transition-transform duration-70";

export function CopyEmailButton({
  className = defaultClass,
}: {
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const email = profileInfo.emails[0];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = setTimeout(() => {
      requestAnimationFrame(() => setCopied(false));
    }, 3000);
  };

  return (
    <Tooltip content={email}>
      <Button
        variant="secondary"
        size="md"
        className={className}
        onClick={handleCopyEmail}
      >
        {copied ? "Email Copied!" : "Copy Email"}
      </Button>
    </Tooltip>
  );
}

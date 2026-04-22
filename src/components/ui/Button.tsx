"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-zinc-200 dark:focus-visible:ring-offset-zinc-950 disabled:opacity-50 disabled:cursor-default disabled:pointer-events-none";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-zinc-700 text-zinc-200 hover:bg-zinc-600/90 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300/85",
  secondary:
    "border border-zinc-400 hover:bg-zinc-100 text-zinc-700   dark:border-zinc-700 dark:hover:bg-zinc-900 dark:text-zinc-200",
  ghost:
    "bg-transparent text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100/60 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/60",
  icon:
    "bg-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-5 text-sm",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size, className, ...props }, ref) => {
    const sizeClass = size ? sizeClasses[size] : "";

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClass, className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;


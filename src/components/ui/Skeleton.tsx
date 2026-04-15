import { CSSProperties } from "react";

type Props = {
  shape: "pill" | "circle";
  className?: string;
  style?: CSSProperties;
};

export default function Skeleton({ shape, className, style }: Props) {
  const base = "animate-pulse bg-zinc-200 dark:bg-zinc-700";
  const shapes = {
    pill: "rounded-md",
    circle: "rounded-full",
  };

  return <div className={`${base} ${shapes[shape]} ${className}`} style={style}/>;
}
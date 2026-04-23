"use client";
import { motion, type Variants, type Easing } from "motion/react";

const CONFIG = {
  blur: 12, // starting blur in px
  y: 30, // starting vertical offset in px
  duration: 0.6, // seconds each section takes to animate in
  stagger: 0.24, // seconds between each section
  ease: "easeOut" as Easing, // easing curve
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: CONFIG.y, filter: `blur(${CONFIG.blur}px)` },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: CONFIG.duration,
      ease: CONFIG.ease,
    },
  },
};

export function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export default function PageAnimator({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: CONFIG.stagger }}
    >
      {children}
    </motion.div>
  );
}
"use client";

import { motion, type Variants } from "framer-motion";

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  from?: "bottom" | "left" | "right" | "fade";
}

const variantMap: Record<string, Variants> = {
  bottom: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export function AnimateIn({
  children,
  className,
  delay = 0,
  from = "bottom",
}: AnimateInProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
      variants={variantMap[from]}
    >
      {children}
    </motion.div>
  );
}

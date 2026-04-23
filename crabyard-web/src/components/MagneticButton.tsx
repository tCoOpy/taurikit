"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "span" | "div";
};

export default function MagneticButton({
  children,
  className,
  strength = 0.28,
  as = "span",
}: Props) {
  const ref = useRef<HTMLSpanElement | HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (reduce || !canHover) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let active = false;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      targetX = (e.clientX - cx) * strength;
      targetY = (e.clientY - cy) * strength;
    };
    const onEnter = () => {
      active = true;
      el.style.willChange = "transform";
    };
    const onLeave = () => {
      active = false;
      targetX = 0;
      targetY = 0;
    };

    const tick = () => {
      x += (targetX - x) * 0.15;
      y += (targetY - y) * 0.15;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!active && Math.abs(x) < 0.05 && Math.abs(y) < 0.05) {
        el.style.transform = "translate3d(0, 0, 0)";
        el.style.willChange = "auto";
      }
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  const Tag = as;
  return (
    <Tag
      ref={ref as React.RefObject<HTMLSpanElement & HTMLDivElement>}
      className={`magnetic ${className ?? ""}`}
    >
      {children}
    </Tag>
  );
}

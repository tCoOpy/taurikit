"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduce) return;

    setEnabled(true);
    document.body.dataset.cursorReady = "true";

    let dotX = window.innerWidth / 2;
    let dotY = window.innerHeight / 2;
    let ringX = dotX;
    let ringY = dotY;
    let targetX = dotX;
    let targetY = dotY;
    let hover = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      hover =
        !!t.closest('a, button, [data-cursor="hover"], input, textarea, select, label[for]');
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0) scale(${hover ? 1.8 : 1})`;
        ringRef.current.style.borderColor = hover
          ? "rgba(255,107,122,0.85)"
          : "rgba(103,232,249,0.55)";
      }
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    const tick = () => {
      dotX += (targetX - dotX) * 0.9;
      dotY += (targetY - dotY) * 0.9;
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX - 3}px, ${dotY - 3}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 20}px, ${ringY - 20}px, 0) scale(${hover ? 1.8 : 1})`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      cancelAnimationFrame(raf);
      delete document.body.dataset.cursorReady;
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: 999,
          background: "#F5F7FA",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          transition: "opacity 0.2s ease",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: 999,
          border: "1.5px solid rgba(103,232,249,0.55)",
          pointerEvents: "none",
          zIndex: 9998,
          transition: "border-color 0.25s ease, opacity 0.2s ease",
        }}
      />
    </>
  );
}

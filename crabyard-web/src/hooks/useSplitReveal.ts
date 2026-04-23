"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";

type Options = {
  type?: "chars" | "words" | "lines";
  stagger?: number;
  y?: number;
  duration?: number;
  start?: string;
  once?: boolean;
};

export function useSplitReveal<T extends HTMLElement>(options: Options = {}) {
  const ref = useRef<T | null>(null);

  const {
    type = "chars",
    stagger = 0.02,
    y = 24,
    duration = 0.7,
    start = "top 85%",
    once = true,
  } = options;

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const split = new SplitType(el, { types: type });
    const targets = (split[type] ?? []) as HTMLElement[];
    if (!targets.length) return;

    gsap.set(targets, { y, opacity: 0, display: "inline-block" });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      once,
      onEnter: () => {
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: "power3.out",
        });
      },
    });

    return () => {
      trigger.kill();
      split.revert();
    };
  }, [type, stagger, y, duration, start, once]);

  return ref;
}

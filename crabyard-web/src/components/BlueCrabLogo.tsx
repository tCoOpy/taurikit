"use client";

import { useId } from "react";

type Props = {
  size?: number;
  className?: string;
  title?: string;
  monochrome?: boolean;
};

export default function BlueCrabLogo({
  size = 28,
  className,
  title = "Blue Crab Yard",
  monochrome = false,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const gradId = `bc-body-${uid}`;
  const shineId = `bc-shine-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={gradId} x1="0.1" y1="0" x2="0.9" y2="1">
          {monochrome ? (
            <>
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="100%" stopColor="currentColor" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#1E5BB8" />
              <stop offset="55%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#FF6B7A" />
            </>
          )}
        </linearGradient>
        <radialGradient id={shineId} cx="0.35" cy="0.3" r="0.55">
          <stop offset="0%" stopColor="rgba(245,247,250,0.55)" />
          <stop offset="100%" stopColor="rgba(245,247,250,0)" />
        </radialGradient>
      </defs>

      <g
        stroke={monochrome ? "currentColor" : "#1E5BB8"}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M14 38 L4 40" />
        <path d="M14 43 L3 48" />
        <path d="M16 48 L8 56" />
        <path d="M50 38 L60 40" />
        <path d="M50 43 L61 48" />
        <path d="M48 48 L56 56" />
      </g>

      <path
        d="M20 30 C 12 24, 6 18, 8 8 C 16 12, 22 18, 24 26 Z"
        fill={`url(#${gradId})`}
      />
      <path
        d="M44 30 C 52 24, 58 18, 56 8 C 48 12, 42 18, 40 26 Z"
        fill={`url(#${gradId})`}
      />
      <path
        d="M8 8 L 12 18"
        stroke={monochrome ? "rgba(0,0,0,0.35)" : "#0A1428"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M56 8 L 52 18"
        stroke={monochrome ? "rgba(0,0,0,0.35)" : "#0A1428"}
        strokeWidth="2"
        strokeLinecap="round"
      />

      <ellipse cx="32" cy="38" rx="22" ry="13" fill={`url(#${gradId})`} />
      <ellipse cx="27" cy="32" rx="11" ry="4" fill={`url(#${shineId})`} />

      <path
        d="M27 31 L 26 24"
        stroke={monochrome ? "rgba(0,0,0,0.35)" : "#0A1428"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M37 31 L 38 24"
        stroke={monochrome ? "rgba(0,0,0,0.35)" : "#0A1428"}
        strokeWidth="2"
        strokeLinecap="round"
      />

      <circle cx="26" cy="22" r="3.2" fill="#F5F7FA" />
      <circle cx="38" cy="22" r="3.2" fill="#F5F7FA" />
      <circle cx="26.4" cy="22.2" r="1.5" fill="#0A1428" />
      <circle cx="38.4" cy="22.2" r="1.5" fill="#0A1428" />
      <circle cx="27" cy="21.5" r="0.6" fill="#F5F7FA" />
      <circle cx="39" cy="21.5" r="0.6" fill="#F5F7FA" />
    </svg>
  );
}

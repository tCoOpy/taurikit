"use client";

import { useState } from "react";
import Link from "next/link";
import BrandMark from "./BrandMark";
import MagneticButton from "./MagneticButton";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);

  return (
    <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[90%] max-w-5xl">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 glass rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.55)]">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="flex items-center text-lg sm:text-xl font-bold tracking-tight"
            data-cursor="hover"
            aria-label="Blue Crab Yard"
          >
            <BrandMark size={34} />
          </Link>
          <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-400/10 border border-cyan-400/25 rounded-full">
            Beta
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <a href="/#features" className="hover:text-zinc-100 transition-colors" data-cursor="hover">
            Features
          </a>
          <a href="/#pricing" className="hover:text-zinc-100 transition-colors" data-cursor="hover">
            Pricing
          </a>
          <a
            href="https://docs.crabyard.dev"
            className="hover:text-zinc-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
          >
            Docs
          </a>
          <Link href="/changelog" className="hover:text-zinc-100 transition-colors" data-cursor="hover">
            Changelog
          </Link>
          <MagneticButton>
            <a
              href="/#pricing"
              data-cursor="hover"
              aria-label="Get Blue Crab Yard"
              className="btn-glass inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap hover:-translate-y-0.5"
            >
              <span>Get</span>
              <BrandMark size={22} gap="0.2em" />
            </a>
          </MagneticButton>
        </div>

        <button
          className="md:hidden p-1.5 text-zinc-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden mt-2 glass rounded-2xl px-5 py-4 space-y-1 shadow-[0_8px_32px_rgba(0,0,0,0.55)]">
          <a
            href="/#features"
            className="block text-sm font-medium text-zinc-300 hover:text-white py-2"
            onClick={close}
          >
            Features
          </a>
          <a
            href="/#pricing"
            className="block text-sm font-medium text-zinc-300 hover:text-white py-2"
            onClick={close}
          >
            Pricing
          </a>
          <a
            href="https://docs.crabyard.dev"
            className="block text-sm font-medium text-zinc-300 hover:text-white py-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
          <Link
            href="/changelog"
            className="block text-sm font-medium text-zinc-300 hover:text-white py-2"
            onClick={close}
          >
            Changelog
          </Link>
          <a
            href="/#pricing"
            aria-label="Get Blue Crab Yard"
            className="btn-glass flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold whitespace-nowrap mt-2"
            onClick={close}
          >
            <span>Get</span>
            <BrandMark size={22} gap="0.2em" />
          </a>
        </div>
      )}
    </nav>
  );
}

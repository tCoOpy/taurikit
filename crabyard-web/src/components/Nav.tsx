"use client";

import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const close = () => setMobileOpen(false);

  return (
    <nav className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[90%] max-w-5xl">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="text-lg sm:text-xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-brand-400 to-brand-500 bg-clip-text text-transparent pr-px">
              Crab
            </span>
            <span className="text-white">Yard</span>
          </Link>
          <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-400 bg-brand-400/10 border border-brand-400/20 rounded-full">
            Beta
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <a href="/#features" className="hover:text-zinc-100 transition-colors">
            Features
          </a>
          <a href="/#pricing" className="hover:text-zinc-100 transition-colors">
            Pricing
          </a>
          <a
            href="https://docs.crabyard.dev"
            className="hover:text-zinc-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
          <Link href="/changelog" className="hover:text-zinc-100 transition-colors">
            Changelog
          </Link>
          <a
            href="/#pricing"
            className="px-4 py-2 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-white rounded-full text-sm font-semibold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
          >
            Get Crabyard
          </a>
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
        <div className="md:hidden mt-2 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 space-y-1 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
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
            className="block text-center px-5 py-2.5 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-white rounded-full font-semibold mt-2"
            onClick={close}
          >
            Get Crabyard
          </a>
        </div>
      )}
    </nav>
  );
}

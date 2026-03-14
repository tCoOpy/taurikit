"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const close = () => setMobileOpen(false);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/80 shadow-sm shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-brand-400 to-brand-500 bg-clip-text text-transparent">
            Tauri
          </span>
          <span className="text-white">Kit</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
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
            className="px-5 py-2 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-white rounded-lg font-semibold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 hover:-translate-y-0.5 transition-all active:scale-[0.98]"
          >
            Get Crabyard
          </a>
        </div>

        <button
          className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
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
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-lg px-6 pb-4 pt-2 space-y-1">
          <a
            href="/#features"
            className="block text-sm font-medium text-zinc-400 hover:text-white py-2"
            onClick={close}
          >
            Features
          </a>
          <a
            href="/#pricing"
            className="block text-sm font-medium text-zinc-400 hover:text-white py-2"
            onClick={close}
          >
            Pricing
          </a>
          <a
            href="https://docs.crabyard.dev"
            className="block text-sm font-medium text-zinc-400 hover:text-white py-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
          <Link
            href="/changelog"
            className="block text-sm font-medium text-zinc-400 hover:text-white py-2"
            onClick={close}
          >
            Changelog
          </Link>
          <a
            href="/#pricing"
            className="block text-center px-5 py-2.5 bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400 text-white rounded-lg font-semibold mt-2"
            onClick={close}
          >
            Get Crabyard
          </a>
        </div>
      )}
    </nav>
  );
}

"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function SuccessPage() {
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");
    if (!sessionId) return;

    fetch(`https://api.crabyard.dev/stripe/session/${sessionId}`)
      .then((r) => r.json())
      .then((d: { license_key?: string }) => {
        if (d.license_key) setLicenseKey(d.license_key);
      })
      .catch(() => {});
  }, []);

  async function copyKey() {
    if (!licenseKey) return;
    await navigator.clipboard.writeText(licenseKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 mb-3">
            You&apos;re in!
          </h1>
          <p className="text-zinc-400 mb-8">
            Your license key has been sent to your email. Use it with the CLI to
            start generating projects.
          </p>

          {licenseKey && (
            <div className="mb-6 bg-zinc-900 border border-brand-500/30 rounded-xl p-6">
              <p className="text-xs text-zinc-600 uppercase tracking-wider font-semibold mb-2">
                Your License Key
              </p>
              <code className="text-brand-400 text-lg font-bold break-all">{licenseKey}</code>
              <button
                onClick={copyKey}
                className="mt-3 block w-full text-sm text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer"
              >
                {copied ? "✓ Copied!" : "Click to copy"}
              </button>
            </div>
          )}

          <div className="bg-zinc-900/60 border border-zinc-800/50 rounded-xl p-6 text-left">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
              Quick start
            </h2>
            <div className="space-y-4 font-mono text-sm">
              <div>
                <p className="text-zinc-600 text-xs mb-1.5">1. Install the CLI</p>
                <div className="bg-zinc-950 text-zinc-300 rounded-lg px-4 py-2.5 border border-zinc-800/50">
                  curl -fsSL https://crabyard.dev/install.sh | sh
                </div>
              </div>
              <div>
                <p className="text-zinc-600 text-xs mb-1.5">2. Set your license key</p>
                <div className="bg-zinc-950 text-zinc-300 rounded-lg px-4 py-2.5 border border-zinc-800/50">
                  export CRABYARD_LICENSE_KEY=
                  <span className="text-brand-400">{licenseKey ?? "TK-..."}</span>
                </div>
              </div>
              <div>
                <p className="text-zinc-600 text-xs mb-1.5">3. Generate your first project</p>
                <div className="bg-zinc-950 text-zinc-300 rounded-lg px-4 py-2.5 border border-zinc-800/50">
                  crabyard new{" "}
                  <span className="text-green-400">&quot;My App&quot;</span>
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://docs.crabyard.dev"
            className="mt-6 inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 text-sm font-medium transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the docs
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}

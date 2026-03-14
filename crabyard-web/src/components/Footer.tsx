import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-400 pt-16 pb-8 px-6 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-brand-400 to-brand-500 bg-clip-text text-transparent">
                Tauri
              </span>
              <span className="text-white">Kit</span>
            </Link>
            <p className="mt-3 text-sm text-zinc-600 leading-relaxed max-w-xs">
              Ship production-ready Rust Tauri desktop apps in minutes, not
              months.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-4">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-600">
              <li>
                <a href="/#features" className="hover:text-zinc-300 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/#pricing" className="hover:text-zinc-300 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-zinc-300 transition-colors">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-zinc-300 transition-colors">
                  Comparison
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-600">
              <li>
                <a
                  href="https://docs.crabyard.dev"
                  className="hover:text-zinc-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/tCoOpy/crabyard"
                  className="hover:text-zinc-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@crabyard.dev"
                  className="hover:text-zinc-300 transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-[0.15em] mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-600">
              <li>
                <Link href="/terms" className="hover:text-zinc-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-700">
            &copy; {new Date().getFullYear()} Crabyard. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/tCoOpy/crabyard"
              className="text-zinc-700 hover:text-zinc-400 transition-colors"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://x.com/crabyard"
              className="text-zinc-700 hover:text-zinc-400 transition-colors"
              aria-label="X (Twitter)"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

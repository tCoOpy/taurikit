import { AnimateIn } from "./AnimateIn";

function CodeWindow({ title, code }: { title: string; code: string }) {
  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800/60 shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-zinc-800/60">
        <div className="w-3 h-3 rounded-full bg-zinc-700" />
        <div className="w-3 h-3 rounded-full bg-zinc-700" />
        <div className="w-3 h-3 rounded-full bg-zinc-700" />
        <span className="ml-auto text-[10px] text-zinc-600 uppercase tracking-widest font-mono">
          {title}
        </span>
      </div>
      <pre
        className="text-[13px] leading-relaxed font-mono overflow-x-auto p-5"
        dangerouslySetInnerHTML={{ __html: code }}
      />
    </div>
  );
}

const authCode = `<span class="text-purple-400">const</span> <span class="text-zinc-200">{ user, login, logout }</span> <span class="text-zinc-500">=</span> <span class="text-brand-400">useAuth</span><span class="text-zinc-500">();</span>

<span class="text-purple-400">if</span> <span class="text-zinc-500">(</span><span class="text-zinc-200">user</span><span class="text-zinc-500">)</span> <span class="text-zinc-500">{</span>
  <span class="text-zinc-600">// Session restored automatically</span>
  <span class="text-purple-400">return</span> <span class="text-zinc-500">&lt;</span><span class="text-green-400">DashboardView</span> <span class="text-brand-400">user</span><span class="text-zinc-500">={</span><span class="text-zinc-200">user</span><span class="text-zinc-500">}</span> <span class="text-zinc-500">/&gt;;</span>
<span class="text-zinc-500">}</span>
<span class="text-purple-400">return</span> <span class="text-zinc-500">&lt;</span><span class="text-green-400">LoginView</span> <span class="text-brand-400">onLogin</span><span class="text-zinc-500">={</span><span class="text-zinc-200">login</span><span class="text-zinc-500">}</span> <span class="text-zinc-500">/&gt;;</span>`;

const uiCode = `<span class="text-zinc-600">$</span> <span class="text-brand-400">crabyard</span> <span class="text-zinc-200">new</span> <span class="text-zinc-600">--ui</span>
<span class="text-zinc-500">?</span> <span class="text-zinc-200">Pick a UI framework:</span>
  <span class="text-brand-400">❯ shadcn/ui</span>  <span class="text-zinc-600">— Radix + Tailwind</span>
    <span class="text-zinc-400">daisyUI</span>   <span class="text-zinc-600">— Component classes</span>
    <span class="text-zinc-400">tesign</span>    <span class="text-zinc-600">— Minimal design system</span>

<span class="text-green-400">✓</span> <span class="text-zinc-200">UI framework set to shadcn/ui</span>

<span class="text-zinc-600">$</span> <span class="text-brand-400">crabyard</span> <span class="text-zinc-200">update-ui daisyui</span>
<span class="text-green-400">✓</span> <span class="text-zinc-200">Switched to daisyUI</span>`;

const structureCode = `<span class="text-zinc-400">my-app/</span>
├── <span class="text-brand-400">src/</span>
│   ├── <span class="text-zinc-300">App.tsx</span>
│   ├── <span class="text-zinc-300">components/</span>
│   │   ├── <span class="text-green-400">LoginView.tsx</span>     <span class="text-zinc-700">← auth overlay</span>
│   │   ├── <span class="text-green-400">DashboardView.tsx</span>  <span class="text-zinc-700">← auth overlay</span>
│   │   └── <span class="text-brand-400">TitleBar.tsx</span>       <span class="text-zinc-700">← ui overlay</span>
│   ├── <span class="text-zinc-300">hooks/</span>
│   │   └── <span class="text-green-400">useAuth.ts</span>        <span class="text-zinc-700">← auth overlay</span>
│   └── <span class="text-zinc-300">lib/</span>
├── <span class="text-brand-400">src-tauri/</span>
│   └── <span class="text-zinc-300">src/</span>
│       ├── <span class="text-green-400">auth/</span>             <span class="text-zinc-700">← auth overlay</span>
│       └── <span class="text-zinc-300">lib.rs</span>`;

function Check() {
  return (
    <span className="text-green-400 font-bold shrink-0">✓</span>
  );
}

export default function Features() {
  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateIn className="text-center mb-20">
          <p className="text-brand-500 text-sm font-semibold uppercase tracking-[0.15em] mb-3">
            Features
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-100">
            Everything you need to ship
          </h2>
          <p className="mt-4 text-zinc-500 text-lg max-w-2xl mx-auto font-light">
            Stop wiring boilerplate. Crabyard gives you a complete foundation so
            you can focus on what makes your app unique.
          </p>
        </AnimateIn>

        <div className="space-y-28">
          {/* Feature 1: Auth */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <AnimateIn className="lg:w-1/2 order-2 lg:order-1" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
                Authentication
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4">
                Auth — ready to go
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                GitHub OAuth (Device Flow), Google OAuth (PKCE loopback), or no
                auth at all. Token persistence, session restoration, and
                sign-out — all wired up across Rust and React.
              </p>
              <ul className="space-y-2.5">
                <li className="flex items-center gap-3 text-sm text-zinc-400">
                  <Check /> Secure token storage via OS keychain
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-400">
                  <Check /> Automatic session restoration on launch
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-400">
                  <Check /> Swap providers with one CLI flag
                </li>
              </ul>
            </AnimateIn>
            <AnimateIn className="lg:w-1/2 order-1 lg:order-2" from="right" delay={0.15}>
              <CodeWindow title="useAuth.ts" code={authCode} />
            </AnimateIn>
          </div>

          {/* Feature 2: UI Frameworks */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <AnimateIn className="lg:w-1/2" from="left" delay={0.15}>
              <CodeWindow title="terminal" code={uiCode} />
            </AnimateIn>
            <AnimateIn className="lg:w-1/2" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
                Customizable
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4">
                Pick your UI framework
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                shadcn/ui, daisyUI, or tesign — your call. Each comes
                pre-configured with Tailwind v4, dark mode, responsive layouts,
                and a polished title bar component.
              </p>
              <ul className="space-y-2.5">
                <li className="flex items-center gap-3 text-sm text-zinc-400">
                  <Check /> Three UI frameworks to choose from
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-400">
                  <Check /> Switch UI post-generation with one command
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-400">
                  <Check /> Custom title bar styled per framework
                </li>
              </ul>
            </AnimateIn>
          </div>

          {/* Feature 3: Architecture */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <AnimateIn className="lg:w-1/2 order-2 lg:order-1" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-semibold mb-4">
                Architecture
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-4">
                Modular overlay system
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Base template + auth overlay + UI overlay — cleanly composed.
                Every combination compiles with zero warnings and zero dead code.
                Pick exactly what you need.
              </p>
              <ul className="space-y-2.5">
                <li className="flex items-center gap-3 text-sm text-zinc-400">
                  <Check /> No if/else feature flags in generated code
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-400">
                  <Check /> Full source — no lock-in, no obfuscation
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-400">
                  <Check /> Extend with your own overlays
                </li>
              </ul>
            </AnimateIn>
            <AnimateIn className="lg:w-1/2 order-1 lg:order-2" from="right" delay={0.15}>
              <CodeWindow title="project structure" code={structureCode} />
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}

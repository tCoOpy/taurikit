"use client";

export default function StaticCrabBackdrop() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-gradient-dusk" />
      <div className="absolute top-1/4 left-1/4 w-[520px] h-[520px] rounded-full blur-[150px] bg-cyan-500/10 pulse-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[460px] h-[460px] rounded-full blur-[160px] bg-crab-500/10 pulse-glow"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute inset-0 opacity-60 os-grid-mask" />
    </div>
  );
}

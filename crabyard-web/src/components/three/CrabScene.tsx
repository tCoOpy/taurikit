"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor, Environment } from "@react-three/drei";
import Crab from "./Crab";
import Caustics from "./Caustics";
import Bubbles from "./Bubbles";
import StaticCrabBackdrop from "./StaticCrabBackdrop";

export default function CrabScene() {
  const [dpr, setDpr] = useState(1.25);
  const [mobile, setMobile] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mqMobile = window.matchMedia("(max-width: 768px)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setMobile(mqMobile.matches);
      setReduce(mqReduce.matches);
    };
    update();
    mqMobile.addEventListener("change", update);
    mqReduce.addEventListener("change", update);
    const timer = setTimeout(() => setReady(true), 30);
    return () => {
      mqMobile.removeEventListener("change", update);
      mqReduce.removeEventListener("change", update);
      clearTimeout(timer);
    };
  }, []);

  if (mobile || reduce) {
    return <StaticCrabBackdrop />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <div className="absolute inset-0 bg-gradient-dusk" />
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      >
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 0.2, 6.5], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <PerformanceMonitor
            onIncline={() => setDpr(Math.min(2, dpr + 0.25))}
            onDecline={() => setDpr(Math.max(0.75, dpr - 0.25))}
          />
          <ambientLight intensity={0.55} />
          <directionalLight position={[3, 4, 5]} intensity={1.3} color="#e0f2fe" />
          <directionalLight position={[-4, -2, -2]} intensity={0.6} color="#FF6B7A" />
          <pointLight position={[0, 2, 2]} intensity={0.5} color="#22D3EE" />

          <Environment preset="night" />
          <Caustics />
          <Bubbles count={26} />
          <Crab />
        </Canvas>
      </div>
      <div className="absolute inset-0 opacity-40 os-grid-mask" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-abyss-950 to-transparent" />
    </div>
  );
}

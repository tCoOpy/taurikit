"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Instance, Instances } from "@react-three/drei";
import * as THREE from "three";

type BubbleData = {
  x: number;
  z: number;
  speed: number;
  wobble: number;
  phase: number;
  scale: number;
  y: number;
};

const RANGE_Y = 12;
const SPAWN_Y = -7;
const TOP_Y = 5;

export default function Bubbles({ count = 28 }: { count?: number }) {
  const data = useMemo<BubbleData[]>(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 16,
      z: (Math.random() - 0.5) * 2 - 1,
      speed: 0.35 + Math.random() * 0.8,
      wobble: 0.4 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2,
      scale: 0.05 + Math.random() * 0.13,
      y: SPAWN_Y + Math.random() * RANGE_Y,
    }));
  }, [count]);

  const instanceRefs = useRef<(THREE.Object3D | null)[]>([]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    for (let i = 0; i < data.length; i++) {
      const b = data[i];
      b.y += b.speed * delta;
      if (b.y > TOP_Y) {
        b.y = SPAWN_Y;
        b.x = (Math.random() - 0.5) * 16;
      }
      const obj = instanceRefs.current[i];
      if (obj) {
        obj.position.x = b.x + Math.sin(t * b.wobble + b.phase) * 0.25;
        obj.position.y = b.y;
        obj.position.z = b.z;
        obj.scale.setScalar(b.scale);
      }
    }
  });

  return (
    <Instances limit={count} range={count}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshPhysicalMaterial
        color="#67e8f9"
        roughness={0.05}
        metalness={0.1}
        transmission={0.92}
        thickness={0.6}
        ior={1.33}
        transparent
        opacity={0.55}
      />
      {data.map((_, i) => (
        <Instance
          key={i}
          ref={(el) => {
            instanceRefs.current[i] = el as unknown as THREE.Object3D | null;
          }}
        />
      ))}
    </Instances>
  );
}

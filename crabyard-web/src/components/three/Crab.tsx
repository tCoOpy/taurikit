"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const SHELL_COLOR = "#1E5BB8";
const SHELL_ACCENT = "#22D3EE";
const UNDERSIDE = "#FF6B7A";
const EYE_WHITE = "#F5F7FA";
const EYE_DARK = "#0A1428";

function Leg({
  position,
  rotation,
  length = 0.95,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  length?: number;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.06, length, 10]} />
        <meshStandardMaterial color={SHELL_COLOR} roughness={0.55} metalness={0.1} />
      </mesh>
      <mesh position={[0, -length / 2 + 0.05, 0]}>
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial color={SHELL_COLOR} roughness={0.5} metalness={0.15} />
      </mesh>
    </group>
  );
}

function Claw({ side = 1 }: { side?: 1 | -1 }) {
  return (
    <group position={[side * 1.7, 0.2, 0.2]} rotation={[0, 0, side * -0.25]}>
      <mesh position={[side * -0.35, 0, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.95, 12]} />
        <meshStandardMaterial color={SHELL_COLOR} roughness={0.45} metalness={0.25} />
      </mesh>
      <mesh position={[side * 0.22, 0.35, 0]} rotation={[0, 0, side * 0.9]}>
        <sphereGeometry args={[0.45, 20, 20]} />
        <MeshDistortMaterial
          color={SHELL_ACCENT}
          roughness={0.35}
          metalness={0.3}
          distort={0.18}
          speed={1.2}
        />
      </mesh>
      <mesh
        position={[side * 0.55, 0.62, 0]}
        rotation={[0, 0, side * 0.6]}
        scale={[1, 0.55, 0.85]}
      >
        <coneGeometry args={[0.22, 0.55, 18]} />
        <meshStandardMaterial color={UNDERSIDE} roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh
        position={[side * 0.1, 0.38, 0]}
        rotation={[0, 0, side * -0.4]}
        scale={[0.85, 0.5, 0.85]}
      >
        <coneGeometry args={[0.2, 0.5, 18]} />
        <meshStandardMaterial color={SHELL_COLOR} roughness={0.45} metalness={0.2} />
      </mesh>
    </group>
  );
}

function EyeStalk({ x }: { x: number }) {
  return (
    <group position={[x, 0.55, 0.55]}>
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
        <meshStandardMaterial color={SHELL_COLOR} roughness={0.55} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color={EYE_WHITE} roughness={0.2} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.28, 0.1]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color={EYE_DARK} roughness={0.3} />
      </mesh>
    </group>
  );
}

export default function Crab() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const { mouse } = state;
    const targetY = mouse.x * 0.45;
    const targetX = -mouse.y * 0.25;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
  });

  return (
    <Float floatIntensity={1.3} rotationIntensity={0.35} speed={1.1}>
      <group ref={group} position={[0, -0.3, 0]} scale={1}>
        <group ref={inner}>
          <mesh castShadow scale={[2.3, 0.75, 1.6]}>
            <sphereGeometry args={[1, 48, 48]} />
            <MeshDistortMaterial
              color={SHELL_COLOR}
              roughness={0.35}
              metalness={0.35}
              distort={0.1}
              speed={1.5}
            />
          </mesh>

          <mesh position={[0, -0.1, 0]} scale={[2.2, 0.5, 1.4]}>
            <sphereGeometry args={[1, 36, 36]} />
            <meshStandardMaterial color={UNDERSIDE} roughness={0.5} metalness={0.15} />
          </mesh>

          <mesh position={[0, 0.35, 0.1]} scale={[1.6, 0.25, 1.0]}>
            <sphereGeometry args={[1, 36, 36]} />
            <meshStandardMaterial
              color={SHELL_ACCENT}
              roughness={0.25}
              metalness={0.6}
              emissive={SHELL_ACCENT}
              emissiveIntensity={0.12}
            />
          </mesh>

          <Claw side={-1} />
          <Claw side={1} />

          <EyeStalk x={-0.4} />
          <EyeStalk x={0.4} />

          <Leg position={[-1.6, -0.2, 0.5]} rotation={[0, 0, Math.PI / 2.6]} />
          <Leg position={[-1.55, -0.25, 0]} rotation={[0, 0, Math.PI / 2.3]} />
          <Leg position={[-1.45, -0.3, -0.5]} rotation={[0, 0, Math.PI / 2.1]} />
          <Leg position={[1.6, -0.2, 0.5]} rotation={[0, 0, -Math.PI / 2.6]} />
          <Leg position={[1.55, -0.25, 0]} rotation={[0, 0, -Math.PI / 2.3]} />
          <Leg position={[1.45, -0.3, -0.5]} rotation={[0, 0, -Math.PI / 2.1]} />
        </group>
      </group>
    </Float>
  );
}

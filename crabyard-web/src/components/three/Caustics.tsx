"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = vUv * 2.0 - 1.0;
    float d = length(uv);

    float t = uTime * 0.25;
    float n1 = noise(uv * 3.0 + vec2(t, -t));
    float n2 = noise(uv * 6.0 - vec2(t * 1.3, t * 0.7));
    float caustic = pow(abs(sin(n1 * 6.28 + t) * sin(n2 * 6.28 - t)), 1.6);

    vec3 base = mix(uColorA, uColorB, smoothstep(0.0, 0.9, d));
    vec3 col = base + uColorC * caustic * 0.8;
    col = mix(col, uColorB * 0.6, smoothstep(1.0, 1.35, d));

    float vignette = smoothstep(1.3, 0.4, d);
    col *= vignette;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function Caustics() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, 0, -5]} rotation={[0, 0, 0]}>
      <planeGeometry args={[28, 18, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uColorA: { value: new THREE.Color("#03070f") },
          uColorB: { value: new THREE.Color("#0f2a4a") },
          uColorC: { value: new THREE.Color("#22d3ee") },
        }}
        transparent={false}
        depthWrite={false}
      />
    </mesh>
  );
}

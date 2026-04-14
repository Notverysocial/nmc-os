"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function AgentCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) { meshRef.current.rotation.y = t * 0.3; meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.15; }
    if (wireRef.current) { wireRef.current.rotation.y = -t * 0.15; wireRef.current.rotation.z = t * 0.1; }
  });

  return (
    <group>
      <mesh ref={meshRef}><icosahedronGeometry args={[1.2, 1]} /><meshStandardMaterial color="#1a2b50" transparent opacity={0.3} wireframe={false} /></mesh>
      <mesh ref={wireRef}><icosahedronGeometry args={[1.6, 1]} /><meshStandardMaterial color="#3b82f6" transparent opacity={0.15} wireframe /></mesh>
      <pointLight position={[3, 3, 3]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[-3, -2, 2]} intensity={0.4} color="#1a2b50" />
    </group>
  );
}

'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uScroll;
  varying vec2 vUv;

  // Simple noise function
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    
    // Adjust UV for aspect ratio
    float aspect = uResolution.x / uResolution.y;
    uv.x *= aspect;

    // Energy field logic
    vec3 color1 = vec3(0.05, 0.08, 0.15); // Deep Blue
    vec3 color2 = vec3(0.1, 0.15, 0.3);   // Lighter Blue/Indigo
    
    float pulse = sin(uTime * 0.5 + uv.y * 2.0) * 0.5 + 0.5;
    float flow = sin(uv.x * 3.0 + uTime * 0.2 + uScroll * 2.0);
    
    float energy = smoothstep(0.4, 0.6, sin(uv.y * 10.0 + flow + uTime * 0.3));
    energy *= 0.15; // Keep it subtle

    vec3 finalColor = mix(color1, color2, energy * pulse);
    
    // Add very subtle scanlines in the shader
    float scanline = sin(uv.y * 800.0) * 0.04;
    finalColor -= scanline;

    gl_FragmentColor = vec4(finalColor, 1.0);
  }
`;

function EnergyField() {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(typeof window !== 'undefined' ? window.innerWidth : 1, typeof window !== 'undefined' ? window.innerHeight : 1) },
      uScroll: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
      material.uniforms.uScroll.value = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function WebGLBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-black">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, alpha: false }}
        dpr={[1, 2]}
      >
        <EnergyField />
      </Canvas>
    </div>
  );
}

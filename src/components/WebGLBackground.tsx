'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uScroll;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - 0.5) * 2.0;
    p.x *= aspect;

    // Movement logic
    float wave = sin(p.x * 2.0 + uTime * 0.5) * 0.5 + 0.5;
    float flow = cos(p.y * 3.0 + uTime * 0.3 + uScroll * 4.0) * 0.5 + 0.5;
    
    // Deep technical colors
    vec3 col1 = vec3(0.01, 0.02, 0.06); // Dark
    vec3 col2 = vec3(0.04, 0.08, 0.22); // Electric blue
    
    float mask = smoothstep(0.4, 0.6, sin(p.y * 6.0 + wave + flow));
    vec3 color = mix(col1, col2, mask * 0.25);
    
    // Technical HUD grid 
    vec2 gridUv = p * 15.0;
    float grid = (step(0.985, fract(gridUv.x)) + step(0.985, fract(gridUv.y))) * 0.035;
    color += vec3(grid * 0.5, grid * 0.7, grid * 1.0);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function EnergyField() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  
  // Create stable uniforms object
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uScroll: { value: 0 },
    }),
    []
  );

  // Update resolution when size changes
  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size, uniforms]);

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uTime.value = state.clock.elapsedTime;
        const scrollMax = typeof document !== 'undefined' ? document.body.scrollHeight - window.innerHeight : 0;
        material.uniforms.uScroll.value = scrollMax > 0 ? window.scrollY / scrollMax : 0;
      }
    }
  });

  return (
    <mesh ref={meshRef} frustumCulled={false} scale={[size.width, size.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
        transparent={true}
      />
    </mesh>
  );
}

export default function WebGLBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden bg-black" 
      style={{ zIndex: -10 }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          antialias: false, 
          alpha: true, 
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <EnergyField />
      </Canvas>
    </div>
  );
}

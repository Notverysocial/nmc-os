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
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (uv - 0.5) * 2.0;
    p.x *= aspect;

    vec2 mouse = (uMouse - 0.5) * 2.0;
    mouse.x *= aspect;

    // Parallax logic
    vec2 parallax = mouse * 0.05 + vec2(0.0, uScroll * 0.1);
    vec2 pP = p + parallax;

    // Disturbance field 
    float dist = length(p - mouse);
    float disturbance = smoothstep(0.5, 0.0, dist);

    // Deep technical colors
    vec3 col1 = vec3(0.01, 0.02, 0.05); 
    vec3 col2 = vec3(0.03, 0.06, 0.18); 
    
    // Base flow
    float wave = sin(pP.x * 1.5 + uTime * 0.4) * 0.5 + 0.5;
    float flow = cos(pP.y * 2.0 + uTime * 0.2) * 0.5 + 0.5;
    float mask = smoothstep(0.4, 0.6, sin(pP.y * 4.0 + wave + flow));
    vec3 color = mix(col1, col2, mask * 0.15);
    
    // Neural POI Grid (Glowing dots)
    vec2 poiUv = (pP + uTime * 0.01) * 8.0;
    vec2 gv = fract(poiUv) - 0.5;
    float d = length(gv);
    float poi = smoothstep(0.1, 0.05, d);
    
    // Intensity near mouse
    float mouseInteract = smoothstep(0.8, 0.0, length(p - mouse));
    color += vec3(0.2, 0.4, 1.0) * poi * (0.1 + mouseInteract * 0.5);

    // Technical Schematic Lines (Parallax)
    vec2 schematicUv = pP * 4.0;
    float lines = (step(0.992, fract(schematicUv.x)) + step(0.992, fract(schematicUv.y)));
    color += vec3(0.1, 0.3, 0.8) * lines * 0.1;

    // Original HUD grid 
    vec2 gridUv = p * 20.0;
    float grid = (step(0.988, fract(gridUv.x)) + step(0.988, fract(gridUv.y))) * 0.025;
    color += vec3(grid * 0.4, grid * 0.6, grid * 0.9);
    
    // Global vignette
    float vignette = smoothstep(2.0, 0.5, length(p));
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function EnergyField() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, mouse } = useThree();
  
  // Create stable uniforms object
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
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
        material.uniforms.uMouse.value.set(state.mouse.x * 0.5 + 0.5, state.mouse.y * 0.5 + 0.5);
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

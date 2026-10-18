import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

/**
 * Optional: set to a GLB path (e.g. "/models/ring.glb" in public/) to show a real ring model
 * instead of the procedural ring.
 */
const RING_MODEL_URL: string | null = null;

const GOLD = "#D8BC8A";

function RingGeometry() {
  const mat = <meshPhysicalMaterial color={GOLD} metalness={1} roughness={0.16} clearcoat={0.6} envMapIntensity={1.4} />;
  const stone = <meshPhysicalMaterial color="#ffffff" metalness={0} roughness={0} transmission={0.92} ior={2.4} thickness={0.6} flatShading />;
  const prongs = [0, 1, 2, 3].map((i) => {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    return [Math.cos(a) * 0.27, 1.22, Math.sin(a) * 0.27] as [number, number, number];
  });
  return (
    <group>
      <mesh>
        <torusGeometry args={[1, 0.085, 32, 96]} />
        {mat}
      </mesh>
      <mesh position={[0, 1.08, 0]}>
        <cylinderGeometry args={[0.24, 0.12, 0.18, 24, 1, true]} />
        {mat}
      </mesh>
      {prongs.map((p, i) => (
        <mesh key={i} position={p} rotation={[p[2] * 0.6, 0, -p[0] * 0.6]}>
          <cylinderGeometry args={[0.025, 0.035, 0.34, 8]} />
          {mat}
        </mesh>
      ))}
      <group position={[0, 1.3, 0]}>
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.17, 0.3, 0.1, 16]} />
          {stone}
        </mesh>
        <mesh position={[0, -0.16, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.3, 0.32, 16]} />
          {stone}
        </mesh>
      </group>
    </group>
  );
}

function GltfRing() {
  const { scene } = useGLTF(RING_MODEL_URL as string);
  return <primitive object={scene} />;
}

function Rig({ running }: { running: boolean }) {
  const root = useRef<THREE.Group>(null);
  const target = useRef(0);
  const velocity = useRef(0);

  useFrame((_, raw) => {
    if (!running) return;
    const dt = Math.min(raw, 0.05);
    // Slow idle rotation + inertial drag, damped — cheap per-frame math only
    velocity.current *= Math.exp(-4 * dt);
    target.current += dt * 0.25 + velocity.current;
    if (root.current) root.current.rotation.y = target.current;
  });

  return (
    <group
      ref={root}
      onPointerMove={(e) => {
        if (e.buttons === 1) velocity.current = e.movementX * 0.004;
      }}
    >
      {RING_MODEL_URL ? <Suspense fallback={null}><GltfRing /></Suspense> : <RingGeometry />}
    </group>
  );
}

export default function JewelleryScene({ running }: { running: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={running ? "always" : "never"}
      camera={{ position: [0, 0.6, 4.6], fov: 35 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#090909"]} />
      <ambientLight intensity={0.15} />
      <spotLight position={[-4, 5, 3]} angle={0.5} penumbra={1} color={GOLD} intensity={40} />
      <pointLight position={[4, -1, -3]} intensity={18} color="#f5e3bd" />
      <Environment resolution={64}>
        <Lightformer intensity={3} position={[0, 5, -2]} scale={[10, 3, 1]} color="#fff3dc" />
        <Lightformer intensity={2} position={[-5, 1, 1]} rotation-y={Math.PI / 2} scale={[8, 1, 1]} color="#d8bc8a" />
        <Lightformer intensity={1.5} position={[5, 0, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} color="#927653" />
      </Environment>
      <group position={[0, -0.4, 0]}>
        <Rig running={running} />
      </group>
    </Canvas>
  );
}

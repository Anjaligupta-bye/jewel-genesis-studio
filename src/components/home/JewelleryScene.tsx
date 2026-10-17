import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, Sparkles, useGLTF } from "@react-three/drei";
import { Suspense, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

/**
 * Optional: set to a GLB path (e.g. "/models/ring.glb" in public/) to show a real ring model
 * in the final "creation" stage instead of the procedural ring.
 */
const RING_MODEL_URL: string | null = null;

export type SceneInput = {
  progress: MutableRefObject<number>;
  pointer: MutableRefObject<{ x: number; y: number }>;
  drag: MutableRefObject<number>;
};

const GOLD = "#D6B477";
const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function RingGeometry({ wire }: { wire: boolean }) {
  const mat = wire ? (
    <meshBasicMaterial color={GOLD} wireframe transparent opacity={0} />
  ) : (
    <meshPhysicalMaterial color={GOLD} metalness={1} roughness={0.16} clearcoat={0.6} transparent opacity={0} envMapIntensity={1.4} />
  );
  const prongs = [0, 1, 2, 3].map((i) => {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    return [Math.cos(a) * 0.27, 1.22, Math.sin(a) * 0.27] as [number, number, number];
  });
  return (
    <group>
      <mesh>
        <torusGeometry args={[1, 0.085, wire ? 12 : 48, wire ? 48 : 160]} />
        {mat}
      </mesh>
      {/* basket */}
      <mesh position={[0, 1.08, 0]}>
        <cylinderGeometry args={[0.24, 0.12, 0.18, wire ? 12 : 32, 1, true]} />
        {mat}
      </mesh>
      {prongs.map((p, i) => (
        <mesh key={i} position={p} rotation={[p[2] * 0.6, 0, -p[0] * 0.6]}>
          <cylinderGeometry args={[0.025, 0.035, 0.34, 8]} />
          {mat}
        </mesh>
      ))}
      {/* stone */}
      <group position={[0, 1.3, 0]}>
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.17, 0.3, 0.1, wire ? 8 : 16]} />
          {wire ? mat : <meshPhysicalMaterial color="#ffffff" metalness={0} roughness={0} transmission={0.92} ior={2.4} thickness={0.6} flatShading transparent opacity={0} />}
        </mesh>
        <mesh position={[0, -0.16, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.3, 0.32, wire ? 8 : 16]} />
          {wire ? mat : <meshPhysicalMaterial color="#ffffff" metalness={0} roughness={0} transmission={0.92} ior={2.4} thickness={0.6} flatShading transparent opacity={0} />}
        </mesh>
      </group>
    </group>
  );
}

function GltfRing() {
  const { scene } = useGLTF(RING_MODEL_URL as string);
  return <primitive object={scene} />;
}

function IdeaCurves() {
  const tubes = useMemo(() => {
    return Array.from({ length: 5 }, (_, k) => {
      const pts = Array.from({ length: 60 }, (_, i) => {
        const t = i / 59;
        const a = t * Math.PI * (2.2 + k * 0.35) + k;
        const r = 0.6 + t * (1 + k * 0.25);
        return new THREE.Vector3(Math.cos(a) * r, (t - 0.5) * 2.6 + Math.sin(a * 2) * 0.2, Math.sin(a) * r * 0.6);
      });
      return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 200, 0.008 + k * 0.002, 6, false);
    });
  }, []);
  return (
    <group>
      {tubes.map((g, i) => (
        <mesh key={i} geometry={g}>
          <meshBasicMaterial color={GOLD} transparent opacity={0} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function setOpacity(obj: THREE.Object3D | null, o: number) {
  obj?.traverse((c) => {
    const m = (c as THREE.Mesh).material as THREE.Material | undefined;
    if (m) { m.opacity = o; m.visible = o > 0.01; }
  });
}

function Rig({ progress, pointer, drag }: SceneInput) {
  const root = useRef<THREE.Group>(null);
  const curves = useRef<THREE.Group>(null);
  const wire = useRef<THREE.Group>(null);
  const solid = useRef<THREE.Group>(null);
  const key = useRef<THREE.SpotLight>(null);
  const { camera } = useThree();
  const spin = useRef(0);

  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const p = progress.current;
    spin.current += dt * 0.25 + drag.current;
    drag.current *= Math.exp(-4 * dt);

    const ideaO = 1 - smooth(0.3, 0.48, p);
    const wireO = smooth(0.25, 0.42, p) * (1 - smooth(0.68, 0.85, p));
    const solidO = smooth(0.62, 0.82, p);
    setOpacity(curves.current, ideaO * 0.85);
    setOpacity(wire.current, wireO * 0.7);
    setOpacity(solid.current, solidO);

    if (curves.current) curves.current.rotation.y = spin.current * 0.6;
    if (root.current) {
      root.current.rotation.y = spin.current;
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, 0.25 + pointer.current.y * 0.25, 3, dt);
      root.current.rotation.z = THREE.MathUtils.damp(root.current.rotation.z, -pointer.current.x * 0.15, 3, dt);
      root.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.06 - 0.3;
      const s = 0.7 + smooth(0.2, 0.6, p) * 0.3;
      root.current.scale.setScalar(s);
    }
    const z = THREE.MathUtils.lerp(7.5, 4.6, smooth(0, 1, p));
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.current.x * 0.6, 2, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, 0.4 + pointer.current.y * 0.3, 2, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, z, 4, dt);
    camera.lookAt(0, 0, 0);
    if (key.current) key.current.intensity = 40 + Math.sin(state.clock.elapsedTime * 0.5) * 12;
  });

  return (
    <>
      <group ref={curves}><IdeaCurves /></group>
      <group ref={root}>
        <group ref={wire}><RingGeometry wire /></group>
        <group ref={solid}>
          {RING_MODEL_URL ? <Suspense fallback={null}><GltfRing /></Suspense> : <RingGeometry wire={false} />}
        </group>
      </group>
      <spotLight ref={key} position={[-4, 5, 3]} angle={0.5} penumbra={1} color={GOLD} intensity={40} />
      <pointLight position={[4, -1, -3]} intensity={18} color="#f5e3bd" />
    </>
  );
}

export default function JewelleryScene(props: SceneInput & { lite: boolean }) {
  return (
    <Canvas
      dpr={[1, props.lite ? 1.25 : 1.75]}
      camera={{ position: [0, 0.4, 7.5], fov: 35 }}
      gl={{ antialias: !props.lite, alpha: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#080808"]} />
      <fog attach="fog" args={["#080808", 7, 16]} />
      <ambientLight intensity={0.15} />
      <Environment resolution={128}>
        <Lightformer intensity={3} position={[0, 5, -2]} scale={[10, 3, 1]} color="#fff3dc" />
        <Lightformer intensity={2} position={[-5, 1, 1]} rotation-y={Math.PI / 2} scale={[8, 1, 1]} color="#d6b477" />
        <Lightformer intensity={1.5} position={[5, 0, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} color="#806541" />
      </Environment>
      <Rig {...props} />
      <Sparkles count={props.lite ? 40 : 90} scale={[8, 5, 5]} size={2} speed={0.25} color={GOLD} opacity={0.6} />
      <ContactShadows position={[0, -1.6, 0]} opacity={0.5} scale={8} blur={2.6} far={3} color="#000000" />
    </Canvas>
  );
}

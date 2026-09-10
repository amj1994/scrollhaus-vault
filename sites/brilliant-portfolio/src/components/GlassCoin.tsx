import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  MeshTransmissionMaterial,
  PerformanceMonitor,
  AdaptiveDpr,
  AdaptiveEvents,
} from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { useRef, Suspense, useEffect, useState } from "react";
import * as THREE from "three";

function GlassShape({ baseScale = 1 }: { baseScale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: baseScale },
    config: { mass: 1.2, tension: 180, friction: 14 },
  });

  useEffect(() => {
    let raf = 0;
    let nx = 0;
    let ny = 0;
    const handlePointerMove = (event: PointerEvent) => {
      nx = (event.clientX / window.innerWidth) * 2 - 1;
      ny = -(event.clientY / window.innerHeight) * 2 + 1;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          pointer.current.x = nx;
          pointer.current.y = ny;
          raf = 0;
        });
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const t = Math.min(delta * 6, 1);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, pointer.current.y * 0.5, t);
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      pointer.current.x * Math.PI + state.clock.elapsedTime * 0.25,
      t,
    );
    ref.current.rotation.z = THREE.MathUtils.lerp(
      ref.current.rotation.z,
      state.clock.elapsedTime * 0.3,
      t,
    );
  });

  return (
    <a.mesh ref={ref} scale={scale}>
      {/* Bright faceted crystal — kept luminous on the first dark-blue hero */}
      <icosahedronGeometry args={[1.7, 0]} />
      <MeshTransmissionMaterial
        color="#ffffff"
        thickness={0.18}
        roughness={0.03}
        transmission={0.96}
        ior={1.22}
        chromaticAberration={0.006}
        backside={false}
        samples={4}
        resolution={256}
        transparent
        opacity={0.78}
        attenuationDistance={80}
        attenuationColor="#f8fdff"
      />
    </a.mesh>
  );
}

export default function GlassCoin({ coinScale = 1 }: { coinScale?: number }) {
  const [dpr, setDpr] = useState<[number, number]>([1, 1.25]);
  const [visible, setVisible] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapRef.current || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 h-full w-full">
      <Canvas
        className="!absolute inset-0 h-full w-full"
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={dpr}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        frameloop={visible ? "always" : "demand"}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <PerformanceMonitor
          onIncline={() => setDpr([1, 1.25])}
          onDecline={() => setDpr([0.75, 1])}
        />
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Suspense fallback={null}>
          <ambientLight intensity={1.4} />
          <hemisphereLight args={["#ffffff", "#dff7ff", 2.2]} />
          <pointLight position={[0, 0, 4]} intensity={18} color="#ffffff" distance={10} />
          <directionalLight position={[4, 3, 5]} intensity={5.5} color="#ffffff" />
          <directionalLight position={[-5, -2, 3]} intensity={2.2} color="#f7fbff" />
          <GlassShape baseScale={coinScale} />
          <Environment preset="studio" frames={1} resolution={64} />
        </Suspense>
      </Canvas>
    </div>
  );
}

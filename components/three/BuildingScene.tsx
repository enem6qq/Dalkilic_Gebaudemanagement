"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Html, Lightformer, RoundedBox, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import Link from "next/link";
import { services, tones } from "@/lib/services";

/* ---------- Hilfen ---------- */

function useMedia(query: string, initial = false) {
  const [v, setV] = useState(initial);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setV(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return v;
}

const FACADE = "#f4f6f9";
const FACADE_SIDE = "#e3e8ef";
const GLASS = "#8ec5ff";
const GLASS_DARK = "#3d7fd6";
const FRAME = "#1e2a3a";
const LAWN = "#5fbf63";
const LAWN_DARK = "#4aa84f";
const PATH = "#d9dde3";
const ROYAL = "#1d5fd6";

/* ---------- Fenster (instanziert, einige leuchten nacheinander) ---------- */

type Win = { pos: [number, number, number]; rot: number };

function Windows({ wins, reduced }: { wins: Win[]; reduced: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorA = useMemo(() => new THREE.Color(GLASS), []);
  const colorB = useMemo(() => new THREE.Color("#ffd98a"), []);
  const colorC = useMemo(() => new THREE.Color(GLASS_DARK), []);
  const tmp = useMemo(() => new THREE.Color(), []);
  const phases = useMemo(() => wins.map((_, i) => (i * 0.618) % 1), [wins]);

  useEffect(() => {
    const m = ref.current;
    if (!m) return;
    wins.forEach((w, i) => {
      dummy.position.set(...w.pos);
      dummy.rotation.set(0, w.rot, 0);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
      m.setColorAt(i, colorA);
    });
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [wins, dummy, colorA]);

  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m || reduced) return;
    const t = clock.elapsedTime * 0.12;
    for (let i = 0; i < wins.length; i++) {
      // "Licht wandert" durch das Haus: warmes Leuchten, dazwischen kühles Glas
      const s = Math.sin((t + phases[i]) * Math.PI * 2);
      const lit = Math.max(0, s - 0.72) / 0.28;
      const depth = (Math.sin(t * 0.5 + i) + 1) / 2;
      tmp.copy(colorA).lerp(colorC, depth * 0.35).lerp(colorB, lit);
      m.setColorAt(i, tmp);
    }
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, wins.length]} castShadow>
      <boxGeometry args={[0.46, 0.6, 0.04]} />
      <meshPhysicalMaterial roughness={0.08} metalness={0.1} clearcoat={1} clearcoatRoughness={0.05} />
    </instancedMesh>
  );
}

/* ---------- Gebäude ---------- */

function Building({ reduced }: { reduced: boolean }) {
  const W = 3.2;
  const D = 2.4;
  const floors = 3;
  const FH = 1.0;
  const H = floors * FH;

  const wins = useMemo<Win[]>(() => {
    const out: Win[] = [];
    for (let f = 0; f < floors; f++) {
      const y = 0.58 + f * FH;
      // Vorderseite (+z), 4 Fenster – im EG rechts Platz für die Tür
      for (let i = 0; i < 4; i++) {
        if (f === 0 && i === 3) continue;
        out.push({ pos: [-1.2 + i * 0.8, y, D / 2 + 0.005], rot: 0 });
      }
      // Rückseite
      for (let i = 0; i < 4; i++) out.push({ pos: [-1.2 + i * 0.8, y, -D / 2 - 0.005], rot: Math.PI });
      // Seiten
      for (let i = 0; i < 3; i++) {
        out.push({ pos: [W / 2 + 0.005, y, -0.8 + i * 0.8], rot: Math.PI / 2 });
        out.push({ pos: [-W / 2 - 0.005, y, -0.8 + i * 0.8], rot: -Math.PI / 2 });
      }
    }
    return out;
  }, []);

  return (
    <group>
      {/* Korpus */}
      <mesh position={[0, H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[W, H, D]} />
        <meshStandardMaterial attach="material-0" color={FACADE_SIDE} roughness={0.9} />
        <meshStandardMaterial attach="material-1" color={FACADE_SIDE} roughness={0.9} />
        <meshStandardMaterial attach="material-2" color="#eef1f5" roughness={0.9} />
        <meshStandardMaterial attach="material-3" color={FACADE_SIDE} roughness={0.9} />
        <meshStandardMaterial attach="material-4" color={FACADE} roughness={0.85} />
        <meshStandardMaterial attach="material-5" color={FACADE_SIDE} roughness={0.9} />
      </mesh>
      {/* Geschossbänder */}
      {[1, 2].map((f) => (
        <mesh key={f} position={[0, f * FH, 0]}>
          <boxGeometry args={[W + 0.06, 0.05, D + 0.06]} />
          <meshStandardMaterial color="#cfd6df" roughness={0.8} />
        </mesh>
      ))}
      {/* Attika / Dachrand */}
      <mesh position={[0, H + 0.05, 0]} castShadow>
        <boxGeometry args={[W + 0.12, 0.1, D + 0.12]} />
        <meshStandardMaterial color="#c8d0da" roughness={0.8} />
      </mesh>
      {/* Dachfläche */}
      <mesh position={[0, H + 0.1, 0]} receiveShadow>
        <boxGeometry args={[W - 0.1, 0.02, D - 0.1]} />
        <meshStandardMaterial color="#9aa5b4" roughness={1} />
      </mesh>
      {/* Technik auf dem Dach: Verteilerkasten + PV-Modul + Antenne (Elektro) */}
      <group position={[-0.9, H + 0.11, -0.5]}>
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.5, 0.44, 0.4]} />
          <meshStandardMaterial color="#e9edf2" roughness={0.6} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.3, 0.205]}>
          <boxGeometry args={[0.12, 0.08, 0.01]} />
          <meshBasicMaterial color="#f0a32b" toneMapped={false} />
        </mesh>
      </group>
      <group position={[0.6, H + 0.11, 0.1]} rotation={[-0.45, 0, 0]}>
        <mesh position={[0, 0.25, 0]} castShadow>
          <boxGeometry args={[1.3, 0.03, 0.8]} />
          <meshPhysicalMaterial color="#163a6e" roughness={0.15} metalness={0.4} clearcoat={1} />
        </mesh>
      </group>
      <mesh position={[1.2, H + 0.5, -0.8]}>
        <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
        <meshStandardMaterial color="#aab4c2" metalness={0.8} roughness={0.3} />
      </mesh>

      <Windows wins={wins} reduced={reduced} />

      {/* Eingang (Hausmeister): Tür, Vordach, Stufe, Leuchte */}
      <group position={[1.2, 0, D / 2]}>
        <mesh position={[0, 0.5, 0.01]} castShadow>
          <boxGeometry args={[0.6, 1.0, 0.04]} />
          <meshStandardMaterial color={ROYAL} roughness={0.5} />
        </mesh>
        <mesh position={[0.18, 0.5, 0.04]}>
          <sphereGeometry args={[0.03, 12, 12]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 1.12, 0.3]} castShadow>
          <boxGeometry args={[0.9, 0.05, 0.6]} />
          <meshStandardMaterial color="#1e2a3a" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.03, 0.25]} receiveShadow>
          <boxGeometry args={[0.9, 0.06, 0.5]} />
          <meshStandardMaterial color={PATH} roughness={0.9} />
        </mesh>
        <pointLight position={[0, 1.0, 0.35]} intensity={reduced ? 0 : 1.2} distance={1.8} color="#ffd98a" />
      </group>

      {/* Fensterrahmen-Andeutung: dunkle Fläche hinter Glas (nur Front, für Tiefe) */}
      <mesh position={[0, H / 2, D / 2 - 0.001]}>
        <planeGeometry args={[W - 0.02, H - 0.02]} />
        <meshStandardMaterial color={FACADE} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.58, D / 2 + 0.0]} visible={false}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color={FRAME} />
      </mesh>
    </group>
  );
}

/* ---------- Garten ---------- */

function Tree({ position, scale = 1, seed = 0, reduced }: { position: [number, number, number]; scale?: number; seed?: number; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current || reduced) return;
    const t = clock.elapsedTime;
    ref.current.rotation.z = Math.sin(t * 0.8 + seed) * 0.025;
    ref.current.rotation.x = Math.cos(t * 0.6 + seed) * 0.02;
  });
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.07, 0.5, 8]} />
        <meshStandardMaterial color="#6b4b2e" roughness={1} />
      </mesh>
      <group ref={ref} position={[0, 0.5, 0]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshStandardMaterial color="#3fa34d" roughness={0.9} flatShading />
        </mesh>
        <mesh position={[0.18, 0.62, 0.05]} castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial color="#58b85f" roughness={0.9} flatShading />
        </mesh>
        <mesh position={[-0.2, 0.58, -0.1]} castShadow>
          <icosahedronGeometry args={[0.26, 1]} />
          <meshStandardMaterial color="#35944a" roughness={0.9} flatShading />
        </mesh>
      </group>
    </group>
  );
}

function Hedge({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
  return (
    <RoundedBox args={size} radius={0.08} smoothness={3} position={position} castShadow receiveShadow>
      <meshStandardMaterial color="#49a853" roughness={0.95} />
    </RoundedBox>
  );
}

function Lot({ reduced }: { reduced: boolean }) {
  return (
    <group>
      {/* Grundstück */}
      <RoundedBox args={[7.2, 0.3, 6.2]} radius={0.12} smoothness={4} position={[0, -0.15, 0]} receiveShadow>
        <meshStandardMaterial color={LAWN} roughness={1} />
      </RoundedBox>
      <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7.2, 6.2]} />
        <meshStandardMaterial color={LAWN_DARK} roughness={1} />
      </mesh>
      {/* Weg zum Eingang + Einfahrt */}
      <mesh position={[1.2, 0.011, 2.2]} receiveShadow>
        <boxGeometry args={[0.9, 0.02, 1.8]} />
        <meshStandardMaterial color={PATH} roughness={0.95} />
      </mesh>
      <mesh position={[-2.6, 0.011, 1.4]} receiveShadow>
        <boxGeometry args={[1.4, 0.02, 3.4]} />
        <meshStandardMaterial color="#cfd5dc" roughness={0.95} />
      </mesh>
      {/* Hecken */}
      <Hedge position={[-0.4, 0.2, 2.0]} size={[2.0, 0.4, 0.35]} />
      <Hedge position={[2.9, 0.22, 0.6]} size={[0.35, 0.44, 3.6]} />
      <Hedge position={[-2.0, 0.2, -2.6]} size={[2.4, 0.4, 0.35]} />
      {/* Bäume */}
      <Tree position={[2.6, 0, 2.4]} scale={1.1} seed={1} reduced={reduced} />
      <Tree position={[-3.0, 0, -1.6]} scale={0.9} seed={2} reduced={reduced} />
      <Tree position={[2.4, 0, -2.3]} scale={0.8} seed={3} reduced={reduced} />
      {/* Mülltonnen (Hausmeister) */}
      {[0, 1].map((i) => (
        <group key={i} position={[-2.0 + i * 0.4, 0, 2.6]}>
          <mesh position={[0, 0.26, 0]} castShadow>
            <boxGeometry args={[0.3, 0.52, 0.32]} />
            <meshStandardMaterial color={i === 0 ? "#2f4a66" : "#5a7a3a"} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.54, 0]}>
            <boxGeometry args={[0.32, 0.05, 0.34]} />
            <meshStandardMaterial color="#1e2a3a" roughness={0.7} />
          </mesh>
        </group>
      ))}
      {/* Straßenlaterne */}
      <group position={[-3.2, 0, 2.7]}>
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.025, 0.035, 1.8, 8]} />
          <meshStandardMaterial color="#7d8793" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.82, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshBasicMaterial color="#fff2cc" toneMapped={false} />
        </mesh>
        <pointLight position={[0, 1.8, 0]} intensity={reduced ? 0 : 0.8} distance={2.5} color="#ffe6b0" />
      </group>
    </group>
  );
}

/* ---------- Hotspots mit Leistungsnamen ---------- */

const HOTSPOTS: Record<string, [number, number, number]> = {
  gebaeudereinigung: [-0.4, 1.9, 1.3],
  hausmeisterservice: [1.25, 0.55, 1.45],
  gruenpflege: [2.7, 1.1, 2.5],
  elektro: [-0.9, 3.75, -0.5],
};

function Hotspots() {
  return (
    <>
      {services.map((s, i) => (
        <Html key={s.id} position={HOTSPOTS[s.id]} center zIndexRange={[30, 0]} occlude={false} style={{ pointerEvents: "auto" }}>
          <Link
            href={`/leistungen/${s.slug}`}
            className="group flex items-center gap-2 whitespace-nowrap rounded-full bg-white/90 py-1.5 pl-2 pr-3.5 text-[12.5px] font-bold text-navy shadow-[0_10px_30px_-10px_rgb(11_31_58/0.6)] ring-1 ring-navy/5 backdrop-blur transition-transform hover:scale-105"
            style={{ animationDelay: `${i * 0.4}s` }}
          >
            <span className="pulse-ring relative flex h-5 w-5 items-center justify-center rounded-full" style={{ color: tones[s.tone].hex }}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: tones[s.tone].hex }} />
            </span>
            {s.name}
          </Link>
        </Html>
      ))}
    </>
  );
}

/* ---------- Kamera ---------- */

function Rig({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, mobile ? 0.4 : 1.1, 0), [mobile]);
  const scroll = useRef(0);
  useEffect(() => {
    const on = () => (scroll.current = window.scrollY);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useFrame((_, dt) => {
    const k = 1 - Math.pow(0.02, Math.min(dt, 0.05));
    const s = Math.min(scroll.current / window.innerHeight, 1);
    const px = reduced ? 0 : pointer.x * 0.9;
    const py = reduced ? 0 : pointer.y * 0.35;
    const dist = mobile ? 26 : 13.5;
    camera.position.x += (3.0 + px - camera.position.x) * k;
    camera.position.y += ((mobile ? 3.2 : 4.2) + py + s * 1.6 - camera.position.y) * k;
    camera.position.z += (dist - s * 1.2 - camera.position.z) * k;
    camera.lookAt(target);
  });
  return null;
}

function Turntable({ children, reduced }: { children: React.ReactNode; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y += dt * 0.07;
  });
  return (
    <group ref={ref} rotation={[0, -0.5, 0]}>
      {children}
    </group>
  );
}

/* ---------- Szene ---------- */

export default function BuildingScene({ labels = true }: { labels?: boolean }) {
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const mobile = useMedia("(max-width: 767px)");

  return (
    <Canvas
      shadows
      dpr={[1, mobile ? 1.5 : 1.75]}
      camera={{ position: [3.0, 4.2, 13.5], fov: 30, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    >
      <ambientLight intensity={0.5} color="#dbe9ff" />
      <hemisphereLight args={["#cfe5ff", "#1b3a2a", 0.5]} />
      <directionalLight
        position={[6, 9, 5]}
        intensity={2.2}
        color="#fff4e2"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
      />
      <directionalLight position={[-6, 4, -4]} intensity={0.6} color="#7cc4ff" />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={2.5} position={[0, 6, 4]} scale={[10, 3, 1]} rotation={[Math.PI / 2, 0, 0]} />
        <Lightformer form="rect" intensity={1.2} position={[6, 3, 0]} scale={[2, 5, 1]} rotation={[0, -Math.PI / 2, 0]} color="#7cc4ff" />
        <Lightformer form="rect" intensity={0.8} position={[-6, 2, 2]} scale={[2, 4, 1]} rotation={[0, Math.PI / 2, 0]} color="#ffe0b0" />
      </Environment>

      <Turntable reduced={reduced}>
        <Building reduced={reduced} />
        <Lot reduced={reduced} />
        {!reduced && <Sparkles count={mobile ? 20 : 45} scale={[3.6, 3, 2.8]} position={[0, 1.6, 0]} size={2.4} speed={0.35} color="#ffffff" opacity={0.8} />}
        <ContactShadows position={[0, -0.29, 0]} opacity={0.5} scale={14} blur={2.4} far={3} color="#0b1f3a" />
        {labels && !mobile && <Hotspots />}
      </Turntable>

      <Rig reduced={reduced} mobile={mobile} />
    </Canvas>
  );
}

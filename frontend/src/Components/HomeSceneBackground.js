import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { brandColors } from '../context/ThemeContext';
import HomeCodeDrift from './HomeCodeDrift';
import { usePageVisible } from '../hooks/usePageVisible';

const METEOR_COUNT = 10;
const MAX_ACTIVE = 4;
const VIEW = {
  xMin: -9,
  xMax: 9,
  yMin: -5.5,
  yMax: 5.5,
  zMin: -3,
  zMax: 3,
};

/** Always travel top-left → bottom-right (southeast). */
function spawnMeteor(m) {
  // Start somewhere along the top edge or left edge (upper half).
  const fromTop = Math.random() < 0.65;
  const start = fromTop
    ? {
        x: VIEW.xMin - 1 + Math.random() * (VIEW.xMax - VIEW.xMin) * 0.55,
        y: VIEW.yMax + 0.4 + Math.random() * 1.2,
        z: VIEW.zMin + Math.random() * (VIEW.zMax - VIEW.zMin),
      }
    : {
        x: VIEW.xMin - 0.6 - Math.random() * 1.4,
        y: VIEW.yMin + (VIEW.yMax - VIEW.yMin) * (0.35 + Math.random() * 0.65),
        z: VIEW.zMin + Math.random() * (VIEW.zMax - VIEW.zMin),
      };

  // Direction fixed: rightward + downward, with slight speed variety.
  const speed = 6.5 + Math.random() * 3.5;
  const angle = (-Math.PI / 4) + (Math.random() - 0.5) * 0.18; // ~45° down-right
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;
  const vz = (Math.random() - 0.5) * 0.35;

  m.active = true;
  m.life = 0;
  m.maxLife = 1.8 + Math.random() * 1.4;
  m.x = start.x;
  m.y = start.y;
  m.z = start.z;
  m.vx = vx;
  m.vy = vy;
  m.vz = vz;
  m.trail = 2.0 + Math.random() * 1.8;
  m.brightness = 0.55 + Math.random() * 0.4;
}

function isOutOfView(m) {
  return (
    m.x < VIEW.xMin - 2 ||
    m.x > VIEW.xMax + 2 ||
    m.y < VIEW.yMin - 2 ||
    m.y > VIEW.yMax + 2
  );
}

function MeteorShower({ color, isDark }) {
  const linesRef = useRef();
  const pool = useMemo(
    () =>
      Array.from({ length: METEOR_COUNT }, (_, i) => ({
        active: false,
        life: 0,
        maxLife: 1,
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0,
        vz: 0,
        trail: 1,
        brightness: 1,
        // Stagger first wave so several are visible quickly.
        nextSpawn: 0.2 + i * 0.55 + Math.random() * 0.4,
      })),
    []
  );
  const positions = useMemo(() => new Float32Array(METEOR_COUNT * 2 * 3), []);
  const colorArray = useMemo(() => new Float32Array(METEOR_COUNT * 2 * 3), []);
  const headColor = useMemo(() => new THREE.Color(), []);
  const tailColor = useMemo(() => new THREE.Color(), []);
  const dimTail = useMemo(
    () => new THREE.Color(isDark ? '#2a1724' : '#dec7a7'),
    [isDark]
  );
  const accentColor = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const geom = linesRef.current?.geometry;
    if (!geom) return;

    let activeCount = pool.filter((m) => m.active).length;
    let spawnedThisFrame = 0;
    let segCount = 0;
    let pi = 0;
    let ci = 0;

    for (let i = 0; i < pool.length; i++) {
      const m = pool[i];
      if (!m.active) {
        // Allow a few new meteors per frame so the shower densifies.
        if (spawnedThisFrame < 2 && activeCount < MAX_ACTIVE && t >= m.nextSpawn) {
          spawnMeteor(m);
          spawnedThisFrame += 1;
          activeCount += 1;
        } else continue;
      }

      m.life += delta;
      m.x += m.vx * delta;
      m.y += m.vy * delta;
      m.z += m.vz * delta;

      if (m.life > m.maxLife || isOutOfView(m)) {
        m.active = false;
        m.nextSpawn = t + 0.6 + Math.random() * 1.8;
        continue;
      }

      const fade = 1 - m.life / m.maxLife;
      const speed = Math.sqrt(m.vx * m.vx + m.vy * m.vy + m.vz * m.vz) || 1;
      const trail = m.trail * (0.7 + fade * 0.4);
      const nx = m.vx / speed;
      const ny = m.vy / speed;
      const nz = m.vz / speed;

      positions[pi++] = m.x;
      positions[pi++] = m.y;
      positions[pi++] = m.z;
      positions[pi++] = m.x - nx * trail;
      positions[pi++] = m.y - ny * trail;
      positions[pi++] = m.z - nz * trail;

      headColor.set('#ffffff').multiplyScalar(m.brightness * fade);
      tailColor.copy(accentColor).lerp(dimTail, 1 - fade * 0.85);
      colorArray[ci++] = headColor.r;
      colorArray[ci++] = headColor.g;
      colorArray[ci++] = headColor.b;
      colorArray[ci++] = tailColor.r * fade * 0.5;
      colorArray[ci++] = tailColor.g * fade * 0.5;
      colorArray[ci++] = tailColor.b * fade * 0.5;
      segCount += 1;
    }

    geom.setDrawRange(0, segCount * 2);
    geom.attributes.position.needsUpdate = true;
    geom.attributes.color.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={METEOR_COUNT * 2}
          array={positions}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
        <bufferAttribute
          attach="attributes-color"
          count={METEOR_COUNT * 2}
          array={colorArray}
          itemSize={3}
          usage={THREE.DynamicDrawUsage}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function Electron({ radius, speed, phase, color }) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + phase;
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius, 0);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.075, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}

function ElectronOrbit({ radius, speed, phase, ringColor, electronColor, tilt, electrons = 1 }) {
  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.014, 24, 80]} />
        <meshBasicMaterial color={ringColor} transparent opacity={0.16} />
      </mesh>
      {Array.from({ length: electrons }, (_, i) => (
        <Electron
          key={i}
          radius={radius}
          speed={speed}
          phase={phase + (i / electrons) * Math.PI * 2}
          color={electronColor}
        />
      ))}
    </group>
  );
}

/** Nucleus + electron shells — simple atomic model */
function AtomStructure({
  nucleusColor,
  orbitColor,
  electronColor,
  position = [0, 0, 0],
  scale = 1,
  spinOffset = 0,
  phaseOffset = 0,
}) {
  const atomRef = useRef();

  useFrame((state) => {
    if (!atomRef.current) return;
    const t = state.clock.elapsedTime;
    atomRef.current.rotation.y = t * 0.1 + state.pointer.x * 0.12 + spinOffset;
    atomRef.current.rotation.x = 0.2 + state.pointer.y * 0.1;
  });

  return (
    <group ref={atomRef} scale={scale} position={position}>
      <mesh>
        <sphereGeometry args={[0.2, 24, 24]} />
        <meshStandardMaterial
          color={nucleusColor}
          emissive={nucleusColor}
          emissiveIntensity={0.38}
          metalness={0.4}
          roughness={0.35}
        />
      </mesh>
      <mesh scale={1.8}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color={nucleusColor} transparent opacity={0.07} />
      </mesh>

      <ElectronOrbit
        radius={1.25}
        speed={0.85}
        phase={phaseOffset}
        tilt={[0, 0, 0]}
        ringColor={orbitColor}
        electronColor={electronColor}
      />
      <ElectronOrbit
        radius={1.55}
        speed={0.65}
        phase={1.4 + phaseOffset}
        tilt={[Math.PI / 2.8, 0.5, 0]}
        ringColor={orbitColor}
        electronColor={electronColor}
        electrons={2}
      />
      <ElectronOrbit
        radius={1.85}
        speed={0.5}
        phase={2.8 + phaseOffset}
        tilt={[-Math.PI / 3.2, 0.9, 0.25]}
        ringColor={orbitColor}
        electronColor={electronColor}
      />
    </group>
  );
}

const PERIPHERAL_ATOMS = [
  { position: [-5.4, 0.55, -0.25], scale: 0.48, spinOffset: 0, phaseOffset: 0 },
  { position: [5.35, 0.85, -0.45], scale: 0.52, spinOffset: 1.6, phaseOffset: 2.1 },
  { position: [4.6, -2.15, -0.65], scale: 0.42, spinOffset: 3.1, phaseOffset: 4.3 },
];

function PeripheralAtoms({ nucleusColor, orbitColor, electronColor }) {
  return (
    <>
      {PERIPHERAL_ATOMS.map((atom, i) => (
        <AtomStructure
          key={i}
          nucleusColor={nucleusColor}
          orbitColor={orbitColor}
          electronColor={electronColor}
          position={atom.position}
          scale={atom.scale}
          spinOffset={atom.spinOffset}
          phaseOffset={atom.phaseOffset}
        />
      ))}
    </>
  );
}

function HomeScene({ isDark }) {
  const accent = isDark ? brandColors.amberLight : brandColors.amberDark;
  const orbitColor = isDark ? '#6e5a48' : '#a8927a';
  const nucleusColor = isDark ? brandColors.amber : brandColors.olive;
  const electronColor = isDark ? brandColors.sand : brandColors.plum;

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 2, 4]} intensity={0.8} color={accent} />
      <pointLight position={[-4, 0, 2]} intensity={0.25} color={accent} />
      <pointLight position={[4, -1, 2]} intensity={0.25} color={accent} />
      <MeteorShower color={accent} isDark={isDark} />
      <PeripheralAtoms
        nucleusColor={nucleusColor}
        orbitColor={orbitColor}
        electronColor={electronColor}
      />
    </>
  );
}

/** Home background: plain tone, drifting code, meteors + peripheral atoms */
export default function HomeSceneBackground({ isDark }) {
  const bg = isDark ? brandColors.ink : brandColors.surfaceLight;
  const pageVisible = usePageVisible();

  return (
    <div className="home-scene-wrap" aria-hidden>
      <div className="home-scene-plain" style={{ background: bg }} />
      <HomeCodeDrift />
      <div className="home-scene-canvas">
        <Canvas
          frameloop={pageVisible ? 'always' : 'never'}
          camera={{ position: [0, 0, 7.5], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <HomeScene isDark={isDark} />
        </Canvas>
      </div>
    </div>
  );
}

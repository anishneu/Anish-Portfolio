import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { brandColors } from '../context/ThemeContext';
import HomeCodeDrift from './HomeCodeDrift';
import { usePageVisible } from '../hooks/usePageVisible';

const METEOR_COUNT = 5;
const MAX_ACTIVE = 1;
const VIEW = {
  xMin: -9,
  xMax: 9,
  yMin: -5.5,
  yMax: 5.5,
  zMin: -3,
  zMax: 3,
};

function pickEdgePoint(edge) {
  switch (edge) {
    case 0:
      return {
        x: VIEW.xMin + Math.random() * (VIEW.xMax - VIEW.xMin),
        y: VIEW.yMax,
        z: VIEW.zMin + Math.random() * (VIEW.zMax - VIEW.zMin),
      };
    case 1:
      return {
        x: VIEW.xMax,
        y: VIEW.yMin + Math.random() * (VIEW.yMax - VIEW.yMin),
        z: VIEW.zMin + Math.random() * (VIEW.zMax - VIEW.zMin),
      };
    case 2:
      return {
        x: VIEW.xMin,
        y: VIEW.yMin + Math.random() * (VIEW.yMax - VIEW.yMin),
        z: VIEW.zMin + Math.random() * (VIEW.zMax - VIEW.zMin),
      };
    default:
      return {
        x: VIEW.xMin + Math.random() * (VIEW.xMax - VIEW.xMin) * 0.5,
        y: VIEW.yMax - Math.random() * 2,
        z: VIEW.zMin + Math.random() * (VIEW.zMax - VIEW.zMin),
      };
  }
}

function pickTarget(fromEdge) {
  switch (fromEdge) {
    case 0:
      return {
        x: VIEW.xMin + Math.random() * (VIEW.xMax - VIEW.xMin),
        y: VIEW.yMin,
        z: VIEW.zMin + Math.random() * (VIEW.zMax - VIEW.zMin),
      };
    case 1:
      return {
        x: VIEW.xMin,
        y: VIEW.yMin + Math.random() * (VIEW.yMax - VIEW.yMin),
        z: VIEW.zMin + Math.random() * (VIEW.zMax - VIEW.zMin),
      };
    case 2:
      return {
        x: VIEW.xMax,
        y: VIEW.yMin + Math.random() * (VIEW.yMax - VIEW.yMin),
        z: VIEW.zMin + Math.random() * (VIEW.zMax - VIEW.zMin),
      };
    default:
      return {
        x: VIEW.xMax - Math.random() * 3,
        y: VIEW.yMin + Math.random() * 2,
        z: VIEW.zMin + Math.random() * (VIEW.zMax - VIEW.zMin),
      };
  }
}

function spawnMeteor(m) {
  const edge = Math.floor(Math.random() * 4);
  const start = pickEdgePoint(edge);
  const end = pickTarget(edge);
  m.active = true;
  m.life = 0;
  m.maxLife = 1.4 + Math.random() * 1.1;
  m.x = start.x;
  m.y = start.y;
  m.z = start.z;
  m.vx = (end.x - start.x) / m.maxLife;
  m.vy = (end.y - start.y) / m.maxLife;
  m.vz = (end.z - start.z) / m.maxLife;
  m.trail = 1.8 + Math.random() * 1.6;
  m.brightness = 0.55 + Math.random() * 0.35;
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
      Array.from({ length: METEOR_COUNT }, () => ({
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
        nextSpawn: Math.random() * 6,
      })),
    []
  );
  const positions = useMemo(() => new Float32Array(METEOR_COUNT * 2 * 3), []);
  const colorArray = useMemo(() => new Float32Array(METEOR_COUNT * 2 * 3), []);
  const headColor = useMemo(() => new THREE.Color(), []);
  const tailColor = useMemo(() => new THREE.Color(), []);
  const dimTail = useMemo(
    () => new THREE.Color(isDark ? '#1e293b' : '#c7d2e0'),
    [isDark]
  );
  const accentColor = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const geom = linesRef.current?.geometry;
    if (!geom) return;

    let activeCount = pool.filter((m) => m.active).length;
    let spawnedThisFrame = false;
    let segCount = 0;
    let pi = 0;
    let ci = 0;

    for (let i = 0; i < pool.length; i++) {
      const m = pool[i];
      if (!m.active) {
        if (!spawnedThisFrame && activeCount < MAX_ACTIVE && t >= m.nextSpawn) {
          spawnMeteor(m);
          spawnedThisFrame = true;
          activeCount += 1;
        } else continue;
      }

      m.life += delta;
      m.x += m.vx * delta;
      m.y += m.vy * delta;
      m.z += m.vz * delta;

      if (m.life > m.maxLife || isOutOfView(m)) {
        m.active = false;
        m.nextSpawn = t + 3.5 + Math.random() * 5;
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
  const accent = isDark ? brandColors.champagne : brandColors.accentLight;
  const orbitColor = isDark ? '#64748b' : '#94a3b8';
  const nucleusColor = isDark ? brandColors.accent : brandColors.secondary;
  const electronColor = isDark ? brandColors.secondaryLight : brandColors.secondaryDark;

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

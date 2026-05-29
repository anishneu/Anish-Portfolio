import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const ORBIT_COUNT = 18;

/* —— Meteor shower (low count, full home viewport) —— */
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
  const dimTail = useMemo(() => new THREE.Color(isDark ? '#077348' : '#6B7A8F'), [isDark]);
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

/* —— Center focal: wireframe shell + torus knot —— */
function SceneCore({ accent, wireColor }) {
  const groupRef = useRef();
  const knotRef = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const px = state.pointer.x;
    const py = state.pointer.y;
    if (groupRef.current) {
      groupRef.current.rotation.x = py * 0.45 + Math.sin(t * 0.35) * 0.12;
      groupRef.current.rotation.y = px * 0.5 + t * 0.18;
    }
    if (knotRef.current) {
      knotRef.current.rotation.z = -t * 0.28;
      knotRef.current.rotation.x = t * 0.18;
      knotRef.current.rotation.y = t * 0.12;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.08;
      wireRef.current.rotation.x = t * 0.05;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.5}>
      <group ref={groupRef}>
        <mesh ref={wireRef} scale={2.05}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={wireColor} wireframe transparent opacity={0.22} />
        </mesh>
        <mesh ref={knotRef} scale={0.72}>
          <torusKnotGeometry args={[0.55, 0.14, 128, 24]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={0.35}
            metalness={0.75}
            roughness={0.25}
            transparent
            opacity={0.92}
          />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitRing({ color, radius = 2.6 }) {
  const groupRef = useRef();
  const dots = useMemo(() => {
    return Array.from({ length: ORBIT_COUNT }, (_, i) => ({
      angle: (i / ORBIT_COUNT) * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.z = t * 0.12;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.15 + state.pointer.y * 0.2;
    groupRef.current.rotation.y = state.pointer.x * 0.25;
  });

  return (
    <group ref={groupRef}>
      {dots.map((d, i) => {
        const x = Math.cos(d.angle) * radius;
        const y = Math.sin(d.angle) * radius;
        return (
          <mesh key={i} position={[x, y, 0]}>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.6}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        );
      })}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.012, 16, 120]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

function HomeScene({ isDark, primary }) {
  const accent = isDark ? '#7DCE9F' : '#077348';
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color={accent} />
      <pointLight position={[-4, -2, 2]} intensity={0.6} color={primary} />
      <MeteorShower color={accent} isDark={isDark} />
      <SceneCore accent={primary} wireColor={accent} />
      <OrbitRing color={accent} />
      <Sparkles count={60} scale={[10, 6, 4]} size={2} speed={0.35} opacity={0.45} color={accent} />
    </>
  );
}

/** Three.js background for the home / landing section only */
export default function HomeSceneBackground({ isDark, primary }) {
  return (
    <div className="home-scene-canvas" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <HomeScene isDark={isDark} primary={primary} />
      </Canvas>
    </div>
  );
}

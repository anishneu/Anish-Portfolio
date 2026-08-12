import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { brandColors } from '../context/ThemeContext';
import HomeCodeDrift from './HomeCodeDrift';
import { usePageVisible } from '../hooks/usePageVisible';

/** Multiple CSS meteors — always top-left → bottom-right. */
const SHOOTING_STAR_COUNT = 12;

function ShootingStars({ isDark }) {
  const stars = useMemo(
    () =>
      Array.from({ length: SHOOTING_STAR_COUNT }, (_, i) => ({
        id: i,
        top: `${-8 - (i % 5) * 7 + (i % 3) * 2}%`,
        left: `${-18 + (i % 6) * 14}%`,
        delay: `${(i * 0.55) % 6.5}s`,
        duration: `${2.4 + (i % 5) * 0.35}s`,
        length: `${90 + (i % 4) * 28}px`,
        thickness: `${1.5 + (i % 3) * 0.6}px`,
        opacity: 0.45 + (i % 4) * 0.12,
      })),
    []
  );

  return (
    <div
      className={`home-shooting-stars${isDark ? ' home-shooting-stars--dark' : ''}`}
      aria-hidden
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="home-shooting-star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            animationDuration: star.duration,
            width: star.length,
            height: star.thickness,
            ['--star-opacity']: star.opacity,
          }}
        />
      ))}
    </div>
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
      <PeripheralAtoms
        nucleusColor={nucleusColor}
        orbitColor={orbitColor}
        electronColor={electronColor}
      />
    </>
  );
}

/** Home background: plain tone, drifting code, shooting stars + peripheral atoms */
export default function HomeSceneBackground({ isDark }) {
  const bg = isDark ? brandColors.ink : brandColors.surfaceLight;
  const pageVisible = usePageVisible();

  return (
    <div className="home-scene-wrap" aria-hidden data-meteors="tl-br-v2">
      <div className="home-scene-plain" style={{ background: bg }} />
      <HomeCodeDrift />
      <ShootingStars isDark={isDark} />
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

import React, { useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '@mui/material/styles';
import { brandColors } from '../context/ThemeContext';
import { usePageVisible } from '../hooks/usePageVisible';

const PARTICLE_COUNT = 52;

function ParticleField({ isDark }) {
  const groupRef = React.useRef();
  const pointsRef = React.useRef();
  const scrollRef = React.useRef(0);

  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos.push([
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10 + (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
      ]);
    }
    return pos;
  }, []);

  const initialPositions = React.useRef(positions.map((p) => [...p]));

  React.useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const particleColor = isDark ? brandColors.accent : brandColors.accentLight;

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime * 0.12;
    const scroll = scrollRef.current * 0.0003;
    const posAttr = pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const base = initialPositions.current[i];
      posAttr.setXYZ(
        i,
        base[0] + Math.sin(t + i * 0.3) * 0.15 + scroll * (i % 3),
        base[1] + Math.cos(t * 0.8 + i * 0.2) * 0.12,
        base[2] + Math.sin(t * 0.5 + i) * 0.08
      );
    }
    posAttr.needsUpdate = true;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.04;
    }
  });

  const flatPositions = useMemo(
    () => new Float32Array(positions.flat()),
    [positions]
  );

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={flatPositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.034}
          color={particleColor}
          sizeAttenuation
          transparent
          opacity={0.85}
        />
      </points>
    </group>
  );
}

/** Ambient particles — home hero only (no O(n²) connection lines). */
export default function ParticleBackground() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const pageVisible = usePageVisible();

  return (
    <div className="home-particle-canvas" aria-hidden>
      <Canvas
        frameloop={pageVisible ? 'always' : 'never'}
        camera={{ position: [0, 0, 9], fov: 55 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.55} />
        <ParticleField isDark={isDark} />
      </Canvas>
    </div>
  );
}

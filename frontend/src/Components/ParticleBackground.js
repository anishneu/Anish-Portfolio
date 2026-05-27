import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '@mui/material/styles';

const PARTICLE_COUNT = 140;
const CONNECTION_DISTANCE = 1.35;

function ParticleField({ isDark }) {
  const groupRef = useRef();
  const pointsRef = useRef();
  const lineRef = useRef();
  const scrollRef = useRef(0);

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

  const initialPositions = useRef(positions.map((p) => [...p]));

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const lineCount = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;
  const linePositions = useMemo(() => new Float32Array(lineCount * 6), []);

  const particleColor = isDark ? '#E07A5F' : '#C4694A';
  const lineColor = isDark ? '#4a352f' : '#d4b8b0';

  useFrame((state) => {
    if (!pointsRef.current || !lineRef.current) return;
    const t = state.clock.elapsedTime * 0.12;
    const scroll = scrollRef.current * 0.0003;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const linePosAttr = lineRef.current.geometry.attributes.position;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const base = initialPositions.current[i];
      const sway = Math.sin(t + i * 0.08) * 0.2;
      const drift = Math.cos(t * 0.7 + i * 0.05) * 0.15;
      posAttr.array[i * 3] = base[0] + sway + scroll * 2;
      posAttr.array[i * 3 + 1] = base[1] + drift - scroll * 1.5;
      posAttr.array[i * 3 + 2] = base[2] + Math.sin(t * 0.5 + i * 0.03) * 0.1;
    }
    posAttr.needsUpdate = true;

    let lineIdx = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const ax = posAttr.array[i * 3];
        const ay = posAttr.array[i * 3 + 1];
        const az = posAttr.array[i * 3 + 2];
        const bx = posAttr.array[j * 3];
        const by = posAttr.array[j * 3 + 1];
        const bz = posAttr.array[j * 3 + 2];
        const dist = Math.hypot(bx - ax, by - ay, bz - az);
        if (dist < CONNECTION_DISTANCE) {
          linePosAttr.array[lineIdx * 6] = ax;
          linePosAttr.array[lineIdx * 6 + 1] = ay;
          linePosAttr.array[lineIdx * 6 + 2] = az;
          linePosAttr.array[lineIdx * 6 + 3] = bx;
          linePosAttr.array[lineIdx * 6 + 4] = by;
          linePosAttr.array[lineIdx * 6 + 5] = bz;
          lineIdx++;
        }
      }
    }
    lineRef.current.geometry.setDrawRange(0, lineIdx * 2);
    linePosAttr.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.y = scroll * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={new Float32Array(positions.flat())}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.032}
          color={particleColor}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={lineCount * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} transparent opacity={isDark ? 0.25 : 0.4} />
      </lineSegments>
    </group>
  );
}

/** Site-wide particle network behind all sections */
export default function ParticleBackground() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const baseGradient = isDark
    ? 'linear-gradient(180deg, #0d0d0d 0%, #1a1512 50%, #0d0d0d 100%)'
    : 'linear-gradient(180deg, #faf8f7 0%, #fff5f2 50%, #f5f0ee 100%)';

  return (
    <div
      className="site-particle-canvas"
      aria-hidden
      style={{ background: baseGradient }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <ParticleField isDark={isDark} />
      </Canvas>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { scroller } from 'react-scroll';
import gsap from 'gsap';
import SectionScrollFade from './SectionScrollFade';
import HomeSceneBackground from './HomeSceneBackground';
import SkyRushLauncher from './SkyRushLauncher';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import DownloadRounded from '@mui/icons-material/DownloadRounded';

const ROLES = [
  'Full-Stack Developer',
  'UI-focused Engineer',
  'Problem Solver',
];

const TECH_CHIPS = [
  'Java',
  'C/C++',
  'Python',
  'MERN Stack',
  'SQL',
  'Cloud',
  'Spring Boot',
  'Figma',
];

const Home = () => {
  const theme = useTheme();
  const primary = theme.palette.primary?.main || '#7DCE9F';
  const primaryDark = theme.palette.primary?.dark || '#077348';
  const isDark = theme.palette.mode === 'dark';
  const nameColor = isDark ? '#7DCE9F' : '#077348';
  const homeRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);

  const name = 'Anish Kuila';

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.home-greeting', { y: 28, opacity: 0, duration: 0.7 })
        .from(
          '.home-name-char',
          {
            y: 72,
            opacity: 0,
            rotateX: -75,
            stagger: 0.045,
            duration: 0.65,
            transformOrigin: '50% 100%',
          },
          '-=0.35'
        )
        .from('.home-role', { y: 18, opacity: 0, duration: 0.55 }, '-=0.25')
        .from(
          '.home-chip',
          { scale: 0, opacity: 0, stagger: 0.08, duration: 0.45, ease: 'back.out(2.2)' },
          '-=0.2'
        )
        .from('.home-cta', { y: 22, opacity: 0, scale: 0.92, duration: 0.55, ease: 'back.out(1.6)' }, '-=0.15');

      gsap.to('.home-orb-glow', {
        scale: 1.08,
        opacity: 0.55,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.home-float-a', {
        x: 24,
        y: -18,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.home-float-b', {
        x: -20,
        y: 14,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, homeRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = async () => {
    try {
      const res = await fetch('/uploads/resume.json');
      const data = res.ok ? await res.json() : null;
      const filename = data?.file || 'Resume - Anish Kuila.pdf';
      const link = document.createElement('a');
      link.href = `/uploads/${encodeURIComponent(filename)}`;
      link.download = filename;
      link.click();
    } catch {
      const link = document.createElement('a');
      link.href = '/uploads/Resume%20-%20Anish%20Kuila.pdf';
      link.download = 'Resume - Anish Kuila.pdf';
      link.click();
    }
  };

  const scrollToContent = () => {
    scroller.scrollTo('about', {
      duration: 500,
      smooth: true,
      offset: -64,
    });
  };

  return (
    <SectionScrollFade id="home">
      <Box
        ref={homeRef}
        className="home-section"
        sx={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'transparent',
        }}
      >
        <HomeSceneBackground isDark={isDark} primary={primary} />

        <Box
          className="home-orb-glow"
          sx={{
            position: 'absolute',
            width: { xs: 280, md: 420 },
            height: { xs: 280, md: 420 },
            borderRadius: '50%',
            background: `radial-gradient(circle, ${primary}35 0%, transparent 70%)`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -52%)',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 0.4,
          }}
        />

        <motion.div
          className="home-float-a"
          animate={{ rotate: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '18%',
            left: '8%',
            width: 72,
            height: 72,
            borderRadius: '50%',
            border: `1px solid ${primary}40`,
            background: isDark ? 'rgba(224,122,95,0.06)' : 'rgba(196,105,74,0.08)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <motion.div
          className="home-float-b"
          animate={{ rotate: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            bottom: '22%',
            right: '10%',
            width: 96,
            height: 96,
            borderRadius: 16,
            border: `1px solid ${nameColor}35`,
            background: isDark ? 'rgba(244,168,152,0.05)' : 'rgba(228,122,95,0.06)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
            background: isDark
              ? 'radial-gradient(ellipse 80% 60% at 50% 45%, transparent 0%, rgba(13,13,13,0.55) 55%, rgba(13,13,13,0.85) 100%)'
              : 'radial-gradient(ellipse 80% 60% at 50% 45%, transparent 0%, rgba(255,245,242,0.4) 50%, rgba(255,245,242,0.75) 100%)',
          }}
        />

        <Box
          className="home-content"
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            color: isDark ? '#fff' : '#3d3d3f',
            px: 2,
            maxWidth: 720,
          }}
        >
          <Typography
            className="home-greeting"
            variant="overline"
            sx={{
              letterSpacing: 4,
              color: isDark ? 'rgba(255,255,255,0.65)' : 'rgba(26,26,26,0.55)',
              mb: 1,
              display: 'block',
            }}
          >
            Hello, I&apos;m
          </Typography>

          <Typography
            variant="h1"
            fontWeight="bold"
            aria-label={name}
            sx={{
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
              letterSpacing: '-0.02em',
              mb: 1,
              perspective: 600,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.02em',
            }}
          >
            {name.split('').map((char, i) => (
              <span
                key={`${char}-${i}`}
                className="home-name-char"
                style={{
                  display: 'inline-block',
                  color: char === ' ' ? 'transparent' : nameColor,
                  minWidth: char === ' ' ? '0.35em' : undefined,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </Typography>

          <Box sx={{ minHeight: 36, mb: 2 }}>
            <Typography
              className="home-role"
              variant="h6"
              sx={{
                color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(26,26,26,0.85)',
                fontWeight: 400,
                fontSize: { xs: '1rem', sm: '1.2rem' },
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  width: 2,
                  height: '1.1em',
                  ml: 0.5,
                  verticalAlign: 'text-bottom',
                  bgcolor: primary,
                  animation: 'home-cursor-blink 1s step-end infinite',
                }}
              />
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              justifyContent: 'center',
              mb: 3,
            }}
          >
            {TECH_CHIPS.map((chip) => (
              <motion.span
                key={chip}
                className="home-chip"
                whileHover={{ y: -3, scale: 1.05 }}
                style={{
                  padding: '6px 14px',
                  borderRadius: 999,
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`,
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(8px)',
                  color: isDark ? 'rgba(255,255,255,0.85)' : 'rgba(26,26,26,0.8)',
                }}
              >
                {chip}
              </motion.span>
            ))}
          </Box>

          <motion.button
            className="home-cta"
            onClick={handleDownload}
            whileHover={{
              scale: 1.05,
              y: -4,
              transition: { type: 'spring', stiffness: 400, damping: 17 },
            }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 28px',
              fontSize: '1rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              color: '#fff',
              background: `linear-gradient(135deg, ${primary} 0%, ${primaryDark} 100%)`,
              border: 'none',
              borderRadius: 999,
              cursor: 'pointer',
              boxShadow: isDark
                ? `0 4px 20px ${primary}40, 0 0 0 1px rgba(255,255,255,0.08)`
                : `0 8px 24px ${primary}50, inset 0 1px 0 rgba(255,255,255,0.2)`,
              textTransform: 'none',
              letterSpacing: '0.02em',
            }}
          >
            <motion.span
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              style={{ display: 'flex' }}
            >
              <DownloadRounded sx={{ fontSize: 22 }} />
            </motion.span>
            Download Resume
          </motion.button>
        </Box>

        <SkyRushLauncher />

        <motion.div
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
            color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(26,26,26,0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            zIndex: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontSize: '0.75rem', letterSpacing: 2, textTransform: 'uppercase' }}
          >
            Scroll for more
          </Typography>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <KeyboardArrowDown sx={{ fontSize: 32 }} />
          </motion.div>
        </motion.div>
      </Box>
    </SectionScrollFade>
  );
};

export default Home;

import { useEffect, useRef, Suspense, lazy } from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { scroller } from 'react-scroll';
import gsap from 'gsap';
import { brandColors } from '../context/ThemeContext';
import SkyRushLauncher from './SkyRushLauncher';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import DownloadRounded from '@mui/icons-material/DownloadRounded';

const HomeSceneBackground = lazy(() => import('./HomeSceneBackground'));
const ParticleBackground = lazy(() => import('./ParticleBackground'));

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
  const primary = theme.palette.primary.main;
  const primaryDark = theme.palette.primary.dark;
  const isDark = theme.palette.mode === 'dark';
  const homeRef = useRef(null);

  const name = 'Anish Kuila';

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.home-greeting', { y: 24, opacity: 0, duration: 0.65 })
        .from(
          '.home-name-char',
          { x: -52, opacity: 0, stagger: 0.05, duration: 0.55, ease: 'power3.out' },
          '-=0.35'
        )
        .from('.home-opportunity', { y: 16, opacity: 0, duration: 0.5 }, '-=0.2')
        .from(
          '.home-chip',
          { scale: 0.92, opacity: 0, stagger: 0.06, duration: 0.4 },
          '-=0.15'
        )
        .from('.home-cta', { y: 18, opacity: 0, duration: 0.45 }, '-=0.1');

      if (!prefersReducedMotion) {
        tl.add(() => {
          gsap.to('.home-name-char', {
            x: 6,
            duration: 0.45,
            stagger: { each: 0.07, from: 'start' },
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }, homeRef);

    return () => ctx.revert();
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
    <Box
      id="home"
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
        <Suspense fallback={null}>
          <HomeSceneBackground isDark={isDark} />
          <ParticleBackground />
        </Suspense>

        <Box
          className="home-content"
          sx={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            color: 'text.primary',
            px: 2,
            maxWidth: 720,
          }}
        >
          <Typography
            className="home-greeting"
            variant="overline"
            sx={{
              letterSpacing: 4,
              color: 'text.secondary',
              mb: 1,
              display: 'block',
            }}
          >
            Hello, I&apos;m
          </Typography>

          <Box
            component="h1"
            className="home-name-display"
            aria-label={name}
            sx={{
              fontWeight: 700,
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
              letterSpacing: '-0.02em',
              mb: 1.5,
              m: 0,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.02em',
              lineHeight: 1.05,
              color: primary,
            }}
          >
            {name.split('').map((char, i) => (
              <Box
                key={`${char}-${i}`}
                component="span"
                className="home-name-char"
                sx={{
                  display: 'inline-block',
                  minWidth: char === ' ' ? '0.35em' : undefined,
                  color: 'inherit',
                  opacity: 1,
                  visibility: 'visible',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </Box>
            ))}
          </Box>

          <Typography
            className="home-opportunity"
            variant="h6"
            component="p"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              fontSize: { xs: '0.95rem', sm: '1.15rem' },
              lineHeight: 1.6,
              mb: 2.5,
              maxWidth: 520,
              mx: 'auto',
            }}
          >
            Actively seeking{' '}
            <Box
              component="span"
              sx={{
                fontWeight: 600,
                color: 'primary.main',
                position: 'relative',
                display: 'inline',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: -3,
                  height: 2,
                  borderRadius: 1,
                  background: `linear-gradient(90deg, transparent, ${primary}, transparent)`,
                  backgroundSize: '200% 100%',
                  animation: 'home-opportunity-shimmer 3.2s ease-in-out infinite',
                },
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.88, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                Full-Time / Intern
              </motion.span>
            </Box>{' '}
            Job Opportunities
          </Typography>

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
                whileHover={{ y: -2, scale: 1.03 }}
                style={{
                  padding: '6px 14px',
                  borderRadius: 999,
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  border: `1px solid ${isDark ? 'rgba(212,165,116,0.22)' : `${primary}44`}`,
                  background: isDark ? 'rgba(212,165,116,0.08)' : `${primary}18`,
                  color: isDark ? 'rgba(245,245,245,0.9)' : brandColors.charcoal,
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
              scale: 1.04,
              y: -3,
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
              color: theme.palette.primary.contrastText,
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
            <DownloadRounded sx={{ fontSize: 22 }} />
            Download Resume
          </motion.button>
        </Box>

        <SkyRushLauncher />

        <motion.div
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{
            position: 'absolute',
            bottom: 32,
            left: '50%',
            transform: 'translateX(-50%)',
            cursor: 'pointer',
            color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(26,26,26,0.75)',
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
  );
};

export default Home;

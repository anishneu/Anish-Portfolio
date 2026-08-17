import { useEffect, useRef, Suspense, lazy } from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { scroller } from 'react-scroll';
import gsap from 'gsap';
import { brandColors } from '../context/ThemeContext';
import SkyRushLauncher from './SkyRushLauncher';
import ShimmerButton from '../magic/ShimmerButton';
import Marquee from '../magic/Marquee';
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
  'FastAPI',
  'React',
  'TypeScript',
];

const CHIP_TONES_LIGHT = [
  { border: brandColors.amber, bg: brandColors.accentSoft },
  { border: brandColors.olive, bg: brandColors.secondarySoft },
  { border: brandColors.sand, bg: brandColors.peachSoft },
  { border: brandColors.plum, bg: brandColors.tertiarySoft },
];

const CHIP_TONES_DARK = [
  { border: brandColors.neonCoral, bg: brandColors.neonCoralSoft },
  { border: brandColors.neonMint, bg: brandColors.neonMintSoft },
  { border: brandColors.neonSand, bg: 'rgba(255, 228, 168, 0.16)' },
  { border: brandColors.neonViolet, bg: brandColors.neonVioletSoft },
];

const Home = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primaryDark = theme.palette.primary.dark;
  const secondary = theme.palette.secondary.main;
  const isDark = theme.palette.mode === 'dark';
  const homeRef = useRef(null);
  const chipTones = isDark ? CHIP_TONES_DARK : CHIP_TONES_LIGHT;

  const name = 'Anish Kuila';

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.home-greeting', { y: 24, opacity: 0, duration: 0.65 })
        .from(
          '.home-name-char',
          { y: 40, opacity: 0, rotateX: -40, stagger: 0.045, duration: 0.55, ease: 'power3.out' },
          '-=0.35'
        )
        .from('.home-opportunity', { y: 16, opacity: 0, duration: 0.5 }, '-=0.2')
        .from('.home-marquee', { y: 18, opacity: 0, duration: 0.45 }, '-=0.15')
        .from('.home-cta', { y: 18, opacity: 0, scale: 0.96, duration: 0.45 }, '-=0.1');

      if (!prefersReducedMotion) {
        gsap.to('.home-name-char', {
          y: -3,
          duration: 1.8,
          stagger: { each: 0.08, from: 'center', repeat: -1, yoyo: true },
          ease: 'sine.inOut',
          delay: 1.2,
        });
      }
    }, homeRef);

    return () => ctx.revert();
  }, []);

  const handleDownload = async () => {
    try {
      const res = await fetch(`/uploads/resume.json?v=${Date.now()}`);
      const data = res.ok ? await res.json() : null;
      const filename = data?.file || 'Resume - Anish Kuila.pdf';
      const version = data?.v ? `?v=${encodeURIComponent(data.v)}` : '';
      const link = document.createElement('a');
      link.href = `/uploads/${encodeURIComponent(filename)}${version}`;
      link.download = filename;
      link.click();
    } catch {
      const link = document.createElement('a');
      link.href = '/uploads/Resume%20-%20Anish%20Kuila.pdf?v=20260817';
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
          maxWidth: 820,
          width: '100%',
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
            textShadow: `0 0 28px ${brandColors.accentSoft}, 0 2px 18px ${brandColors.secondarySoft}`,
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
                WebkitTextFillColor: 'currentColor',
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
                background: `linear-gradient(90deg, transparent, ${primary}, ${secondary}, transparent)`,
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

        <Box className="home-marquee" sx={{ mb: 3.5, mx: 'auto', maxWidth: 680 }}>
          <Marquee duration={24}>
            {TECH_CHIPS.map((chip, index) => {
              const tone = chipTones[index % chipTones.length];
              return (
                <span
                  key={chip}
                  className="home-chip"
                  style={{
                    display: 'inline-flex',
                    padding: '7px 14px',
                    borderRadius: 999,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: `1px solid ${tone.border}55`,
                    background: tone.bg,
                    color: isDark ? 'rgba(245,245,245,0.92)' : brandColors.charcoal,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {chip}
                </span>
              );
            })}
          </Marquee>
        </Box>

        <Box className="home-cta" sx={{ display: 'flex', justifyContent: 'center' }}>
          <ShimmerButton
            onClick={handleDownload}
            background={`linear-gradient(135deg, ${primary} 0%, ${primaryDark} 55%, ${secondary} 140%)`}
            color={theme.palette.primary.contrastText}
          >
            <DownloadRounded sx={{ fontSize: 22 }} />
            Download Resume
          </ShimmerButton>
        </Box>
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

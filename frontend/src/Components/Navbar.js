import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from '@mui/material';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import { useTheme } from '@mui/material/styles';
import { useThemeMode } from '../context/ThemeContext';

const NAV_SECTIONS = ['home', 'about', 'skills', 'projects'];
const OBSERVED_SECTIONS = [...NAV_SECTIONS, 'contact'];

function getSectionFromScroll() {
  const scrollY = window.scrollY + 100;
  let current = 'home';
  for (const id of NAV_SECTIONS) {
    const el = document.getElementById(id);
    if (el && scrollY >= el.offsetTop) current = id;
  }
  return current;
}

function useActiveSection(enabled) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (!enabled) return undefined;

    setActiveSection(getSectionFromScroll());

    const visibility = {};
    OBSERVED_SECTIONS.forEach((id) => {
      visibility[id] = 0;
    });

    const updateActive = () => {
      const contactVisible = visibility.contact || 0;
      if (contactVisible >= 0.2) {
        setActiveSection(null);
        return;
      }

      const best = NAV_SECTIONS.reduce(
        (acc, id) => {
          const ratio = visibility[id] || 0;
          return ratio > acc[1] ? [id, ratio] : acc;
        },
        ['home', 0]
      );

      if (best[1] >= 0.15) {
        setActiveSection(best[0]);
        return;
      }

      setActiveSection(getSectionFromScroll());
    };

    const handleIntersect = (id) => (entries) => {
      entries.forEach((entry) => {
        visibility[id] = entry.isIntersecting ? entry.intersectionRatio : 0;
      });
      updateActive();
    };

    const observers = [];
    OBSERVED_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(handleIntersect(id), {
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
        rootMargin: '-20% 0px -20% 0px',
      });
      observer.observe(el);
      observers.push(observer);
    });

    window.addEventListener('scroll', updateActive, { passive: true });
    const raf = requestAnimationFrame(updateActive);
    const t1 = window.setTimeout(updateActive, 80);
    const t2 = window.setTimeout(updateActive, 350);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener('scroll', updateActive);
      observers.forEach((o) => o.disconnect());
    };
  }, [enabled]);

  return { activeSection, setActiveSection };
}

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isProjectDetailPage = location.pathname.startsWith('/projects/');
  const { activeSection: detectedSection, setActiveSection } = useActiveSection(
    !isProjectDetailPage
  );
  const activeSection = isProjectDetailPage ? null : detectedSection;
  const isOnHomeAtTop = !isProjectDetailPage && !scrolled;
  const theme = useTheme();
  const { mode, toggleMode } = useThemeMode();

  const primary = theme.palette.primary?.main || '#E07A5F';
  const primaryDark = theme.palette.primary?.dark || '#C4694A';
  const isLight = theme.palette.mode === 'light';
  const text = isOnHomeAtTop
    ? (isLight ? 'rgba(26,26,26,0.95)' : 'rgba(255,255,255,0.95)')
    : (isLight ? '#ffffff' : 'rgba(255,255,255,0.95)');
  const hoverColor = isOnHomeAtTop
    ? primary
    : isLight
      ? 'rgba(255,255,255,0.72)'
      : primary;
  const underlineColor = isOnHomeAtTop ? primary : isLight ? '#ffffff' : primary;

  const navLinkSx = (isActive) => ({
    color: text,
    cursor: 'pointer',
    fontSize: '1rem',
    textDecoration: 'none',
    position: 'relative',
    display: 'inline-block',
    transition: 'color 0.25s ease',
    '&:hover': { color: hoverColor },
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -4,
      left: 0,
      width: isActive ? '100%' : 0,
      height: 2,
      backgroundColor: underlineColor,
      transition: 'width 0.3s ease, background-color 0.25s ease',
    },
    '&:hover::after': { width: '100%' },
  });

  const connectBtnSx = {
    backgroundColor: 'transparent',
    color: isOnHomeAtTop ? (isLight ? primary : '#fff') : isLight ? '#fff' : primary,
    fontWeight: 600,
    textTransform: 'none',
    px: 2.5,
    py: 0.8,
    borderRadius: 999,
    border: `2px solid ${
      isOnHomeAtTop
        ? isLight
          ? primary
          : 'rgba(255,255,255,0.9)'
        : isLight
          ? 'rgba(255,255,255,0.9)'
          : primary
    }`,
    backdropFilter: isOnHomeAtTop ? 'blur(6px)' : 'none',
    transition: 'all 0.25s ease',
    '&:hover': {
      backgroundColor: isOnHomeAtTop
        ? isLight
          ? `${primary}18`
          : 'rgba(255,255,255,0.12)'
        : isLight
          ? '#ffffff'
          : `${primary}22`,
      color: isOnHomeAtTop
        ? isLight
          ? primaryDark
          : primary
        : isLight
          ? primary
          : '#fff',
      borderColor: isOnHomeAtTop
        ? isLight
          ? primaryDark
          : primary
        : isLight
          ? '#ffffff'
          : primary,
      transform: 'scale(1.04) translateY(-1px)',
      boxShadow: isLight && !isOnHomeAtTop
        ? '0 6px 20px rgba(0,0,0,0.25)'
        : `0 6px 20px ${primary}40`,
    },
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section) => {
    if (isProjectDetailPage) window.location.href = `/#${section}`;
  };

  const handleContactClick = () => {
    if (isProjectDetailPage) window.location.href = '/#contact';
  };

  return (
    <AppBar
      position="fixed"
      elevation={isOnHomeAtTop ? 0 : 4}
      sx={{
        backgroundColor: isOnHomeAtTop ? 'transparent' : (isLight ? primary : '#1a1514'),
        backdropFilter: isOnHomeAtTop ? 'blur(8px)' : 'none',
        color: text,
        transition: 'all 0.35s ease-in-out',
        px: 2,
        zIndex: 9999,
        boxShadow: isOnHomeAtTop ? 'none' : undefined,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          fontWeight="bold"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontFamily: `'Spinnaker', 'Elena Albertoni', 'Segoe UI', system-ui, sans-serif`,
            letterSpacing: 0,
            color: isLight ? (isOnHomeAtTop ? '#111' : '#ffffff') : primary,
          }}
        >
          Anish
        </Typography>

        <Box component="ul" sx={{ display: 'flex', alignItems: 'center', gap: 3.5, listStyle: 'none', m: 0, p: 0 }}>
          <li>
            <IconButton
              onClick={toggleMode}
              aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              sx={{
                color: text,
                transition: 'color 0.25s ease',
                '&:hover': { color: hoverColor, backgroundColor: 'transparent' },
              }}
            >
              {mode === 'dark' ? <LightMode /> : <DarkMode />}
            </IconButton>
          </li>
          {NAV_SECTIONS.map((section) => {
            const isActive = activeSection === section;
            return (
            <li key={section}>
              {isProjectDetailPage ? (
                <Box
                  component="a"
                  onClick={() => handleNavClick(section)}
                  sx={navLinkSx(isActive)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Box>
              ) : (
                <ScrollLink to={section} smooth duration={500} offset={-64}>
                  <Box component="span" sx={navLinkSx(isActive)}>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Box>
                </ScrollLink>
              )}
            </li>
          );
          })}

          <li>
            {isProjectDetailPage ? (
              <Button onClick={handleContactClick} variant="outlined" sx={connectBtnSx}>
                Let's Connect
              </Button>
            ) : (
              <ScrollLink
                to="contact"
                smooth
                duration={500}
                offset={-64}
                onClick={() => setActiveSection(null)}
              >
                <Button variant="outlined" sx={connectBtnSx}>
                  Let's Connect
                </Button>
              </ScrollLink>
            )}
          </li>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

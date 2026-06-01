import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import MenuRounded from '@mui/icons-material/MenuRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { useTheme } from '@mui/material/styles';
import { useThemeMode, getBrandBarColor, brandColors } from '../context/ThemeContext';
import logoBrand from '../images/logo-brand.png';

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectDetailPage = location.pathname.startsWith('/projects/');
  const { activeSection: detectedSection, setActiveSection } = useActiveSection(
    !isProjectDetailPage
  );
  const activeSection = isProjectDetailPage ? null : detectedSection;
  const isOnHomeAtTop = !isProjectDetailPage && !scrolled;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { mode, toggleMode } = useThemeMode();

  const primary = theme.palette.primary.main;
  const isLight = theme.palette.mode === 'light';
  const barColor = getBrandBarColor(mode);
  const text = isOnHomeAtTop
    ? theme.palette.text.primary
    : theme.palette.text.primary;
  const hoverColor = primary;
  const underlineColor = primary;
  const showGlassBar = !isOnHomeAtTop;

  const navLinkSx = (isActive) => ({
    color: text,
    cursor: 'pointer',
    fontSize: '0.9375rem',
    fontWeight: isActive ? 600 : 500,
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
      borderRadius: 1,
      transition: 'width 0.3s ease',
    },
    '&:hover::after': { width: '100%' },
  });

  const connectBtnSx = {
    backgroundColor: showGlassBar ? 'transparent' : `${primary}14`,
    color: primary,
    fontWeight: 600,
    textTransform: 'none',
    px: 2.5,
    py: 0.8,
    borderRadius: 999,
    border: `1.5px solid ${primary}`,
    transition: 'all 0.25s ease',
    '&:hover': {
      backgroundColor: primary,
      color: '#fff',
      borderColor: primary,
      transform: 'translateY(-1px)',
      boxShadow: `0 8px 24px ${primary}40`,
    },
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleNavClick = (section) => {
    setMobileOpen(false);
    if (isProjectDetailPage) {
      navigate('/', { state: { scrollToSection: section, scrollDelay: 220 } });
    }
  };

  const handleContactClick = () => {
    setMobileOpen(false);
    if (isProjectDetailPage) {
      navigate('/', { state: { scrollToSection: 'contact', scrollDelay: 240 } });
    }
  };

  const renderNavLink = (section, isActive, mobile = false) => {
    const label = section.charAt(0).toUpperCase() + section.slice(1);
    if (mobile) {
      return isProjectDetailPage ? (
        <ListItemButton onClick={() => handleNavClick(section)} selected={isActive}>
          <ListItemText primary={label} />
        </ListItemButton>
      ) : (
        <ScrollLink to={section} smooth duration={500} offset={-64} onClick={() => setMobileOpen(false)}>
          <ListItemButton selected={isActive} sx={{ width: '100%' }}>
            <ListItemText primary={label} />
          </ListItemButton>
        </ScrollLink>
      );
    }

    return isProjectDetailPage ? (
      <Box component="a" onClick={() => handleNavClick(section)} sx={navLinkSx(isActive)}>
        {label}
      </Box>
    ) : (
      <ScrollLink to={section} smooth duration={500} offset={-64}>
        <Box component="span" sx={navLinkSx(isActive)}>
          {label}
        </Box>
      </ScrollLink>
    );
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: isOnHomeAtTop ? 'transparent' : barColor,
          backdropFilter: showGlassBar || isOnHomeAtTop ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: showGlassBar || isOnHomeAtTop ? 'blur(16px) saturate(180%)' : 'none',
          color: text,
          borderBottom: showGlassBar ? `1px solid ${isLight ? brandColors.borderLight : brandColors.borderDark}` : 'none',
          transition: 'background-color 0.35s ease, border-color 0.35s ease',
          px: { xs: 1, sm: 2 },
          zIndex: 9999,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 56, sm: 64 } }}>
          <Box
            component={Link}
            to="/"
            aria-label="Anish Kuila — Home"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              lineHeight: 0,
              flexShrink: 0,
              '&:hover': { opacity: 0.88 },
            }}
          >
            <Box
              component="img"
              src={logoBrand}
              alt=""
              aria-hidden
              sx={{
                height: { xs: 36, sm: 40 },
                width: 'auto',
                maxWidth: { xs: 96, sm: 108 },
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 2 } }}>
            <IconButton
              onClick={toggleMode}
              aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              sx={{
                color: text,
                '&:hover': { color: hoverColor, backgroundColor: `${primary}12` },
              }}
            >
              {mode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
            </IconButton>

            {!isMobile && (
              <Box
                component="ul"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 3,
                  listStyle: 'none',
                  m: 0,
                  p: 0,
                }}
              >
                {NAV_SECTIONS.map((section) => (
                  <li key={section}>
                    {renderNavLink(section, activeSection === section)}
                  </li>
                ))}
                <li>
                  {isProjectDetailPage ? (
                    <Button onClick={handleContactClick} variant="outlined" sx={connectBtnSx}>
                      Let&apos;s Connect
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
                        Let&apos;s Connect
                      </Button>
                    </ScrollLink>
                  )}
                </li>
              </Box>
            )}

            {isMobile && (
              <IconButton
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
                sx={{ color: text }}
              >
                <MenuRounded />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: 'background.paper',
            borderLeft: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton aria-label="Close navigation menu" onClick={() => setMobileOpen(false)}>
            <CloseRounded />
          </IconButton>
        </Box>
        <List sx={{ px: 1 }}>
          {NAV_SECTIONS.map((section) => (
            <ListItem key={section} disablePadding sx={{ mb: 0.5 }}>
              {renderNavLink(section, activeSection === section, true)}
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ mt: 2, px: 1 }}>
            {isProjectDetailPage ? (
              <Button fullWidth variant="contained" onClick={handleContactClick} sx={{ borderRadius: 999 }}>
                Let&apos;s Connect
              </Button>
            ) : (
              <ScrollLink
                to="contact"
                smooth
                duration={500}
                offset={-64}
                onClick={() => {
                  setActiveSection(null);
                  setMobileOpen(false);
                }}
                style={{ width: '100%' }}
              >
                <Button fullWidth variant="contained" sx={{ borderRadius: 999 }}>
                  Let&apos;s Connect
                </Button>
              </ScrollLink>
            )}
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;

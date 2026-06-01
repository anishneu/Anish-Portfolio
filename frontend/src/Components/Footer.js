import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  GitHub,
  LinkedIn,
  Email,
  KeyboardDoubleArrowUp,
} from '@mui/icons-material';

import { brandColors, getBrandBarColor, useThemeMode } from '../context/ThemeContext';

const Footer = () => {
  const { mode } = useThemeMode();
  const theme = useTheme();
  const isLight = mode === 'light';

  const scrollToTop = () => {
    const home = document.getElementById('home');
    if (home) {
      home.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const footerBg = getBrandBarColor(mode);
  const footerColor = theme.palette.text.primary;
  const footerHover = theme.palette.primary.main;
  const footerMuted = theme.palette.text.secondary;

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: footerBg,
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        color: footerColor,
        py: 4,
        px: 2,
        textAlign: 'center',
        borderTop: `1px solid ${isLight ? brandColors.borderLight : brandColors.borderDark}`,
      }}
    >
      <Box
        component="button"
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top of page"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          mb: 3,
          mx: 'auto',
          cursor: 'pointer',
          color: footerColor,
          background: 'none',
          border: 'none',
          font: 'inherit',
          '&:hover': { color: footerHover },
          transition: 'color 0.3s',
        }}
      >
        <KeyboardDoubleArrowUp fontSize="large" aria-hidden />
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Back to Top
        </Typography>
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 2, color: footerColor }}>
        Anish Kuila
      </Typography>

      <Box sx={{ mb: 2 }}>
        <IconButton
          component="a"
          href="https://github.com/anishkuila"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          sx={{ color: footerColor, '&:hover': { color: footerHover } }}
        >
          <GitHub />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.linkedin.com/in/anish-kuila/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          sx={{ color: footerColor, '&:hover': { color: footerHover } }}
        >
          <LinkedIn />
        </IconButton>
        <IconButton
          component="a"
          href="mailto:kuila.a@northeastern.edu"
          aria-label="Send email"
          sx={{ color: footerColor, '&:hover': { color: footerHover } }}
        >
          <Email />
        </IconButton>
      </Box>

      <Typography variant="body2" sx={{ color: footerMuted }}>
        © {new Date().getFullYear()} Anish Kuila. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

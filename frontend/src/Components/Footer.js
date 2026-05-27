import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  GitHub,
  LinkedIn,
  Email,
  KeyboardDoubleArrowUp,
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const scrollToTop = () => {
    const home = document.getElementById('home');
    if (home) {
      home.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isLight = theme.palette.mode === 'light';
  const footerBg = isLight ? theme.palette.primary.main : 'background.default';
  const footerColor = isLight ? '#ffffff' : 'text.primary';
  const footerHover = isLight ? 'rgba(255,255,255,0.85)' : 'primary.main';
  const footerMuted = isLight ? 'rgba(255,255,255,0.8)' : 'text.secondary';

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: footerBg,
        color: footerColor,
        py: 4,
        px: 2,
        textAlign: 'center',
        borderTop: (t) => `1px solid ${isLight ? 'rgba(255,255,255,0.2)' : t.palette.divider}`,
      }}
    >
      {/* Back to Top */}
      <Box
        onClick={scrollToTop}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          mb: 3,
          cursor: 'pointer',
          color: footerColor,
          '&:hover': { color: footerHover },
          transition: 'color 0.3s',
        }}
      >
        <KeyboardDoubleArrowUp fontSize="large" />
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          Back to Top
        </Typography>
      </Box>

      {/* Enlarged Name */}
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: 2, color: isLight ? footerColor : 'primary.main' }}
      >
        Anish Kuila
      </Typography>

      {/* Social Icons */}
      <Box sx={{ mb: 2 }}>
        <IconButton
          component="a"
          href="https://github.com/anishkuila"
          target="_blank"
          rel="noopener"
          sx={{ color: footerColor, '&:hover': { color: footerHover } }}
        >
          <GitHub />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.linkedin.com/in/anish-kuila/"
          target="_blank"
          rel="noopener"
          sx={{ color: footerColor, '&:hover': { color: footerHover } }}
        >
          <LinkedIn />
        </IconButton>
        <IconButton
          component="a"
          href="mailto:kuila.a@northeastern.edu"
          sx={{ color: footerColor, '&:hover': { color: footerHover } }}
        >
          <Email />
        </IconButton>
      </Box>

      {/* Copyright */}
      <Typography variant="body2" sx={{ color: footerMuted }}>
        © {new Date().getFullYear()} Anish Kuila. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;


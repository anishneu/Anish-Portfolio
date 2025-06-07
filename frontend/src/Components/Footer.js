import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import {
  GitHub,
  LinkedIn,
  Email,
  KeyboardDoubleArrowUp,
} from '@mui/icons-material';

const Footer = () => {
  const scrollToTop = () => {
    const home = document.getElementById('home');
    if (home) {
      home.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1e1e1e',
        color: '#fff',
        py: 4,
        px: 2,
        textAlign: 'center',
        borderTop: '1px solid #333',
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
          color: 'white',
          '&:hover': { color: 'orange' },
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
        variant="h4" // Enlarged from h6 → h4
        sx={{ fontWeight: 'bold', mb: 2, color: 'orange' }}
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
          sx={{ color: 'white', '&:hover': { color: 'orange' } }}
        >
          <GitHub />
        </IconButton>
        <IconButton
          component="a"
          href="https://linkedin.com/in/anishkuila"
          target="_blank"
          rel="noopener"
          sx={{ color: 'white', '&:hover': { color: 'orange' } }}
        >
          <LinkedIn />
        </IconButton>
        <IconButton
          component="a"
          href="mailto:anish@example.com"
          sx={{ color: 'white', '&:hover': { color: 'orange' } }}
        >
          <Email />
        </IconButton>
      </Box>

      {/* Copyright */}
      <Typography variant="body2" sx={{ color: '#aaa' }}>
        © {new Date().getFullYear()} Anish Kuila. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;


import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={scrolled ? 4 : 0}
      sx={{
        backgroundColor: '#000',
        color: '#fff',
        transition: 'all 0.3s ease-in-out',
        px: 2,
        zIndex: 9999,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side - Stylized Name */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            display: 'flex',
            background: 'linear-gradient(to right, orange, white)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Anish
        </Typography>

        {/* Right side - Navigation */}
        <Box component="ul" sx={{ display: 'flex', alignItems: 'center', gap: 4, listStyle: 'none', m: 0, p: 0 }}>
          {['home', 'about', 'skills', 'projects'].map((section) => (
            <li key={section}>
              <ScrollLink
                to={section}
                smooth={true}
                duration={500}
                offset={-70} // adjust for AppBar height
                style={{
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = 'orange')}
                onMouseLeave={(e) => (e.target.style.color = 'white')}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </ScrollLink>
            </li>
          ))}

          {/* Let’s Connect Button */}
          <li>
            <ScrollLink to="contact" smooth={true} duration={500} offset={-70}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'orange',
                  color: '#000',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  px: 2.5,
                  py: 0.8,
                  '&:hover': {
                    backgroundColor: '#ffb347',
                  },
                }}
              >
                Let’s Connect
              </Button>
            </ScrollLink>
          </li>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

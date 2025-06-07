import { Typography, Button, Box, Container, Fade } from '@mui/material';
import { useEffect } from 'react';
import meImage from '../images/me-removebg-2.png'; // Make sure the path is correct

const Home = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#121212';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Anish_Kuila_Resume.pdf';
    link.click();
  };

  return (
    <Fade in={true} timeout={1500}>
      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          px: { xs: 2, sm: 6, md: 16 }, // shifted more left
          backgroundColor: '#121212',
          color: '#fff',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md" sx={{ zIndex: 2, pl: { md: 4 } }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
              textAlign: 'left',
            }}
          >
            Hi, I'm <span style={{ color: 'orange' }}>Anish Kuila</span>
          </Typography>

          <Typography
            variant="h6"
            color="gray"
            gutterBottom
            sx={{ textAlign: 'left', maxWidth: 600 }}
          >
            A passionate software developer crafting modern solutions.
          </Typography>

          <Box sx={{ textAlign: 'left' }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleDownload}
              sx={{
                mt: 4,
                backgroundColor: 'orange',
                color: '#000',
                fontWeight: 'bold',
                px: 4,
                '&:hover': {
                  backgroundColor: '#ff9800',
                },
              }}
            >
              Download Resume
            </Button>
          </Box>
        </Container>

        {/* Enlarged Profile Image Positioned Bottom Right */}
        <Box
          component="img"
          src={meImage}
          alt="Anish"
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            height: { xs: 300, sm: 400, md: 500 }, // image size increased
            zIndex: 1,
            opacity: 0.95,
            pointerEvents: 'none',
          }}
        />
      </Box>
    </Fade>
  );
};

export default Home;


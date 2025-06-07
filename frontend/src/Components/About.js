import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import myImage from '../images/my-removebg.png'; // ✅ Ensure correct path

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="about"
      style={{
        backgroundColor: '#2a2a2a',
        padding: '5rem 0',
        color: '#fff',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: 'orange', mb: 5, textAlign: 'center' }}
          >
            About Me
          </Typography>

          <Box
            display="flex"
            flexDirection={isMobile ? 'column' : 'row'}
            alignItems="center"
            justifyContent="center"
            gap={6}
          >
            {/* ✅ Concentric Circles with Larger Image */}
            <Box
              sx={{
                position: 'relative',
                width: isMobile ? 240 : 320,
                height: isMobile ? 240 : 320,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Outer Orange Circle */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: 'orange',
                  zIndex: 1,
                }}
              />

              {/* Inner Background Circle */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '88%',
                  height: '88%',
                  borderRadius: '50%',
                  backgroundColor: '#2a2a2a',
                  zIndex: 2,
                }}
              />

              {/* Centered Larger Image */}
              <Box
                sx={{
                  width: '88%',
                  height: '88%',
                  borderRadius: '50%',
                  backgroundImage: `url(${myImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 3,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                }}
              />
            </Box>

            {/* ✅ Text Content */}
            <Box
              sx={{
                backgroundColor: '#fff',
                color: '#222',
                borderRadius: 3,
                p: 4,
                width: isMobile ? '100%' : '55%',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Hi, I’m Anish Kuila
              </Typography>
              <Typography variant="body1" mb={2} sx={{ lineHeight: 1.6 }}>
                I’m a Software Engineer pursuing my Master’s at Northeastern University. I enjoy building full-stack web applications that solve real-world problems and offer seamless user experiences.
              </Typography>
              {expanded && (
                <Typography variant="body2" color="text.secondary" mb={2} sx={{ lineHeight: 1.6 }}>
                  With experience in technologies like React, Node.js, MongoDB, and AWS, I specialize in scalable web architecture and clean UI design. I’m also passionate about cloud infrastructure, CI/CD pipelines, and frontend animation tools like Framer Motion.
                </Typography>
              )}
              <Button
                variant="outlined"
                onClick={() => setExpanded(!expanded)}
                sx={{
                  borderColor: 'orange',
                  color: 'orange',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  mt: 1,
                  '&:hover': {
                    backgroundColor: 'orange',
                    color: '#000',
                  },
                }}
              >
                {expanded ? 'Show Less' : 'Read More'}
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </section>
  );
};

export default About;

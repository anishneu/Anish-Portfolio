import React, { useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import profileImage from '../images/my_photo.png';

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const primary = theme.palette.primary?.main || '#E07A5F';
  const isDark = theme.palette.mode === 'dark';
  const sectionBg = 'transparent';
  const circleBg = isDark ? '#2a2a2a' : '#e8e4e2';
  const cardBg = isDark ? '#252525' : '#ffffff';
  const cardColor = isDark ? '#e8e8e8' : '#1a1a1a';

  return (
    <section
      id="about"
      style={{
        backgroundColor: sectionBg,
        padding: '5rem 0',
        color: isDark ? '#fff' : '#1a1a1a',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg" ref={containerRef}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ gap: 3 }}
        >
          {/* 1. Circle + picture in the center */}
          <motion.div
            initial={false}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                position: 'relative',
                width: isMobile ? 240 : 320,
                height: isMobile ? 240 : 320,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: primary,
                  zIndex: 1,
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  width: '88%',
                  height: '88%',
                  borderRadius: '50%',
                  backgroundColor: circleBg,
                  zIndex: 2,
                }}
              />

              <Box
                sx={{
                  width: '88%',
                  height: '88%',
                  borderRadius: '50%',
                  backgroundImage: `url(${profileImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: 3,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                }}
              />
            </Box>
          </motion.div>

          {/* 2. About title under the circle */}
          <motion.div
            initial={false}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                color: primary,
                textAlign: 'center',
                fontSize: { xs: '1.5rem', sm: '1.75rem' },
              }}
            >
              About Me
            </Typography>
          </motion.div>

          {/* 3. White content container */}
          <motion.div
            initial={false}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ width: isMobile ? '100%' : '70%' }}
          >
            <Box
              sx={{
                backgroundColor: cardBg,
                color: cardColor,
                borderRadius: 3,
                p: 4,
                border: isDark ? '1px solid rgba(255,255,255,0.08)' : 'none',
                boxShadow: isDark ? '0 12px 40px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.08)',
              }}
            >
              {/* Paragraphs slide in from the left, one after another */}
              <motion.div
                initial={false}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -300 }
                }
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Typography variant="body1" mb={2} sx={{ lineHeight: 1.6 }}>
                  Hello! My name is Anish Kuila. I'm currently a graduate student in Software Engineering Systems at Northeastern University. My journey into technology began with a natural curiosity for how systems work and a deep interest in solving problems through logic and creativity.
                </Typography>
              </motion.div>

              <motion.div
                initial={false}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -300 }
                }
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <Typography variant="body1" mb={2} sx={{ lineHeight: 1.6 }}>
                  Throughout my academic experience, I've worked on a variety of projects that strengthened both my technical foundation and collaborative skills. From full-stack web applications to system design and cloud-based implementations, each project challenged me to think critically, write efficient code, and design solutions that are scalable and user-focused. These experiences helped me grow not only as a developer, but also as a communicator and team contributor.
                </Typography>
              </motion.div>

              <motion.div
                initial={false}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -300 }
                }
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Typography variant="body1" mb={2} sx={{ lineHeight: 1.6 }}>
                  Working alongside peers toward shared goals has been one of the most rewarding parts of my journey. Whether discussing architecture decisions, debugging complex issues, or refining user experiences, I value teamwork and thoughtful engineering practices that lead to meaningful outcomes.
                </Typography>
              </motion.div>

              <motion.div
                initial={false}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -300 }
                }
                transition={{ duration: 0.5, delay: 0.75 }}
              >
                <Typography variant="body1" mb={2} sx={{ lineHeight: 1.6 }}>
                  I have developed confidence working with Java, C, Linux, React, Node.js, MySQL, and MongoDB. I am particularly interested in full-stack development and building systems that are reliable, efficient, and well-structured.
                </Typography>
              </motion.div>

              <motion.div
                initial={false}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -300 }
                }
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Typography variant="body1" mb={2} sx={{ lineHeight: 1.6 }}>
                  Outside of technology, I am deeply passionate about art. Creativity influences how I approach problem-solving and design, helping me think beyond functionality and focus on experience as well.
                </Typography>
              </motion.div>

              <motion.div
                initial={false}
                animate={
                  isInView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -300 }
                }
                transition={{ duration: 0.5, delay: 1.05 }}
              >
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  I'm excited to continue exploring new technologies, contributing to impactful projects, and growing as a software engineer.
                </Typography>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </section>
  );
};

export default About;

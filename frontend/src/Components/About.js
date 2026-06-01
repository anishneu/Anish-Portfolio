import React, { useRef, useState, useCallback, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import profileImageWebp from '../images/my_photo.webp';
import profileImageJpg from '../images/my_photo.jpg';
import profileImagePng from '../images/my_photo.png';
import { brandColors } from '../context/ThemeContext';

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.5 });
  const primary = theme.palette.primary.main;
  const isDark = theme.palette.mode === 'dark';
  const sectionBg = 'transparent';
  const circleBg = isDark ? brandColors.surface : brandColors.mist;
  const cardBg = isDark ? brandColors.surface : brandColors.paperLight;
  const cardColor = isDark ? brandColors.whisper : brandColors.night;
  const photoSize = isMobile ? 240 : 320;
  const profileChain = useMemo(() => [profileImageJpg, profileImagePng], []);
  const [profileIndex, setProfileIndex] = useState(0);

  const handleProfileError = useCallback(() => {
    setProfileIndex((i) => (i < profileChain.length - 1 ? i + 1 : i));
  }, [profileChain.length]);

  return (
    <section
      id="about"
      style={{
        backgroundColor: sectionBg,
        padding: '5rem 0',
        color: 'text.primary',
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
          <motion.div
            initial={false}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                position: 'relative',
                width: photoSize,
                height: photoSize,
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
                  background: `linear-gradient(135deg, ${primary} 0%, ${brandColors.copper} 100%)`,
                  zIndex: 1,
                  boxShadow: `0 0 48px ${primary}33`,
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
                component="picture"
                sx={{
                  width: '88%',
                  height: '88%',
                  zIndex: 3,
                  position: 'relative',
                  display: 'block',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
                }}
              >
                <source srcSet={profileImageWebp} type="image/webp" />
                <source srcSet={profileImageJpg} type="image/jpeg" />
                <source srcSet={profileImagePng} type="image/png" />
                <Box
                  component="img"
                  src={profileChain[profileIndex]}
                  alt="Portrait of Anish Kuila"
                  width={photoSize * 0.88}
                  height={photoSize * 0.88}
                  loading="lazy"
                  decoding="async"
                  onError={handleProfileError}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                  }}
                />
              </Box>
            </Box>
          </motion.div>

          <motion.div
            initial={false}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <Typography component="span" className="section-eyebrow">
              Profile
            </Typography>
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

          <motion.div
            initial={false}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ width: isMobile ? '100%' : '70%' }}
          >
            <Box
              sx={{
                backgroundColor: cardBg,
                color: cardColor,
                borderRadius: 3,
                p: 4,
                border: `1px solid ${isDark ? brandColors.borderDark : brandColors.borderLight}`,
                boxShadow: isDark
                  ? '0 8px 28px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.04) inset'
                  : '0 4px 24px rgba(28,25,23,0.06)',
              }}
            >
              <motion.div
                initial={false}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -300 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Typography variant="body1" mb={2} sx={{ lineHeight: 1.65 }}>
                  Hello! My name is Anish Kuila. I&apos;m currently a graduate student in Software Engineering Systems at Northeastern University. My journey into technology began with a natural curiosity for how systems work and a deep interest in solving problems through logic and creativity.
                </Typography>
              </motion.div>

              <motion.div
                initial={false}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -300 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <Typography variant="body1" mb={2} sx={{ lineHeight: 1.65 }}>
                  Throughout my academic experience, I&apos;ve worked on a variety of projects that strengthened both my technical foundation and collaborative skills. From full-stack web applications to system design and cloud-based implementations, each project challenged me to think critically, write efficient code, and design solutions that are scalable and user-focused.
                </Typography>
              </motion.div>

              <motion.div
                initial={false}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -300 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Typography variant="body1" mb={2} sx={{ lineHeight: 1.65 }}>
                  Working alongside peers toward shared goals has been one of the most rewarding parts of my journey. Whether discussing architecture decisions, debugging complex issues, or refining user experiences, I value teamwork and thoughtful engineering practices that lead to meaningful outcomes.
                </Typography>
              </motion.div>

              <motion.div
                initial={false}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -300 }}
                transition={{ duration: 0.5, delay: 0.75 }}
              >
                <Typography variant="body1" mb={2} sx={{ lineHeight: 1.65 }}>
                  I have developed confidence working with Java, C, Linux, React, Node.js, MySQL, and MongoDB. I am particularly interested in full-stack development and building systems that are reliable, efficient, and well-structured.
                </Typography>
              </motion.div>

              <motion.div
                initial={false}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -300 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Typography variant="body1" mb={2} sx={{ lineHeight: 1.65 }}>
                  Outside of technology, I am deeply passionate about art. Creativity influences how I approach problem-solving and design, helping me think beyond functionality and focus on experience as well.
                </Typography>
              </motion.div>

              <motion.div
                initial={false}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -300 }}
                transition={{ duration: 0.5, delay: 1.05 }}
              >
                <Typography variant="body1" sx={{ lineHeight: 1.65 }}>
                  I&apos;m excited to continue exploring new technologies, contributing to impactful projects, and growing as a software engineer.
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

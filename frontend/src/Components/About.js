import React, { useState, useCallback, useMemo } from 'react';
import { Container, Typography } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { LinkedIn } from '@mui/icons-material';
import profileImageWebp from '../images/my_photo.webp';
import profileImageJpg from '../images/my_photo.jpg';
import profileImagePng from '../images/my_photo.png';
import { brandColors } from '../context/ThemeContext';

const LINKEDIN_URL = 'https://www.linkedin.com/in/anish-kuila/';

const DETAILS = [
  { label: 'Education', value: 'MS in Software Engineering Systems, Northeastern University' },
  { label: 'Focus', value: 'SDE & Full-Stack' },
  { label: 'Location', value: 'Boston, MA' },
];

const BIO_PARAGRAPHS = [
  'a graduate student specializing in software engineering. I enjoy building software that is both user-friendly and efficient, combining my skills in programming languages like Java, Python, and JavaScript with frameworks such as React and Spring Boot. My goal is to create solutions that make everyday tasks easier and more enjoyable.',
  "I've been fortunate to work on a variety of projects that have helped me grow as a developer. From designing mobile apps to developing cloud-based platforms, I like diving into new challenges that push me to learn and adapt. One of my favorite experiences was building a food ordering app focused on smooth navigation and accessibility, which taught me a lot about user experience design.",
  "Beyond coding, I'm passionate about leveraging technology to solve real-world problems. Whether it's through automated systems or scalable web applications, I'm driven by the idea of making technology more accessible and impactful. I'm always eager to collaborate with others who share a similar enthusiasm for innovation and quality software.",
  "Right now, I'm focused on expanding my expertise in cloud computing and enterprise software development. I'm excited about the opportunities ahead and look forward to connecting with professionals and teams where I can contribute, learn, and grow.",
];

const SCROLL_VIEWPORT = { once: true, amount: 0.22 };
const EASE_OUT = [0.22, 1, 0.36, 1];

function ScrollReveal({
  children,
  className = '',
  delay = 0,
  y = 16,
  x = 0,
  scale = 1,
  blur = 0,
  as: Tag = 'div',
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = Tag === 'p' ? motion.p : motion.div;

  if (prefersReducedMotion) {
    if (Tag === 'p') return <p className={className}>{children}</p>;
    return <div className={className}>{children}</div>;
  }

  const initialScale = scale < 1 ? scale : 1;

  return (
    <MotionTag
      className={className}
      initial={{
        opacity: 0,
        y,
        x,
        scale: initialScale,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: 'none',
      }}
      viewport={SCROLL_VIEWPORT}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
    >
      {children}
    </MotionTag>
  );
}

function AboutLinkedIn({ isDark, className = '' }) {
  const buttonStyle = useMemo(
    () => ({
      color: isDark ? '#1a1510' : '#fffcf8',
      background: isDark
        ? `linear-gradient(135deg, ${brandColors.champagne} 0%, ${brandColors.accent} 55%, ${brandColors.copper} 100%)`
        : 'linear-gradient(135deg, #c97852 0%, #9a5c38 55%, #874f30 100%)',
      boxShadow: isDark
        ? '0 5px 18px rgba(0, 0, 0, 0.38)'
        : '0 5px 16px rgba(135, 79, 48, 0.42)',
    }),
    [isDark],
  );

  return (
    <a
      className={`about-linkedin${isDark ? ' about-linkedin--dark' : ' about-linkedin--light'}${className ? ` ${className}` : ''}`}
      href={LINKEDIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={buttonStyle}
    >
      <LinkedIn sx={{ fontSize: 20, color: 'inherit' }} aria-hidden />
      Connect on LinkedIn
    </a>
  );
}

const About = () => {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const primary = theme.palette.primary.main;
  const isDark = theme.palette.mode === 'dark';
  const circleBg = isDark ? brandColors.surface : brandColors.mist;
  const profileChain = useMemo(() => [profileImageJpg, profileImagePng], []);
  const [profileIndex, setProfileIndex] = useState(0);

  const handleProfileError = useCallback(() => {
    setProfileIndex((i) => (i < profileChain.length - 1 ? i + 1 : i));
  }, [profileChain.length]);

  const photoGradient = `linear-gradient(145deg, ${primary}, ${brandColors.copper}, ${brandColors.champagne})`;

  const panelStyle = useMemo(() => {
    const borderGradient = isDark
      ? `linear-gradient(155deg, ${brandColors.champagne} 0%, ${brandColors.accent} 48%, ${brandColors.copper} 100%)`
      : `linear-gradient(155deg, #e8c088 0%, ${brandColors.copper} 50%, ${brandColors.accentLight} 100%)`;
    const fillGradient = isDark
      ? `linear-gradient(180deg, ${brandColors.surface} 0%, ${brandColors.surfaceRaised} 100%)`
      : `linear-gradient(180deg, ${brandColors.paperLight} 0%, #f3ede4 100%)`;

    return {
      background: `${fillGradient} padding-box, ${borderGradient} border-box`,
      border: '2px solid transparent',
      boxShadow: isDark
        ? '0 14px 40px rgba(0, 0, 0, 0.22), 0 0 20px rgba(212, 165, 116, 0.1)'
        : '0 14px 36px rgba(28, 25, 23, 0.08)',
    };
  }, [isDark]);

  const photoMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.92, y: 20 },
        whileInView: { opacity: 1, scale: 1, y: 0 },
        viewport: SCROLL_VIEWPORT,
        transition: { duration: 0.6, ease: EASE_OUT },
      };

  return (
    <section id="about" className="section about-section">
      <Container maxWidth="lg">
        <ScrollReveal className="about-header" y={28} blur={5}>
          <Typography component="span" className="section-eyebrow">
            Profile
          </Typography>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: 'primary.main',
              textAlign: 'center',
              mb: 1,
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
            }}
          >
            About Me
          </Typography>
          <Typography
            variant="body1"
            className="about-header__subtitle"
            sx={{
              color: 'text.secondary',
              textAlign: 'center',
              maxWidth: 640,
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '0.95rem', sm: '1rem' },
            }}
          >
            Full-stack developer crafting accessible products with React, Spring Boot, and cloud-native systems.
          </Typography>
        </ScrollReveal>

        <div className="about-stage">
          <aside className="about-aside">
            <div className="about-aside__photo">
              <motion.div className="about-photo-frame" {...photoMotion}>
                <div
                  className="about-photo-ring"
                  style={{ background: photoGradient }}
                  aria-hidden="true"
                />
                <div
                  className="about-photo-inner"
                  style={{ backgroundColor: circleBg }}
                  aria-hidden="true"
                />
                <picture className="about-photo-picture">
                  <source srcSet={profileImageWebp} type="image/webp" />
                  <source srcSet={profileImageJpg} type="image/jpeg" />
                  <source srcSet={profileImagePng} type="image/png" />
                  <img
                    src={profileChain[profileIndex]}
                    alt="Portrait of Anish Kuila"
                    loading="lazy"
                    decoding="async"
                    onError={handleProfileError}
                  />
                </picture>
              </motion.div>
            </div>

            <ScrollReveal delay={0.06} x={-24}>
              <div className="about-aside__panel" style={panelStyle}>
                <dl className="about-details">
                  {DETAILS.map((item, index) => (
                    <ScrollReveal
                      key={item.label}
                      as="div"
                      className="about-details__row"
                      delay={0.1 + index * 0.07}
                      y={12}
                    >
                      <dt className="about-details__label">{item.label}</dt>
                      <dd className="about-details__value">{item.value}</dd>
                    </ScrollReveal>
                  ))}
                </dl>
                <ScrollReveal delay={0.34} y={14}>
                  <AboutLinkedIn isDark={isDark} />
                </ScrollReveal>
              </div>
            </ScrollReveal>
          </aside>

          <ScrollReveal className="about-prose-wrap" x={28} delay={0.04}>
            <article className="about-prose">
              <ScrollReveal as="p" className="about-prose__p" delay={0.12} y={14}>
                <span className="about-prose__opener">Hi, I&apos;m Anish Kuila,</span> {BIO_PARAGRAPHS[0]}
              </ScrollReveal>
              {BIO_PARAGRAPHS.slice(1).map((text, index) => (
                <ScrollReveal
                  key={text.slice(0, 32)}
                  as="p"
                  className="about-prose__p"
                  delay={0.18 + index * 0.08}
                  y={14}
                >
                  {text}
                </ScrollReveal>
              ))}
              <ScrollReveal delay={0.42} y={12}>
                <div className="about-mobile-cta">
                  <AboutLinkedIn isDark={isDark} />
                </div>
              </ScrollReveal>
            </article>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
};

export default About;

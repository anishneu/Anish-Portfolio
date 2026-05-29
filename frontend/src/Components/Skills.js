import React, { useRef } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { motion, useInView } from 'framer-motion';

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'Java', icon: `${CDN}/java/java-original.svg` },
      { name: 'C', icon: `${CDN}/c/c-original.svg` },
      { name: 'C++', icon: `${CDN}/cplusplus/cplusplus-original.svg` },
      { name: 'Python', icon: `${CDN}/python/python-original.svg` },
      { name: 'SQL', icon: `${CDN}/mysql/mysql-original.svg` },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', icon: `${CDN}/html5/html5-original.svg` },
      { name: 'CSS', icon: `${CDN}/css3/css3-original.svg` },
      { name: 'JavaScript', icon: `${CDN}/javascript/javascript-original.svg` },
      { name: 'React', icon: `${CDN}/react/react-original.svg` },
      { name: 'Bootstrap', icon: `${CDN}/bootstrap/bootstrap-original.svg` },
      { name: 'Material UI', icon: `${CDN}/materialui/materialui-original.svg` },
    ],
  },
  {
    title: 'Backend & APIs',
    skills: [
      { name: 'Node.js', icon: `${CDN}/nodejs/nodejs-original.svg` },
      { name: 'Express', icon: `${CDN}/express/express-original.svg` },
      { name: 'Spring Boot', icon: `${CDN}/spring/spring-original.svg` },
      { name: 'Hibernate', icon: `${CDN}/hibernate/hibernate-original.svg` },
      { name: 'REST APIs', icon: `${CDN}/nestjs/nestjs-original.svg` },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MongoDB', icon: `${CDN}/mongodb/mongodb-original.svg` },
      { name: 'MySQL', icon: `${CDN}/mysql/mysql-original.svg` },
      { name: 'PhpMyAdmin', icon: `${CDN}/mysql/mysql-original.svg` },
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', icon: `${CDN}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
      { name: 'Google Cloud', icon: `${CDN}/googlecloud/googlecloud-original.svg` },
      { name: 'Linux', icon: `${CDN}/linux/linux-original.svg` },
      { name: 'Git', icon: `${CDN}/git/git-original.svg` },
      { name: 'GitHub', icon: `${CDN}/github/github-original.svg` },
    ],
  },
  {
    title: 'Tools & Design',
    skills: [
      { name: 'VS Code', icon: `${CDN}/vscode/vscode-original.svg` },
      { name: 'Postman', icon: `${CDN}/postman/postman-original.svg` },
      { name: 'Figma', icon: `${CDN}/figma/figma-original.svg` },
      { name: 'Moqups', icon: `${CDN}/figma/figma-original.svg` },
      { name: 'Unity', icon: `${CDN}/unity/unity-original.svg` },
      { name: 'Unreal Engine', icon: `${CDN}/unrealengine/unrealengine-original.svg` },
    ],
  },
];

const chipListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.82, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 380, damping: 26 },
  },
};

const SkillItem = ({ skill }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <motion.div variants={chipVariants} style={{ minWidth: 0 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
          px: 1.5,
          py: 1,
          borderRadius: 1.5,
          border: (t) => `1px solid ${t.palette.divider}`,
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.03)',
        }}
      >
        {!imgError ? (
          <Box
            component="img"
            src={skill.icon}
            alt=""
            aria-hidden
            onError={() => setImgError(true)}
            sx={{ width: 22, height: 22, objectFit: 'contain', flexShrink: 0 }}
          />
        ) : (
          <Box
            sx={{
              width: 22,
              height: 22,
              borderRadius: 0.75,
              bgcolor: (t) => `${t.palette.primary.main}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'primary.main',
              flexShrink: 0,
            }}
          >
            {skill.name.charAt(0)}
          </Box>
        )}
        <Typography
          variant="body2"
          sx={{ color: 'text.primary', fontWeight: 600, lineHeight: 1.2 }}
        >
          {skill.name}
        </Typography>
      </Box>
    </motion.div>
  );
};

const CategoryPanel = ({ category, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.28, margin: '-8% 0px -8% 0px' });
  const fromLeft = index % 2 === 0;

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <motion.div
        ref={ref}
        initial={false}
        animate={
          isInView
            ? { opacity: 1, x: 0, rotateY: 0, scale: 1 }
            : {
                opacity: 0,
                x: fromLeft ? -48 : 48,
                rotateY: fromLeft ? 10 : -10,
                scale: 0.94,
              }
        }
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ perspective: 900, height: '100%' }}
      >
        <Paper
          elevation={0}
          sx={{
            height: '100%',
            p: { xs: 2.5, sm: 3 },
            borderRadius: 2,
            border: (t) => `1px solid ${t.palette.primary.main}33`,
            backgroundColor: 'background.paper',
            boxShadow: (t) =>
              t.palette.mode === 'light'
                ? '0 4px 20px rgba(0,0,0,0.06)'
                : 'none',
            transformOrigin: fromLeft ? 'left center' : 'right center',
          }}
        >
          <motion.div
            initial={false}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: fromLeft ? -12 : 12 }}
            transition={{ duration: 0.4, delay: isInView ? 0.08 : 0 }}
          >
            <Typography
              variant="overline"
              sx={{
                display: 'block',
                color: 'primary.main',
                fontWeight: 700,
                letterSpacing: 1.2,
                mb: 2,
              }}
            >
              {category.title}
            </Typography>
          </motion.div>

          <motion.div
            variants={chipListVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 10,
            }}
          >
            {category.skills.map((skill) => (
              <SkillItem key={skill.name} skill={skill} />
            ))}
          </motion.div>
        </Paper>
      </motion.div>
    </Grid>
  );
};

const Skills = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { amount: 0.6, margin: '-10% 0px -10% 0px' });

  return (
    <section
      id="skills"
      style={{
        backgroundColor: 'transparent',
        padding: '5rem 0',
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, sm: 3 } }}>
        <motion.div
          ref={headerRef}
          initial={false}
          animate={
            headerInView
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: -28, filter: 'blur(6px)' }
          }
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
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
            Skills & Tools
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              textAlign: 'center',
              maxWidth: 640,
              mx: 'auto',
              mb: 5,
              lineHeight: 1.6,
            }}
          >
            A structured overview of the technologies I use across full-stack development, cloud, and design.
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {skillCategories.map((category, index) => (
            <CategoryPanel key={category.title} category={category} index={index} />
          ))}
        </Grid>
      </Box>
    </section>
  );
};

export default Skills;

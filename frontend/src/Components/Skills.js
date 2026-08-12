import React, { useRef } from 'react';
import {
  Typography,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion, useInView } from 'framer-motion';
import { brandColors } from '../context/ThemeContext';
import BorderBeam from '../magic/BorderBeam';

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Java', icon: `${CDN}/java/java-original.svg` },
      { name: 'C', icon: `${CDN}/c/c-original.svg` },
      { name: 'C++', icon: `${CDN}/cplusplus/cplusplus-original.svg` },
      { name: 'Python', icon: `${CDN}/python/python-original.svg` },
      { name: 'HTML', icon: `${CDN}/html5/html5-original.svg` },
      { name: 'CSS', icon: `${CDN}/css3/css3-original.svg` },
      { name: 'JavaScript', icon: `${CDN}/javascript/javascript-original.svg` },
      { name: 'TypeScript', icon: `${CDN}/typescript/typescript-original.svg` },
      { name: 'SQL', icon: `${CDN}/mysql/mysql-original.svg` },
    ],
  },
  {
    title: 'Frontend & UI',
    skills: [
      { name: 'React', icon: `${CDN}/react/react-original.svg` },
      { name: 'Three.js', icon: `${CDN}/threejs/threejs-original.svg` },
      { name: 'Framer Motion', icon: `${CDN}/framermotion/framermotion-original.svg` },
      { name: 'Bootstrap', icon: `${CDN}/bootstrap/bootstrap-original.svg` },
      { name: 'Material UI', icon: `${CDN}/materialui/materialui-original.svg` },
      { name: 'Kendo UI', icon: null },
      { name: 'AG Grid', icon: null },
      { name: 'Chakra UI', icon: `${CDN}/chakraui/chakraui-original.svg` },
      { name: 'Java Swing', icon: `${CDN}/java/java-original.svg` },
    ],
  },
  {
    title: 'Backend & Frameworks',
    skills: [
      { name: 'Node.js', icon: `${CDN}/nodejs/nodejs-original.svg` },
      { name: 'Express.js', icon: `${CDN}/express/express-original.svg` },
      { name: 'Spring', icon: `${CDN}/spring/spring-original.svg` },
      { name: 'Spring Boot', icon: `${CDN}/spring/spring-original.svg` },
      { name: 'Hibernate', icon: `${CDN}/hibernate/hibernate-original.svg` },
      { name: 'Django', icon: `${CDN}/django/django-plain.svg` },
      { name: 'FastAPI', icon: `${CDN}/fastapi/fastapi-original.svg` },
      { name: 'REST APIs', icon: `${CDN}/nestjs/nestjs-original.svg` },
    ],
  },
  {
    title: 'Databases & Cloud',
    skills: [
      { name: 'MySQL', icon: `${CDN}/mysql/mysql-original.svg` },
      { name: 'MongoDB', icon: `${CDN}/mongodb/mongodb-original.svg` },
      { name: 'PhpMyAdmin', icon: `${CDN}/mysql/mysql-original.svg` },
      { name: 'AWS', icon: `${CDN}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
      { name: 'Google Cloud Platform', icon: `${CDN}/googlecloud/googlecloud-original.svg` },
      { name: 'Terraform', icon: `${CDN}/terraform/terraform-original.svg` },
      { name: 'CI/CD', icon: `${CDN}/githubactions/githubactions-original.svg` },
      { name: 'Netlify', icon: `${CDN}/netlify/netlify-original.svg` },
      { name: 'Render', icon: null },
    ],
  },
  {
    title: 'Tools & Design',
    skills: [
      { name: 'Git', icon: `${CDN}/git/git-original.svg` },
      { name: 'GitHub', icon: `${CDN}/github/github-original.svg` },
      { name: 'Postman', icon: `${CDN}/postman/postman-original.svg` },
      { name: 'Swagger', icon: `${CDN}/swagger/swagger-original.svg` },
      { name: 'Keycloak', icon: `${CDN}/redhat/redhat-original.svg` },
      { name: 'Figma', icon: `${CDN}/figma/figma-original.svg` },
      { name: 'Moqups', icon: `${CDN}/figma/figma-original.svg` },
      { name: 'Balsamiq', icon: null },
      { name: 'Android Studio', icon: `${CDN}/androidstudio/androidstudio-original.svg` },
      { name: 'Linux', icon: `${CDN}/linux/linux-original.svg` },
      { name: 'VS Code', icon: `${CDN}/vscode/vscode-original.svg` },
      { name: 'Unity', icon: `${CDN}/unity/unity-original.svg` },
      { name: 'Unreal Engine', icon: `${CDN}/unrealengine/unrealengine-original.svg` },
    ],
  },
  {
    title: 'CS Fundamentals',
    skills: [
      { name: 'Object Oriented Programming', icon: `${CDN}/cplusplus/cplusplus-original.svg` },
      { name: 'Data Structures and Algorithms', icon: `${CDN}/leetcode/leetcode-original.svg` },
      { name: 'Software Engineering', icon: `${CDN}/devicon/devicon-original.svg` },
      { name: 'Design Patterns', icon: null },
      { name: 'Database Management System', icon: `${CDN}/postgresql/postgresql-original.svg` },
      { name: 'Operating Systems', icon: `${CDN}/linux/linux-original.svg` },
      { name: 'Machine Learning', icon: `${CDN}/tensorflow/tensorflow-original.svg` },
      { name: 'Artificial Intelligence', icon: `${CDN}/pytorch/pytorch-original.svg` },
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
  const theme = useTheme();
  const accent = theme.palette.secondary.main;
  const showLetter = !skill.icon || imgError;

  return (
    <motion.div variants={chipVariants} style={{ minWidth: 0, maxWidth: '100%' }}>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          px: 1.25,
          py: 0.75,
          width: 'fit-content',
          maxWidth: '100%',
          borderRadius: 1.5,
          border: (t) =>
            t.palette.mode === 'dark'
              ? `1px solid ${t.palette.primary.main}55`
              : `1px solid ${accent}40`,
          backgroundColor: (t) =>
            t.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : `${accent}28`,
        }}
      >
        {showLetter ? (
          <Box
            sx={{
              width: 22,
              height: 22,
              borderRadius: 0.75,
              bgcolor: (t) => `${t.palette.primary.main}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.65rem',
              fontWeight: 700,
              color: 'primary.main',
              flexShrink: 0,
            }}
          >
            {skill.name.charAt(0)}
          </Box>
        ) : (
          <Box
            sx={{
              width: 22,
              height: 22,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={skill.icon}
              alt=""
              aria-hidden
              onError={() => setImgError(true)}
              sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>
        )}
        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            lineHeight: 1.3,
            fontSize: '0.8rem',
            minWidth: 0,
            wordBreak: 'break-word',
          }}
        >
          {skill.name}
        </Typography>
      </Box>
    </motion.div>
  );
};

const CategoryPanel = ({ category, index }) => {
  const ref = useRef(null);
  const theme = useTheme();
  const accent = theme.palette.secondary.main;
  const isDark = theme.palette.mode === 'dark';
  const isInView = useInView(ref, { amount: 0.28, margin: '-8% 0px -8% 0px' });
  const fromLeft = index % 2 === 0;
  const beamFrom = isDark
    ? (index % 2 === 0 ? brandColors.neonCoral : brandColors.neonMint)
    : (index % 2 === 0 ? brandColors.amber : brandColors.olive);
  const beamTo = isDark
    ? (index % 2 === 0 ? brandColors.neonViolet : brandColors.neonSand)
    : (index % 2 === 0 ? brandColors.olive : brandColors.sand);

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <motion.div
        ref={ref}
        className="skill-panel-reveal"
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
        <BorderBeam
          colorFrom={beamFrom}
          colorTo={beamTo}
          duration={7 + (index % 3)}
          style={{ height: '100%', borderRadius: 16 }}
        >
          <Paper
            elevation={0}
            sx={{
              height: '100%',
              p: { xs: 2.5, sm: 3 },
              borderRadius: 2,
              overflow: 'hidden',
              border: 'none',
              backgroundColor: 'background.paper',
              boxShadow: (t) =>
                t.palette.mode === 'light'
                  ? '0 4px 20px rgba(0,0,0,0.06)'
                  : '0 8px 28px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.06) inset',
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
                pb: 1,
                borderBottom: (t) =>
                  `2px solid ${
                    t.palette.mode === 'dark' ? t.palette.primary.main : accent
                  }`,
                opacity: 0.9,
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
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              alignContent: 'flex-start',
            }}
          >
            {category.skills.map((skill) => (
              <SkillItem key={skill.name} skill={skill} />
            ))}
          </motion.div>
        </Paper>
        </BorderBeam>
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
          <Typography component="span" className="section-eyebrow">
            Expertise
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
            A structured overview aligned with my resume — languages, full-stack frameworks, cloud, tools, and CS fundamentals.
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

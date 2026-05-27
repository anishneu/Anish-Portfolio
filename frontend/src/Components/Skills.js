import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CDN = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

const skillsWithIcons = [
  { name: 'Java', icon: `${CDN}/java/java-original.svg` },
  { name: 'C', icon: `${CDN}/c/c-original.svg` },
  { name: 'C++', icon: `${CDN}/cplusplus/cplusplus-original.svg` },
  { name: 'Python', icon: `${CDN}/python/python-original.svg` },
  { name: 'HTML', icon: `${CDN}/html5/html5-original.svg` },
  { name: 'CSS', icon: `${CDN}/css3/css3-original.svg` },
  { name: 'JavaScript', icon: `${CDN}/javascript/javascript-original.svg` },
  { name: 'SQL', icon: `${CDN}/mysql/mysql-original.svg` },
  { name: 'React', icon: `${CDN}/react/react-original.svg` },
  { name: 'Node.js', icon: `${CDN}/nodejs/nodejs-original.svg` },
  { name: 'MongoDB', icon: `${CDN}/mongodb/mongodb-original.svg` },
  { name: 'Express', icon: `${CDN}/express/express-original.svg` },
  { name: 'MySQL', icon: `${CDN}/mysql/mysql-original.svg` },
  { name: 'Bootstrap', icon: `${CDN}/bootstrap/bootstrap-original.svg` },
  { name: 'Material UI', icon: `${CDN}/materialui/materialui-original.svg` },
  { name: 'Spring Boot', icon: `${CDN}/spring/spring-original.svg` },
  { name: 'Hibernate', icon: `${CDN}/hibernate/hibernate-original.svg` },
  { name: 'Linux', icon: `${CDN}/linux/linux-original.svg` },
  { name: 'Git', icon: `${CDN}/git/git-original.svg` },
  { name: 'GitHub', icon: `${CDN}/github/github-original.svg` },
  { name: 'Postman', icon: `${CDN}/postman/postman-original.svg` },
  { name: 'AWS', icon: `${CDN}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
  { name: 'Figma', icon: `${CDN}/figma/figma-original.svg` },
  { name: 'VS Code', icon: `${CDN}/vscode/vscode-original.svg` },
  { name: 'REST APIs', icon: `${CDN}/nestjs/nestjs-original.svg` },
  { name: 'PhpMyAdmin', icon: `${CDN}/mysql/mysql-original.svg` },
  { name: 'Google Cloud', icon: `${CDN}/googlecloud/googlecloud-original.svg` },
  // Additional tools from resume / portfolio
  { name: 'Moqups', icon: `${CDN}/figma/figma-original.svg` }, // fallback icon
  { name: 'Unity', icon: `${CDN}/unity/unity-original.svg` },
  { name: 'Unreal Engine', icon: `${CDN}/unrealengine/unrealengine-original.svg` },
];

const SkillCard = ({ skill, primary }) => {
  const [imgError, setImgError] = React.useState(false);
  return (
    <Card
      sx={{
        flex: '0 0 auto',
        width: 140,
        minHeight: 120,
        backgroundColor: 'background.paper',
        border: (t) => `1px solid ${t.palette.primary.main}40`,
        borderRadius: 2,
        boxShadow: (t) => t.palette.mode === 'light' ? '0 4px 16px rgba(0,0,0,0.08)' : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        '&:hover': {
          borderColor: (t) => t.palette.primary.main,
          boxShadow: (t) => t.palette.mode === 'light' ? '0 8px 24px rgba(0,0,0,0.12)' : `0 4px 20px ${t.palette.primary.main}25`,
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 2,
          px: 1.5,
        }}
      >
        {!imgError ? (
          <Box
            component="img"
            src={skill.icon}
            alt={skill.name}
            onError={() => setImgError(true)}
            sx={{
              width: 40,
              height: 40,
              objectFit: 'contain',
              mb: 1,
            }}
          />
        ) : (
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1,
              bgcolor: (t) => `${t.palette.primary.main}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 1,
            }}
          >
            {skill.name.charAt(0)}
          </Box>
        )}
        <Typography
          variant="body2"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            textAlign: 'center',
            lineHeight: 1.2,
          }}
        >
          {skill.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

const SlidingRow = ({ skills, direction = 'left', duration = 45, primary }) => {
  const duplicated = [...skills, ...skills];
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        width: 'max-content',
        animation: `slide-${direction} ${duration}s linear infinite`,
        '&:hover': { animationPlayState: 'paused' },
      }}
    >
      {duplicated.map((skill, i) => (
        <SkillCard key={`${skill.name}-${i}`} skill={skill} primary={primary} />
      ))}
    </Box>
  );
};

const Skills = () => {
  const theme = useTheme();
  const primary = theme.palette.primary?.main || '#E07A5F';
  const isLight = theme.palette.mode === 'light';
  const sectionBg = 'transparent';

  return (
    <section
      id="skills"
      style={{
        backgroundColor: sectionBg,
        padding: '5rem 0 3rem 0',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ px: 2, mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: 'primary.main', textAlign: 'center', mb: 1, fontSize: { xs: '1.5rem', sm: '1.75rem' } }}
        >
          Skills
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 480, mx: 'auto' }}
        >
          Technologies and tools I work with
        </Typography>
      </Box>

      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <Box sx={{ mb: 3 }}>
            <SlidingRow skills={skillsWithIcons} direction="left" duration={50} primary={primary} />
          </Box>
          <Box sx={{ mb: 0 }}>
            <SlidingRow skills={[...skillsWithIcons].reverse()} direction="right" duration={55} primary={primary} />
          </Box>
        </Box>
      </Box>

      <style>
        {`
          @keyframes slide-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes slide-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </section>
  );
};

export default Skills;

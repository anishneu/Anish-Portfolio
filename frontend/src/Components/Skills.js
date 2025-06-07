import React, { useState } from 'react';
import { Typography, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import 'animate.css';

const skillCategories = {
  'Programming Languages': ['Java', 'C', 'C++', 'Python', 'HTML', 'CSS', 'JavaScript', 'SQL'],
  'Frameworks': ['MERN Stack', 'Java Swing', 'Spring Boot', 'Hibernate', 'Bootstrap', 'Material UI'],
  'Databases': ['MySQL', 'MongoDB'],
  'Tools': ['Linux', 'Git/Github', 'PhpMyAdmin', 'REST APIs', 'Postman', 'AWS', 'Google Cloud', 'Figma', 'Mockups', 'VS Code'],
};

const Skills = () => {
  const [category, setCategory] = useState('Programming Languages');

  const handleCategoryChange = (_, newCategory) => {
    if (newCategory !== null) setCategory(newCategory);
  };

  const baseSkills = skillCategories[category];
  const repeatCount = Math.ceil(20 / baseSkills.length);
  const repeatedSkills = Array(repeatCount).fill(baseSkills).flat();

  return (
    <section
      id="skills"
      className="py-4 animate__animated animate__fadeIn"
      style={{ backgroundColor: '#1c1c1c' }}
    >
      <Box sx={{ px: 4, py: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: 'orange', textAlign: 'center', mb: 2 }}
        >
          Skills
        </Typography>

        {/* Filter Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <ToggleButtonGroup
            color="primary"
            value={category}
            exclusive
            onChange={handleCategoryChange}
            sx={{
              '& .MuiToggleButton-root': {
                color: 'white',
                borderColor: 'orange',
                backgroundColor: '#000',
                '&:hover': {
                  backgroundColor: '#333',
                },
              },
              '& .MuiToggleButton-root.Mui-selected': {
                backgroundColor: 'orange',
                color: '#000',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#ff9800',
                },
              },
            }}
          >
            {Object.keys(skillCategories).map((cat) => (
              <ToggleButton key={cat} value={cat}>
                {cat}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* Scrolling Skills */}
        <Box
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            position: 'relative',
            height: '60px',
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              animation: 'scroll-loop 30s linear infinite',
            }}
          >
            {repeatedSkills.map((skill, index) => (
              <Box
                key={index}
                component="span"
                sx={{
                  display: 'inline-block',
                  mx: 2,
                  px: 3,
                  py: 1,
                  backgroundColor: '#2a2a2a',
                  color: 'white',
                  borderRadius: '30px',
                  fontWeight: 'bold',
                  fontSize: '1rem',
                }}
              >
                {skill}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* CSS Keyframes */}
      <style>
        {`
          @keyframes scroll-loop {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </section>
  );
};

export default Skills;

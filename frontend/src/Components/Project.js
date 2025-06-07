import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import 'animate.css';

const projects = [
  {
    title: 'Medshop - Online Medical Store',
    description: 'A full-stack e-commerce platform for medicines built using MERN stack.',
    year: '2024',
  },
  {
    title: 'Recipe Hub',
    description: 'A React app to discover, save, and share recipes with real-time filtering.',
    year: '2024',
  },
  {
    title: 'Face Detection and Gender Identification',
    description: 'A CNN-based Python app to identify faces and predict gender in real-time.',
    year: '2022',
  },
  {
    title: 'Covidcare - Healthcare Service System',
    description: 'A healthcare support app built with Java and MySQL to assist during COVID.',
    year: '2020',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const Projects = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const cardWidth = isMobile ? '100%' : 'calc(33.333% - 2rem)'; // 3 in a row, adjust gap

  return (
    <section
      id="projects"
      className="animate__animated animate__fadeInUp"
      style={{
        backgroundColor: '#2a2a2a',
        padding: '5rem 0',
        minHeight: '100vh',
      }}
    >
      <Container>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: 'orange', textAlign: 'left', mb: 6 }}
        >
          Projects
        </Typography>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={4}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              style={{ flex: `0 1 ${cardWidth}` }}
            >
              <Card
                sx={{
                  backgroundColor: '#1e1e1e',
                  color: 'white',
                  height: '100%',
                  borderLeft: '6px solid orange',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" sx={{ color: 'gray', mb: 1 }}>
                    {project.year}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {project.title}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {project.description}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Container>
    </section>
  );
};

export default Projects;

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Chip,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import Visibility from '@mui/icons-material/Visibility';
import Code from '@mui/icons-material/Code';
import { projects } from '../projectsData';

const cardVariants = {
  hidden: { opacity: 0, x: -80 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const containedPrimaryBtnSx = {
  bgcolor: 'primary.main',
  color: '#fff',
  textTransform: 'none',
  fontWeight: 600,
  '& .MuiButton-startIcon': { color: '#fff' },
  '&:hover': {
    bgcolor: 'primary.dark',
    color: '#fff',
    '& .MuiButton-startIcon': { color: '#fff' },
  },
};

const Projects = () => {
  const sectionBg = 'transparent';

  return (
    <section
      id="projects"
      style={{
        backgroundColor: sectionBg,
        padding: '5rem 0',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
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
            The Digital Vault
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              textAlign: 'center',
              maxWidth: 640,
              mx: 'auto',
              mb: 6,
              lineHeight: 1.6,
            }}
          >
            A collection of full-stack applications, experiments, and solutions built with a focus on scalability, clean architecture, and user experience.
          </Typography>
        </motion.div>

        <Box
          display="flex"
          flexDirection="column"
          gap={4}
          sx={{ mt: 2 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
            >
              <Card
                sx={{
                  backgroundColor: 'background.paper',
                  color: 'text.primary',
                  borderRadius: 2,
                  border: (t) => `1px solid ${t.palette.primary.main}33`,
                  boxShadow: (t) => t.palette.mode === 'light' ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  overflow: 'hidden',
                  '&:hover': {
                    borderColor: (t) => t.palette.primary.main,
                    boxShadow: (t) => t.palette.mode === 'light' ? '0 8px 28px rgba(0,0,0,0.12)' : `0 8px 32px ${t.palette.primary.main}20`,
                  },
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                  <Box display="flex" flexWrap="wrap" alignItems="center" gap={1} mb={1.5}>
                    <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600 }}>
                      {project.year}
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1.5, color: 'text.primary' }}>
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      mb: 2,
                    }}
                  >
                    {project.description}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    {project.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          backgroundColor: (t) => `${t.palette.primary.main}18`,
                          color: 'primary.main',
                          border: (t) => `1px solid ${t.palette.primary.main}40`,
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    <Button
                      component={Link}
                      to={`/projects/${project.id}`}
                      size="small"
                      variant="contained"
                      startIcon={<Visibility fontSize="small" />}
                      sx={containedPrimaryBtnSx}
                    >
                      View project
                    </Button>
                    <Button
                      component="a"
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      variant="outlined"
                      startIcon={<Code fontSize="small" />}
                      sx={{
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          borderColor: 'primary.dark',
                          bgcolor: (t) => `${t.palette.primary.main}12`,
                        },
                      }}
                    >
                      Source
                    </Button>
                  </Box>
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

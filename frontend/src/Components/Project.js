import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../ProjectsSpectrum.css';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Code from '@mui/icons-material/Code';
import ArrowOutward from '@mui/icons-material/ArrowOutward';
import {
  projects,
  getProjectCover,
  getProjectFallbackCover,
  getProjectBlurb,
} from '../projectsData';
import {
  PROJECT_CATEGORIES,
  filterProjects,
  getCategoryLabel,
  getTagIcon,
} from '../projectUtils';
import { useRasterImageSrc } from '../hooks/useRasterImageSrc';

const containedPrimaryBtnSx = {
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: '999px',
  minHeight: 40,
  py: 0.75,
  fontSize: '0.85rem',
  '& .MuiButton-startIcon, & .MuiButton-endIcon': { color: 'primary.contrastText' },
  '&:hover': {
    bgcolor: 'primary.dark',
    color: 'primary.contrastText',
    '& .MuiButton-startIcon, & .MuiButton-endIcon': { color: 'primary.contrastText' },
  },
};

const outlinedBtnSx = {
  borderColor: 'primary.main',
  color: 'primary.main',
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: '999px',
  minHeight: 40,
  py: 0.75,
  fontSize: '0.85rem',
  '&:hover': {
    borderColor: 'primary.dark',
    bgcolor: (t) => `${t.palette.primary.main}12`,
  },
};

const TAGS_VISIBLE = 3;

const EASE = [0.22, 1, 0.36, 1];

function getEnterOffset(column) {
  if (column === 0) return { y: 36, x: -16 };
  if (column === 2) return { y: 36, x: 16 };
  return { y: 44, x: 0 };
}

function getCardDescription(project) {
  const lines = getProjectBlurb(project);
  return lines.join(' ');
}

function ProjectCover({ project, className }) {
  const cover = getProjectCover(project);
  const { src, onError } = useRasterImageSrc(cover, getProjectFallbackCover(project));

  return (
    <img
      src={src}
      alt={`${project.shortTitle || project.title} project cover`}
      className={className}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={onError}
    />
  );
}

function ProjectCard({ project, index }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.28, margin: '-40px 0px' });
  const column = index % 3;
  const enter = getEnterOffset(column);
  const description = getCardDescription(project);
  const visibleTags = project.tags.slice(0, TAGS_VISIBLE);
  const extraTagCount = project.tags.length - TAGS_VISIBLE;

  return (
    <motion.div
      ref={ref}
      className={`projects-grid__cell projects-grid__cell--col-${column}`}
      initial={false}
      animate={
        inView
          ? { opacity: 1, y: 0, x: 0 }
          : { opacity: 0, y: enter.y, x: enter.x }
      }
      transition={{ duration: 0.48, ease: EASE }}
    >
      <Paper
        elevation={0}
        className="project-card"
        component={motion.div}
        initial={false}
        animate={inView ? 'shown' : 'hidden'}
        variants={{
          hidden: { '--reveal': '0%' },
          shown: { '--reveal': '100%' },
        }}
        transition={{ duration: 0.55, ease: EASE, delay: inView ? 0.06 : 0 }}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          overflow: 'hidden',
          border: (t) =>
            t.palette.mode === 'dark'
              ? '1px solid rgba(193,193,193,0.28)'
              : `1px solid ${t.palette.primary.main}33`,
          backgroundColor: 'background.paper',
          boxShadow: (t) =>
            t.palette.mode === 'light'
              ? '0 4px 20px rgba(0,0,0,0.06)'
              : '0 8px 28px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.06) inset',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: 'primary.main',
            boxShadow: (t) =>
              t.palette.mode === 'light'
                ? '0 12px 32px rgba(0,0,0,0.1)'
                : '0 14px 36px rgba(0,0,0,0.5)',
            '& .project-card__image': {
              transform: 'scale(1.03)',
            },
          },
        }}
      >
        <div className="project-card__media-wrap">
          <Link
            to={`/projects/${project.id}`}
            className="project-card__media"
            aria-label={`View ${project.title}`}
          >
            <ProjectCover project={project} className="project-card__image" />
            <Box className="project-card__media-badge">
              <Typography variant="caption" fontWeight={700} sx={{ color: 'primary.main' }}>
                {project.year}
              </Typography>
            </Box>
          </Link>
        </div>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            p: { xs: 2, sm: 2.25 },
            gap: 0.75,
            minHeight: 0,
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1, lineHeight: 1.3 }}
          >
            {getCategoryLabel(project.category)}
          </Typography>

          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: 'text.primary',
              fontSize: { xs: '0.92rem', sm: '1rem' },
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.title}
          </Typography>

          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            {project.role}
          </Typography>

          <Box className="project-card__blurb">
            <Typography
              variant="body2"
              className="project-card__description"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.65,
                fontSize: '0.875rem',
                m: 0,
              }}
            >
              {description}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, alignItems: 'center' }}>
            {visibleTags.map((tag) => {
              const icon = getTagIcon(tag);
              return (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  icon={
                    icon ? (
                      <Box
                        component="img"
                        src={icon}
                        alt=""
                        aria-hidden
                        sx={{
                          width: 14,
                          height: 14,
                          ml: 0.5,
                        }}
                      />
                    ) : undefined
                  }
                  sx={{
                    height: 26,
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    backgroundColor: (t) =>
                      t.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.06)'
                        : `${t.palette.primary.main}14`,
                    color: 'primary.main',
                    border: (t) =>
                      t.palette.mode === 'dark'
                        ? '1px solid rgba(193,193,193,0.22)'
                        : `1px solid ${t.palette.primary.main}40`,
                    '& .MuiChip-icon': { ml: 0.75 },
                  }}
                />
              );
            })}
            {extraTagCount > 0 && (
              <Chip
                label={`+${extraTagCount}`}
                size="small"
                title={project.tags.slice(TAGS_VISIBLE).join(', ')}
                sx={{
                  height: 26,
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: 'primary.main',
                  border: (t) =>
                    t.palette.mode === 'dark'
                      ? '1px dashed rgba(193,193,193,0.35)'
                      : `1px dashed ${t.palette.primary.main}55`,
                  backgroundColor: 'transparent',
                }}
              />
            )}
          </Box>

          <Box
            className="project-card__actions"
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 1,
              pt: 1,
              mt: 'auto',
              borderTop: '1px solid',
              borderColor: isDark ? 'rgba(193,193,193,0.15)' : 'rgba(0,0,0,0.08)',
            }}
          >
            <Button
              component={Link}
              to={`/projects/${project.id}`}
              variant="contained"
              fullWidth
              endIcon={<ArrowOutward sx={{ fontSize: 17 }} />}
              sx={containedPrimaryBtnSx}
            >
              View Project
            </Button>
            <Button
              component="a"
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              fullWidth
              startIcon={<Code sx={{ fontSize: 17 }} />}
              sx={outlinedBtnSx}
            >
              Source
            </Button>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
}

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.6 });

  const filtered = useMemo(() => filterProjects(projects, activeCategory), [activeCategory]);

  return (
    <section
      id="projects"
      className="projects-section section"
      style={{ backgroundColor: 'transparent', padding: '5rem 0' }}
    >
      <Container maxWidth="lg">
        <motion.header
          ref={headerRef}
          className="projects-section__header"
          initial={false}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Typography component="span" className="section-eyebrow">
            Selected Work
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
            The Digital Vault
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              textAlign: 'center',
              maxWidth: 640,
              mx: 'auto',
              mb: 3,
              lineHeight: 1.6,
              fontSize: { xs: '0.95rem', sm: '1rem' },
            }}
          >
            Selected builds across full-stack engineering, product design, and applied research.
          </Typography>

          <Box
            className="projects-section__filters"
            role="tablist"
            aria-label="Filter projects"
            sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 0.75, mb: 4 }}
          >
            {PROJECT_CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <Button
                  key={cat.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(cat.id)}
                  variant={active ? 'contained' : 'outlined'}
                  size="small"
                  sx={{
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '999px',
                    px: 2,
                    ...(active
                      ? {
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                          '&:hover': { bgcolor: 'primary.dark' },
                        }
                      : {
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          '&:hover': {
                            borderColor: 'primary.dark',
                            bgcolor: (t) => `${t.palette.primary.main}10`,
                          },
                        }),
                  }}
                >
                  {cat.label}
                </Button>
              );
            })}
          </Box>
        </motion.header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="projects-grid"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            {filtered.length === 0 ? (
              <Typography
                className="projects-grid__empty"
                textAlign="center"
                color="text.secondary"
                sx={{ gridColumn: '1 / -1', py: 6 }}
              >
                No projects in this category yet.
              </Typography>
            ) : (
              filtered.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
};

export default Projects;

import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Code from '@mui/icons-material/Code';
import OpenInNew from '@mui/icons-material/OpenInNew';
import Assignment from '@mui/icons-material/Assignment';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import BuildCircleOutlined from '@mui/icons-material/BuildCircleOutlined';
import { projects } from '../projectsData';
import Navbar from './Navbar';
import Footer from './Footer';

const containedPrimaryBtnSx = {
  bgcolor: 'primary.main',
  color: '#fff',
  textTransform: 'none',
  fontWeight: 600,
  px: 2.5,
  '& .MuiButton-startIcon': { color: '#fff' },
  '&:hover': {
    bgcolor: 'primary.dark',
    color: '#fff',
    '& .MuiButton-startIcon': { color: '#fff' },
  },
};

const ProjectDetail = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => String(p.id) === id);
  const scrollContainerRef = React.useRef(null);
  const isDraggingRef = React.useRef(false);
  const startXRef = React.useRef(0);
  const scrollLeftRef = React.useRef(0);
  const [carouselPage, setCarouselPage] = React.useState(0);

  if (!project) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h6">Project not found</Typography>
        <Button
          onClick={() => navigate('/')}
          variant="contained"
          sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.dark' } }}
        >
          Back to portfolio
        </Button>
      </Box>
    );
  }

  const role = project.role || 'Developer';
  const highlights = project.highlights || [];

  const handleDragStart = (e) => {
    if (!scrollContainerRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
    document.body.style.cursor = 'grabbing';
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    document.body.style.cursor = 'default';
  };

  const handleDragMove = (e) => {
    if (!isDraggingRef.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.clientX;
    const walk = x - startXRef.current;
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  // Show the top of the page when opening, refreshing, or switching project (no scroll animation)
  React.useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          color: 'text.primary',
          pt: '80px', // clear fixed navbar (64px) so Back button is visible
          pb: 8,
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Button
            startIcon={<ArrowBack />}
            component={Link}
            to="/#projects"
            sx={{
              color: 'primary.main',
              textTransform: 'none',
              fontWeight: 600,
              mt: 3,
              mb: 3,
              display: 'inline-flex',
              '&:hover': { bgcolor: (t) => `${t.palette.primary.main}18` },
            }}
          >
            Back to Projects
          </Button>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 340px' },
              gap: 4,
              alignItems: 'start',
            }}
          >
            {/* Left side: all main content */}
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="h3" fontWeight="bold" sx={{ mb: 1, color: 'text.primary' }}>
                {project.title}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                  {project.year}
                </Typography>
                <Typography variant="body1" sx={{ color: 'primary.main', fontWeight: 500 }}>
                  {role}
                </Typography>
              </Box>

              <Typography
                variant="body1"
                sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 3 }}
              >
                {project.description}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 4 }}>
                <Button
                  component="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  startIcon={<OpenInNew />}
                  sx={containedPrimaryBtnSx}
                >
                  Live Preview
                </Button>
                <Button
                  component="a"
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  startIcon={<Code />}
                  sx={{
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 2.5,
                    '&:hover': {
                      borderColor: 'primary.dark',
                      bgcolor: (t) => `${t.palette.primary.main}12`,
                    },
                  }}
                >
                  View Source
                </Button>
              </Box>

              {highlights.length > 0 && (
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: 'text.primary', mb: 2 }}
                  >
                    Project Highlights
                  </Typography>
                  <Box
                    component="ul"
                    sx={{
                      m: 0,
                      pl: 2.5,
                      color: 'text.secondary',
                      lineHeight: 1.9,
                      '& li': { mb: 0.5 },
                    }}
                  >
                    {highlights.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>

            {/* Right side: Tech Stack, Project Details, Discuss This Project */}
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                border: (t) => `1px solid ${t.palette.divider}`,
                backgroundColor: 'background.paper',
                position: { md: 'sticky' },
                top: { md: 88 },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <BuildCircleOutlined sx={{ color: 'primary.main', fontSize: 22 }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary' }}>
                  Tech Stack
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {project.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    sx={{
                      backgroundColor: (t) => `${t.palette.primary.main}18`,
                      color: 'primary.main',
                      border: (t) => `1px solid ${t.palette.primary.main}40`,
                      fontWeight: 500,
                    }}
                  />
                ))}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Assignment sx={{ color: 'primary.main', fontSize: 22 }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: 'text.primary' }}>
                  Project Details
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: 1,
                  alignItems: 'baseline',
                  mb: 3,
                }}
              >
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Role
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                  {role}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Completed
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                  {project.year}
                </Typography>
              </Box>

              <Button
                component={Link}
                to="/"
                state={{ scrollToContact: true }}
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  textTransform: 'none',
                  fontWeight: 600,
                  py: 1.25,
                  '&:hover': {
                    borderColor: 'primary.dark',
                    bgcolor: (t) => `${t.palette.primary.main}12`,
                  },
                }}
              >
                Discuss This Project
              </Button>
            </Box>
          </Box>

          <Box sx={{ pt: 4, mt: 4, borderTop: (t) => `1px solid ${t.palette.divider}` }}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ color: 'text.primary', mb: 1 }}
            >
              Explore More Work
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}
            >
              Deep dive into other high-performance solutions.
            </Typography>

            {(() => {
              const otherProjects = projects.filter((p) => p.id !== project.id);
              const totalPages = Math.max(1, Math.ceil(otherProjects.length / 3));
              const pageProjects = otherProjects.slice(carouselPage * 3, carouselPage * 3 + 3);
              const canGoPrev = carouselPage > 0;
              const canGoNext = carouselPage < totalPages - 1;
              const cardImageUrl = (p) => p.image || `https://picsum.photos/seed/project-${p.id}/400/220`;

              const arrowSx = {
                bgcolor: 'background.paper',
                border: (t) => `1px solid ${t.palette.divider}`,
                boxShadow: (t) => t.shadows[2],
                transition: 'transform 0.2s, background-color 0.2s, border-color 0.2s, box-shadow 0.2s',
                '&:hover:not(.Mui-disabled)': {
                  bgcolor: (t) => `${t.palette.primary.main}14`,
                  borderColor: 'primary.main',
                  boxShadow: (t) => t.shadows[4],
                  transform: 'scale(1.1)',
                },
                '&.Mui-disabled': { borderColor: 'divider', opacity: 0.5 },
              };

              return (
                <>
                  {/* Cards row: full-width content; arrows float on the sides (absolute) so they don't create gaps */}
                  <Box sx={{ position: 'relative', width: '100%', mb: 2 }}>
                    {/* Arrows: absolute so title + cards stay full width; only on md+ */}
                    <IconButton
                      aria-label="Previous projects"
                      onClick={() => setCarouselPage((p) => Math.max(0, p - 1))}
                      disabled={!canGoPrev}
                      sx={{
                        ...arrowSx,
                        display: { xs: 'none', md: 'inline-flex' },
                        position: 'absolute',
                        left: { md: -20 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                        '&:hover:not(.Mui-disabled)': {
                          ...arrowSx['&:hover:not(.Mui-disabled)'],
                          transform: 'translateY(-50%) scale(1.1)',
                        },
                      }}
                    >
                      <ChevronLeft />
                    </IconButton>
                    <IconButton
                      aria-label="Next projects"
                      onClick={() => setCarouselPage((p) => Math.min(totalPages - 1, p + 1))}
                      disabled={!canGoNext}
                      sx={{
                        ...arrowSx,
                        display: { xs: 'none', md: 'inline-flex' },
                        position: 'absolute',
                        right: { md: -20 },
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                        '&:hover:not(.Mui-disabled)': {
                          ...arrowSx['&:hover:not(.Mui-disabled)'],
                          transform: 'translateY(-50%) scale(1.1)',
                        },
                      }}
                    >
                      <ChevronRight />
                    </IconButton>

                    {/* Full-width card grid - 3 equal columns from sm so every card same size */}
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                        gap: 2,
                        width: '100%',
                        alignItems: 'stretch',
                      }}
                    >
                      {pageProjects.map((p) => (
                        <Card
                          key={p.id}
                          component={Link}
                          to={`/projects/${p.id}`}
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: { xs: 'auto', sm: 380 },
                            minHeight: { sm: 380 },
                            backgroundColor: 'background.paper',
                            borderRadius: 2,
                            border: (t) => `1px solid ${t.palette.divider}`,
                            boxShadow: (t) => t.shadows[1],
                            textDecoration: 'none',
                            overflow: 'hidden',
                            transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: (t) => t.shadows[4],
                              borderColor: 'primary.main',
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="140"
                            image={cardImageUrl(p)}
                            alt=""
                            sx={{
                              objectFit: 'cover',
                              flexShrink: 0,
                              backgroundColor: (t) => t.palette.action.hover,
                            }}
                          />
                          <CardContent
                            sx={{
                              p: 2,
                              display: 'flex',
                              flexDirection: 'column',
                              flex: 1,
                              minHeight: 0,
                            }}
                          >
                            <Typography
                              variant="overline"
                              sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: 1, mb: 0.5 }}
                            >
                              {p.year}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              sx={{
                                color: 'text.primary',
                                mb: 1,
                                lineHeight: 1.3,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {p.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'text.secondary',
                                lineHeight: 1.5,
                                flex: 1,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {p.description.length > 120
                                ? `${p.description.slice(0, 120)}...`
                                : p.description}
                            </Typography>
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{
                                color: 'primary.main',
                                fontWeight: 600,
                                mt: 1.5,
                                '&:hover': { color: 'primary.dark' },
                              }}
                            >
                              View project →
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  </Box>

                  {/* Mobile: arrows below cards so they don't need space */}
                  <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', gap: 1, mb: 2 }}>
                    <IconButton
                      aria-label="Previous projects"
                      onClick={() => setCarouselPage((p) => Math.max(0, p - 1))}
                      disabled={!canGoPrev}
                      sx={arrowSx}
                    >
                      <ChevronLeft />
                    </IconButton>
                    <IconButton
                      aria-label="Next projects"
                      onClick={() => setCarouselPage((p) => Math.min(totalPages - 1, p + 1))}
                      disabled={!canGoNext}
                      sx={arrowSx}
                    >
                      <ChevronRight />
                    </IconButton>
                  </Box>

                  <Button
                    component={Link}
                    to="/"
                    state={{ scrollToProjects: true }}
                    sx={{
                      color: 'primary.main',
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 0,
                      mt: 1,
                      '&:hover': { backgroundColor: 'transparent', color: 'primary.dark' },
                    }}
                  >
                    View Full Archive →
                  </Button>
                </>
              );
            })()}
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default ProjectDetail;


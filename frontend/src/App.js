import { useEffect, useLayoutEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import './App.css';

import Home from './Components/Home';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Skills from './Components/Skills';
import Project from './Components/Project';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import SectionScrollFade from './Components/SectionScrollFade';

const ProjectDetail = lazy(() => import('./Components/ProjectDetail'));
const SkyRushPlayPage = lazy(() => import('./Components/SkyRushPlayPage'));

function RouteFallback() {
  return (
    <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100dvh' }}>
      <CircularProgress aria-label="Loading page" />
    </Box>
  );
}

function MainPortfolio() {
  const location = useLocation();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    el.scrollIntoView({ block: 'start', behavior: 'auto' });
    return true;
  };

  const jumpToId = (id, delay = 0) => {
    if (!id) return;
    const run = () => {
      scrollToSection(id);
    };
    if (delay > 0) {
      window.setTimeout(() => requestAnimationFrame(run), delay);
    } else {
      requestAnimationFrame(() => requestAnimationFrame(run));
    }
  };

  const getPendingSection = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) return hash;
    if (location.state?.scrollToSection) return location.state.scrollToSection;
    if (location.state?.scrollToProjects) return 'projects';
    if (location.state?.scrollToContact) return 'contact';
    return null;
  };

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    const section = getPendingSection();
    if (section) {
      scrollToSection(section);
    }
  }, [location.key, location.pathname, location.state]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const section =
      hash ||
      location.state?.scrollToSection ||
      (location.state?.scrollToProjects ? 'projects' : null) ||
      (location.state?.scrollToContact ? 'contact' : null);

    if (section) {
      const delay = Number(location.state?.scrollDelay ?? 100);
      jumpToId(section, delay);
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      return;
    }

    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.key, location.pathname, location.state]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main id="main-content">
          <Home />
          <SectionScrollFade><About /></SectionScrollFade>
          <Skills />
          <SectionScrollFade><Project /></SectionScrollFade>
          <SectionScrollFade><Contact /></SectionScrollFade>
        </main>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/play/sky-rush" element={<SkyRushPlayPage />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </Suspense>
  );
}

export default App;


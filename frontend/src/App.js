import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';

import Home from './Components/Home';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Skills from './Components/Skills';
import Project from './Components/Project';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import ProjectDetail from './Components/ProjectDetail';
import SectionScrollFade from './Components/SectionScrollFade';
import ParticleBackground from './Components/ParticleBackground';
import SkyRushPlayPage from './Components/SkyRushPlayPage';

function MainPortfolio() {
  const location = useLocation();

  // Disable browser scroll restoration so refresh always starts at top
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    // Check if there's a hash in the URL (from navbar navigation from project page)
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Scroll to the section after a short delay to ensure DOM is ready
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Clear the hash from URL
        window.history.replaceState(null, '', window.location.pathname);
      }, 100);
    } else {
      // No hash, start at top
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, []);

  useEffect(() => {
    // For in-app navigation with explicit state, scroll to the target section once
    if (location.state?.scrollToSection) {
      const section = location.state.scrollToSection;
      const el = document.getElementById(section);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      // Clear state after scrolling so refresh doesn't auto-jump
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    } else if (location.state?.scrollToProjects) {
      const el = document.getElementById('projects');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      // Clear state after scrolling so refresh doesn't auto-jump
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    } else if (location.state?.scrollToContact) {
      const el = document.getElementById('contact');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      // Clear state after scrolling so refresh doesn't auto-jump
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, [location]);

  return (
    <>
      <ParticleBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <Home />
      <SectionScrollFade><About /></SectionScrollFade>
      <SectionScrollFade><Skills /></SectionScrollFade>
      <SectionScrollFade><Project /></SectionScrollFade>
      <SectionScrollFade><Contact /></SectionScrollFade>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPortfolio />} />
      <Route path="/play/sky-rush" element={<SkyRushPlayPage />} />
      <Route path="/projects/:id" element={<ProjectDetail />} />
    </Routes>
  );
}

export default App;


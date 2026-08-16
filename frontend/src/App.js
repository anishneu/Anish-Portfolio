import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import SiteShell from './site/SiteShell';

const ProjectDetail = lazy(() => import('./Components/ProjectDetail'));
const SkyRushPlayPage = lazy(() => import('./Components/SkyRushPlayPage'));

function RouteFallback() {
  return (
    <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100dvh', bgcolor: '#1a0f18' }}>
      <CircularProgress aria-label="Loading page" sx={{ color: '#e39774' }} />
    </Box>
  );
}

function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<SiteShell />} />
        <Route path="/play/sky-rush" element={<SkyRushPlayPage />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </Suspense>
  );
}

export default App;

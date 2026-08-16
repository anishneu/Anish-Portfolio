import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

/** Legacy route — opens the original Sky Rush modal on the portfolio shell. */
export default function SkyRushPlayPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true, state: { openGame: true } });
  }, [navigate]);

  return (
    <Box
      className="sky-rush-play-page"
      sx={{ display: 'grid', placeItems: 'center', bgcolor: '#1a0f18' }}
    >
      <CircularProgress sx={{ color: '#e39774' }} aria-label="Opening Sky Rush" />
    </Box>
  );
}

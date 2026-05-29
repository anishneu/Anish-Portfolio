import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Alert,
  Paper,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseRounded from '@mui/icons-material/CloseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded';

/** Full-page Unity build — no iframe (avoids WebGL + portfolio conflicts). */
const GAME_STANDALONE = '/games/sky_rush/index.html?fromPortfolio=1';

export default function SkyRushPlayPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const primary = theme.palette.primary?.main || '#7DCE9F';
  const isDark = theme.palette.mode === 'dark';

  const launchGame = useCallback((newTab = false) => {
    const url = `${GAME_STANDALONE}&t=${Date.now()}`;
    if (newTab) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.assign(url);
    }
  }, []);

  return (
    <Box
      className="sky-rush-play-page sky-rush-play-page--launcher"
      sx={{
        background: isDark
          ? 'linear-gradient(160deg, #353537 0%, #3d3d3f 100%)'
          : 'linear-gradient(160deg, #eef6f1 0%, #f4f6f8 100%)',
      }}
    >
      <Box className="sky-rush-play-chrome">
        <Typography variant="subtitle2" fontWeight={600} noWrap sx={{ flex: 1, color: '#fff' }}>
          Agent Berk Sky Rush
        </Typography>
        <IconButton
          aria-label="Back to portfolio"
          onClick={() => navigate('/')}
          size="small"
          sx={{ color: 'rgba(255,255,255,0.85)' }}
        >
          <CloseRounded fontSize="small" />
        </IconButton>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: 520,
            width: '100%',
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            background: isDark ? 'rgba(37,37,37,0.95)' : 'rgba(255,255,255,0.95)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : `${primary}30`}`,
          }}
        >
          <Typography variant="h5" fontWeight={700} gutterBottom sx={{ color: isDark ? '#fff' : '#3d3d3f' }}>
            Ready to play?
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', lineHeight: 1.6 }}>
            The game runs in full-screen mode (not inside the portfolio page) for the best WebGL performance.
          </Typography>

          <Alert severity="info" sx={{ mb: 2, textAlign: 'left' }}>
            <strong>Black screen after the intro?</strong> Unity WebGL cannot play embedded{' '}
            <code>.m4v</code> splash videos. In Unity, remove that clip for WebGL or set Video Player to{' '}
            <strong>URL</strong> and host the file under <code>StreamingAssets</code>.
          </Alert>

          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={<PlayArrowRounded />}
            onClick={() => launchGame(false)}
            sx={{
              mb: 1.5,
              py: 1.5,
              fontWeight: 600,
              textTransform: 'none',
              bgcolor: primary,
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            Launch game
          </Button>
          <Button
            variant="outlined"
            size="medium"
            fullWidth
            startIcon={<OpenInNewRounded />}
            onClick={() => launchGame(true)}
            sx={{ textTransform: 'none' }}
          >
            Open in new tab
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

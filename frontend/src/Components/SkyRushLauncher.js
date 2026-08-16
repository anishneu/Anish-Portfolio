import { useEffect, useState, useCallback, useRef } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import SportsEsportsRounded from '@mui/icons-material/SportsEsportsRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import FullscreenRounded from '@mui/icons-material/FullscreenRounded';
import FullscreenExitRounded from '@mui/icons-material/FullscreenExitRounded';
import { brandColors } from '../context/ThemeContext';
import '../App.css';

const GAME_URL = '/games/sky_rush/index.html?embed=1';

function notifyGameResize(iframeRef) {
  try {
    const win = iframeRef.current?.contentWindow;
    win?.postMessage({ type: 'sky-rush-resize' }, '*');
    win?.dispatchEvent(new Event('resize'));
  } catch {
    /* ignore */
  }
}

export default function SkyRushLauncher({
  hideFab = false,
  open: openProp,
  onOpenChange,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const primary = theme.palette.primary.main;
  const primaryDark = theme.palette.primary.dark;
  const accent = isDark ? theme.palette.primary.main : theme.palette.primary.main;
  const controlled = typeof openProp === 'boolean';

  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlled ? openProp : internalOpen;
  const setOpen = useCallback(
    (next) => {
      if (!controlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [controlled, onOpenChange]
  );

  const [phase, setPhase] = useState('card');
  const [windowMode, setWindowMode] = useState('normal');
  const [gameSession, setGameSession] = useState(0);
  const [gameMounted, setGameMounted] = useState(false);

  const modalRef = useRef(null);
  const iframeRef = useRef(null);

  const isMaximized = windowMode === 'maximized';
  const isPlaying = phase === 'playing';

  const exitFullscreen = useCallback(async () => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        /* ignore */
      }
    }
    setWindowMode('normal');
    [100, 300, 600].forEach((ms) =>
      window.setTimeout(() => notifyGameResize(iframeRef), ms)
    );
  }, []);

  const resetLauncher = useCallback(async () => {
    await exitFullscreen();
    setOpen(false);
    setPhase('card');
    setWindowMode('normal');
    setGameMounted(false);
    setGameSession((k) => k + 1);
  }, [exitFullscreen, setOpen]);

  const returnToCard = useCallback(async () => {
    await exitFullscreen();
    setPhase('card');
    setWindowMode('normal');
    // Keep gameMounted + gameSession so the iframe is not destroyed/reloaded
  }, [exitFullscreen]);

  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onMessage = (event) => {
      if (event.data?.type === 'sky-rush-quit') {
        returnToCard();
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [returnToCard]);

  useEffect(() => {
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setWindowMode('normal');
        window.setTimeout(() => notifyGameResize(iframeRef), 100);
      }
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && isMaximized) {
        event.preventDefault();
        exitFullscreen();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, isMaximized, exitFullscreen]);

  useEffect(() => {
    if (!gameMounted || !isPlaying) return undefined;
    const timers = [0, 80, 200, 450, 800].map((ms) =>
      window.setTimeout(() => notifyGameResize(iframeRef), ms)
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [isMaximized, isPlaying, gameMounted]);

  const handleClose = (event) => {
    event?.stopPropagation?.();
    resetLauncher();
  };

  const handleMaximize = async (event) => {
    event.stopPropagation();
    if (isMaximized) {
      await exitFullscreen();
      return;
    }
    const el = modalRef.current;
    if (!el) return;
    try {
      await el.requestFullscreen();
      setWindowMode('maximized');
      [100, 250, 500, 900].forEach((ms) =>
        window.setTimeout(() => notifyGameResize(iframeRef), ms)
      );
    } catch {
      setWindowMode('maximized');
      notifyGameResize(iframeRef);
    }
  };

  const startGame = () => {
    if (!gameMounted) {
      setGameMounted(true);
    }
    setPhase('playing');
    setWindowMode('normal');
  };

  const chromeBtnSx = {
    color: isMaximized || isDark ? 'rgba(255,255,255,0.85)' : 'rgba(26,26,26,0.6)',
    p: 0.75,
  };

  const modalClass = [
    'sky-rush-modal',
    isPlaying ? 'sky-rush-modal--player' : '',
    isMaximized ? 'sky-rush-modal--maximized' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const overlayClass = [
    'sky-rush-overlay',
    isMaximized ? 'sky-rush-overlay--maximized' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const title = isPlaying ? 'Agent Berk Sky Rush' : 'Agent Berk Sky Rush Game';

  return (
    <>
      {!hideFab ? (
        <motion.button
          type="button"
          className="sky-rush-fab"
          aria-label="Open Agent Berk Sky Rush game"
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, scale: 0.6, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.96 }}
          style={{
            background: `linear-gradient(145deg, ${primary} 0%, ${primaryDark} 100%)`,
            color: theme.palette.primary.contrastText,
            border: isDark
              ? '1px solid rgba(255,255,255,0.2)'
              : `2px solid ${brandColors.copper}`,
            boxShadow: isDark
              ? `0 10px 36px rgba(0,0,0,0.45), 0 0 24px ${primary}55, inset 0 1px 0 rgba(255,255,255,0.25)`
              : `0 10px 32px ${primary}50, 0 0 0 1px rgba(255,255,255,0.85) inset`,
          }}
        >
          <span
            className="sky-rush-fab-ring"
            aria-hidden
            style={{ borderColor: isDark ? `${primary}99` : `${brandColors.copper}88` }}
          />
          <span
            className="sky-rush-fab-ring sky-rush-fab-ring--delay"
            aria-hidden
            style={{ borderColor: isDark ? `${primary}99` : `${brandColors.copper}88` }}
          />
          <span
            className="sky-rush-fab-icon"
            style={{
              background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.35)',
            }}
          >
            <SportsEsportsRounded
              sx={{
                fontSize: 26,
              }}
            />
          </span>
        </motion.button>
      ) : null}

      <AnimatePresence>
        {open && (
          <motion.div
            className={overlayClass}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={isPlaying || isMaximized ? undefined : handleClose}
          >
            <div
              className={`sky-rush-overlay-stage${
                isMaximized ? ' sky-rush-overlay-stage--maximized' : ''
              }`}
            >
              <div
                ref={modalRef}
                className={modalClass}
                role="dialog"
                aria-modal="true"
                aria-labelledby="sky-rush-title"
                onClick={(e) => e.stopPropagation()}
                style={
                  isMaximized
                    ? undefined
                    : {
                        background: isDark
                          ? `linear-gradient(160deg, ${brandColors.surface} 0%, ${brandColors.ink} 100%)`
                          : 'linear-gradient(160deg, rgba(255,255,255,0.98) 0%, rgba(255,245,242,0.98) 100%)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : `${primary}25`}`,
                        boxShadow: isDark
                          ? '0 24px 64px rgba(0,0,0,0.55)'
                          : `0 24px 64px ${primary}25`,
                      }
                }
              >
                <Box className="sky-rush-window-chrome">
                  <Typography
                    id="sky-rush-title"
                    variant="subtitle2"
                    fontWeight={600}
                    noWrap
                    sx={{
                      flex: 1,
                      color: isMaximized || isDark ? '#fff' : '#3d3d3f',
                      pr: 1,
                    }}
                  >
                    {title}
                  </Typography>
                  <Box className="sky-rush-window-controls">
                    {isPlaying && (
                      <IconButton
                        aria-label={isMaximized ? 'Exit full screen' : 'Full screen'}
                        onClick={handleMaximize}
                        size="small"
                        sx={chromeBtnSx}
                      >
                        {isMaximized ? (
                          <FullscreenExitRounded fontSize="small" />
                        ) : (
                          <FullscreenRounded fontSize="small" />
                        )}
                      </IconButton>
                    )}
                    <IconButton
                      aria-label="Close popup"
                      onClick={handleClose}
                      size="small"
                      sx={chromeBtnSx}
                    >
                      <CloseRounded fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <div
                  className="sky-rush-card"
                  style={{ display: isPlaying ? 'none' : undefined }}
                  aria-hidden={isPlaying}
                >
                  <Box
                    className="sky-rush-card-art"
                    sx={{
                      background: isDark
                        ? `radial-gradient(circle at 30% 20%, ${primary}30 0%, transparent 55%), linear-gradient(135deg, ${brandColors.surface} 0%, ${brandColors.ink} 100%)`
                        : `radial-gradient(circle at 30% 20%, ${primary}40 0%, transparent 55%), linear-gradient(135deg, ${brandColors.surfaceLight} 0%, ${brandColors.whisper} 100%)`,
                    }}
                  >
                    <Box className="sky-rush-card-badge">
                      <SportsEsportsRounded sx={{ fontSize: 40, color: accent }} />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        letterSpacing: 3,
                        textTransform: 'uppercase',
                        color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(26,26,26,0.5)',
                      }}
                    >
                      Unity WebGL
                    </Typography>
                  </Box>

                  <Box className="sky-rush-card-body" sx={{ p: { xs: 2.5, sm: 3 } }}>
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      sx={{
                        mb: 0.75,
                        color: isDark ? '#fff' : brandColors.charcoal,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Agent Berk Sky Rush Game
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 2.5,
                        color: isDark ? 'rgba(255,255,255,0.65)' : 'rgba(26,26,26,0.65)',
                        lineHeight: 1.6,
                      }}
                    >
                      Dodge obstacles, collect power-ups, and chase the high score in this browser
                      playable build.
                    </Typography>

                    <motion.button
                      type="button"
                      className="sky-rush-play-btn"
                      onClick={startGame}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        background: `linear-gradient(135deg, ${primary} 0%, ${primaryDark} 100%)`,
                        color: theme.palette.primary.contrastText,
                        boxShadow: `0 8px 28px ${primary}66`,
                      }}
                    >
                      <PlayArrowRounded sx={{ fontSize: 28 }} />
                      Play Game
                    </motion.button>
                  </Box>
                </div>

                {gameMounted && (
                  <div
                    className="sky-rush-player"
                    style={{ display: isPlaying ? undefined : 'none' }}
                    aria-hidden={!isPlaying}
                  >
                    <iframe
                      ref={iframeRef}
                      title="Agent Berk Sky Rush"
                      src={`${GAME_URL}&session=${gameSession}`}
                      className="sky-rush-iframe"
                      allow="autoplay; fullscreen; gamepad"
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

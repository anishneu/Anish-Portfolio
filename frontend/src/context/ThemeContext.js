import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/**
 * Obsidian & Champagne — classic gold accents on chocolate-brown neutrals
 * (greys replaced with choco brown).
 */
export const brandColors = {
  whisper: '#f7f1e8',
  mist: '#e8dccf',
  /** Was grey — now soft cocoa */
  fog: '#a88972',
  /** Was grey — now chocolate */
  steel: '#7a5640',
  /** Was grey — now deep cocoa */
  slate: '#5a3d2b',
  night: '#2a1c14',
  ink: '#1a100c',
  charcoal: '#221610',

  /** Primary — champagne gold (yellow kept) */
  accent: '#d4a574',
  accentHover: '#e2bd8a',
  accentSoft: 'rgba(212, 165, 116, 0.16)',
  accentLight: '#a67c52',
  champagne: '#f0c890',

  /** Secondary — copper */
  secondary: '#c97852',
  secondaryDark: '#a86540',
  secondaryLight: '#e09a74',
  secondarySoft: 'rgba(201, 120, 82, 0.14)',

  /** Tertiary / variant — deep chocolate */
  tertiary: '#8b5a3c',
  tertiaryDark: '#6b4228',
  tertiaryLight: '#b07a55',
  tertiarySoft: 'rgba(139, 90, 60, 0.14)',

  copper: '#c97852',
  chocolate: '#6b4228',
  chocolateSoft: 'rgba(107, 66, 40, 0.22)',

  bar: 'rgba(26, 16, 12, 0.9)',
  barDark: 'rgba(26, 16, 12, 0.9)',
  barLight: 'rgba(250, 245, 238, 0.92)',

  /** Legacy aliases */
  lime: '#d4a574',
  limeLight: '#a67c52',
  green: '#c97852',
  lavender: '#e2bd8a',

  surface: '#221610',
  surfaceRaised: '#2e1f16',
  surfaceLight: '#faf6f0',
  paperLight: '#fffaf4',

  borderDark: 'rgba(232, 200, 150, 0.12)',
  borderLight: 'rgba(90, 61, 43, 0.14)',
};

export function getBrandBarColor(mode) {
  return mode === 'light' ? brandColors.barLight : brandColors.barDark;
}

const fontStack =
  '"DM Sans", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const ThemeContext = createContext(null);

export function useThemeMode() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeMode must be used within ThemeContext.Provider');
  return ctx;
}

function getModePalette(mode) {
  if (mode === 'dark') {
    return {
      primary: {
        main: brandColors.accent,
        dark: '#b8894a',
        light: brandColors.champagne,
        contrastText: '#1a1510',
      },
      secondary: {
        main: brandColors.secondary,
        dark: brandColors.secondaryDark,
        light: brandColors.secondaryLight,
        contrastText: '#1a1510',
      },
      info: {
        main: brandColors.tertiaryLight,
        dark: brandColors.tertiary,
        light: brandColors.accentHover,
        contrastText: '#1a1510',
      },
      background: { default: brandColors.ink, paper: brandColors.surface },
      text: { primary: brandColors.whisper, secondary: brandColors.fog },
      divider: brandColors.borderDark,
      section: {
        home: 'transparent',
        about: 'transparent',
        skills: 'transparent',
        projects: 'transparent',
        contact: 'transparent',
      },
    };
  }

  return {
    primary: {
      main: brandColors.accentLight,
      dark: '#8f6844',
      light: '#c4956a',
      contrastText: '#fffcf8',
    },
    secondary: {
      main: brandColors.secondary,
      dark: brandColors.secondaryDark,
      light: brandColors.accent,
      contrastText: '#fffcf8',
    },
    info: {
      main: brandColors.tertiary,
      dark: brandColors.tertiaryDark,
      light: brandColors.tertiaryLight,
      contrastText: '#fffcf8',
    },
    background: { default: brandColors.surfaceLight, paper: brandColors.paperLight },
    text: { primary: brandColors.night, secondary: brandColors.steel },
    divider: brandColors.borderLight,
    section: {
      home: 'transparent',
      about: 'transparent',
      skills: 'transparent',
      projects: 'transparent',
      contact: 'transparent',
    },
  };
}

const sharedTypography = {
  fontFamily: fontStack,
  h1: { fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.1 },
  h2: { fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15 },
  h3: { fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.2 },
  h4: { fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.25 },
  h5: { fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.3 },
  h6: { fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.35 },
  subtitle1: { letterSpacing: '-0.01em' },
  subtitle2: { letterSpacing: '-0.005em' },
  body1: { lineHeight: 1.65, letterSpacing: '-0.011em' },
  body2: { lineHeight: 1.6, letterSpacing: '-0.006em' },
  button: { textTransform: 'none', fontWeight: 600, letterSpacing: '-0.01em' },
  overline: { letterSpacing: '0.08em', fontWeight: 600 },
};

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'light';
  });

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('portfolio-theme', next);
      }
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-mui-color-scheme', mode);
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  const theme = useMemo(() => {
    const modePalette = getModePalette(mode);
    return createTheme({
      palette: {
        mode,
        primary: modePalette.primary,
        secondary: modePalette.secondary,
        info: modePalette.info,
        background: modePalette.background,
        text: modePalette.text,
        divider: modePalette.divider,
        section: modePalette.section,
      },
      typography: sharedTypography,
      shape: { borderRadius: 12 },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: modePalette.background.default,
              fontFamily: fontStack,
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            },
            '#root': {
              minHeight: '100vh',
            },
          },
        },
        MuiButton: {
          defaultProps: { disableElevation: true },
          styleOverrides: {
            root: { borderRadius: 999, textTransform: 'none', fontWeight: 600 },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
              ...(mode === 'dark' && {
                border: `1px solid ${brandColors.borderDark}`,
              }),
              ...(mode === 'light' && {
                border: `1px solid ${brandColors.borderLight}`,
              }),
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
              ...(mode === 'dark' && {
                border: `1px solid ${brandColors.borderDark}`,
              }),
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: { fontWeight: 500 },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backdropFilter: 'blur(16px) saturate(180%)',
              WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            },
          },
        },
      },
    });
  }, [mode]);

  const value = useMemo(() => ({ mode, toggleMode, brand: brandColors }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

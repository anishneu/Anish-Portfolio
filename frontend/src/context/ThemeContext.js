import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/**
 * Volt Triad + brown variant:
 * primary yellow, secondary cyan, tertiary coral, plus chocolate brown as an extra variant.
 * Greys stay greys — brown is additive, not a replacement for neutrals.
 */
export const brandColors = {
  whisper: '#f3f6fb',
  mist: '#e2e8f2',
  fog: '#8b95a8',
  steel: '#5b6578',
  slate: '#3d4658',
  night: '#101522',
  ink: '#070b14',
  charcoal: '#0d121c',

  /** Primary — bright yellow */
  accent: '#ffcc33',
  accentHover: '#ffe066',
  accentSoft: 'rgba(255, 204, 51, 0.2)',
  accentLight: '#f5b800',
  champagne: '#ffe566',

  /** Secondary — electric cyan */
  secondary: '#22d3ee',
  secondaryDark: '#0891b2',
  secondaryLight: '#67e8f9',
  secondarySoft: 'rgba(34, 211, 238, 0.16)',

  /** Tertiary — hot coral */
  tertiary: '#ff5c5c',
  tertiaryDark: '#ef4444',
  tertiaryLight: '#ff8a8a',
  tertiarySoft: 'rgba(255, 92, 92, 0.16)',

  /** Variant — chocolate brown (extra accent, not a grey replacement) */
  brown: '#8b5a2b',
  brownDark: '#6b4220',
  brownLight: '#b07a45',
  brownSoft: 'rgba(139, 90, 43, 0.16)',

  copper: '#ff7a45',
  chocolate: '#8b5a2b',
  chocolateSoft: 'rgba(139, 90, 43, 0.16)',

  bar: 'rgba(7, 11, 20, 0.88)',
  barDark: 'rgba(7, 11, 20, 0.88)',
  barLight: 'rgba(247, 249, 252, 0.92)',

  /** Legacy aliases */
  lime: '#ffcc33',
  limeLight: '#f5b800',
  green: '#22d3ee',
  lavender: '#ffe066',

  surface: '#0d121c',
  surfaceRaised: '#151c2b',
  surfaceLight: '#f4f7fb',
  paperLight: '#ffffff',

  borderDark: 'rgba(255, 255, 255, 0.12)',
  borderLight: 'rgba(16, 21, 34, 0.1)',
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
        dark: '#e6b000',
        light: brandColors.champagne,
        contrastText: '#0a0e17',
      },
      secondary: {
        main: brandColors.secondary,
        dark: brandColors.secondaryDark,
        light: brandColors.secondaryLight,
        contrastText: '#042f2e',
      },
      info: {
        main: brandColors.tertiary,
        dark: brandColors.tertiaryDark,
        light: brandColors.tertiaryLight,
        contrastText: '#0a0e17',
      },
      warning: {
        main: brandColors.brownLight,
        dark: brandColors.brown,
        light: brandColors.brownLight,
        contrastText: '#0a0e17',
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
      dark: '#d9a200',
      light: '#ffcc33',
      contrastText: '#0a0e17',
    },
    secondary: {
      main: brandColors.secondaryDark,
      dark: '#0e7490',
      light: brandColors.secondary,
      contrastText: '#ffffff',
    },
    info: {
      main: brandColors.tertiary,
      dark: brandColors.tertiaryDark,
      light: brandColors.tertiaryLight,
      contrastText: '#ffffff',
    },
    warning: {
      main: brandColors.brown,
      dark: brandColors.brownDark,
      light: brandColors.brownLight,
      contrastText: '#ffffff',
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
        warning: modePalette.warning,
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

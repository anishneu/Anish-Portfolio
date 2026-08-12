import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/**
 * Beige · Scarlet · Neon cyan
 * Surfaces beige, primary scarlet, secondary neon cyan.
 */
export const brandColors = {
  /** Beige family — surfaces */
  whisper: '#f6f1e8',
  mist: '#ebe3d4',
  beige: '#e6dcc8',
  beigeDeep: '#d2c4a8',

  /** Text neutrals (warm, readable on beige) */
  fog: '#9a8b78',
  steel: '#6e5f4f',
  slate: '#4a3f34',
  night: '#1f1814',
  ink: '#12100e',
  charcoal: '#1c1714',

  /** Primary — scarlet red */
  accent: '#ff2d45',
  accentHover: '#ff5266',
  accentSoft: 'rgba(255, 45, 69, 0.16)',
  accentLight: '#d4142c',
  champagne: '#ff6b7c',
  scarlet: '#ff2d45',
  scarletDark: '#d4142c',
  scarletLight: '#ff6b7c',
  gold: '#ff2d45',
  goldDark: '#d4142c',
  goldLight: '#ff6b7c',

  /** Secondary — neon cyan */
  secondary: '#00e8ff',
  secondaryDark: '#00b4c8',
  secondaryLight: '#5ef0ff',
  secondarySoft: 'rgba(0, 232, 255, 0.16)',
  cyan: '#00e8ff',
  cyanDark: '#00b4c8',
  cyanLight: '#5ef0ff',
  cyanSoft: 'rgba(0, 232, 255, 0.16)',
  brown: '#00e8ff',
  brownDark: '#00b4c8',
  brownLight: '#5ef0ff',
  brownSoft: 'rgba(0, 232, 255, 0.16)',

  /** Tertiary — soft beige */
  tertiary: '#cbbba0',
  tertiaryDark: '#a9987c',
  tertiaryLight: '#e8dfd0',
  tertiarySoft: 'rgba(203, 187, 160, 0.28)',

  copper: '#e84555',
  chocolate: '#d4142c',
  chocolateSoft: 'rgba(212, 20, 44, 0.14)',

  bar: 'rgba(18, 16, 14, 0.92)',
  barDark: 'rgba(18, 16, 14, 0.92)',
  barLight: 'rgba(246, 241, 232, 0.92)',

  /** Legacy aliases */
  lime: '#ff2d45',
  limeLight: '#d4142c',
  green: '#00e8ff',
  lavender: '#5ef0ff',

  surface: '#1c1714',
  surfaceRaised: '#28211c',
  surfaceLight: '#f6f1e8',
  paperLight: '#fbf8f2',

  borderDark: 'rgba(0, 232, 255, 0.14)',
  borderLight: 'rgba(212, 20, 44, 0.14)',
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
        main: brandColors.scarlet,
        dark: brandColors.scarletDark,
        light: brandColors.scarletLight,
        contrastText: '#fff8f6',
      },
      secondary: {
        main: brandColors.cyan,
        dark: brandColors.cyanDark,
        light: brandColors.cyanLight,
        contrastText: '#061016',
      },
      info: {
        main: brandColors.cyanLight,
        dark: brandColors.cyanDark,
        light: brandColors.beige,
        contrastText: '#061016',
      },
      warning: {
        main: brandColors.scarletLight,
        dark: brandColors.scarlet,
        light: brandColors.copper,
        contrastText: '#1a1010',
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
      main: brandColors.scarletDark,
      dark: '#a80f22',
      light: brandColors.scarlet,
      contrastText: '#fff8f6',
    },
    secondary: {
      main: brandColors.cyanDark,
      dark: '#008a9a',
      light: brandColors.cyan,
      contrastText: '#041016',
    },
    info: {
      main: brandColors.cyanDark,
      dark: '#008a9a',
      light: brandColors.beige,
      contrastText: '#041016',
    },
    warning: {
      main: brandColors.scarletDark,
      dark: '#a80f22',
      light: brandColors.scarlet,
      contrastText: '#fff8f6',
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

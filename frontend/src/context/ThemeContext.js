import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/**
 * Beige · Chocolate · Gold
 * Primary gold, secondary chocolate brown, tertiary/surface beige.
 */
export const brandColors = {
  /** Beige family */
  whisper: '#f7f1e6',
  mist: '#efe6d6',
  beige: '#e8dcc8',
  beigeDeep: '#d4c4a8',

  /** Text neutrals derived from chocolate */
  fog: '#a89078',
  steel: '#7a5c45',
  slate: '#5c4030',
  night: '#2a1c14',
  ink: '#1a120e',
  charcoal: '#231811',

  /** Primary — gold */
  accent: '#d4a574',
  accentHover: '#e2bd8a',
  accentSoft: 'rgba(212, 165, 116, 0.18)',
  accentLight: '#b8894a',
  champagne: '#f0c890',
  gold: '#d4a574',
  goldDark: '#b8894a',
  goldLight: '#e8c478',

  /** Secondary — chocolate brown */
  secondary: '#6b4228',
  secondaryDark: '#4a2e1c',
  secondaryLight: '#8b5a3c',
  secondarySoft: 'rgba(107, 66, 40, 0.14)',
  brown: '#6b4228',
  brownDark: '#4a2e1c',
  brownLight: '#8b5a3c',
  brownSoft: 'rgba(107, 66, 40, 0.14)',

  /** Tertiary / variant — warm beige */
  tertiary: '#c4a882',
  tertiaryDark: '#a89068',
  tertiaryLight: '#e0d0b4',
  tertiarySoft: 'rgba(196, 168, 130, 0.22)',

  copper: '#a67c52',
  chocolate: '#6b4228',
  chocolateSoft: 'rgba(107, 66, 40, 0.16)',

  bar: 'rgba(26, 18, 14, 0.9)',
  barDark: 'rgba(26, 18, 14, 0.9)',
  barLight: 'rgba(247, 241, 230, 0.92)',

  /** Legacy aliases */
  lime: '#d4a574',
  limeLight: '#b8894a',
  green: '#6b4228',
  lavender: '#e2bd8a',

  surface: '#231811',
  surfaceRaised: '#2e2018',
  surfaceLight: '#f7f1e6',
  paperLight: '#fbf7f0',

  borderDark: 'rgba(232, 200, 150, 0.14)',
  borderLight: 'rgba(107, 66, 40, 0.14)',
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
        main: brandColors.gold,
        dark: brandColors.goldDark,
        light: brandColors.champagne,
        contrastText: '#1a1510',
      },
      secondary: {
        main: brandColors.brownLight,
        dark: brandColors.brown,
        light: brandColors.beigeDeep,
        contrastText: '#f7f1e6',
      },
      info: {
        main: brandColors.beigeDeep,
        dark: brandColors.tertiaryDark,
        light: brandColors.beige,
        contrastText: '#1a1510',
      },
      warning: {
        main: brandColors.brownLight,
        dark: brandColors.brown,
        light: brandColors.copper,
        contrastText: '#f7f1e6',
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
      main: brandColors.goldDark,
      dark: '#9a7340',
      light: brandColors.gold,
      contrastText: '#fffaf4',
    },
    secondary: {
      main: brandColors.brown,
      dark: brandColors.brownDark,
      light: brandColors.brownLight,
      contrastText: '#fffaf4',
    },
    info: {
      main: brandColors.tertiaryDark,
      dark: '#8a7350',
      light: brandColors.beige,
      contrastText: '#2a1c14',
    },
    warning: {
      main: brandColors.brown,
      dark: brandColors.brownDark,
      light: brandColors.brownLight,
      contrastText: '#fffaf4',
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

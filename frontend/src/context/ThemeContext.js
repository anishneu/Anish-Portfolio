import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/**
 * Solar Triad — vivid gold primary, teal secondary, coral tertiary.
 * Keeps the yellow/champagne character while adding clearer hierarchy.
 */
export const brandColors = {
  whisper: '#f7f4ef',
  mist: '#ebe4d8',
  fog: '#9a948a',
  steel: '#6f6860',
  slate: '#524c46',
  night: '#151311',
  ink: '#0b0a09',
  charcoal: '#141210',

  /** Primary — solar yellow / champagne gold */
  accent: '#f0c14d',
  accentHover: '#ffd56a',
  accentSoft: 'rgba(240, 193, 77, 0.16)',
  accentLight: '#d4a017',
  champagne: '#ffe08a',

  /** Secondary — teal */
  secondary: '#14b8a6',
  secondaryDark: '#0f766e',
  secondaryLight: '#5eead4',
  secondarySoft: 'rgba(20, 184, 166, 0.14)',

  /** Tertiary / variant — warm coral */
  tertiary: '#f07167',
  tertiaryDark: '#d94848',
  tertiaryLight: '#ff9b8f',
  tertiarySoft: 'rgba(240, 113, 103, 0.14)',

  copper: '#e07a5f',
  chocolate: '#8b6347',
  chocolateSoft: 'rgba(139, 99, 71, 0.22)',

  bar: 'rgba(11, 10, 9, 0.88)',
  barDark: 'rgba(11, 10, 9, 0.88)',
  barLight: 'rgba(250, 247, 242, 0.9)',

  /** Legacy aliases */
  lime: '#f0c14d',
  limeLight: '#d4a017',
  green: '#14b8a6',
  lavender: '#ffd56a',

  surface: '#141210',
  surfaceRaised: '#1e1b17',
  surfaceLight: '#faf7f2',
  paperLight: '#fffcf8',

  borderDark: 'rgba(255, 255, 255, 0.1)',
  borderLight: 'rgba(28, 25, 23, 0.1)',
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
        dark: '#d4a017',
        light: brandColors.champagne,
        contrastText: '#1a1510',
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
      dark: '#a87f0c',
      light: '#e8b84a',
      contrastText: '#1a1510',
    },
    secondary: {
      main: brandColors.secondaryDark,
      dark: '#115e59',
      light: brandColors.secondary,
      contrastText: '#fffcf8',
    },
    info: {
      main: brandColors.tertiaryDark,
      dark: '#b91c1c',
      light: brandColors.tertiary,
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

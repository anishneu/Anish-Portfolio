import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/**
 * Beige · Light gold · Sand clay · Soft peach
 * Warm, soft surfaces with light-gold primary accents.
 */
export const brandColors = {
  /** Beige family — surfaces */
  whisper: '#f7f2ea',
  mist: '#efe7db',
  beige: '#e8dfd0',
  beigeDeep: '#d6c9b4',

  /** Text neutrals */
  fog: '#a39482',
  steel: '#7a6b5a',
  slate: '#564a3e',
  night: '#2a221c',
  ink: '#17130f',
  charcoal: '#211c17',

  /** Primary — light gold */
  accent: '#e6c57a',
  accentHover: '#f0d49a',
  accentSoft: 'rgba(230, 197, 122, 0.22)',
  accentLight: '#c9a85a',
  champagne: '#f2d9a4',
  gold: '#e6c57a',
  goldDark: '#c9a85a',
  goldLight: '#f2d9a4',

  /** Secondary — sand clay */
  secondary: '#c4a484',
  secondaryDark: '#a88768',
  secondaryLight: '#d8bc9e',
  secondarySoft: 'rgba(196, 164, 132, 0.2)',
  clay: '#c4a484',
  clayDark: '#a88768',
  clayLight: '#d8bc9e',
  claySoft: 'rgba(196, 164, 132, 0.2)',
  brown: '#c4a484',
  brownDark: '#a88768',
  brownLight: '#d8bc9e',
  brownSoft: 'rgba(196, 164, 132, 0.2)',

  /** Tertiary — soft peach */
  tertiary: '#efc4ae',
  tertiaryDark: '#d9a78e',
  tertiaryLight: '#f7d8c8',
  tertiarySoft: 'rgba(239, 196, 174, 0.28)',
  peach: '#efc4ae',
  peachDark: '#d9a78e',
  peachLight: '#f7d8c8',
  peachSoft: 'rgba(239, 196, 174, 0.28)',

  copper: '#d4a574',
  chocolate: '#a88768',
  chocolateSoft: 'rgba(168, 135, 104, 0.16)',

  /** Soft aliases for prior call sites */
  scarlet: '#e6c57a',
  scarletDark: '#c9a85a',
  scarletLight: '#f2d9a4',
  cyan: '#efc4ae',
  cyanDark: '#d9a78e',
  cyanLight: '#f7d8c8',
  cyanSoft: 'rgba(239, 196, 174, 0.28)',

  bar: 'rgba(23, 19, 15, 0.92)',
  barDark: 'rgba(23, 19, 15, 0.92)',
  barLight: 'rgba(247, 242, 234, 0.94)',

  lime: '#e6c57a',
  limeLight: '#c9a85a',
  green: '#c4a484',
  lavender: '#efc4ae',

  surface: '#211c17',
  surfaceRaised: '#2c251f',
  surfaceLight: '#f7f2ea',
  paperLight: '#fbf8f3',

  borderDark: 'rgba(230, 197, 122, 0.16)',
  borderLight: 'rgba(168, 135, 104, 0.16)',
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
        light: brandColors.goldLight,
        contrastText: '#1a1510',
      },
      secondary: {
        main: brandColors.clayLight,
        dark: brandColors.clay,
        light: brandColors.beigeDeep,
        contrastText: '#1a1510',
      },
      info: {
        main: brandColors.peach,
        dark: brandColors.peachDark,
        light: brandColors.peachLight,
        contrastText: '#1a1510',
      },
      warning: {
        main: brandColors.clayLight,
        dark: brandColors.clay,
        light: brandColors.copper,
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
      main: brandColors.goldDark,
      dark: '#b08f48',
      light: brandColors.gold,
      contrastText: '#1a1510',
    },
    secondary: {
      main: brandColors.clay,
      dark: brandColors.clayDark,
      light: brandColors.clayLight,
      contrastText: '#fffaf4',
    },
    info: {
      main: brandColors.peachDark,
      dark: '#c48f74',
      light: brandColors.peach,
      contrastText: '#2a221c',
    },
    warning: {
      main: brandColors.clay,
      dark: brandColors.clayDark,
      light: brandColors.clayLight,
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

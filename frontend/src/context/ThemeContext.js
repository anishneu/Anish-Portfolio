import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/**
 * Custom Coolors set
 * #F0B67F apricot · #FE5F55 coral · #D6D1B1 sand · #C7EFCF mint · #EEF5DB cream
 */
export const brandColors = {
  /** Cream / sand surfaces */
  whisper: '#eef5db',
  mist: '#e4ecd0',
  beige: '#d6d1b1',
  beigeDeep: '#c4be9a',
  cream: '#eef5db',
  sand: '#d6d1b1',

  /** Text neutrals derived from sand + coral */
  fog: '#9a9478',
  steel: '#6e6954',
  slate: '#4a4638',
  night: '#2a261c',
  ink: '#17150f',
  charcoal: '#211e16',

  /** Primary — coral #FE5F55 */
  accent: '#fe5f55',
  accentHover: '#ff7a72',
  accentSoft: 'rgba(254, 95, 85, 0.18)',
  accentLight: '#e04840',
  champagne: '#ff8a82',
  coral: '#fe5f55',
  coralDark: '#e04840',
  coralLight: '#ff8a82',
  gold: '#fe5f55',
  goldDark: '#e04840',
  goldLight: '#ff8a82',
  scarlet: '#fe5f55',
  scarletDark: '#e04840',
  scarletLight: '#ff8a82',

  /** Secondary — apricot #F0B67F */
  secondary: '#f0b67f',
  secondaryDark: '#d99a5e',
  secondaryLight: '#f6c89a',
  secondarySoft: 'rgba(240, 182, 127, 0.22)',
  apricot: '#f0b67f',
  apricotDark: '#d99a5e',
  apricotLight: '#f6c89a',
  clay: '#f0b67f',
  clayDark: '#d99a5e',
  clayLight: '#f6c89a',
  claySoft: 'rgba(240, 182, 127, 0.22)',
  brown: '#f0b67f',
  brownDark: '#d99a5e',
  brownLight: '#f6c89a',
  brownSoft: 'rgba(240, 182, 127, 0.22)',

  /** Tertiary — mint #C7EFCF */
  tertiary: '#c7efcf',
  tertiaryDark: '#9fd6ab',
  tertiaryLight: '#ddf6e3',
  tertiarySoft: 'rgba(199, 239, 207, 0.32)',
  mint: '#c7efcf',
  mintDark: '#9fd6ab',
  mintLight: '#ddf6e3',
  mintSoft: 'rgba(199, 239, 207, 0.32)',
  peach: '#f0b67f',
  peachDark: '#d99a5e',
  peachLight: '#f6c89a',
  peachSoft: 'rgba(240, 182, 127, 0.22)',
  cyan: '#c7efcf',
  cyanDark: '#9fd6ab',
  cyanLight: '#ddf6e3',
  cyanSoft: 'rgba(199, 239, 207, 0.32)',

  copper: '#f0b67f',
  chocolate: '#e04840',
  chocolateSoft: 'rgba(224, 72, 64, 0.14)',

  bar: 'rgba(23, 21, 15, 0.92)',
  barDark: 'rgba(23, 21, 15, 0.92)',
  barLight: 'rgba(238, 245, 219, 0.94)',

  lime: '#fe5f55',
  limeLight: '#e04840',
  green: '#c7efcf',
  lavender: '#f0b67f',

  surface: '#211e16',
  surfaceRaised: '#2c281f',
  surfaceLight: '#eef5db',
  paperLight: '#f7faee',

  borderDark: 'rgba(240, 182, 127, 0.18)',
  borderLight: 'rgba(224, 72, 64, 0.16)',
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
        main: brandColors.coral,
        dark: brandColors.coralDark,
        light: brandColors.coralLight,
        contrastText: '#fff8f6',
      },
      secondary: {
        main: brandColors.apricot,
        dark: brandColors.apricotDark,
        light: brandColors.apricotLight,
        contrastText: '#1a1510',
      },
      info: {
        main: brandColors.mint,
        dark: brandColors.mintDark,
        light: brandColors.cream,
        contrastText: '#1a1510',
      },
      warning: {
        main: brandColors.apricotLight,
        dark: brandColors.apricot,
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
      main: brandColors.coralDark,
      dark: '#c23a33',
      light: brandColors.coral,
      contrastText: '#fff8f6',
    },
    secondary: {
      main: brandColors.apricotDark,
      dark: '#c4844a',
      light: brandColors.apricot,
      contrastText: '#1a1510',
    },
    info: {
      main: brandColors.mintDark,
      dark: '#7fbe8f',
      light: brandColors.mint,
      contrastText: '#1a1510',
    },
    warning: {
      main: brandColors.apricotDark,
      dark: '#c4844a',
      light: brandColors.apricot,
      contrastText: '#1a1510',
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

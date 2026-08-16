import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/**
 * Custom set: #A7BAA0 sage · #DEC7A7 sand · #E39774 terracotta · #382030 plum
 */
export const brandColors = {
  /** Sand surfaces — #DEC7A7 */
  whisper: '#f3e9da',
  mist: '#e8d8c0',
  beige: '#dec7a7',
  beigeDeep: '#cbb28c',
  cream: '#f3e9da',
  sand: '#dec7a7',

  /** Text neutrals from plum + olive */
  fog: '#a8927a',
  steel: '#6e5a48',
  slate: '#4a3a30',
  night: '#382030',
  ink: '#24141f',
  charcoal: '#2e1a28',

  /** Primary — terracotta #e39774 */
  accent: '#e39774',
  accentHover: '#dba56a',
  accentSoft: 'rgba(227, 151, 116, 0.2)',
  accentLight: '#c87d5a',
  champagne: '#ebb092',
  amber: '#e39774',
  amberDark: '#c87d5a',
  amberLight: '#ebb092',
  gold: '#e39774',
  goldDark: '#c87d5a',
  goldLight: '#ebb092',
  coral: '#e39774',
  coralDark: '#c87d5a',
  coralLight: '#ebb092',
  scarlet: '#e39774',
  scarletDark: '#c87d5a',
  scarletLight: '#ebb092',

  /** Secondary — sage #a7baa0 */
  secondary: '#a7baa0',
  secondaryDark: '#879a80',
  secondaryLight: '#c0cfba',
  secondarySoft: 'rgba(167, 186, 160, 0.18)',
  olive: '#a7baa0',
  oliveDark: '#879a80',
  oliveLight: '#c0cfba',
  apricot: '#e39774',
  apricotDark: '#c87d5a',
  apricotLight: '#ebb092',
  clay: '#a7baa0',
  clayDark: '#879a80',
  clayLight: '#c0cfba',
  claySoft: 'rgba(167, 186, 160, 0.18)',
  brown: '#a7baa0',
  brownDark: '#879a80',
  brownLight: '#c0cfba',
  brownSoft: 'rgba(167, 186, 160, 0.18)',

  /** Tertiary / depth — plum #382030 */
  tertiary: '#382030',
  tertiaryDark: '#2a1724',
  tertiaryLight: '#5a3a4e',
  tertiarySoft: 'rgba(56, 32, 48, 0.16)',
  plum: '#382030',
  plumDark: '#2a1724',
  plumLight: '#5a3a4e',
  mint: '#a7baa0',
  mintDark: '#879a80',
  mintLight: '#c0cfba',
  mintSoft: 'rgba(167, 186, 160, 0.18)',
  peach: '#dec7a7',
  peachDark: '#cbb28c',
  peachLight: '#f3e9da',
  peachSoft: 'rgba(222, 199, 167, 0.28)',
  cyan: '#a7baa0',
  cyanDark: '#879a80',
  cyanLight: '#c0cfba',
  cyanSoft: 'rgba(167, 186, 160, 0.18)',

  copper: '#e39774',
  chocolate: '#382030',
  chocolateSoft: 'rgba(56, 32, 48, 0.14)',

  bar: 'rgba(36, 20, 31, 0.94)',
  barDark: 'rgba(36, 20, 31, 0.94)',
  barLight: 'rgba(243, 233, 218, 0.94)',

  lime: '#e39774',
  limeLight: '#c87d5a',
  green: '#a7baa0',
  lavender: '#5a3a4e',

  surface: '#2e1a28',
  surfaceRaised: '#3d2434',
  surfaceLight: '#f3e9da',
  paperLight: '#faf4ea',

  borderDark: 'rgba(255, 122, 74, 0.28)',
  borderLight: 'rgba(56, 32, 48, 0.14)',

  /** Dark-mode neon punch (light mode stays muted above) */
  neonCoral: '#ff7a4a',
  neonCoralSoft: 'rgba(255, 122, 74, 0.22)',
  neonMint: '#7dffb0',
  neonMintSoft: 'rgba(125, 255, 176, 0.2)',
  neonSand: '#ffe4a8',
  neonViolet: '#d47bff',
  neonVioletSoft: 'rgba(212, 123, 255, 0.22)',
};

export function getBrandBarColor(mode) {
  return mode === 'light' ? brandColors.barLight : brandColors.barDark;
}

const fontStack = '"Outfit", "Segoe UI", sans-serif';

const ThemeContext = createContext(null);

export function useThemeMode() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeMode must be used within ThemeContext.Provider');
  return ctx;
}

function getModePalette() {
  return {
    primary: {
      main: '#e39774',
      dark: '#c97a58',
      light: '#f0b396',
      contrastText: '#24141f',
    },
    secondary: {
      main: '#a7baa0',
      dark: '#889e80',
      light: '#c4d2bd',
      contrastText: '#24141f',
    },
    info: {
      main: '#dec7a7',
      dark: '#c4ad8c',
      light: '#ebe0cc',
      contrastText: '#24141f',
    },
    warning: {
      main: '#e39774',
      dark: '#c97a58',
      light: '#f0b396',
      contrastText: '#24141f',
    },
    background: { default: '#1a0f18', paper: '#2a1824' },
    text: { primary: '#f3e9da', secondary: '#c4b09a' },
    divider: 'rgba(227,151,116,0.18)',
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
  const [mode] = useState('dark');

  const toggleMode = () => {};

  useEffect(() => {
    document.documentElement.setAttribute('data-mui-color-scheme', 'dark');
    document.documentElement.style.colorScheme = 'dark';
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('portfolio-theme', 'dark');
    }
  }, []);

  const theme = useMemo(() => {
    const modePalette = getModePalette();
    return createTheme({
      palette: {
        mode: 'dark',
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
              backgroundColor: '#1a0f18',
              fontFamily: fontStack,
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': { width: 0, height: 0, display: 'none' },
            },
            '#root': {
              minHeight: '100vh',
            },
          },
        },
        MuiButton: {
          defaultProps: { disableElevation: true },
          styleOverrides: {
            root: { borderRadius: 8, textTransform: 'none', fontWeight: 600 },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
              border: '1px solid rgba(255,255,255,0.08)',
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
              border: '1px solid rgba(255,255,255,0.08)',
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
  }, []);

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

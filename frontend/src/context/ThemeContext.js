import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/**
 * Custom set: #56793B olive · #DEC7A7 sand · #CC904B amber · #382030 plum
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

  /** Primary — amber #CC904B */
  accent: '#cc904b',
  accentHover: '#dba56a',
  accentSoft: 'rgba(204, 144, 75, 0.2)',
  accentLight: '#b37938',
  champagne: '#e0ae72',
  amber: '#cc904b',
  amberDark: '#b37938',
  amberLight: '#e0ae72',
  gold: '#cc904b',
  goldDark: '#b37938',
  goldLight: '#e0ae72',
  coral: '#cc904b',
  coralDark: '#b37938',
  coralLight: '#e0ae72',
  scarlet: '#cc904b',
  scarletDark: '#b37938',
  scarletLight: '#e0ae72',

  /** Secondary — olive #56793B */
  secondary: '#56793b',
  secondaryDark: '#425e2d',
  secondaryLight: '#6f9452',
  secondarySoft: 'rgba(86, 121, 59, 0.18)',
  olive: '#56793b',
  oliveDark: '#425e2d',
  oliveLight: '#6f9452',
  apricot: '#cc904b',
  apricotDark: '#b37938',
  apricotLight: '#e0ae72',
  clay: '#56793b',
  clayDark: '#425e2d',
  clayLight: '#6f9452',
  claySoft: 'rgba(86, 121, 59, 0.18)',
  brown: '#56793b',
  brownDark: '#425e2d',
  brownLight: '#6f9452',
  brownSoft: 'rgba(86, 121, 59, 0.18)',

  /** Tertiary / depth — plum #382030 */
  tertiary: '#382030',
  tertiaryDark: '#2a1724',
  tertiaryLight: '#5a3a4e',
  tertiarySoft: 'rgba(56, 32, 48, 0.16)',
  plum: '#382030',
  plumDark: '#2a1724',
  plumLight: '#5a3a4e',
  mint: '#56793b',
  mintDark: '#425e2d',
  mintLight: '#6f9452',
  mintSoft: 'rgba(86, 121, 59, 0.18)',
  peach: '#dec7a7',
  peachDark: '#cbb28c',
  peachLight: '#f3e9da',
  peachSoft: 'rgba(222, 199, 167, 0.28)',
  cyan: '#56793b',
  cyanDark: '#425e2d',
  cyanLight: '#6f9452',
  cyanSoft: 'rgba(86, 121, 59, 0.18)',

  copper: '#cc904b',
  chocolate: '#382030',
  chocolateSoft: 'rgba(56, 32, 48, 0.14)',

  bar: 'rgba(36, 20, 31, 0.94)',
  barDark: 'rgba(36, 20, 31, 0.94)',
  barLight: 'rgba(243, 233, 218, 0.94)',

  lime: '#cc904b',
  limeLight: '#b37938',
  green: '#56793b',
  lavender: '#5a3a4e',

  surface: '#2e1a28',
  surfaceRaised: '#3d2434',
  surfaceLight: '#f3e9da',
  paperLight: '#faf4ea',

  borderDark: 'rgba(204, 144, 75, 0.2)',
  borderLight: 'rgba(56, 32, 48, 0.14)',
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
        main: brandColors.amber,
        dark: brandColors.amberDark,
        light: brandColors.amberLight,
        contrastText: '#24141f',
      },
      secondary: {
        main: brandColors.oliveLight,
        dark: brandColors.olive,
        light: '#8fb06e',
        contrastText: '#24141f',
      },
      info: {
        main: brandColors.sand,
        dark: brandColors.beigeDeep,
        light: brandColors.cream,
        contrastText: '#24141f',
      },
      warning: {
        main: brandColors.amberLight,
        dark: brandColors.amber,
        light: brandColors.copper,
        contrastText: '#24141f',
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
      main: brandColors.amberDark,
      dark: '#9a652c',
      light: brandColors.amber,
      contrastText: '#fffaf4',
    },
    secondary: {
      main: brandColors.olive,
      dark: brandColors.oliveDark,
      light: brandColors.oliveLight,
      contrastText: '#fffaf4',
    },
    info: {
      main: brandColors.oliveDark,
      dark: '#334820',
      light: brandColors.oliveLight,
      contrastText: '#fffaf4',
    },
    warning: {
      main: brandColors.plum,
      dark: brandColors.plumDark,
      light: brandColors.plumLight,
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

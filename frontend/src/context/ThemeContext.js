import React, { createContext, useContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const brandColors = {
  charcoal: '#3d3d3f',
  slate: '#6B7A8F',
  greenDark: '#077348',
  greenMint: '#7DCE9F',
};

const brand = {
  main: brandColors.greenMint,
  dark: brandColors.greenDark,
  light: brandColors.greenMint,
};

const ThemeContext = createContext(null);

export function useThemeMode() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeMode must be used within ThemeContext.Provider');
  return ctx;
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem('portfolio-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('portfolio-theme', next);
      }
      return next;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: brand.main,
            dark: brand.dark,
            light: brand.light,
          },
          ...(mode === 'dark'
            ? {
                background: { default: brandColors.charcoal, paper: '#454548' },
                text: { primary: '#f5f5f5', secondary: brandColors.slate },
                section: {
                  home: '#353537',
                  about: '#3d3d3f',
                  skills: '#3a3a3c',
                  projects: '#3d3d3f',
                  contact: '#3a3a3c',
                },
              }
            : {
                background: { default: '#f4f6f8', paper: '#ffffff' },
                text: { primary: brandColors.charcoal, secondary: brandColors.slate },
                section: {
                  home: '#eef6f1',
                  about: '#f2f4f6',
                  skills: '#eef2f5',
                  projects: '#f2f4f6',
                  contact: '#eef2f5',
                },
              }),
        },
      }),
    [mode]
  );

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

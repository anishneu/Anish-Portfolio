import React, { createContext, useContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const coral = {
  main: '#E07A5F',
  dark: '#C4694A',
  light: '#F4A898',
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
            main: coral.main,
            dark: coral.dark,
            light: coral.light,
          },
          ...(mode === 'dark'
            ? {
                background: { default: '#0d0d0d', paper: '#1a1a1a' },
                text: { primary: '#f5f5f5', secondary: '#b0b0b0' },
                section: { home: '#2D1F1A', about: '#1e1e1e', skills: '#1c1c1c', projects: '#1a1a1a', contact: '#1c1c1c' },
              }
            : {
                background: { default: '#fafafa', paper: '#ffffff' },
                text: { primary: '#1a1a1a', secondary: '#555' },
                section: { home: '#FFF5F2', about: '#f5f0ee', skills: '#f8f4f2', projects: '#f5f0ee', contact: '#f8f4f2' },
              }),
        },
      }),
    [mode]
  );

  const value = useMemo(() => ({ mode, toggleMode, coral }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

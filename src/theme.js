// src/theme.js
import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode = 'light') => {
  const isDark = mode === 'dark';

  // Paleta más formal y sobria
  const primaryMain = isDark ? '#063a6e' : '#0B5394';
  const primaryLight = isDark ? '#2b63a3' : '#457BC8';
  const primaryDark = isDark ? '#042f57' : '#063a6e';

  const secondaryMain = isDark ? '#8a4a24' : '#C75A2A';
  const secondaryLight = isDark ? '#b06a3d' : '#E28A5E';
  const secondaryDark = isDark ? '#693b1b' : '#9C481F';

  const backgroundDefault = isDark ? '#0b1220' : '#F6F7F9';
  const backgroundPaper = isDark ? '#111827' : '#FFFFFF';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: primaryMain,
        light: primaryLight,
        dark: primaryDark,
        contrastText: '#ffffff',
      },
      secondary: {
        main: secondaryMain,
        light: secondaryLight,
        dark: secondaryDark,
        contrastText: '#ffffff',
      },
      background: {
        default: backgroundDefault,
        paper: backgroundPaper,
      },
      text: {
        primary: isDark ? '#E6EEF8' : '#1F2D3D',
        secondary: isDark ? '#B8C7D6' : '#556877',
      },
      error: { main: '#C0392B' },
      success: { main: '#1E8449' },
      warning: { main: '#B9770E' },
      info: { main: primaryLight },
      divider: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      h1: { fontWeight: 700, fontSize: '2.25rem', letterSpacing: '-0.02em' },
      h2: { fontWeight: 600, fontSize: '1.75rem', letterSpacing: '-0.01em' },
      h3: { fontWeight: 600, fontSize: '1.5rem' },
      h4: { fontWeight: 600, fontSize: '1.25rem' },
      h5: { fontWeight: 600, fontSize: '1rem' },
      h6: { fontWeight: 600, fontSize: '0.95rem' },
      body1: { fontSize: '0.98rem', lineHeight: 1.65 },
      body2: { fontSize: '0.875rem', lineHeight: 1.5 },
      button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.02em' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': {
            '--color-primary': primaryMain,
            '--color-primary-light': primaryLight,
            '--color-secondary': secondaryMain,
            '--color-bg': backgroundDefault,
            '--color-paper': backgroundPaper,
            '--color-text': isDark ? '#E6EEF8' : '#1F2D3D',
            '--radius': '8px',
          },
          body: {
            backgroundColor: backgroundDefault,
            color: isDark ? '#E6EEF8' : '#1F2D3D',
            fontFamily: '"Inter", "Roboto", sans-serif',
            scrollbarColor: isDark ? '#475569 #111827' : '#cbd5e1 #f6f7f9',
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': { width: 8, height: 8 },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: isDark ? '#3b4756' : '#cbd5e1',
            },
            '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
              backgroundColor: isDark ? '#0b1220' : '#F6F7F9',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            padding: '8px 16px',
            boxShadow: 'none',
            fontWeight: 600,
            textTransform: 'none',
          },
          contained: {
            backgroundColor: primaryMain,
            color: '#fff',
            '&:hover': { backgroundColor: primaryDark, boxShadow: '0 4px 10px rgba(2,6,23,0.12)' },
          },
          outlined: {
            borderColor: 'rgba(31,45,61,0.08)',
            '&:hover': { backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(11,83,148,0.04)' },
          },
          text: { padding: '6px 10px' },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            boxShadow: isDark ? '0 1px 6px rgba(2,6,23,0.6)' : '0 1px 3px rgba(15,23,42,0.06)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.06)'}`,
            transition: 'transform 0.12s ease, box-shadow 0.12s ease',
            '&:hover': { transform: 'translateY(-2px)', boxShadow: isDark ? '0 8px 20px rgba(2,6,23,0.6)' : '0 8px 20px rgba(15,23,42,0.08)' },
          },
        },
      },
      MuiPaper: { styleOverrides: { root: { borderRadius: 10, border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.06)'}` } } },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: backgroundPaper,
            color: isDark ? '#E6EEF8' : '#1F2D3D',
            boxShadow: '0 1px 2px rgba(15,23,42,0.04)',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.06)'}`,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 6,
              '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)' },
              '&:hover fieldset': { borderColor: primaryMain },
              '&.Mui-focused fieldset': { borderColor: primaryMain, borderWidth: '1.5px' },
            },
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.06)'}`,
          },
        },
      },
      MuiTableHead: { styleOverrides: { root: { backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : '#F8FAFC' } } },
      MuiTableCell: {
        styleOverrides: {
          root: { borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.06)'}` },
          head: { fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.06em' },
        },
      },
      MuiChip: { styleOverrides: { root: { borderRadius: 12, fontWeight: 600 } } },
      MuiDrawer: { styleOverrides: { paper: { backgroundColor: backgroundPaper, borderRight: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(15,23,42,0.06)'}` } } },
    },
    shape: { borderRadius: 8 },
  });
};
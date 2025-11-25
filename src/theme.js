// src/theme.js
import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode = 'light') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#0066CC', // Azul corporativo como Ánfora
        light: '#3399FF',
        dark: '#004499',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#FF6B35', // Naranja de acento
        light: '#FF8F65',
        dark: '#E55A2B',
      },
      background: {
        default: isDark ? '#0f172a' : '#F8F9FA',
        paper: isDark ? '#1e293b' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#f1f5f9' : '#2C3E50',
        secondary: isDark ? '#cbd5e1' : '#546E7A',
      },
      error: {
        main: '#E74C3C',
      },
      success: {
        main: '#27AE60',
      },
      warning: {
        main: '#F39C12',
      },
      info: {
        main: '#3498DB',
      },
      divider: isDark ? '#334155' : '#E5E8EB',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        letterSpacing: '-0.025em',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
        letterSpacing: '-0.025em',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
        letterSpacing: '-0.025em',
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.25rem',
      },
      h6: {
        fontWeight: 500,
        fontSize: '1rem',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
      button: {
        fontWeight: 500,
        textTransform: 'none',
        letterSpacing: '0.025em',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: isDark ? '#475569 #1e293b' : '#cbd5e1 #f1f5f9',
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
              width: 8,
              height: 8,
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: isDark ? '#475569' : '#cbd5e1',
              minHeight: 24,
            },
            '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
              backgroundColor: isDark ? '#64748b' : '#94a3b8',
            },
            '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
              backgroundColor: isDark ? '#64748b' : '#94a3b8',
            },
            '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
              backgroundColor: isDark ? '#64748b' : '#94a3b8',
            },
            '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
              backgroundColor: isDark ? '#1e293b' : '#f1f5f9',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '10px 20px',
            boxShadow: 'none',
            fontWeight: 500,
            textTransform: 'none',
            '&:hover': {
              boxShadow: isDark ? '0 4px 14px 0 rgba(59, 130, 246, 0.15)' : '0 4px 14px 0 rgba(0, 102, 204, 0.15)',
            },
          },
          contained: {
            background: 'linear-gradient(135deg, #0066CC 0%, #004499 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #004499 0%, #003366 100%)',
            },
          },
          outlined: {
            borderWidth: '1px',
            '&:hover': {
              borderWidth: '1px',
              backgroundColor: isDark ? 'rgba(59, 130, 246, 0.04)' : 'rgba(0, 102, 204, 0.04)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: isDark 
              ? '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)'
              : '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            border: `1px solid ${isDark ? '#334155' : '#E5E8EB'}`,
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: isDark
                ? '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)'
                : '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            border: `1px solid ${isDark ? '#334155' : '#E5E8EB'}`,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
            color: isDark ? '#f1f5f9' : '#2C3E50',
            boxShadow: isDark 
              ? '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)'
              : '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            borderBottom: `1px solid ${isDark ? '#334155' : '#E5E8EB'}`,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              '& fieldset': {
                borderColor: isDark ? '#475569' : '#DDD',
              },
              '&:hover fieldset': {
                borderColor: '#0066CC',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#0066CC',
                borderWidth: '2px',
              },
            },
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            border: `1px solid ${isDark ? '#334155' : '#E5E8EB'}`,
            '&::-webkit-scrollbar': {
              height: 8,
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: isDark ? '#1e293b' : '#f8fafc',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: isDark ? '#475569' : '#cbd5e1',
              borderRadius: 4,
            },
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            minWidth: 650,
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? '#334155' : '#f8fafc',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${isDark ? '#334155' : '#E5E8EB'}`,
          },
          head: {
            backgroundColor: isDark ? '#334155' : '#f8fafc',
            fontWeight: 600,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            fontWeight: 500,
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isDark ? '#1e293b' : '#FFFFFF',
            borderRight: `1px solid ${isDark ? '#334155' : '#E5E8EB'}`,
          },
        },
      },
    },
    shape: {
      borderRadius: 8,
    },
  });
};
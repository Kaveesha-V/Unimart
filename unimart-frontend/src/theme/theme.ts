import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const getCustomTheme = (mode: 'dark' | 'light') => {
  const isDark = mode === 'dark';

  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#6C5CE7', // Electric Violet
        light: '#9B8DFF',
        dark: '#4B38C3',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#00E5FF', // Electric Cyan
        light: '#6EFAFF',
        dark: '#00B2CC',
        contrastText: '#0B0F1A',
      },
      error: {
        main: '#FF5C7A', // Hot Coral
        light: '#FF8DA1',
        dark: '#D93252',
      },
      warning: {
        main: '#B4FF3C', // Lime accent
        contrastText: '#0B0F1A',
      },
      background: {
        default: isDark ? '#0B0F1A' : '#F8FAFC',
        paper: isDark ? '#121829' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F4F6FB' : '#0F172A',
        secondary: isDark ? '#94A3B8' : '#64748B',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontFamily: '"Space Grotesk", "Inter", sans-serif',
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontFamily: '"Space Grotesk", "Inter", sans-serif',
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontFamily: '"Space Grotesk", "Inter", sans-serif',
        fontWeight: 700,
      },
      h4: {
        fontFamily: '"Space Grotesk", "Inter", sans-serif',
        fontWeight: 600,
      },
      h5: {
        fontFamily: '"Space Grotesk", "Inter", sans-serif',
        fontWeight: 600,
      },
      h6: {
        fontFamily: '"Space Grotesk", "Inter", sans-serif',
        fontWeight: 600,
      },
      button: {
        fontFamily: '"Space Grotesk", "Inter", sans-serif',
        fontWeight: 600,
        textTransform: 'none',
      },
      subtitle1: {
        fontSize: '1.05rem',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '10px 24px',
            fontSize: '0.95rem',
            fontWeight: 600,
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          },
          contained: ({ ownerState }) => ({
            ...(ownerState.color === 'primary' && {
              background: 'linear-gradient(135deg, #6C5CE7 0%, #4B38C3 100%)',
              boxShadow: '0 4px 14px 0 rgba(108, 92, 231, 0.39)',
              '&:hover': {
                background: 'linear-gradient(135deg, #7C6DEB 0%, #5B48D3 100%)',
                boxShadow: '0 6px 20px 0 rgba(108, 92, 231, 0.6)',
                transform: 'translateY(-1px)',
              },
            }),
            ...(ownerState.color === 'secondary' && {
              background: 'linear-gradient(135deg, #00E5FF 0%, #00B2CC 100%)',
              color: '#0B0F1A',
              fontWeight: 700,
              boxShadow: '0 4px 14px 0 rgba(0, 229, 255, 0.39)',
              '&:hover': {
                background: 'linear-gradient(135deg, #33EBFF 0%, #00C5E0 100%)',
                boxShadow: '0 6px 20px 0 rgba(0, 229, 255, 0.6)',
                transform: 'translateY(-1px)',
              },
            }),
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: isDark ? '#121829' : '#FFFFFF',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: 16,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: 8,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              '& fieldset': {
                borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
              },
              '&:hover fieldset': {
                borderColor: '#6C5CE7',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00E5FF',
                borderWidth: 2,
              },
            },
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};

export const darkTheme = getCustomTheme('dark');
export const lightTheme = getCustomTheme('light');
export default darkTheme;

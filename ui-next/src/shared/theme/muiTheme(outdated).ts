import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff69b4', // monstrino-pink
      light: '#ff84e4',
      dark: '#e91e63',
      contrastText: '#000000',
    },
    secondary: {
      main: '#8b5fbf', // monstrino-purple
      light: '#9c7cc5',
      dark: '#6a4c93',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a0a0a', // monstrino-black
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    success: {
      main: '#66cc66', // monstrino-green
    },
    warning: {
      main: '#ffd93d', // monstrino-yellow
    },
    info: {
      main: '#4a90e2', // monstrino-blue
    },
    error: {
      main: '#ff6b6b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
    h1: {
      fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Fira Code", "Menlo", "Monaco", "Consolas", monospace',
      fontWeight: 400,
      textTransform: 'uppercase',
      letterSpacing: '0.0875em',
      fontSize: '0.75rem',
    },
    caption: {
      fontFamily: '"Fira Code", "Menlo", "Monaco", "Consolas", monospace',
      textTransform: 'uppercase',
      letterSpacing: '0.0875em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '9999px',
          textTransform: 'uppercase',
          fontFamily: '"Fira Code", monospace',
          fontSize: '0.75rem',
          letterSpacing: '0.0875em',
          minHeight: '44px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(255, 105, 180, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          backgroundImage: 'none',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '& fieldset': {
              borderColor: 'rgba(139, 95, 191, 0.3)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(139, 95, 191, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ff69b4',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '9999px',
          fontFamily: '"Fira Code", monospace',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.0875em',
        },
      },
    },
  },
});

export default muiTheme;
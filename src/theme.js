import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Premium Barber Palette
// Gold: #D4AF37
// Dark: #121212
// Paper: #1E1E1E
// Text: #FFFFFF

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D4AF37', // Gold
      light: '#E6C665',
      dark: '#9E8022',
      contrastText: '#000000',
    },
    secondary: {
      main: '#FFFFFF',
      dark: '#BDBDBD',
      contrastText: '#000000',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
    error: {
      main: '#FF5252',
    },
    success: {
      main: '#4CAF50',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Oswald", sans-serif',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    h2: {
      fontFamily: '"Oswald", sans-serif',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
    h3: {
      fontFamily: '"Oswald", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Oswald", sans-serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: '"Oswald", sans-serif',
      fontWeight: 500,
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
    button: {
      fontFamily: '"Oswald", sans-serif',
      fontWeight: 700,
      letterSpacing: '1px',
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1.05rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0, // Sharp edges for premium feel
          padding: '12px 28px',
          boxShadow: 'none',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(212, 175, 55, 0.4)',
          },
          transition: 'all 0.3s ease',
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #D4AF37 30%, #F4D03F 90%)',
          color: '#000',
        },
        outlinedPrimary: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
          backgroundColor: '#1E1E1E',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Oswald:wght@400;500;600;700&display=swap');
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #121212; 
        }
        ::-webkit-scrollbar-thumb {
          background: #333; 
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #D4AF37; 
        }
        ::selection {
          background: #D4AF37;
          color: #000;
        }
      `,
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#D32F2F' },       // Rojo barbería
    secondary: { main: '#1C1C1C' },     // Gris oscuro
    warning: { main: '#FFC107' },       // Amarillo para acentos
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    h2: { fontWeight: 700, letterSpacing: '-0.5px' },
    h4: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 8 },
});

export default theme;
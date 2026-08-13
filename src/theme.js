import { createTheme, responsiveFontSizes, alpha } from '@mui/material/styles';
import site from './config/site';

const { colors, fonts, radius } = site;

const headingStack = `"${fonts.heading}", "Montserrat", "Segoe UI", sans-serif`;
const bodyStack = `"${fonts.body}", "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary,
      dark: colors.primaryDark,
      light: alpha(colors.primary, 0.85),
      contrastText: '#05221A',
    },
    secondary: {
      main: colors.secondary,
      contrastText: '#04131F',
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    text: {
      primary: colors.text,
      secondary: colors.textMuted,
    },
    success: { main: colors.primary },
    divider: alpha('#FFFFFF', 0.09),
  },

  shape: { borderRadius: radius },

  typography: {
    fontFamily: bodyStack,
    h1: { fontFamily: headingStack, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 },
    h2: { fontFamily: headingStack, fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.12 },
    h3: { fontFamily: headingStack, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.18 },
    h4: { fontFamily: headingStack, fontWeight: 700, letterSpacing: '-0.015em' },
    h5: { fontFamily: headingStack, fontWeight: 700, letterSpacing: '-0.01em' },
    h6: { fontFamily: headingStack, fontWeight: 700 },
    subtitle1: { fontSize: '1.125rem', lineHeight: 1.6 },
    body1: { fontSize: '1.0625rem', lineHeight: 1.7 },
    body2: { fontSize: '0.95rem', lineHeight: 1.65 },
    button: { fontFamily: headingStack, fontWeight: 700, textTransform: 'none', letterSpacing: 0 },
  },

  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingInline: 26,
          paddingBlock: 12,
          fontSize: '1rem',
          transition: 'transform .25s ease, box-shadow .25s ease, background-color .25s ease',
          '&:hover': { transform: 'translateY(-2px)' },
        },
        sizeLarge: { paddingInline: 34, paddingBlock: 15, fontSize: '1.0625rem' },
        containedPrimary: {
          backgroundColor: colors.primary,
          color: '#04241A',
          boxShadow: `0 10px 30px -10px ${alpha(colors.primary, 0.65)}`,
          '&:hover': {
            backgroundColor: colors.primary,
            boxShadow: `0 16px 40px -12px ${alpha(colors.primary, 0.8)}`,
          },
        },
        outlinedPrimary: {
          borderWidth: 2,
          borderColor: alpha(colors.primary, 0.45),
          '&:hover': { borderWidth: 2, borderColor: colors.primary, backgroundColor: alpha(colors.primary, 0.08) },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: radius,
          backgroundImage: 'none',
          backgroundColor: alpha(colors.surface, 0.7),
          border: `1px solid ${alpha('#FFFFFF', 0.08)}`,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, fontFamily: headingStack },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': { boxSizing: 'border-box' },

        /*
         * Grano de película sobre toda la página.
         * Es lo que evita que las superficies se vean como plástico
         * vectorial: une todos los planos (fondos, tarjetas, video) bajo
         * una misma piel y elimina el banding de los degradados oscuros.
         * No captura clics, así que puede vivir por encima de todo.
         */
        'body::after': {
          content: '""',
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: 0.05,
          mixBlendMode: 'overlay',
          // Evita repintados y parpadeo en Safari iOS
          transform: 'translateZ(0)',
          backgroundRepeat: 'repeat',
          backgroundSize: '160px 160px',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")",
          '@media (max-width:600px)': { opacity: 0.03 },
        },
        html: {
          scrollBehavior: 'smooth',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          // Compensa la barra de navegación fija al saltar a un ancla
          scrollPaddingTop: 96,
        },
        body: {
          backgroundColor: colors.background,
          color: colors.text,
          overflowX: 'hidden',
        },
        img: { maxWidth: '100%' },
        '::-webkit-scrollbar': { width: 10 },
        '::-webkit-scrollbar-track': { background: colors.backgroundDeep },
        '::-webkit-scrollbar-thumb': {
          background: alpha(colors.primary, 0.35),
          borderRadius: 8,
        },
        '::-webkit-scrollbar-thumb:hover': { background: colors.primary },
        '::selection': { background: colors.primary, color: '#04241A' },
        '@media (prefers-reduced-motion: reduce)': {
          '*': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
            scrollBehavior: 'auto !important',
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme, { factor: 2.4 });

export default theme;

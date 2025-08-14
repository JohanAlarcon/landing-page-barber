// src/App.jsx
import React from 'react';
import {
  Box,
  Container,
  CssBaseline,
  GlobalStyles,
  useTheme,
} from '@mui/material';

import Hero from './components/Hero';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  const theme = useTheme();

  return (
    <>
      {/* Normalize y estilos globales */}
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: {
            scrollBehavior: 'smooth',
            height: '100%',
          },
          body: {
            backgroundColor: theme.palette.background.default,
            minHeight: '100%',
          },
          '#root': { height: '100%' },
        }}
      />

      <Box component="main">
        {/* Hero: full-width, fondo con gradiente+imagen */}
        <Box id="hero" sx={{ width: '100%' }}>
          <Hero />
        </Box>

        {/* Features: fondo claro y padding extra */}
        <Features />

        {/* CTA: full-width, gradiente oscuro */}
        <Box id="cta" sx={{ width: '100%' }}>
          <CTA />
        </Box>
      </Box>

      {/* Footer: fondo oscuro, contenido centrado */}
      <Box
        id="footer"
        component="footer"
        sx={{
          width: '100%',
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
        }}
      >
        <Footer />
      </Box>

      {/* Botón flotante de WhatsApp */}
      <WhatsAppButton />
    </>
  );
}
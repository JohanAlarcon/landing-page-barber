import { Box, CssBaseline, GlobalStyles, useTheme } from '@mui/material';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Benefits from './components/Benefits';
import AppShowcase from './components/AppShowcase';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  const theme = useTheme();

  return (
    <>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: {
            scrollBehavior: 'smooth',
          },
          body: {
            backgroundColor: theme.palette.background.default,
            overflowX: 'hidden'
          },
        }}
      />

      <Navbar />

      <Box component="main">
        <Hero />
        <Features />
        <Benefits />
        <AppShowcase />
        <Pricing />
        <FAQ />
        <CTA />
      </Box>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
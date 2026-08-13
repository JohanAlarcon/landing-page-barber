import { useEffect } from 'react';
import { Box, CssBaseline } from '@mui/material';

import site from './config/site';
import { VerticalProvider } from './context/VerticalContext';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VerticalDemos from './components/VerticalDemos';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import AppShowcase from './components/AppShowcase';
import Benefits from './components/Benefits';
import FreeTrialBanner from './components/FreeTrialBanner';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

/**
 * Sincroniza los metadatos del documento con lo definido en el .env,
 * para no tener el título ni la descripción escritos a mano en el HTML.
 */
function useDocumentMeta() {
  useEffect(() => {
    const { seo, brand, colors } = site;

    if (seo.title) document.title = seo.title;

    const setMeta = (selector, attribute, key, content) => {
      if (!content) return;
      let tag = document.head.querySelector(selector);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', seo.description);
    setMeta('meta[name="keywords"]', 'name', 'keywords', seo.keywords);
    setMeta('meta[name="theme-color"]', 'name', 'theme-color', colors.background);
    setMeta('meta[property="og:title"]', 'property', 'og:title', seo.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', seo.description);
    setMeta('meta[property="og:image"]', 'property', 'og:image', seo.ogImage);
    setMeta('meta[property="og:url"]', 'property', 'og:url', brand.siteUrl);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', seo.ogImage);
  }, []);
}

/**
 * Carga desde Google Fonts las tipografías configuradas en el .env.
 * Las de por defecto ya vienen precargadas en public/index.html; esto
 * solo añade una fuente extra si se cambia REACT_APP_FONT_*.
 */
function useConfiguredFonts() {
  useEffect(() => {
    const preloaded = ['montserrat', 'inter'];
    const families = [site.fonts.heading, site.fonts.body]
      .filter((family) => family && !preloaded.includes(family.toLowerCase()));

    if (families.length === 0) return undefined;

    const query = [...new Set(families)]
      .map((family) => `family=${encodeURIComponent(family)}:wght@400;500;600;700;800;900`)
      .join('&');

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${query}&display=swap`;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);
}

export default function App() {
  useDocumentMeta();
  useConfiguredFonts();

  return (
    <VerticalProvider>
      <CssBaseline />

      <Navbar />

      <Box component="main">
        <Hero />
        <VerticalDemos />
        <Features />
        <HowItWorks />
        <AppShowcase />
        <Benefits />
        <FreeTrialBanner />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </Box>

      <Footer />
      <WhatsAppButton />
    </VerticalProvider>
  );
}

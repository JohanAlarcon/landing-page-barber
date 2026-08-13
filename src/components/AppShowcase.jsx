import { useCallback, useEffect, useState } from 'react';
import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import site from '../config/site';
import { useVertical } from '../context/VerticalContext';
import SectionHeading from './common/SectionHeading';

const AUTOPLAY_MS = 4500;

/**
 * Galería de pantallas del sistema. Muestra las imágenes de la vertical
 * activa (REACT_APP_VERTICAL_*_GALLERY) y se puede arrastrar en móvil.
 */
export default function AppShowcase() {
  const { active, activeId, accent } = useVertical();
  const gallery = (active && active.gallery) || [];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Al cambiar de vertical volvemos a la primera imagen
  useEffect(() => setIndex(0), [activeId]);

  const go = useCallback(
    (delta) => {
      if (gallery.length === 0) return;
      setIndex((prev) => (prev + delta + gallery.length) % gallery.length);
    },
    [gallery.length]
  );

  useEffect(() => {
    if (paused || gallery.length < 2) return undefined;
    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, gallery.length, go]);

  if (gallery.length === 0) return null;

  const current = gallery[index] || gallery[0];

  return (
    <Box
      component="section"
      id="showcase"
      sx={{ py: { xs: 8, md: 12 }, bgcolor: site.colors.backgroundDeep, overflow: 'hidden' }}
    >
      <Container maxWidth="lg">
        <SectionHeading
          eyebrow="Por dentro"
          title="Así se ve por dentro"
          subtitle={`Pantallas reales del sistema configurado para ${active.label.toLowerCase()}.`}
          accent={accent}
        />

        <Box
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          sx={{ position: 'relative', maxWidth: 960, mx: 'auto' }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: { xs: '4 / 3', sm: '16 / 10' },
              borderRadius: 4,
              overflow: 'hidden',
              bgcolor: alpha('#050D16', 0.9),
              border: `1px solid ${alpha(accent, 0.25)}`,
              boxShadow: `0 50px 100px -50px #000, 0 0 60px -30px ${alpha(accent, 0.5)}`,
            }}
          >
            <AnimatePresence mode="wait">
              <Box
                key={`${active.id}-${index}`}
                component={motion.div}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1);
                  if (info.offset.x > 70) go(-1);
                }}
                sx={{ position: 'absolute', inset: 0, cursor: 'grab', '&:active': { cursor: 'grabbing' } }}
              >
                <Box
                  component="img"
                  src={current.src}
                  alt={current.caption || `Pantalla ${index + 1} de ${site.brand.name}`}
                  loading="lazy"
                  draggable={false}
                  sx={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                />
              </Box>
            </AnimatePresence>

            {current.caption && (
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  px: { xs: 2, md: 3 },
                  py: { xs: 1.4, md: 1.8 },
                  background: `linear-gradient(transparent, ${alpha('#050D16', 0.92)})`,
                  pointerEvents: 'none',
                }}
              >
                <Typography sx={{ fontWeight: 700, fontSize: { xs: '0.85rem', md: '0.95rem' } }}>
                  {current.caption}
                </Typography>
              </Box>
            )}
          </Box>

          {/* Flechas */}
          {gallery.length > 1 && (
            <>
              <IconButton
                onClick={() => go(-1)}
                aria-label="Imagen anterior"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: { xs: 6, md: -24 },
                  transform: 'translateY(-50%)',
                  bgcolor: alpha('#050D16', 0.75),
                  color: '#fff',
                  border: `1px solid ${alpha('#FFFFFF', 0.12)}`,
                  '&:hover': { bgcolor: accent, color: '#04131F' },
                }}
              >
                <ArrowBackIosNewRoundedIcon fontSize="small" />
              </IconButton>

              <IconButton
                onClick={() => go(1)}
                aria-label="Imagen siguiente"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: { xs: 6, md: -24 },
                  transform: 'translateY(-50%)',
                  bgcolor: alpha('#050D16', 0.75),
                  color: '#fff',
                  border: `1px solid ${alpha('#FFFFFF', 0.12)}`,
                  '&:hover': { bgcolor: accent, color: '#04131F' },
                }}
              >
                <ArrowForwardIosRoundedIcon fontSize="small" />
              </IconButton>
            </>
          )}

          {/* Indicadores */}
          {gallery.length > 1 && (
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 3 }}>
              {gallery.map((image, idx) => (
                <Box
                  key={image.src}
                  component="button"
                  type="button"
                  aria-label={`Ir a la imagen ${idx + 1}`}
                  onClick={() => setIndex(idx)}
                  sx={{
                    p: 0,
                    border: 'none',
                    cursor: 'pointer',
                    height: 6,
                    width: idx === index ? 30 : 10,
                    borderRadius: 999,
                    bgcolor: idx === index ? accent : alpha('#FFFFFF', 0.2),
                    transition: 'all .3s ease',
                  }}
                />
              ))}
            </Stack>
          )}
        </Box>
      </Container>
    </Box>
  );
}

import { Box, Button, Container, Grid, Stack, Tooltip, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';

import site from '../config/site';
import { useVertical } from '../context/VerticalContext';
import { openExternal, openWhatsApp, whatsappVerticalMessage } from '../helpers';
import SectionHeading from './common/SectionHeading';
import GlowBackground from './common/GlowBackground';
import VideoEmbed from './VideoEmbed';

/** Selector Barberías / Salones de uñas. */
function VerticalSwitch({ verticals, activeId, onChange }) {
  return (
    <Stack
      direction="row"
      spacing={0.75}
      sx={{
        p: 0.75,
        mx: 'auto',
        mb: { xs: 4, md: 6 },
        width: 'fit-content',
        maxWidth: '100%',
        borderRadius: 999,
        bgcolor: alpha('#FFFFFF', 0.05),
        border: `1px solid ${alpha('#FFFFFF', 0.1)}`,
        backdropFilter: 'blur(8px)',
      }}
    >
      {verticals.map((vertical) => {
        const isActive = vertical.id === activeId;
        return (
          <Box
            key={vertical.id}
            component="button"
            type="button"
            onClick={() => onChange(vertical.id)}
            aria-pressed={isActive}
            sx={{
              position: 'relative',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              px: { xs: 2, sm: 3.2 },
              py: { xs: 1.1, sm: 1.3 },
              borderRadius: 999,
              color: isActive ? '#04131F' : 'text.secondary',
              fontWeight: 800,
              fontFamily: 'inherit',
              fontSize: { xs: '0.85rem', sm: '1rem' },
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              whiteSpace: 'nowrap',
              transition: 'color .3s ease',
              '&:hover': { color: isActive ? '#04131F' : 'text.primary' },
            }}
          >
            {isActive && (
              <Box
                component={motion.span}
                layoutId="vertical-switch-pill"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 999,
                  bgcolor: vertical.color,
                  boxShadow: `0 12px 30px -12px ${alpha(vertical.color, 0.9)}`,
                  zIndex: 0,
                }}
              />
            )}
            <Box component="span" sx={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 1 }}>
              {vertical.emoji && <span aria-hidden>{vertical.emoji}</span>}
              {vertical.label}
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}

export default function VerticalDemos() {
  const theme = useTheme();
  const { verticals, active, activeId, setVertical, hasMultiple } = useVertical();

  if (!active) return null;

  const accent = active.color;

  return (
    <Box
      component="section"
      id="demos"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 13 },
        bgcolor: site.colors.background,
      }}
    >
      <GlowBackground colors={[accent, active.color2]} intensity={0.16} grid={false} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          eyebrow={site.demos.eyebrow}
          title={site.demos.title}
          subtitle={site.demos.subtitle}
          accent={accent}
          sx={{ mb: { xs: 3.5, md: 5 } }}
        />

        {hasMultiple && (
          <VerticalSwitch verticals={verticals} activeId={activeId} onChange={setVertical} />
        )}

        <AnimatePresence mode="wait">
          <Box
            key={activeId}
            component={motion.div}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
              {/* Video demo de la vertical.
                  Un video vertical de celular necesita menos ancho que uno
                  horizontal, así que la columna se ajusta a su proporción. */}
              <Grid size={{ xs: 12, md: active.video.isPortrait ? 5 : 7 }}>
                <VideoEmbed
                  video={active.video}
                  accent={accent}
                  placeholderText={active.video.description}
                />
                {active.video.description && active.video.url && (
                  <Typography
                    sx={{
                      mt: 2,
                      color: 'text.secondary',
                      fontSize: '0.95rem',
                      textAlign: 'center',
                      maxWidth: active.video.isPortrait ? 380 : 'none',
                      mx: 'auto',
                    }}
                  >
                    {active.video.description}
                  </Typography>
                )}
              </Grid>

              {/* Descripción + acceso al demo */}
              <Grid size={{ xs: 12, md: active.video.isPortrait ? 7 : 5 }}>
                <Stack spacing={2.5} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                  <Box>
                    <Typography
                      variant="h3"
                      sx={{ fontSize: { xs: '1.7rem', md: '2rem' }, mb: 1.2 }}
                    >
                      {active.headline}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: { xs: '1rem', md: '1.05rem' } }}>
                      {active.tagline}
                    </Typography>
                  </Box>

                  <Stack spacing={1.4} sx={{ alignItems: { xs: 'center', md: 'stretch' } }}>
                    {active.bullets.map((bullet) => (
                      <Stack
                        key={bullet}
                        direction="row"
                        spacing={1.3}
                        alignItems="flex-start"
                        sx={{ textAlign: 'left', maxWidth: 460 }}
                      >
                        <CheckCircleRoundedIcon sx={{ color: accent, fontSize: 21, mt: '2px', flexShrink: 0 }} />
                        <Typography sx={{ fontSize: '0.98rem', fontWeight: 500 }}>{bullet}</Typography>
                      </Stack>
                    ))}
                  </Stack>

                  {/* Credenciales del demo */}
                  {active.demo.user && (
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        textAlign: 'left',
                        bgcolor: alpha(site.colors.surface, 0.65),
                        border: `1px dashed ${alpha(accent, 0.35)}`,
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <LockOpenRoundedIcon sx={{ fontSize: 17, color: accent }} />
                        <Typography
                          sx={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            letterSpacing: '0.09em',
                            textTransform: 'uppercase',
                            color: accent,
                          }}
                        >
                          Datos de prueba
                        </Typography>
                      </Stack>
                      <Typography
                        sx={{
                          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                          fontSize: '0.85rem',
                          color: 'text.secondary',
                          wordBreak: 'break-all',
                        }}
                      >
                        {active.demo.user}
                        {active.demo.pass ? ` · ${active.demo.pass}` : ''}
                      </Typography>
                    </Box>
                  )}

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1.5}
                    sx={{ pt: 0.5, width: '100%' }}
                  >
                    {active.demo.url && (
                      <Tooltip title="Se abre en una pestaña nueva" arrow>
                        <Button
                          fullWidth
                          size="large"
                          endIcon={<OpenInNewRoundedIcon />}
                          onClick={() => openExternal(active.demo.url)}
                          sx={{
                            bgcolor: accent,
                            color: '#04131F',
                            fontWeight: 800,
                            boxShadow: `0 14px 36px -14px ${alpha(accent, 0.9)}`,
                            '&:hover': { bgcolor: accent, filter: 'brightness(1.06)' },
                          }}
                        >
                          {active.demo.label}
                        </Button>
                      </Tooltip>
                    )}

                    <Button
                      fullWidth
                      size="large"
                      startIcon={<WhatsAppIcon />}
                      onClick={() => openWhatsApp(whatsappVerticalMessage(active.label))}
                      sx={{
                        color: 'text.primary',
                        border: `1px solid ${alpha('#FFFFFF', 0.18)}`,
                        fontWeight: 700,
                        '&:hover': { bgcolor: alpha('#FFFFFF', 0.06), borderColor: alpha('#FFFFFF', 0.32) },
                      }}
                    >
                      Hablar con un asesor
                    </Button>
                  </Stack>

                  {site.freeTrial.enabled && (
                    <Typography
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 700,
                        fontSize: '0.9rem',
                      }}
                    >
                      {site.freeTrial.badge} · sin tarjeta de crédito
                    </Typography>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </AnimatePresence>
      </Container>
    </Box>
  );
}

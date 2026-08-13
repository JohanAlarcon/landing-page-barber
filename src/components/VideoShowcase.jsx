import { useState } from 'react';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import site from '../config/site';
import { useVertical } from '../context/VerticalContext';
import { openWhatsApp } from '../helpers';
import { occlusion } from '../styles/surfaces';
import SectionHeading from './common/SectionHeading';
import GlowBackground from './common/GlowBackground';
import VideoEmbed from './VideoEmbed';
import Icon from './common/Icon';

/** Selector Barberías / Salones de uñas. */
function VerticalSwitch({ verticals, activeId, onChange }) {
  return (
    <Stack
      direction="row"
      spacing={0.75}
      sx={{
        p: 0.75,
        mx: 'auto',
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

/** Pestañas de rol: Tus clientes / Para ti / Tu equipo. */
function RoleTabs({ roles, activeId, onChange, accent }) {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 0.75, sm: 1 }}
      sx={{
        justifyContent: { xs: 'flex-start', sm: 'center' },
        overflowX: 'auto',
        px: { xs: 0.5, sm: 0 },
        pb: 0.5,
        // Oculta la barra de scroll sin quitar el gesto en móvil
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {roles.map((role) => {
        const isActive = role.id === activeId;
        return (
          <Box
            key={role.id}
            component="button"
            type="button"
            onClick={() => onChange(role.id)}
            aria-pressed={isActive}
            sx={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: { xs: 1.8, sm: 2.4 },
              py: { xs: 1, sm: 1.2 },
              borderRadius: 3,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontWeight: 700,
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
              color: isActive ? accent : 'text.secondary',
              bgcolor: isActive ? alpha(accent, 0.12) : alpha('#FFFFFF', 0.04),
              border: `1px solid ${isActive ? alpha(accent, 0.5) : alpha('#FFFFFF', 0.08)}`,
              transition: 'all .3s ease',
              '&:hover': { color: isActive ? accent : 'text.primary', borderColor: alpha(accent, 0.4) },
            }}
          >
            <Icon name={role.icon} sx={{ fontSize: 19 }} />
            {role.label}
          </Box>
        );
      })}
    </Stack>
  );
}

/**
 * Sección estrella: la app en video.
 * Selector de tipo de negocio (barbería / uñas) + pestañas por rol
 * (clientes / administrador / equipo), cada una con su video vertical.
 * El demo navegable no es público: se pide por WhatsApp.
 */
export default function VideoShowcase() {
  const theme = useTheme();
  const { verticals, active, activeId, setVertical, hasMultiple } = useVertical();
  const [roleId, setRoleId] = useState('client');

  if (!active) return null;

  const accent = active.color;
  const role = site.roles.find((r) => r.id === roleId) || site.roles[0];
  const video = active.videos[role.id];

  return (
    <Box
      component="section"
      id="demos"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 7, md: 12 },
        bgcolor: site.colors.background,
      }}
    >
      <GlowBackground colors={[accent, active.color2]} intensity={0.16} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionHeading
          eyebrow={site.demos.eyebrow}
          title={site.demos.title}
          subtitle={site.demos.subtitle}
          accent={accent}
          sx={{ mb: { xs: 3, md: 4.5 } }}
        />

        <Stack spacing={{ xs: 2.5, md: 3.5 }} sx={{ mb: { xs: 4, md: 5 } }}>
          {hasMultiple && (
            <VerticalSwitch verticals={verticals} activeId={activeId} onChange={setVertical} />
          )}
          <RoleTabs roles={site.roles} activeId={roleId} onChange={setRoleId} accent={accent} />
        </Stack>

        <AnimatePresence mode="wait">
          <Box
            key={`${activeId}-${roleId}`}
            component={motion.div}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center" justifyContent="center">
              {/* Video del rol activo */}
              <Grid size={{ xs: 12, md: 5 }}>
                <VideoEmbed
                  video={{ ...video, title: `${role.label} · ${active.label}` }}
                  accent={accent}
                  placeholderText="Estamos grabando este video. Pídenos el demo por WhatsApp y te lo mostramos en vivo."
                />
              </Grid>

              {/* Qué hace este rol */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack
                  spacing={2.5}
                  sx={{ textAlign: { xs: 'center', md: 'left' }, alignItems: { xs: 'center', md: 'flex-start' } }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: accent,
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        mb: 1,
                      }}
                    >
                      {active.emoji} {active.label} · {role.label}
                    </Typography>
                    <Typography variant="h3" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, mb: 1.2 }}>
                      {role.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: { xs: '1rem', md: '1.05rem' }, maxWidth: 520 }}>
                      {role.text}
                    </Typography>
                  </Box>

                  <Stack spacing={1.4}>
                    {role.bullets.map((bullet) => (
                      <Stack
                        key={bullet}
                        direction="row"
                        spacing={1.3}
                        alignItems="flex-start"
                        sx={{ textAlign: 'left', maxWidth: 480 }}
                      >
                        <CheckCircleRoundedIcon sx={{ color: accent, fontSize: 21, mt: '2px', flexShrink: 0 }} />
                        <Typography sx={{ fontSize: '0.98rem', fontWeight: 500 }}>{bullet}</Typography>
                      </Stack>
                    ))}
                  </Stack>

                  {/* El demo se pide por WhatsApp (acceso controlado) */}
                  <Box
                    sx={{
                      mt: 1,
                      p: { xs: 2.2, md: 2.6 },
                      borderRadius: 3,
                      width: '100%',
                      maxWidth: 520,
                      bgcolor: alpha(site.colors.surface, 0.65),
                      border: `1px dashed ${alpha(accent, 0.4)}`,
                      textAlign: { xs: 'center', md: 'left' },
                    }}
                  >
                    <Typography sx={{ fontSize: '0.92rem', color: 'text.secondary', mb: 1.5 }}>
                      {site.demos.ctaNote}
                    </Typography>
                    <Button
                      fullWidth
                      size="large"
                      startIcon={<WhatsAppIcon />}
                      onClick={() => openWhatsApp(site.contact.whatsappDemoMessage)}
                      sx={{
                        bgcolor: accent,
                        color: '#04131F',
                        fontWeight: 800,
                        boxShadow: occlusion,
                        '&:hover': { bgcolor: accent, filter: 'brightness(1.06)' },
                      }}
                    >
                      {site.demos.ctaLabel}
                    </Button>
                    {site.freeTrial.enabled && (
                      <Typography
                        sx={{
                          mt: 1.2,
                          color: theme.palette.primary.main,
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          textAlign: 'center',
                        }}
                      >
                        {site.freeTrial.badge} · sin tarjeta de crédito
                      </Typography>
                    )}
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </AnimatePresence>
      </Container>
    </Box>
  );
}

import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import site from '../config/site';
import { openWhatsApp } from '../helpers';

/**
 * Bloque dedicado a la promoción del primer mes gratis.
 * Se oculta por completo si REACT_APP_FREE_TRIAL_ENABLED=false.
 */
export default function FreeTrialBanner() {
  const theme = useTheme();
  const green = theme.palette.primary.main;
  const { freeTrial, cta } = site;

  if (!freeTrial.enabled) return null;

  return (
    <Box component="section" id="free-trial" sx={{ py: { xs: 6, md: 9 }, bgcolor: site.colors.background }}>
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: { xs: 4, md: 6 },
            px: { xs: 3, md: 7 },
            py: { xs: 5, md: 7 },
            border: `1px solid ${alpha(green, 0.35)}`,
            background: `
              radial-gradient(circle at 15% 15%, ${alpha(green, 0.2)}, transparent 55%),
              radial-gradient(circle at 85% 85%, ${alpha(green, 0.12)}, transparent 55%),
              ${alpha(site.colors.surface, 0.6)}
            `,
          }}
        >
          {/* Destello que recorre el bloque */}
          <Box
            aria-hidden
            component={motion.div}
            animate={{ x: ['-30%', '130%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '22%',
              background: `linear-gradient(90deg, transparent, ${alpha('#FFFFFF', 0.06)}, transparent)`,
              pointerEvents: 'none',
            }}
          />

          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 4, md: 6 }}
            alignItems="center"
            justifyContent="space-between"
            sx={{ position: 'relative', zIndex: 1 }}
          >
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, flex: 1 }}>
              {freeTrial.badge && (
                <Box
                  sx={{
                    display: 'inline-block',
                    px: 2,
                    py: 0.7,
                    mb: 2,
                    borderRadius: 999,
                    bgcolor: green,
                    color: '#04241A',
                    fontWeight: 900,
                    fontSize: '0.78rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {freeTrial.badge}
                </Box>
              )}

              <Typography
                variant="h2"
                sx={{ fontSize: { xs: '1.9rem', sm: '2.3rem', md: '2.7rem' }, mb: 1.5 }}
              >
                {freeTrial.title}
              </Typography>

              {freeTrial.subtitle && (
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    maxWidth: 620,
                    mx: { xs: 'auto', md: 0 },
                  }}
                >
                  {freeTrial.subtitle}
                </Typography>
              )}

              {freeTrial.bullets.length > 0 && (
                <Stack
                  direction="row"
                  spacing={{ xs: 1.5, md: 3 }}
                  flexWrap="wrap"
                  useFlexGap
                  justifyContent={{ xs: 'center', md: 'flex-start' }}
                  sx={{ mt: 3 }}
                >
                  {freeTrial.bullets.map((bullet) => (
                    <Stack key={bullet} direction="row" spacing={0.9} alignItems="center">
                      <CheckCircleRoundedIcon sx={{ color: green, fontSize: 19 }} />
                      <Typography sx={{ fontSize: '0.93rem', fontWeight: 600 }}>{bullet}</Typography>
                    </Stack>
                  ))}
                </Stack>
              )}
            </Box>

            <Stack spacing={1.5} alignItems="center" sx={{ width: { xs: '100%', md: 'auto' }, flexShrink: 0 }}>
              {/* Contador visual de días gratis */}
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: { xs: 128, md: 148 },
                  height: { xs: 128, md: 148 },
                  borderRadius: '50%',
                  bgcolor: alpha(green, 0.12),
                  border: `2px dashed ${alpha(green, 0.5)}`,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: theme.typography.h1.fontFamily,
                    fontWeight: 900,
                    fontSize: { xs: '2.7rem', md: '3.2rem' },
                    color: green,
                    lineHeight: 1,
                  }}
                >
                  {freeTrial.days}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'text.secondary',
                  }}
                >
                  días gratis
                </Typography>
              </Stack>

              <Button
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                startIcon={<WhatsAppIcon />}
                onClick={() => openWhatsApp()}
                sx={{ fontWeight: 800 }}
              >
                {cta.finalButton}
              </Button>

              {freeTrial.note && (
                <Typography
                  sx={{ fontSize: '0.78rem', color: 'text.secondary', textAlign: 'center', maxWidth: 230 }}
                >
                  {freeTrial.note}
                </Typography>
              )}
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

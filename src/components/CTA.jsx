import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import site from '../config/site';
import { openWhatsApp, scrollToId } from '../helpers';
import { useVertical } from '../context/VerticalContext';

export default function CTA() {
  const theme = useTheme();
  const green = theme.palette.primary.main;
  const { accent } = useVertical();
  const { cta, contact, freeTrial } = site;

  return (
    <Box
      component="section"
      id="cta"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 9, md: 14 },
        textAlign: 'center',
        background: `
          radial-gradient(ellipse 90% 70% at 22% -10%, ${alpha(green, 0.15)}, transparent 62%),
          radial-gradient(ellipse 60% 50% at 38% 112%, ${alpha(accent, 0.08)}, transparent 62%),
          ${site.colors.background}
        `,
        borderTop: `1px solid ${alpha('#FFFFFF', 0.06)}`,
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          spacing={3}
          alignItems="center"
        >
          {/* Kicker colgado de un filete, no una cápsula: la única insignia
              rellena de la página es la del hero. */}
          {freeTrial.enabled && freeTrial.badge && (
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.2 }}>
              <Box sx={{ width: 26, height: 1, bgcolor: green }} />
              <Box
                component="span"
                sx={{
                  color: green,
                  fontWeight: 600,
                  fontSize: '0.72rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                }}
              >
                {freeTrial.badge}
              </Box>
              <Box sx={{ width: 26, height: 1, bgcolor: green }} />
            </Box>
          )}

          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2.1rem', sm: '2.7rem', md: '3.4rem' }, maxWidth: 760 }}
          >
            {cta.finalTitle}
          </Typography>

          {cta.finalSubtitle && (
            <Typography
              sx={{ color: 'text.secondary', fontSize: { xs: '1.02rem', md: '1.15rem' }, maxWidth: 620 }}
            >
              {cta.finalSubtitle}
            </Typography>
          )}

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ pt: 1, width: { xs: '100%', sm: 'auto' } }}
          >
            <Button
              size="large"
              variant="contained"
              color="primary"
              startIcon={<WhatsAppIcon />}
              onClick={() => openWhatsApp()}
              sx={{ fontWeight: 800, fontSize: { xs: '1rem', md: '1.1rem' }, px: { md: 5 } }}
            >
              {cta.finalButton}
            </Button>

            <Button
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={() => scrollToId('#pricing')}
              sx={{
                color: 'text.primary',
                fontWeight: 700,
                border: `1px solid ${alpha('#FFFFFF', 0.18)}`,
                '&:hover': { bgcolor: alpha('#FFFFFF', 0.06), borderColor: alpha('#FFFFFF', 0.32) },
              }}
            >
              Ver planes y precios
            </Button>
          </Stack>

          {contact.whatsappDisplay && (
            <Typography sx={{ color: 'text.secondary', fontSize: '0.95rem' }}>
              {contact.whatsappDisplay} · respuesta el mismo día
            </Typography>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

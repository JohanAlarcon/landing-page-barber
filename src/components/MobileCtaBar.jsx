import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import site from '../config/site';
import { openWhatsApp } from '../helpers';

/**
 * Barra de acción fija en la parte inferior, SOLO para celulares.
 * Aparece cuando el visitante ya pasó el hero, para que el botón de
 * WhatsApp esté siempre a un toque de distancia.
 * En pantallas sm+ no se muestra (ahí está el botón flotante).
 */
export default function MobileCtaBar() {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => setVisible(latest > 480));

  if (!site.contact.whatsappNumber) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: theme.zIndex.appBar,
        display: { xs: 'block', sm: 'none' },
        transform: visible ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform .35s ease',
        px: 2,
        pt: 1.2,
        // Respeta la zona segura de los iPhone con notch
        pb: 'calc(10px + env(safe-area-inset-bottom))',
        bgcolor: alpha(site.colors.backgroundDeep, 0.92),
        backdropFilter: 'blur(14px)',
        borderTop: `1px solid ${alpha('#FFFFFF', 0.1)}`,
      }}
    >
      {site.freeTrial.enabled && (
        <Typography
          sx={{
            textAlign: 'center',
            color: 'primary.main',
            fontWeight: 800,
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            mb: 0.8,
          }}
        >
          {site.freeTrial.badge} · sin tarjeta
        </Typography>
      )}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        startIcon={<WhatsAppIcon />}
        onClick={() => openWhatsApp()}
        sx={{ fontWeight: 800, py: 1.4 }}
      >
        {site.cta.primaryLabel}
      </Button>
    </Box>
  );
}

import { useEffect, useState } from 'react';
import { Box, Fab, Tooltip, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import site, { whatsappLink } from '../config/site';

/**
 * Botón flotante de WhatsApp con anillo pulsante.
 * Tras unos segundos muestra una burbuja invitando a escribir.
 */
export default function WhatsAppButton() {
  const theme = useTheme();
  const green = theme.palette.primary.main;
  const { contact, freeTrial } = site;
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    if (!contact.whatsappFloatEnabled) return undefined;
    const show = setTimeout(() => setShowBubble(true), 6000);
    const hide = setTimeout(() => setShowBubble(false), 16000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [contact.whatsappFloatEnabled]);

  if (!contact.whatsappFloatEnabled || !contact.whatsappNumber) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: { xs: 16, md: 28 },
        right: { xs: 16, md: 28 },
        zIndex: theme.zIndex.tooltip,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      {/* Burbuja con la promoción */}
      <AnimatePresence>
        {showBubble && freeTrial.enabled && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            onClick={() => setShowBubble(false)}
            sx={{
              display: { xs: 'none', sm: 'block' },
              px: 2,
              py: 1.2,
              maxWidth: 210,
              borderRadius: 3,
              cursor: 'pointer',
              bgcolor: alpha(site.colors.surface, 0.96),
              border: `1px solid ${alpha(green, 0.35)}`,
              boxShadow: '0 20px 45px -20px #000',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.4 }}>
              👋 {freeTrial.badge}
            </Typography>
            <Typography sx={{ fontSize: '0.76rem', color: 'text.secondary', lineHeight: 1.4 }}>
              Escríbenos y te lo activamos hoy
            </Typography>
          </Box>
        )}
      </AnimatePresence>

      <Box sx={{ position: 'relative', display: 'grid', placeItems: 'center' }}>
        {/* Anillo pulsante */}
        <Box
          aria-hidden
          component={motion.span}
          animate={{ scale: [1, 1.6], opacity: [0.45, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          sx={{
            position: 'absolute',
            width: { xs: 56, md: 62 },
            height: { xs: 56, md: 62 },
            borderRadius: '50%',
            bgcolor: green,
            pointerEvents: 'none',
          }}
        />

        <Tooltip title={contact.whatsappTooltip} arrow placement="left">
          <Fab
            component="a"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={contact.whatsappTooltip}
            sx={{
              width: { xs: 56, md: 62 },
              height: { xs: 56, md: 62 },
              bgcolor: green,
              color: '#04241A',
              boxShadow: `0 14px 34px -12px ${alpha(green, 0.9)}`,
              '&:hover': { bgcolor: green, filter: 'brightness(1.08)' },
            }}
          >
            <WhatsAppIcon sx={{ fontSize: { xs: 30, md: 33 } }} />
          </Fab>
        </Tooltip>
      </Box>
    </Box>
  );
}

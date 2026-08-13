import { Box, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import site from '../config/site';

/**
 * Cinta superior con los mensajes de REACT_APP_PROMO_BAR_TEXT
 * desplazándose en bucle. Se duplica el contenido para que el
 * desplazamiento sea continuo sin cortes.
 */
export default function PromoBar() {
  const theme = useTheme();
  const { items, enabled } = site.promoBar;

  if (!enabled || items.length === 0) return null;

  // Cuatro copias: la animación desplaza la mitad de la pista, así que
  // siempre hay dos copias cubriendo el ancho, incluso en pantallas anchas.
  const track = [...items, ...items, ...items, ...items];

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: 0.85,
        background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
        color: '#04241A',
        // Difumina los bordes para que el texto "aparezca" y "desaparezca"
        maskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
        '@keyframes reservabot-marquee': {
          from: { transform: 'translate3d(0,0,0)' },
          to: { transform: 'translate3d(-50%,0,0)' },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: 'max-content',
          animation: 'reservabot-marquee 32s linear infinite',
          '&:hover': { animationPlayState: 'paused' },
        }}
      >
        {track.map((text, index) => (
          <Box
            key={`${text}-${index}`}
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 2.5, px: 2.5 }}
          >
            <Typography
              component="span"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '0.78rem', md: '0.85rem' },
                whiteSpace: 'nowrap',
                letterSpacing: '0.01em',
              }}
            >
              {text}
            </Typography>
            <Box
              aria-hidden
              sx={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                bgcolor: alpha('#04241A', 0.45),
                flexShrink: 0,
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

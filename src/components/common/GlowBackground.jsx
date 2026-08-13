import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Fondo decorativo: manchas de luz difusas + malla de puntos.
 * Es puramente visual, no captura clics.
 */
export default function GlowBackground({
  colors = [],
  intensity = 0.22,
  grid = true,
  sx,
}) {
  const [first, second] = colors;

  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        ...sx,
      }}
    >
      {grid && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(${alpha('#FFFFFF', 0.07)} 1px, transparent 1px)`,
            backgroundSize: '34px 34px',
            maskImage: 'radial-gradient(ellipse 90% 70% at 50% 25%, #000 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 25%, #000 40%, transparent 100%)',
          }}
        />
      )}

      {first && (
        <Box
          sx={{
            position: 'absolute',
            top: { xs: '-25%', md: '-30%' },
            left: { xs: '-30%', md: '-8%' },
            width: { xs: 380, md: 720 },
            height: { xs: 380, md: 720 },
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(first, intensity)} 0%, transparent 68%)`,
            filter: 'blur(20px)',
            transition: 'background 0.6s ease',
          }}
        />
      )}

      {second && (
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: '-25%', md: '-35%' },
            right: { xs: '-30%', md: '-10%' },
            width: { xs: 400, md: 780 },
            height: { xs: 400, md: 780 },
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(second, intensity * 0.85)} 0%, transparent 68%)`,
            filter: 'blur(20px)',
            transition: 'background 0.6s ease',
          }}
        />
      )}
    </Box>
  );
}

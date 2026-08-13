import { Box, Typography } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

/**
 * Encabezado reutilizable de sección: etiqueta pequeña + título + bajada.
 * `accent` permite teñirlo con el color de la vertical activa.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  accent,
  align = 'center',
  maxWidth = 720,
  sx,
}) {
  const theme = useTheme();
  const color = accent || theme.palette.primary.main;
  const isCentered = align === 'center';

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      sx={{
        textAlign: { xs: 'center', md: align },
        mx: isCentered ? 'auto' : 0,
        maxWidth: { xs: '100%', md: maxWidth },
        mb: { xs: 5, md: 7 },
        ...sx,
      }}
    >
      {eyebrow && (
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 1.75,
            py: 0.65,
            mb: 2.5,
            borderRadius: 999,
            bgcolor: alpha(color, 0.12),
            border: `1px solid ${alpha(color, 0.3)}`,
          }}
        >
          <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: color }} />
          <Typography
            variant="overline"
            sx={{
              color,
              fontWeight: 700,
              letterSpacing: '0.1em',
              lineHeight: 1.6,
              fontSize: { xs: '0.7rem', md: '0.75rem' },
            }}
          >
            {eyebrow}
          </Typography>
        </Box>
      )}

      {title && (
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '2rem', sm: '2.4rem', md: '2.9rem', lg: '3.15rem' },
            mb: subtitle ? 2 : 0,
          }}
        >
          {title}
        </Typography>
      )}

      {subtitle && (
        <Typography
          variant="subtitle1"
          sx={{
            color: 'text.secondary',
            maxWidth: 660,
            mx: isCentered ? 'auto' : 0,
            fontSize: { xs: '1rem', md: '1.125rem' },
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

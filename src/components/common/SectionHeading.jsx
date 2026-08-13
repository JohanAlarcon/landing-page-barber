import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

/**
 * Encabezado de sección.
 *
 * Antes era una receta cerrada —cápsula con puntito, título centrado, bajada
 * centrada— instanciada idéntica en las seis secciones: leído en conjunto,
 * eso es lo que delata una plantilla. Ahora el eyebrow es un kicker colgado
 * de un filete, la alineación varía entre secciones para romper el metrónomo
 * y el título admite un acento en cursiva.
 *
 * La jerarquía no cambia: el título sigue siendo un h2 y el orden de lectura
 * (etiqueta → título → bajada) es el mismo.
 *
 * Convenciones que se pueden usar desde el .env:
 *   - `*palabra*` dentro del título → esa palabra va en cursiva.
 *   - `\n` dentro del título → corte de línea decidido por sentido.
 */

/** Parte el título en tramos normales y tramos acentuados (*así*). */
const renderTitle = (title) =>
  String(title)
    // El .env guarda "\n" como texto; aquí pasa a ser un salto real
    .replace(/\\n/g, '\n')
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((chunk, index) => {
      if (chunk.startsWith('*') && chunk.endsWith('*') && chunk.length > 2) {
        return (
          <Box
            key={index}
            component="em"
            sx={{ fontStyle: 'italic', fontWeight: 600, letterSpacing: '-0.005em' }}
          >
            {chunk.slice(1, -1)}
          </Box>
        );
      }
      return <Box key={index} component="span">{chunk}</Box>;
    });

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
        mb: { xs: 4.5, md: 6.5 },
        ...sx,
      }}
    >
      {eyebrow && (
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.2,
            mb: 2,
          }}
        >
          {/* Filete en lugar de cápsula: la etiqueta cuelga de una línea */}
          <Box sx={{ width: 26, height: 1, bgcolor: color, flexShrink: 0 }} />
          <Typography
            component="span"
            sx={{
              // Inter, no Montserrat: el kicker no compite con el titular
              fontFamily: theme.typography.fontFamily,
              color,
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              lineHeight: 1.4,
              fontSize: { xs: '0.68rem', md: '0.72rem' },
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
            // Permite decidir el corte de línea desde el .env
            whiteSpace: 'pre-line',
            mb: subtitle ? 2 : 0,
          }}
        >
          {renderTitle(title)}
        </Typography>
      )}

      {subtitle && (
        <Typography
          variant="subtitle1"
          sx={{
            color: 'text.secondary',
            maxWidth: 620,
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

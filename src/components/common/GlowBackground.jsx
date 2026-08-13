import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Luz de ambiente de una sección.
 *
 * Toda la página se ilumina desde UN solo punto fuera de eje (arriba a la
 * izquierda). Antes había dos manchas circulares espejadas más una malla de
 * puntos: leído en conjunto, eso es un fondo de plantilla, no una luz.
 * Aquí hay una sola elipse muy difusa, del mismo lado en todas las secciones,
 * para que la página tenga una dirección de luz coherente de arriba abajo.
 *
 * Es puramente visual, no captura clics.
 */
export default function GlowBackground({
  colors = [],
  intensity = 0.22,
  // Punto de entrada de la luz. En móvil se centra un poco para que no
  // deje el titular en penumbra al ir todo a una sola columna.
  origin = { xs: '50% -14%', md: '22% -12%' },
  sx,
}) {
  const [key, fill] = colors;
  const light = key || fill;

  if (!light) return null;

  const ellipse = (position, color, strength) =>
    `radial-gradient(ellipse 130% 90% at ${position}, ${alpha(color, strength)} 0%, transparent 62%)`;

  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        // El desenfoque alto evita que se vea el canto del degradado
        filter: 'blur(70px)',
        backgroundImage: {
          xs: ellipse(origin.xs, light, intensity),
          md: ellipse(origin.md, light, intensity),
        },
        transition: 'background-image .6s ease',
        ...sx,
      }}
    >
      {/* Lavado secundario mucho más tenue, SIEMPRE sobre el mismo eje de la
          luz principal: nunca en la esquina opuesta, que es lo que delataba
          el fondo generado. */}
      {fill && fill !== light && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: {
              xs: ellipse('62% 108%', fill, intensity * 0.3),
              md: ellipse('38% 112%', fill, intensity * 0.3),
            },
          }}
        />
      )}
    </Box>
  );
}

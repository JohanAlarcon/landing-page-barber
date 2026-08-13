import { alpha } from '@mui/material/styles';

/**
 * Piel de las superficies de la página.
 *
 * Antes todas las tarjetas eran `rgba(255,255,255,.035)` con el mismo borde
 * de 1px por los cuatro lados: un rectángulo translúcido genérico, idéntico
 * en Features, Testimonios, Precio y FAQ.
 *
 * Como la página tiene una sola luz que entra por arriba, la tarjeta ahora
 * la refleja: labio superior iluminado, laterales apenas insinuados y base
 * en sombra. Misma paleta, pero se lee como materia y no como un div.
 */
export const litSurface = () => ({
  background: `linear-gradient(180deg, ${alpha('#FFFFFF', 0.055)}, ${alpha('#FFFFFF', 0.018)})`,
  borderTop: `1px solid ${alpha('#FFFFFF', 0.1)}`,
  borderLeft: `1px solid ${alpha('#FFFFFF', 0.045)}`,
  borderRight: `1px solid ${alpha('#FFFFFF', 0.045)}`,
  borderBottom: `1px solid ${alpha('#000000', 0.35)}`,
  boxShadow: `inset 0 1px 0 ${alpha('#FFFFFF', 0.06)}, 0 18px 34px -24px #000`,
});

/**
 * Costura entre secciones.
 *
 * Los rellenos planos alternos (background / backgroundDeep) creaban un corte
 * a filo entre bandas. Con el grano encima, una transición larga hace que la
 * página se lea como una sola superficie continua.
 */
export const seam = (edge, center, size = 90) =>
  `linear-gradient(180deg, ${edge} 0%, ${center} ${size}px, ${center} calc(100% - ${size}px), ${edge} 100%)`;

/** Sombra de oclusión neutra: ninguna sombra lleva color de marca. */
export const occlusion = '0 24px 50px -28px #000';

import site, { whatsappLink } from './config/site';

/** Abre una URL en una pestaña nueva de forma segura. */
export const openExternal = (url) => {
  if (!url) return;
  window.open(url, '_blank', 'noopener,noreferrer');
};

/** Abre WhatsApp con un mensaje (usa el del .env si no se pasa ninguno). */
export const openWhatsApp = (message) => openExternal(whatsappLink(message));

/** Mensaje prearmado para un plan concreto. */
export const whatsappPlanMessage = (planName) =>
  `¡Hola! Quiero el plan *${planName}* de ${site.brand.name} y activar mi primer mes gratis 🚀`;

/** Mensaje prearmado para una vertical (barbería / uñas). */
export const whatsappVerticalMessage = (verticalLabel) =>
  `¡Hola! Tengo un negocio de ${verticalLabel} y quiero mi DEMO GRATIS de ${site.brand.name}.`;

/** Desplazamiento suave hacia un ancla (#id). */
export const scrollToId = (hash) => {
  if (!hash || !hash.startsWith('#') || hash === '#') return;
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/**
 * Convierte cualquier URL de video en una URL embebible.
 * Soporta YouTube (watch, youtu.be, shorts), Vimeo y cualquier iframe directo.
 */
export const toEmbedUrl = (url, type = 'iframe') => {
  if (!url) return '';
  const value = url.trim();

  if (type === 'mp4') return value;

  const youtube = value.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/i
  );
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}?rel=0&modestbranding=1`;

  const vimeo = value.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  return value;
};

/** Iniciales de un nombre, para los avatares de testimonios. */
export const initialsOf = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

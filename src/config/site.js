/**
 * ReservaBot · Configuración central de la landing.
 *
 * Este archivo es el ÚNICO lugar que lee variables de entorno.
 * Todo el resto de la app consume el objeto `site` que se exporta abajo,
 * así que para cambiar textos, precios, colores, videos o enlaces
 * basta con editar el archivo `.env` de la raíz del proyecto.
 *
 * Recuerda: en React (CRA) las variables deben llamarse REACT_APP_*
 * y se leen en tiempo de compilación (hay que reiniciar `npm start`).
 */

/* eslint-disable no-template-curly-in-string */

/*
 * IMPORTANTE: hay que escribir `process.env` tal cual.
 * Webpack sustituye esa expresión literal por un objeto con las variables
 * al compilar. En el navegador NO existe una variable global `process`,
 * así que cualquier comprobación tipo `typeof process` daría "undefined"
 * y nos quedaríamos sin configuración.
 */
const ENV = process.env || {};

/*
 * Las variables se inyectan al COMPILAR, no al recargar el navegador.
 * Si el servidor arrancó antes de que existiera el .env, la página se
 * dibuja con los valores por defecto y parece que faltara contenido
 * (por ejemplo el video demo o los nombres de los rubros).
 * Este aviso lo deja claro en la consola en vez de fallar en silencio.
 */
if (ENV.NODE_ENV !== 'production' && !Object.keys(ENV).some((key) => key.startsWith('REACT_APP_'))) {
  // eslint-disable-next-line no-console
  console.warn(
    '[ReservaBot] No se cargó ninguna variable del archivo .env, así que se están ' +
    'usando los valores por defecto.\nDetén el servidor (Ctrl+C) y vuelve a ejecutar ' +
    '"npm start": las variables se leen solo al arrancar.'
  );
}

/* ------------------------------------------------------------------ */
/*  Lectores primitivos                                               */
/* ------------------------------------------------------------------ */

/** Texto plano. Devuelve `fallback` si la variable está vacía o ausente. */
const str = (key, fallback = '') => {
  const raw = ENV[key];
  if (raw === undefined || raw === null) return fallback;
  const value = String(raw).trim();
  return value === '' ? fallback : value;
};

/** Número. Acepta "80000", "80.000" y "80,000". */
const num = (key, fallback = 0) => {
  const raw = str(key, '');
  if (!raw) return fallback;
  const parsed = Number(raw.replace(/[^\d.,-]/g, '').replace(/[.,](?=\d{3}\b)/g, ''));
  return Number.isFinite(parsed) ? parsed : fallback;
};

const TRUTHY = ['1', 'true', 'yes', 'y', 'si', 'sí', 'on'];
const FALSY = ['0', 'false', 'no', 'n', 'off'];

/** Booleano tolerante: true/false, si/no, 1/0. */
const bool = (key, fallback = false) => {
  const raw = str(key, '').toLowerCase();
  if (!raw) return fallback;
  if (TRUTHY.includes(raw)) return true;
  if (FALSY.includes(raw)) return false;
  return fallback;
};

/** Lista separada por "|". */
const list = (key, fallback = []) => {
  const raw = str(key, '');
  if (!raw) return fallback;
  const items = raw.split('|').map((item) => item.trim()).filter(Boolean);
  return items.length ? items : fallback;
};

/**
 * Lista de pares "Etiqueta::valor" separados por "|".
 * Ej: "Inicio::#hero|Precios::#pricing"
 */
const pairs = (key, fallback = []) => {
  const items = list(key, null);
  if (!items) return fallback;
  return items.map((item) => {
    const [label, ...rest] = item.split('::');
    return { label: (label || '').trim(), value: rest.join('::').trim() };
  }).filter((pair) => pair.label);
};

/** JSON opcional. Si está mal formado se ignora y se avisa por consola. */
const json = (key, fallback = null) => {
  const raw = str(key, '');
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`[ReservaBot] La variable ${key} no contiene un JSON válido. Se ignora.`, error);
    return fallback;
  }
};

/**
 * Resuelve la ruta de un recurso.
 * - "https://..."  -> se deja tal cual
 * - "data:..."     -> se deja tal cual
 * - "/images/x.svg"-> se le antepone PUBLIC_URL
 */
export const asset = (path) => {
  if (!path) return '';
  const value = String(path).trim();
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:')) return value;
  const base = (ENV.PUBLIC_URL || '').replace(/\/$/, '');
  return `${base}${value.startsWith('/') ? '' : '/'}${value}`;
};

/**
 * Recorre slots numerados (PREFIJO_1_*, PREFIJO_2_*, ...) y devuelve
 * solo los que el builder considera válidos.
 */
const collect = (count, builder) => {
  const out = [];
  for (let i = 1; i <= count; i += 1) {
    const item = builder(i);
    if (item) out.push(item);
  }
  return out;
};

/* ------------------------------------------------------------------ */
/*  Formato de precios                                                */
/* ------------------------------------------------------------------ */

const CURRENCY_SYMBOL = str('REACT_APP_CURRENCY_SYMBOL', '$');
const THOUSANDS = str('REACT_APP_CURRENCY_THOUSANDS', '.');

/** 80000 -> "$80.000" */
export const formatPrice = (value) => {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) return '';
  const grouped = Math.round(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS);
  return `${CURRENCY_SYMBOL}${grouped}`;
};

/* ------------------------------------------------------------------ */
/*  Marca, colores y contacto                                         */
/* ------------------------------------------------------------------ */

const brand = {
  name: str('REACT_APP_BRAND_NAME', 'ReservaBot'),
  prefix: str('REACT_APP_BRAND_NAME_PREFIX', 'Reserva'),
  suffix: str('REACT_APP_BRAND_NAME_SUFFIX', 'Bot'),
  tagline: str('REACT_APP_BRAND_TAGLINE', 'Citas por WhatsApp 24/7'),
  slogan: str('REACT_APP_BRAND_SLOGAN', 'Tu recepcionista que nunca duerme'),
  description: str('REACT_APP_BRAND_DESCRIPTION', ''),
  logo: asset(str('REACT_APP_LOGO_URL', '/images/brand/logo-reservabot.svg')),
  logoIcon: asset(str('REACT_APP_LOGO_ICON_URL', '/images/brand/isotipo-reservabot.svg')),
  logoHeightDesktop: num('REACT_APP_LOGO_HEIGHT_DESKTOP', 44),
  logoHeightMobile: num('REACT_APP_LOGO_HEIGHT_MOBILE', 34),
  showLogoImage: bool('REACT_APP_SHOW_LOGO_IMAGE', true),
  siteUrl: str('REACT_APP_SITE_URL', ''),
  companyName: str('REACT_APP_COMPANY_NAME', 'ReservaBot'),
  legalName: str('REACT_APP_COMPANY_LEGAL_NAME', 'ReservaBot'),
};

const colors = {
  primary: str('REACT_APP_COLOR_PRIMARY', '#22DE7A'),
  primaryDark: str('REACT_APP_COLOR_PRIMARY_DARK', '#12B45F'),
  secondary: str('REACT_APP_COLOR_SECONDARY', '#38BDF8'),
  accent: str('REACT_APP_COLOR_ACCENT', '#FF5FA2'),
  background: str('REACT_APP_COLOR_BG', '#08131F'),
  backgroundDeep: str('REACT_APP_COLOR_BG_DEEP', '#050D16'),
  surface: str('REACT_APP_COLOR_SURFACE', '#0F2233'),
  text: str('REACT_APP_COLOR_TEXT', '#F2F7FA'),
  textMuted: str('REACT_APP_COLOR_TEXT_MUTED', '#93AABD'),
};

const fonts = {
  heading: str('REACT_APP_FONT_HEADING', 'Montserrat'),
  body: str('REACT_APP_FONT_BODY', 'Inter'),
};

const radius = num('REACT_APP_RADIUS', 20);

const whatsappNumber = str('REACT_APP_WHATSAPP_NUMBER', '').replace(/\D/g, '');

const contact = {
  whatsappNumber,
  whatsappDisplay: str('REACT_APP_WHATSAPP_DISPLAY', ''),
  whatsappMessage: str('REACT_APP_WHATSAPP_MESSAGE', '¡Hola! Quiero más información.'),
  whatsappTooltip: str('REACT_APP_WHATSAPP_TOOLTIP', 'Escríbenos por WhatsApp'),
  whatsappFloatEnabled: bool('REACT_APP_WHATSAPP_FLOAT_ENABLED', true),
  email: str('REACT_APP_EMAIL', ''),
  location: str('REACT_APP_LOCATION', ''),
  social: [
    { key: 'facebook', url: str('REACT_APP_FACEBOOK_URL', '') },
    { key: 'instagram', url: str('REACT_APP_INSTAGRAM_URL', '') },
    { key: 'tiktok', url: str('REACT_APP_TIKTOK_URL', '') },
  ].filter((item) => item.url),
};

/** Construye el enlace de WhatsApp con un mensaje opcional. */
export const whatsappLink = (message) => {
  const text = encodeURIComponent(message || contact.whatsappMessage);
  if (!contact.whatsappNumber) return `https://wa.me/?text=${text}`;
  return `https://wa.me/${contact.whatsappNumber}?text=${text}`;
};

/* ------------------------------------------------------------------ */
/*  Oferta: primer mes gratis                                         */
/* ------------------------------------------------------------------ */

const freeTrial = {
  enabled: bool('REACT_APP_FREE_TRIAL_ENABLED', true),
  days: num('REACT_APP_FREE_TRIAL_DAYS', 30),
  badge: str('REACT_APP_FREE_TRIAL_BADGE', 'Primer mes GRATIS'),
  title: str('REACT_APP_FREE_TRIAL_TITLE', ''),
  subtitle: str('REACT_APP_FREE_TRIAL_SUBTITLE', ''),
  bullets: list('REACT_APP_FREE_TRIAL_BULLETS', []),
  note: str('REACT_APP_FREE_TRIAL_NOTE', ''),
};

const promoBar = {
  enabled: bool('REACT_APP_PROMO_BAR_ENABLED', true),
  items: list('REACT_APP_PROMO_BAR_TEXT', []),
};

/* ------------------------------------------------------------------ */
/*  CTAs y Hero                                                       */
/* ------------------------------------------------------------------ */

const cta = {
  primaryLabel: str('REACT_APP_CTA_PRIMARY_LABEL', 'Pide tu DEMO GRATIS'),
  secondaryLabel: str('REACT_APP_CTA_SECONDARY_LABEL', 'Ver demo en vivo'),
  navLabel: str('REACT_APP_CTA_NAV_LABEL', 'Prueba 1 mes gratis'),
  finalTitle: str('REACT_APP_CTA_FINAL_TITLE', ''),
  finalSubtitle: str('REACT_APP_CTA_FINAL_SUBTITLE', ''),
  finalButton: str('REACT_APP_CTA_FINAL_BUTTON', 'Quiero mi mes gratis'),
};

const floatingCard = (key) => {
  const raw = str(key, '');
  if (!raw) return null;
  const [title, ...rest] = raw.split('::');
  return { title: (title || '').trim(), text: rest.join('::').trim() };
};

/** Mensajes de la conversación animada del hero: "in|out::texto". */
const chatMessages = collect(8, (i) => {
  const raw = str(`REACT_APP_HERO_CHAT_${i}`, '');
  if (!raw) return null;
  const [side, ...rest] = raw.split('::');
  const text = rest.join('::').trim();
  if (!text) return null;
  return {
    from: side.trim().toLowerCase() === 'out' ? 'bot' : 'client',
    // Permite escribir \n en el .env para forzar un salto de línea
    text: text.replace(/\\n/g, '\n'),
  };
});

const hero = {
  eyebrow: str('REACT_APP_HERO_EYEBROW', ''),
  title: str('REACT_APP_HERO_TITLE', ''),
  titleHighlight: str('REACT_APP_HERO_TITLE_HIGHLIGHT', ''),
  subtitle: str('REACT_APP_HERO_SUBTITLE', ''),
  bullets: list('REACT_APP_HERO_BULLETS', []),
  visual: str('REACT_APP_HERO_VISUAL', 'chat').toLowerCase(),
  image: asset(str('REACT_APP_HERO_IMAGE', '')),
  imageAlt: str('REACT_APP_HERO_IMAGE_ALT', 'ReservaBot'),
  floats: [floatingCard('REACT_APP_HERO_FLOAT_1'), floatingCard('REACT_APP_HERO_FLOAT_2')].filter(Boolean),
  chat: {
    header: str('REACT_APP_HERO_CHAT_HEADER', brand.name),
    status: str('REACT_APP_HERO_CHAT_STATUS', 'en línea'),
    messages: chatMessages,
  },
};

const stats = collect(4, (i) => {
  const value = str(`REACT_APP_STAT_${i}_VALUE`, '');
  if (!value) return null;
  return { value, label: str(`REACT_APP_STAT_${i}_LABEL`, '') };
});

const rating = {
  value: str('REACT_APP_RATING_VALUE', ''),
  count: str('REACT_APP_RATING_COUNT', ''),
  label: str('REACT_APP_RATING_LABEL', ''),
};

/* ------------------------------------------------------------------ */
/*  Verticales (barberías / uñas) con su demo y su video               */
/* ------------------------------------------------------------------ */

/**
 * Interpreta la proporción del video ("16/9", "1080/1692", "1.78").
 * Devuelve el valor listo para CSS y si el video es vertical.
 */
const parseAspect = (raw, fallback = '16 / 9') => {
  const value = (raw || '').trim();
  if (!value) return { css: fallback, ratio: 16 / 9, isPortrait: false };

  const parts = value.split('/');
  const width = Number(parts[0]);
  const height = parts.length > 1 ? Number(parts[1]) : 1;

  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return { css: fallback, ratio: 16 / 9, isPortrait: false };
  }

  const ratio = width / height;
  return { css: `${width} / ${height}`, ratio, isPortrait: ratio < 1 };
};

const buildVertical = (id, envKey, fallbackColor) => {
  if (!bool(`REACT_APP_VERTICAL_${envKey}_ENABLED`, true)) return null;

  const gallery = list(`REACT_APP_VERTICAL_${envKey}_GALLERY`, []);
  const captions = list(`REACT_APP_VERTICAL_${envKey}_GALLERY_CAPTIONS`, []);
  const aspect = parseAspect(str(`REACT_APP_VERTICAL_${envKey}_VIDEO_ASPECT`, ''));

  return {
    id,
    label: str(`REACT_APP_VERTICAL_${envKey}_LABEL`, id),
    emoji: str(`REACT_APP_VERTICAL_${envKey}_EMOJI`, ''),
    headline: str(`REACT_APP_VERTICAL_${envKey}_HEADLINE`, ''),
    tagline: str(`REACT_APP_VERTICAL_${envKey}_TAGLINE`, ''),
    color: str(`REACT_APP_VERTICAL_${envKey}_COLOR`, fallbackColor),
    color2: str(`REACT_APP_VERTICAL_${envKey}_COLOR_2`, fallbackColor),
    bullets: list(`REACT_APP_VERTICAL_${envKey}_BULLETS`, []),
    demo: {
      url: str(`REACT_APP_VERTICAL_${envKey}_DEMO_URL`, ''),
      label: str(`REACT_APP_VERTICAL_${envKey}_DEMO_LABEL`, 'Abrir demo'),
      user: str(`REACT_APP_VERTICAL_${envKey}_DEMO_USER`, ''),
      pass: str(`REACT_APP_VERTICAL_${envKey}_DEMO_PASS`, ''),
    },
    video: {
      // asset() deja intactas las URLs externas y resuelve las rutas locales
      url: asset(str(`REACT_APP_VERTICAL_${envKey}_VIDEO_URL`, '')),
      type: str(`REACT_APP_VERTICAL_${envKey}_VIDEO_TYPE`, 'iframe').toLowerCase(),
      title: str(`REACT_APP_VERTICAL_${envKey}_VIDEO_TITLE`, 'Video demo'),
      description: str(`REACT_APP_VERTICAL_${envKey}_VIDEO_DESCRIPTION`, ''),
      poster: asset(str(`REACT_APP_VERTICAL_${envKey}_VIDEO_POSTER`, '')),
      aspect: aspect.css,
      isPortrait: aspect.isPortrait,
    },
    image: asset(str(`REACT_APP_VERTICAL_${envKey}_IMAGE`, '')),
    gallery: gallery.map((src, index) => ({
      src: asset(src),
      caption: captions[index] || '',
    })),
  };
};

const verticals = [
  buildVertical('barber', 'BARBER', colors.secondary),
  buildVertical('nails', 'NAILS', colors.accent),
].filter(Boolean);

const requestedVertical = str('REACT_APP_DEFAULT_VERTICAL', 'barber');
const defaultVertical = verticals.some((v) => v.id === requestedVertical)
  ? requestedVertical
  : (verticals[0] ? verticals[0].id : 'barber');

const demos = {
  eyebrow: str('REACT_APP_DEMOS_EYEBROW', ''),
  title: str('REACT_APP_DEMOS_TITLE', ''),
  subtitle: str('REACT_APP_DEMOS_SUBTITLE', ''),
};

/* ------------------------------------------------------------------ */
/*  Contenido por secciones                                           */
/* ------------------------------------------------------------------ */

const features = {
  eyebrow: str('REACT_APP_FEATURES_EYEBROW', ''),
  title: str('REACT_APP_FEATURES_TITLE', ''),
  subtitle: str('REACT_APP_FEATURES_SUBTITLE', ''),
  items: collect(8, (i) => {
    const title = str(`REACT_APP_FEATURE_${i}_TITLE`, '');
    if (!title) return null;
    return {
      icon: str(`REACT_APP_FEATURE_${i}_ICON`, 'star'),
      title,
      text: str(`REACT_APP_FEATURE_${i}_TEXT`, ''),
    };
  }),
};

const steps = {
  eyebrow: str('REACT_APP_STEPS_EYEBROW', ''),
  title: str('REACT_APP_STEPS_TITLE', ''),
  items: collect(4, (i) => {
    const title = str(`REACT_APP_STEP_${i}_TITLE`, '');
    if (!title) return null;
    return { title, text: str(`REACT_APP_STEP_${i}_TEXT`, '') };
  }),
};

const benefits = {
  eyebrow: str('REACT_APP_BENEFITS_EYEBROW', ''),
  title: str('REACT_APP_BENEFITS_TITLE', ''),
  image: asset(str('REACT_APP_BENEFITS_IMAGE', '')),
  items: collect(4, (i) => {
    const title = str(`REACT_APP_BENEFIT_${i}_TITLE`, '');
    if (!title) return null;
    return {
      icon: str(`REACT_APP_BENEFIT_${i}_ICON`, 'star'),
      title,
      text: str(`REACT_APP_BENEFIT_${i}_TEXT`, ''),
    };
  }),
};

/* ---------------------------- Precios ----------------------------- */

const normalizePlan = (plan, index) => {
  if (!plan || !plan.name) return null;
  const featureList = Array.isArray(plan.features)
    ? plan.features.filter(Boolean)
    : String(plan.features || '').split('|').map((f) => f.trim()).filter(Boolean);
  return {
    id: plan.id || `plan-${index + 1}`,
    name: plan.name,
    price: Number(plan.price) || 0,
    priceBefore: Number(plan.priceBefore) || 0,
    description: plan.description || '',
    features: featureList,
    highlight: plan.highlight === true || plan.highlight === 'true',
    badge: plan.badge || '',
  };
};

const plansFromJson = json('REACT_APP_PLANS_JSON', null);

const plans = Array.isArray(plansFromJson) && plansFromJson.length
  ? plansFromJson.map(normalizePlan).filter(Boolean)
  : collect(4, (i) => {
    if (!bool(`REACT_APP_PLAN_${i}_ENABLED`, true)) return null;
    return normalizePlan({
      id: `plan-${i}`,
      name: str(`REACT_APP_PLAN_${i}_NAME`, ''),
      price: num(`REACT_APP_PLAN_${i}_PRICE`, 0),
      priceBefore: num(`REACT_APP_PLAN_${i}_PRICE_BEFORE`, 0),
      description: str(`REACT_APP_PLAN_${i}_DESCRIPTION`, ''),
      features: list(`REACT_APP_PLAN_${i}_FEATURES`, []),
      highlight: bool(`REACT_APP_PLAN_${i}_HIGHLIGHT`, false),
      badge: str(`REACT_APP_PLAN_${i}_BADGE`, ''),
    }, i - 1);
  });

const annualDiscount = Math.min(Math.max(num('REACT_APP_ANNUAL_DISCOUNT_PCT', 0), 0), 90);

const pricing = {
  eyebrow: str('REACT_APP_PRICING_EYEBROW', ''),
  title: str('REACT_APP_PRICING_TITLE', ''),
  subtitle: str('REACT_APP_PRICING_SUBTITLE', ''),
  footnote: str('REACT_APP_PRICING_FOOTNOTE', ''),
  currencySymbol: CURRENCY_SYMBOL,
  currencyCode: str('REACT_APP_CURRENCY_CODE', 'COP'),
  period: str('REACT_APP_PRICE_PERIOD', '/mes'),
  annualDiscount,
  showBillingToggle: annualDiscount > 0,
  monthlyLabel: str('REACT_APP_BILLING_MONTHLY_LABEL', 'Mensual'),
  annualLabel: str('REACT_APP_BILLING_ANNUAL_LABEL', 'Anual'),
  annualNote: str('REACT_APP_BILLING_ANNUAL_NOTE', 'facturado anualmente'),
  buttonLabel: str('REACT_APP_PLAN_BUTTON_LABEL', 'Empezar gratis'),
  freeTrialNote: str('REACT_APP_PLAN_FREE_TRIAL_NOTE', ''),
  plans,
};

/** Precio mensual equivalente cuando se factura anualmente. */
export const monthlyPriceFor = (price, billing) => {
  if (billing !== 'annual' || !annualDiscount) return price;
  return Math.round((price * (100 - annualDiscount)) / 100);
};

/* -------------------- Testimonios / FAQ / Footer ------------------- */

const testimonials = {
  enabled: bool('REACT_APP_TESTIMONIALS_ENABLED', true),
  eyebrow: str('REACT_APP_TESTIMONIALS_EYEBROW', ''),
  title: str('REACT_APP_TESTIMONIALS_TITLE', ''),
  items: collect(4, (i) => {
    const text = str(`REACT_APP_TESTIMONIAL_${i}_TEXT`, '');
    if (!text) return null;
    return {
      name: str(`REACT_APP_TESTIMONIAL_${i}_NAME`, ''),
      role: str(`REACT_APP_TESTIMONIAL_${i}_ROLE`, ''),
      text,
      rating: Math.min(Math.max(num(`REACT_APP_TESTIMONIAL_${i}_RATING`, 5), 0), 5),
      avatar: asset(str(`REACT_APP_TESTIMONIAL_${i}_AVATAR`, '')),
    };
  }),
};

const faq = {
  eyebrow: str('REACT_APP_FAQ_EYEBROW', ''),
  title: str('REACT_APP_FAQ_TITLE', 'Preguntas frecuentes'),
  items: collect(8, (i) => {
    const question = str(`REACT_APP_FAQ_${i}_Q`, '');
    if (!question) return null;
    return { question, answer: str(`REACT_APP_FAQ_${i}_A`, '') };
  }),
};

const navLinks = pairs('REACT_APP_NAV_LINKS', []).map((p) => ({ label: p.label, href: p.value }));

const footer = {
  about: str('REACT_APP_FOOTER_ABOUT', ''),
  copyright: str('REACT_APP_FOOTER_COPYRIGHT', 'Todos los derechos reservados.'),
  product: pairs('REACT_APP_FOOTER_LINKS_PRODUCT', []).map((p) => ({ label: p.label, href: p.value })),
  legal: pairs('REACT_APP_FOOTER_LINKS_LEGAL', []).map((p) => ({ label: p.label, href: p.value })),
};

const seo = {
  title: str('REACT_APP_SEO_TITLE', brand.name),
  description: str('REACT_APP_SEO_DESCRIPTION', brand.description),
  keywords: str('REACT_APP_SEO_KEYWORDS', ''),
  ogImage: asset(str('REACT_APP_SEO_OG_IMAGE', '')),
};

/* ------------------------------------------------------------------ */

const site = {
  brand,
  colors,
  fonts,
  radius,
  contact,
  freeTrial,
  promoBar,
  cta,
  hero,
  stats,
  rating,
  verticals,
  defaultVertical,
  demos,
  features,
  steps,
  benefits,
  pricing,
  testimonials,
  faq,
  navLinks,
  footer,
  seo,
};

export default site;

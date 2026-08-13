/* eslint-disable no-console */
/**
 * Generador de SEO de ReservaBot.
 *
 * Se ejecuta SOLO y automáticamente después de `npm run build`
 * (npm dispara el hook "postbuild"). Nunca toca los archivos fuente:
 * escribe únicamente dentro de la carpeta `build/`.
 *
 * Resuelve tres cosas:
 *
 *  1. CONTENIDO PARA BUSCADORES. La página es una SPA: el HTML compilado
 *     solo lleva un <div id="root"> vacío, así que un rastreador que no
 *     ejecute JavaScript ve 52 caracteres. Aquí se genera, a partir del
 *     mismo .env que alimenta la web, un bloque <noscript> con el contenido
 *     real (titular, secciones, funciones, precio y preguntas). No es
 *     cloaking: es literalmente el mismo texto que lee el visitante.
 *
 *  2. DATOS ESTRUCTURADOS. Un grafo JSON-LD con la organización, el sitio,
 *     la aplicación con su precio, los videos y las preguntas frecuentes.
 *     Al salir del .env, nunca se queda desincronizado con la página.
 *
 *  3. sitemap.xml y robots.txt con el dominio y la fecha correctos.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUILD = path.join(ROOT, 'build');

/* ------------------------------------------------------------------ */
/*  Lectura del .env                                                   */
/* ------------------------------------------------------------------ */

/** Parser mínimo: KEY=valor, sin comillas, ignorando comentarios. */
const readEnv = (file) => {
  const out = {};
  if (!fs.existsSync(file)) return out;

  for (const rawLine of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const eq = line.indexOf('=');
    if (eq === -1) continue;

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();

    // Quita comillas envolventes (los colores van entre comillas)
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    out[key] = value;
  }
  return out;
};

const ENV = readEnv(path.join(ROOT, '.env'));

const str = (key, fallback = '') => {
  const value = (ENV[key] || '').trim();
  return value === '' ? fallback : value;
};
const num = (key, fallback = 0) => {
  const parsed = Number(str(key, '').replace(/[^\d.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : fallback;
};
const list = (key) => str(key, '').split('|').map((s) => s.trim()).filter(Boolean);
const bool = (key, fallback = false) => {
  const value = str(key, '').toLowerCase();
  if (!value) return fallback;
  return ['1', 'true', 'yes', 'si', 'sí', 'on'].includes(value);
};

/** Recorre slots numerados (PREFIJO_1_*, PREFIJO_2_*, ...). */
const collect = (count, build) => {
  const out = [];
  for (let i = 1; i <= count; i += 1) {
    const item = build(i);
    if (item) out.push(item);
  }
  return out;
};

/** Limpia las marcas de estilo del titular (*cursiva* y \n). */
const plain = (text) => String(text).replace(/\\n/g, ' ').replace(/\*/g, '').trim();

/* ------------------------------------------------------------------ */
/*  Datos del sitio                                                    */
/* ------------------------------------------------------------------ */

const SITE = str('REACT_APP_SITE_URL', '').replace(/\/$/, '');
const BRAND = str('REACT_APP_BRAND_NAME', 'ReservaBot');
const abs = (relative) => (/^https?:\/\//i.test(relative) ? relative : `${SITE}${relative}`);

const seo = {
  title: str('REACT_APP_SEO_TITLE', BRAND),
  description: str('REACT_APP_SEO_DESCRIPTION', ''),
  image: abs(str('REACT_APP_SEO_OG_IMAGE', '')),
};

const contact = {
  phone: str('REACT_APP_WHATSAPP_DISPLAY', ''),
  phoneRaw: str('REACT_APP_WHATSAPP_NUMBER', ''),
  email: str('REACT_APP_EMAIL', ''),
};

const social = [
  str('REACT_APP_FACEBOOK_URL', ''),
  str('REACT_APP_INSTAGRAM_URL', ''),
  str('REACT_APP_TIKTOK_URL', ''),
].filter(Boolean);

const hero = {
  title: `${str('REACT_APP_HERO_TITLE', '')} ${str('REACT_APP_HERO_TITLE_HIGHLIGHT', '')}`.trim(),
  subtitle: str('REACT_APP_HERO_SUBTITLE', ''),
  bullets: list('REACT_APP_HERO_BULLETS'),
};

const features = {
  title: plain(str('REACT_APP_FEATURES_TITLE', '')),
  items: collect(8, (i) => {
    const title = str(`REACT_APP_FEATURE_${i}_TITLE`, '');
    if (!title) return null;
    return { title, text: str(`REACT_APP_FEATURE_${i}_TEXT`, '') };
  }),
};

const steps = {
  title: plain(str('REACT_APP_STEPS_TITLE', '')),
  items: collect(4, (i) => {
    const title = str(`REACT_APP_STEP_${i}_TITLE`, '');
    if (!title) return null;
    return { title, text: str(`REACT_APP_STEP_${i}_TEXT`, '') };
  }),
};

const faq = {
  title: plain(str('REACT_APP_FAQ_TITLE', 'Preguntas frecuentes')),
  items: collect(8, (i) => {
    const question = str(`REACT_APP_FAQ_${i}_Q`, '');
    if (!question) return null;
    return { question, answer: str(`REACT_APP_FAQ_${i}_A`, '') };
  }),
};

const plan = {
  name: str('REACT_APP_PLAN_1_NAME', ''),
  price: num('REACT_APP_PLAN_1_PRICE', 0),
  currency: str('REACT_APP_CURRENCY_CODE', 'COP'),
  features: list('REACT_APP_PLAN_1_FEATURES'),
  freeTrialDays: num('REACT_APP_FREE_TRIAL_DAYS', 0),
  freeTrial: bool('REACT_APP_FREE_TRIAL_ENABLED', false),
};

const demos = {
  title: plain(str('REACT_APP_DEMOS_TITLE', '')),
  subtitle: str('REACT_APP_DEMOS_SUBTITLE', ''),
};

/** Videos de las dos verticales, con su rol y su carátula. */
const ROLE_NAMES = { CLIENT: 'CLIENT', ADMIN: 'ADMIN', STAFF: 'STAFF' };
const videos = [];
for (const vertical of ['BARBER', 'NAILS']) {
  if (!bool(`REACT_APP_VERTICAL_${vertical}_ENABLED`, true)) continue;
  const label = str(`REACT_APP_VERTICAL_${vertical}_LABEL`, vertical);

  for (const role of Object.keys(ROLE_NAMES)) {
    const url = str(`REACT_APP_VERTICAL_${vertical}_VIDEO_${role}`, '');
    if (!url) continue;

    const roleLabel = str(`REACT_APP_ROLE_${role}_LABEL`, role);
    const roleText = str(`REACT_APP_ROLE_${role}_TEXT`, '');
    const poster = str(`REACT_APP_VERTICAL_${vertical}_VIDEO_${role}_POSTER`, '');

    // La fecha de subida sale del archivo real, no inventada
    const filePath = path.join(BUILD, url.replace(/^\//, ''));
    const uploadDate = fs.existsSync(filePath)
      ? fs.statSync(filePath).mtime.toISOString()
      : null;

    videos.push({
      name: `${BRAND} · ${roleLabel} · ${label}`,
      description: roleText || `${BRAND} para ${label.toLowerCase()}: ${roleLabel}.`,
      contentUrl: abs(url),
      thumbnailUrl: poster ? abs(poster) : seo.image,
      uploadDate,
    });
  }
}

/* ------------------------------------------------------------------ */
/*  Datos estructurados (JSON-LD)                                      */
/* ------------------------------------------------------------------ */

const ids = {
  organization: `${SITE}/#organization`,
  website: `${SITE}/#website`,
  webpage: `${SITE}/#webpage`,
  software: `${SITE}/#software`,
};

const graph = [];

graph.push({
  '@type': 'Organization',
  '@id': ids.organization,
  name: str('REACT_APP_COMPANY_LEGAL_NAME', BRAND),
  alternateName: BRAND,
  url: `${SITE}/`,
  logo: {
    '@type': 'ImageObject',
    url: abs(str('REACT_APP_LOGO_URL', '')),
    caption: BRAND,
  },
  image: seo.image,
  description: str('REACT_APP_BRAND_DESCRIPTION', seo.description),
  slogan: str('REACT_APP_BRAND_SLOGAN', ''),
  areaServed: { '@type': 'Country', name: 'Colombia' },
  ...(social.length ? { sameAs: social } : null),
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      ...(contact.phoneRaw ? { telephone: `+${contact.phoneRaw}` } : null),
      ...(contact.email ? { email: contact.email } : null),
      areaServed: 'CO',
      availableLanguage: ['es'],
    },
  ],
});

graph.push({
  '@type': 'WebSite',
  '@id': ids.website,
  url: `${SITE}/`,
  name: BRAND,
  description: seo.description,
  publisher: { '@id': ids.organization },
  inLanguage: 'es-CO',
});

graph.push({
  '@type': 'WebPage',
  '@id': ids.webpage,
  url: `${SITE}/`,
  name: seo.title,
  description: seo.description,
  isPartOf: { '@id': ids.website },
  about: { '@id': ids.organization },
  primaryImageOfPage: { '@type': 'ImageObject', url: seo.image },
  inLanguage: 'es-CO',
});

/*
 * Aplicación y precio.
 * NOTA: aquí NO se declara aggregateRating. Publicar valoraciones que no
 * provienen de reseñas reales y verificables incumple las políticas de
 * datos estructurados de Google y expone el dominio a una acción manual.
 * En cuanto haya reseñas reales, este es el sitio donde añadirlas.
 */
graph.push({
  '@type': 'SoftwareApplication',
  '@id': ids.software,
  name: BRAND,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Software de reservas y agendamiento',
  operatingSystem: 'Web (PWA)',
  description: str('REACT_APP_BRAND_DESCRIPTION', seo.description),
  url: `${SITE}/`,
  image: seo.image,
  screenshot: seo.image,
  inLanguage: 'es-CO',
  publisher: { '@id': ids.organization },
  ...(plan.features.length ? { featureList: plan.features } : null),
  ...(plan.price > 0
    ? {
      offers: {
        '@type': 'Offer',
        price: String(plan.price),
        priceCurrency: plan.currency,
        availability: 'https://schema.org/InStock',
        url: `${SITE}/#pricing`,
        ...(plan.freeTrial
          ? { description: `Primer mes gratis (${plan.freeTrialDays} días), luego ${plan.price} ${plan.currency} al mes. Sin contratos.` }
          : null),
      },
    }
    : null),
});

if (faq.items.length) {
  graph.push({
    '@type': 'FAQPage',
    '@id': `${SITE}/#faq`,
    inLanguage: 'es-CO',
    mainEntity: faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  });
}

for (const video of videos) {
  graph.push({
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    contentUrl: video.contentUrl,
    thumbnailUrl: video.thumbnailUrl,
    ...(video.uploadDate ? { uploadDate: video.uploadDate } : null),
    publisher: { '@id': ids.organization },
    inLanguage: 'es-CO',
    isFamilyFriendly: true,
  });
}

const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  // Evita que un "</script>" dentro de un texto cierre la etiqueta
  .replace(/</g, '\\u003c');

/* ------------------------------------------------------------------ */
/*  Contenido para rastreadores sin JavaScript                         */
/* ------------------------------------------------------------------ */

const escapeHtml = (text) =>
  String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const section = (heading, body) =>
  `<section><h2>${escapeHtml(heading)}</h2>${body}</section>`;

const noscriptParts = [];

noscriptParts.push(
  `<h1>${escapeHtml(hero.title)}</h1>`,
  `<p>${escapeHtml(hero.subtitle)}</p>`,
  hero.bullets.length
    ? `<ul>${hero.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>`
    : ''
);

if (demos.title) {
  noscriptParts.push(section(demos.title, `<p>${escapeHtml(demos.subtitle)}</p>`));
}

if (steps.items.length) {
  noscriptParts.push(section(
    steps.title,
    `<ol>${steps.items.map((s) => `<li><strong>${escapeHtml(s.title)}</strong> ${escapeHtml(s.text)}</li>`).join('')}</ol>`
  ));
}

if (features.items.length) {
  noscriptParts.push(section(
    features.title,
    features.items.map((f) => `<h3>${escapeHtml(f.title)}</h3><p>${escapeHtml(f.text)}</p>`).join('')
  ));
}

if (plan.name && plan.price > 0) {
  const priceText = plan.freeTrial
    ? `Primer mes gratis y luego $${plan.price.toLocaleString('es-CO')} ${plan.currency} al mes, precio único sin contratos.`
    : `$${plan.price.toLocaleString('es-CO')} ${plan.currency} al mes.`;
  noscriptParts.push(section(
    plain(str('REACT_APP_PRICING_TITLE', 'Precio')),
    `<p>${escapeHtml(priceText)}</p>`
    + `<ul>${plan.features.map((f) => `<li>${escapeHtml(f)}</li>`).join('')}</ul>`
  ));
}

if (faq.items.length) {
  noscriptParts.push(section(
    faq.title,
    faq.items.map((f) => `<h3>${escapeHtml(f.question)}</h3><p>${escapeHtml(f.answer)}</p>`).join('')
  ));
}

const contactLines = [
  contact.phone ? `WhatsApp: ${contact.phone}` : '',
  contact.email ? `Correo: ${contact.email}` : '',
].filter(Boolean);

if (contactLines.length) {
  noscriptParts.push(section('Contacto', `<p>${escapeHtml(contactLines.join(' · '))}</p>`));
}

const noscript =
  '<noscript>'
  + `<div id="seo-content">${noscriptParts.filter(Boolean).join('')}</div>`
  + '</noscript>';

/* ------------------------------------------------------------------ */
/*  Escritura                                                          */
/* ------------------------------------------------------------------ */

const indexPath = path.join(BUILD, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('\n[seo] No existe build/index.html. Ejecuta "npm run build" primero.\n');
  process.exit(1);
}

if (!SITE) {
  console.error('\n[seo] Falta REACT_APP_SITE_URL en el .env: las URLs absolutas quedarían rotas.\n');
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf8');

// 1. Datos estructurados antes de </head>
html = html.replace(
  '</head>',
  `<script type="application/ld+json">${jsonLd}</script></head>`
);

// 2. Contenido para rastreadores: sustituye el <noscript> de aviso de CRA
html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, noscript);

fs.writeFileSync(indexPath, html);

// 3. sitemap.xml con la fecha real de la compilación
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  path.join(BUILD, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
);

// 4. robots.txt con el dominio correcto
fs.writeFileSync(
  path.join(BUILD, 'robots.txt'),
  `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`
);

const kb = (n) => `${(n / 1024).toFixed(1)} kB`;
console.log('\n[seo] Listo:');
console.log(`  · contenido para rastreadores  ${kb(noscript.length)} (antes: 52 caracteres)`);
console.log(`  · datos estructurados          ${graph.length} entidades, ${kb(jsonLd.length)}`);
console.log(`      ${graph.map((g) => g['@type']).join(', ')}`);
console.log(`  · preguntas frecuentes         ${faq.items.length}`);
console.log(`  · videos declarados            ${videos.length}`);
console.log(`  · sitemap.xml y robots.txt     ${SITE}\n`);

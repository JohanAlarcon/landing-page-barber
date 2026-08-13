# Guía rápida de ReservaBot

Toda la landing se controla desde el archivo **`.env`** de la raíz.
No hace falta tocar código para cambiar textos, el precio, colores,
videos ni el número de WhatsApp.

---

## 1. Cómo hacer un cambio

1. Abre `.env`.
2. Edita el valor que quieras.
3. **Reinicia** el proyecto (obligatorio, no basta con recargar el navegador):

```bash
npm start          # para verlo en local
npm run build      # para generar la versión de producción
npm run deploy     # para publicarlo
```

### Reglas de escritura del `.env`

| Quiero… | Se escribe así |
|---|---|
| Una lista | separada por `|` → `Uno|Dos|Tres` |
| Un enlace del menú | `Etiqueta::#ancla` → `Precio::#pricing` |
| Un sí/no | `true` / `false` (también sirve `si` / `no`) |
| Ocultar algo | deja la variable **vacía** |
| Un color | entre comillas → `"#22DE7A"` |
| Un salto de línea | `\n` dentro del texto |

---

## 2. El concepto de la página

ReservaBot es una **PWA con chatbot propio**: los clientes reservan en la
app, no por WhatsApp. WhatsApp aparece en la landing únicamente como **canal
de ventas**: por ahí se pide el demo, se contrata y se recibe soporte.
El link del demo **no es público**: todos los botones llevan a WhatsApp.

La página tiene 3 protagonistas (sección "La app en video"):

| Rol | Quién es | Video |
|---|---|---|
| Tus clientes | reservan con el chatbot | `REACT_APP_VERTICAL_*_VIDEO_CLIENT` |
| Para ti | panel del administrador | `REACT_APP_VERTICAL_*_VIDEO_ADMIN` |
| Tu equipo | agenda de barberos / manicuristas | `REACT_APP_VERTICAL_*_VIDEO_STAFF` |

`*` = `BARBER` o `NAILS`. Cada rol comparte textos entre los dos rubros
(`REACT_APP_ROLE_CLIENT_*`, `REACT_APP_ROLE_ADMIN_*`, `REACT_APP_ROLE_STAFF_*`).

---

## 3. Lo que más vas a cambiar

### Videos

Los archivos viven en `public/multimedia-barber/` y `public/multimedia-nails/`.
Para cambiar uno: deja el archivo nuevo en esa carpeta y apunta la variable:

```env
REACT_APP_VERTICAL_BARBER_VIDEO_CLIENT=/multimedia-barber/video-barber.mp4
REACT_APP_VERTICAL_BARBER_VIDEO_CLIENT_ASPECT=1080/1692
```

`_ASPECT` es la proporción real `ancho/alto` del archivo (así el marco no
recorta el video ni deja franjas). Para saberla: clic derecho → Propiedades →
Detalles, o usa `9/16` si es un vertical de celular estándar.

`_POSTER` (opcional) es la carátula. Vacío = se muestra un fondo degradado
con el botón de play, que también se ve bien.

#### ⚠️ Al exportar un video nuevo: "faststart"

Un MP4 guarda un índice (`moov`). Si queda al final del archivo, el navegador
descarga el video completo antes de mostrar nada (pantalla negra). Los 6
videos actuales ya están corregidos. Para los nuevos:

- **HandBrake**: marca *Web Optimized* al exportar.
- **ffmpeg**: `ffmpeg -i entrada.mp4 -c copy -movflags +faststart salida.mp4`

Comprobación rápida desde la carpeta del proyecto:

```bash
node -e "const b=require('fs').readFileSync('public/multimedia-nails/video-nails.mp4');const m=b.indexOf(Buffer.from('moov')),d=b.indexOf(Buffer.from('mdat'));console.log(m<d?'OK: listo para web':'MAL: aplicar faststart')"
```

> 💡 Los videos pesan entre 3 y 42 MB. Solo se descargan cuando el visitante
> pulsa play, así que la página abre rápido igual — pero si los comprimes a
> 5–10 MB (HandBrake, 1080p ~2 Mbps) la reproducción en datos móviles mejora.

### Precio (plan único)

```env
REACT_APP_PLAN_1_NAME=Plan ReservaBot
REACT_APP_PLAN_1_PRICE=40000              # se muestra como $40.000
REACT_APP_PLAN_1_FEATURES=Cosa 1|Cosa 2|Cosa 3
REACT_APP_PLAN_1_BADGE=Primer mes GRATIS
REACT_APP_PRICING_GUARANTEES=Primer mes gratis, sin tarjeta|Precio único: no cobramos por colaborador|Sin contratos: te retiras cuando quieras
```

Con **un solo plan activo**, la página muestra la tarjeta protagonista
("Mes 1: $0 → luego $40.000/mes"). Si algún día quieres varios planes,
activa `REACT_APP_PLAN_2_ENABLED=true` y rellena sus datos: el diseño
cambia solo a columnas.

### Número de WhatsApp (canal de ventas)

```env
REACT_APP_WHATSAPP_NUMBER=573161208714        # sin + ni espacios
REACT_APP_WHATSAPP_MESSAGE=...                # mensaje del botón principal
REACT_APP_WHATSAPP_DEMO_MESSAGE=...           # mensaje del botón "Pide el link del demo"
```

Alimenta todos los botones: navbar, hero, sección de videos, precio,
botón flotante (escritorio) y barra fija inferior (celular).

### Primer mes gratis

`REACT_APP_FREE_TRIAL_ENABLED=false` lo quita de toda la página
(cinta, hero, videos, precio y barra móvil).

---

## 4. Estructura de la página

| Orden | Sección | Se apaga con |
|---|---|---|
| 1 | Cinta promocional | `REACT_APP_PROMO_BAR_ENABLED=false` |
| 2 | Hero (chatbot animado) | — |
| 3 | La app en video (roles × rubros) | `REACT_APP_VERTICAL_*_ENABLED=false` |
| 4 | Cómo funciona (3 pasos) | vaciar los `STEP_n_TITLE` |
| 5 | Funciones (6) | vaciar los `FEATURE_n_TITLE` |
| 6 | Precio único | apagar el plan |
| 7 | Testimonios | `REACT_APP_TESTIMONIALS_ENABLED=false` |
| 8 | Preguntas frecuentes | vaciar los `FAQ_n_Q` |
| 9 | Cierre + pie de página | — |

En **celular** además: barra de CTA fija abajo (aparece al hacer scroll) y
el botón flotante de WhatsApp solo se muestra de tablet hacia arriba.

---

## 5. Dos trucos para los títulos de sección

Los títulos (`REACT_APP_*_TITLE`) admiten dos marcas:

| Escribes en el `.env` | Resultado |
|---|---|
| `Una sola app, *tres experiencias*` | *tres experiencias* sale en **cursiva** |
| `Empieza gratis.\nSigue por menos…` | corta la línea justo ahí |

El acento en cursiva está pensado para **dos o tres secciones como mucho**: si se
usa en todas pierde el efecto y vuelve a parecer una plantilla. El corte de línea
sirve para que los titulares largos rompan por sentido y no por donde toque el
ancho del contenedor.

---

## 6. Cambiar el dominio

El dominio vive en **4 sitios**. Si algún día lo cambias otra vez, tócalos todos:

| Archivo | Qué hay que poner |
|---|---|
| `.env` → `REACT_APP_SITE_URL` | `https://midominio.com` (sin barra final) |
| `package.json` → `homepage` | `https://midominio.com` |
| `public/CNAME` | `midominio.com` (sin `https://`) ⚠️ si esto falla, el sitio no carga |
| `public/robots.txt` y `public/sitemap.xml` | la URL completa |

`public/index.html` **no** hay que tocarlo: usa `%REACT_APP_SITE_URL%` y toma
el valor del `.env` al compilar.

Después, en el **registrador del dominio** apunta el DNS a GitHub Pages y en
**GitHub → Settings → Pages** pon el dominio nuevo. Ver detalle abajo.

---

## 7. Archivos del proyecto

```
.env                       ← toda la configuración
.env.example               ← copia de respaldo
src/config/site.js         ← único archivo que lee el .env
src/components/            ← una sección por archivo
public/multimedia-barber/  ← videos de barbería (cliente, admin, barberos)
public/multimedia-nails/   ← videos de uñas (cliente, admin, manicuristas)
public/images/brand/       ← logo, isotipo e imagen para redes
public/images/posters/     ← carátulas de los videos del cliente
```

> La imagen para redes (`og-reservabot.svg`) está en SVG. Facebook y WhatsApp
> no siempre leen SVG en las vistas previas: cuando puedas, expórtala a
> JPG/PNG de 1200×630 y apunta `REACT_APP_SEO_OG_IMAGE` al archivo nuevo.

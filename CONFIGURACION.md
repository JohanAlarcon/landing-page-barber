# Guía rápida de ReservaBot

Toda la landing se controla desde el archivo **`.env`** de la raíz.
No hace falta tocar código para cambiar textos, precios, planes, colores,
videos, imágenes ni el número de WhatsApp.

---

## 1. Cómo hacer un cambio

1. Abre `.env`.
2. Edita el valor que quieras.
3. **Reinicia** el proyecto (esto es obligatorio, no basta con recargar el navegador):

```bash
npm start          # para verlo en local
npm run build      # para generar la versión de producción
npm run deploy     # para publicarlo
```

### Reglas de escritura del `.env`

| Quiero… | Se escribe así |
|---|---|
| Una lista | separada por `|` → `Uno|Dos|Tres` |
| Un enlace del menú | `Etiqueta::#ancla` → `Precios::#pricing` |
| Un sí/no | `true` / `false` (también sirve `si` / `no`) |
| Ocultar algo | deja la variable **vacía** |
| Un color | entre comillas → `"#22DE7A"` |
| Un salto de línea | `\n` dentro del texto |

---

## 2. Lo que más vas a cambiar

### Número de WhatsApp

```env
REACT_APP_WHATSAPP_NUMBER=573161208714     # con indicativo, sin + ni espacios
REACT_APP_WHATSAPP_DISPLAY=+57 316 120 8714
REACT_APP_WHATSAPP_MESSAGE=¡Hola! Quiero mi DEMO GRATIS...
```

Este número alimenta **todos** los botones de la página: navbar, hero, planes,
botón flotante y pie de página.

### Precios y planes

Cada plan ocupa un bloque `REACT_APP_PLAN_N_*` (hay 4 espacios, el 4º viene apagado).
El precio se escribe **sin puntos ni símbolo**, solo el número:

```env
REACT_APP_PLAN_2_NAME=Completo
REACT_APP_PLAN_2_PRICE=110000            # se muestra como $110.000
REACT_APP_PLAN_2_PRICE_BEFORE=170000     # precio tachado (vacío = sin tachado)
REACT_APP_PLAN_2_FEATURES=Punto 1|Punto 2|Punto 3
REACT_APP_PLAN_2_HIGHLIGHT=true          # tarjeta destacada
REACT_APP_PLAN_2_BADGE=Más elegido       # etiqueta sobre la tarjeta
REACT_APP_PLAN_2_ENABLED=true            # false = no aparece
```

- **Descuento anual**: `REACT_APP_ANNUAL_DISCOUNT_PCT=20`. Ponlo en `0` y
  desaparece el interruptor Mensual/Anual.
- **¿Más de 4 planes?** Usa `REACT_APP_PLANS_JSON` con un JSON en una sola línea;
  si tiene contenido, reemplaza por completo a los planes numerados.

### El primer mes gratis

```env
REACT_APP_FREE_TRIAL_ENABLED=true    # false lo quita de TODA la página
REACT_APP_FREE_TRIAL_DAYS=30
REACT_APP_FREE_TRIAL_BADGE=Primer mes GRATIS
REACT_APP_FREE_TRIAL_TITLE=...
REACT_APP_FREE_TRIAL_BULLETS=Sin tarjeta|Configuración incluida|Cancela cuando quieras
```

La promoción aparece en 6 sitios: cinta superior, hero, sección de demos,
bloque dedicado, cada tarjeta de precio y el cierre.

### Videos demo (uno por rubro)

Hoy se usan los archivos locales de la carpeta `public/`:

```env
REACT_APP_VERTICAL_BARBER_VIDEO_URL=/video-barber.mp4
REACT_APP_VERTICAL_BARBER_VIDEO_TYPE=mp4
REACT_APP_VERTICAL_BARBER_VIDEO_ASPECT=1080/1692   # vertical de celular
REACT_APP_VERTICAL_BARBER_VIDEO_POSTER=/images/posters/video-barber.svg

REACT_APP_VERTICAL_NAILS_VIDEO_URL=/video-nails.mp4
REACT_APP_VERTICAL_NAILS_VIDEO_TYPE=mp4
REACT_APP_VERTICAL_NAILS_VIDEO_ASPECT=1080/1692
```

**Cómo cambiar un video**: deja el archivo nuevo en `public/` y apunta la
variable a `/nombre-del-archivo.mp4` (con la barra al inicio).

**`_VIDEO_ASPECT`** es la proporción `ancho/alto` del archivo. Es importante:
con ella la landing dibuja el marco exacto, sin franjas negras ni recortes.

| Tipo de video | Valor |
|---|---|
| Grabación de celular (la actual) | `1080/1692` |
| Vertical tipo reel | `9/16` |
| Horizontal / pantalla de PC | `16/9` |

Cuando el video es vertical, la columna del video se estrecha sola y el
texto pasa a ocupar más ancho.

**Otras opciones**:
- URL **vacía** → aparece el espacio reservado con el botón "Pedir demo en vivo".
- Acepta enlaces de YouTube (`watch?v=`, `youtu.be`, `shorts`) y Vimeo: se
  convierten solos al formato embebible (usa `TYPE=youtube` o `vimeo`).
- El video **no se descarga** hasta que el visitante pulsa reproducir, así
  que la página abre rápido aunque los archivos pesen.

> ⚠️ Los dos videos pesan 26 MB y 32 MB. Funcionan, pero si puedes
> comprimirlos a 6–10 MB (por ejemplo con HandBrake, calidad 1080p a ~2 Mbps)
> la experiencia en datos móviles mejora bastante y el despliegue será más liviano.

#### ⚠️ Importante al subir un video nuevo: "faststart"

Un MP4 guarda un índice llamado `moov`. Si ese índice queda **al final** del
archivo, el navegador tiene que descargar el video entero antes de mostrar
el primer fotograma: se ve un rectángulo negro y parece que no funciona.

Los dos videos actuales venían así y ya quedaron corregidos. Si exportas uno
nuevo con la misma herramienta, es muy probable que traiga el mismo problema.

**Cómo arreglarlo:**

- Con **HandBrake**: marca la casilla *Web Optimized* al exportar.
- Con **ffmpeg**: `ffmpeg -i entrada.mp4 -c copy -movflags +faststart salida.mp4`
  (`-c copy` significa que no recomprime: misma calidad, solo reordena).

**Cómo saber si un video tiene el problema**, desde la carpeta del proyecto:

```bash
node -e "const b=require('fs').readFileSync('public/video-nails.mp4');const m=b.indexOf(Buffer.from('moov')),d=b.indexOf(Buffer.from('mdat'));console.log(m<d?'OK: listo para web':'MAL: hay que aplicar faststart')"
```

### Logo

```env
REACT_APP_LOGO_URL=/images/brand/logo-reservabot.svg
REACT_APP_SHOW_LOGO_IMAGE=true       # false = muestra "ReservaBot" en texto
```

Para usar el logo que ya tienes en Facebook: guárdalo en
`public/images/brand/` y cambia la ruta. Si el archivo no carga, la página
cae automáticamente al nombre en texto (no se rompe nada).

### Colores

```env
REACT_APP_COLOR_PRIMARY="#22DE7A"      # verde de la marca
REACT_APP_COLOR_BG="#08131F"           # azul noche del fondo
REACT_APP_VERTICAL_BARBER_COLOR="#38BDF8"   # acento de barberías
REACT_APP_VERTICAL_NAILS_COLOR="#FF5FA2"    # acento de uñas
```

Al cambiar de rubro en la sección de demos, la galería y los botones se
tiñen con el color de ese rubro.

---

## 3. Estructura de la página

| Orden | Sección | Se apaga con |
|---|---|---|
| 1 | Cinta promocional | `REACT_APP_PROMO_BAR_ENABLED=false` |
| 2 | Hero (chat animado) | — |
| 3 | Demos por rubro + videos | `REACT_APP_VERTICAL_*_ENABLED=false` |
| 4 | Funciones | vaciar los `FEATURE_n_TITLE` |
| 5 | Cómo funciona | vaciar los `STEP_n_TITLE` |
| 6 | Galería del sistema | vaciar `VERTICAL_*_GALLERY` |
| 7 | Beneficios | vaciar los `BENEFIT_n_TITLE` |
| 8 | Primer mes gratis | `REACT_APP_FREE_TRIAL_ENABLED=false` |
| 9 | Precios | vaciar/apagar los planes |
| 10 | Testimonios | `REACT_APP_TESTIMONIALS_ENABLED=false` |
| 11 | Preguntas frecuentes | vaciar los `FAQ_n_Q` |
| 12 | Cierre + pie de página | — |

Cada sección desaparece **sola** si se queda sin contenido; no hay que tocar
`src/App.js`.

---

## 4. Archivos del proyecto

```
.env                     ← toda la configuración
.env.example             ← copia de respaldo con los valores originales
src/config/site.js       ← único archivo que lee el .env
src/theme.js             ← construye los colores y tipografías
src/components/          ← una sección por archivo
public/images/brand/     ← logo, isotipo e imagen para redes
public/images/mockups/   ← pantallas del sistema (barbería y uñas)
public/images/posters/   ← carátulas de los videos demo
```

### Imágenes incluidas

Las imágenes nuevas son **SVG vectoriales**, así que se ven nítidas en
cualquier tamaño y pesan muy poco. Puedes reemplazar cualquiera por una foto
o captura real cambiando la ruta en el `.env`:

- `brand/logo-reservabot.svg` · `brand/isotipo-reservabot.svg`
- `brand/og-reservabot.svg` (la imagen que se ve al compartir el enlace)
- `mockups/hero-app.svg`
- `mockups/barber-agenda.svg` · `mockups/barber-caja.svg`
- `mockups/nails-agenda.svg` · `mockups/nails-servicios.svg` · `mockups/nails-clientas.svg`
- `posters/video-barber.svg` · `posters/video-nails.svg`

> La imagen para redes sociales está en SVG. Facebook y WhatsApp no siempre
> leen SVG en las vistas previas: cuando puedas, expórtala a JPG/PNG de
> 1200×630 y apunta `REACT_APP_SEO_OG_IMAGE` al archivo nuevo.

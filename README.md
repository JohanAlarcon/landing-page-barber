# ReservaBot · Landing page

Sitio de presentación de **ReservaBot**, el sistema de reservas y agenda
automática para barberías y salones de uñas.

Toda la información visible (textos, precios, planes, colores, logo, videos
demo y número de WhatsApp) se configura desde el archivo `.env`.
👉 **[Guía de configuración](./CONFIGURACION.md)**

## Comandos

```bash
npm install     # instalar dependencias
npm start       # desarrollo en http://localhost:3000
npm test        # pruebas
npm run build   # compilar para producción
npm run deploy  # publicar (gh-pages)
```

> Después de editar el `.env` hay que reiniciar `npm start` o volver a
> compilar: las variables se leen en tiempo de compilación.

## Stack

React 19 · MUI 7 · Framer Motion · Create React App

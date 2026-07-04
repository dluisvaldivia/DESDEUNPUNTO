# DESDE UN PUNTO

Sitio web de galería de arte para vender obras de **puntillismo estilo mandala**. La artista es la mamá de Danny (dueño del repo). El nombre "Desde un Punto" alude al puntillismo: todo nace de un punto.

**Todo el sitio y todo el contenido van en español** (`lang="es"`, textos de UI, meta tags, mensajes de commit descriptivos en español está bien).

## Stack

- Vite + React (JavaScript/JSX, sin TypeScript)
- Tailwind CSS v4 (plugin `@tailwindcss/vite`)
- `react-router-dom` — BrowserRouter con `basename` para GitHub Pages
- `embla-carousel-react` + `embla-carousel-autoplay` — carrusel

## Comandos

```bash
npm run dev       # servidor de desarrollo
npm run build     # build de producción (copia dist/index.html → dist/404.html)
npm run preview   # previsualizar el build
```

## Flujo Git

- Remoto: `git@github.com:dluisvaldivia/DESDEUNPUNTO.git`
- **Todo el trabajo se hace en la rama `develop`.** Nunca commitear directo a `main`.
- Publicar = merge `develop → main` y push; eso dispara el deploy a GitHub Pages
  (workflow en `.github/workflows/deploy.yml`).
- URL del sitio: `https://dluisvaldivia.github.io/DESDEUNPUNTO/`
- Identidad git local del repo: Danny Valdivia / dluis.valdivia@gmail.com

## Estructura del sitio

Rutas: `/` (Inicio), `/galeria`, `/productos`, `/sobre-la-artista`, `/contacto`.

- `src/data/site.js` — ⚠️ datos de contacto con PLACEHOLDERS (teléfono WhatsApp, email, redes, nombre de la artista). Actualizar aquí, no hardcodear en componentes.
- `src/data/obras.js` — catálogo de obras (título, técnica, medidas, precio, imagen, destacada). Para agregar/quitar obras se edita solo este archivo.
- `src/assets/obras/` — imágenes de las obras. Mientras no haya fotos reales, hay mandalas SVG placeholder generados.
- `src/components/` — Navbar, Footer, Carousel, ObraCard, Lightbox, BotonWhatsApp.
- `src/pages/` — una por ruta.

## Decisiones de producto (acordadas con Danny)

- **Sin e-commerce**: catálogo con precios y botón "Consultar" que abre WhatsApp
  (`wa.me` con mensaje pre-llenado con el nombre de la obra) o email. Sin carrito ni pagos.
- **Contacto**: botones directos de WhatsApp + email. Sin formulario.
- **Precios de ejemplo en Soles (S/)** — Perú.
- **Deploy**: GitHub Pages vía GitHub Actions al hacer push a `main`.
  `vite.config.js` lleva `base: '/DESDEUNPUNTO/'`.

## Convenciones

- Nombres de archivos/componentes/variables en español donde sea natural
  (Galeria.jsx, ObraCard, obras.js), textos de UI siempre en español.
- Diseño con motivo de puntos (identidad "desde un punto"): paleta cálida artesanal.
- Mantener el sitio estático y sin backend; cualquier dato editable vive en `src/data/`.

## Skills del proyecto

Las skills viven en `.claude/skills/<nombre>/SKILL.md`. Ver `.claude/skills/README.md`
para el formato.

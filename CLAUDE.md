# TODO COMIENZA CON UN PUNTO

Sitio web de galería de arte para vender obras de **puntillismo estilo mandala**. La artista es la mamá de Danny (dueño del repo). El título oficial es "Todo comienza con un punto." y alude al puntillismo: todo nace de un punto. (El repo, la URL de Pages y el `base` de Vite conservan el slug antiguo `DESDEUNPUNTO`.)

**Todo el sitio y todo el contenido van en español** (`lang="es"`, textos de UI, meta tags, mensajes de commit descriptivos en español está bien).

## Stack

- Vite + React (JavaScript/JSX, sin TypeScript)
- Tailwind CSS v4 (plugin `@tailwindcss/vite`)
- `react-router-dom` — BrowserRouter con `basename` para GitHub Pages
- `embla-carousel-react` — carrusel (sin autoplay: avanza solo con flechas o puntos)

## Comandos

```bash
npm run dev       # servidor de desarrollo
npm run build     # build de producción (+ dist/404.html y las páginas de obra)
npm run preview   # previsualizar el build
```

`build` = `vite build`, luego copia `dist/index.html → dist/404.html` (el fallback
de rutas en Pages) y luego corre `scripts/generar-paginas-obras.mjs`, que crea las
páginas para compartir (ver "Compartir una obra").

## Flujo Git

- Remoto: `git@github.com:dluisvaldivia/DESDEUNPUNTO.git`
- **Todo el trabajo se hace en la rama `develop`.** Nunca commitear directo a `main`.
- Publicar = merge `develop → main` y push; eso dispara el deploy a GitHub Pages
  (workflow en `.github/workflows/deploy.yml`).
- URL del sitio: `https://dluisvaldivia.github.io/DESDEUNPUNTO/`
- Identidad git local del repo: Danny Valdivia / dluis.valdivia@gmail.com

## Estructura del sitio

Rutas: `/` (Inicio), `/galeria`, `/sobre-la-artista`, `/contacto`, `/obra/:id`
(solo para enlaces compartidos: redirige a la galería con la obra abierta).

- `src/data/site.js` — ⚠️ datos de contacto con PLACEHOLDERS (teléfono WhatsApp, redes, nombre de la artista) + `url` del sitio. Actualizar aquí, no hardcodear en componentes.
- `src/data/obras.js` — catálogo de obras (título, técnica, medidas, precio, imagen, destacada). Para agregar/quitar obras se edita solo este archivo. Son **datos puros**: `imagen` es el nombre del archivo, no la foto importada, porque el script de build lo lee desde Node (que no sabe importar un `.png`).
- `src/data/catalogo.js` — las mismas obras pero con `imagen` ya resuelta a la foto empaquetada. **La app importa de aquí**, no de `obras.js`.
- `src/assets/obras/` — fotos de las obras (PNG cuadrados con fondo transparente). Se muestran recortadas al centro en formato cuadrado.
- `src/components/` — Navbar, Footer, Carousel, ObraCard, Lightbox, BotonWhatsApp.
- `src/pages/` — una por ruta.

## Compartir una obra (og:image)

El botón de compartir del lightbox reparte `…/obra/<id>/`, no `…/galeria?obra=<id>`.
La razón: los bots que arman la vista previa (WhatsApp, Facebook…) **no ejecutan
JavaScript**, así que no sirve poner las etiquetas `og:` desde React; y en Pages
una ruta que no es un archivo real responde 404, con lo que casi ningún bot muestra
vista previa.

Por eso `scripts/generar-paginas-obras.mjs` genera, después del build:

- `dist/obra/<id>/index.html` — página real (200) con las `og:` de esa obra. Sale de
  `index.html`, reemplazando el bloque entre `<!-- metadatos:inicio -->` y
  `<!-- metadatos:fin -->`; si mueves esos marcadores, el build falla.
- `dist/og/<id>.jpg` — la imagen de la vista previa: 1200×630, la obra centrada sobre
  el marfil del sitio (las fotos son PNG transparentes y las apps las componen sobre
  negro; el JPEG no tiene alfa). También `og/sitio.jpg` para la portada.

Agregar una obra no pide nada extra: con la entrada en `obras.js` el build ya le crea
su página y su imagen.

## Decisiones de producto (acordadas con Danny)

- **Sin e-commerce**: catálogo con precios y botón "Consultar" que abre WhatsApp
  (`wa.me` con mensaje pre-llenado con el nombre de la obra). Sin carrito ni pagos.
- **Contacto**: solo WhatsApp y redes. Sin email, sin formulario.
- **Precios de ejemplo en Soles (S/)** — Perú.
- **Deploy**: GitHub Pages vía GitHub Actions al hacer push a `main`.
  `vite.config.js` lleva `base: '/DESDEUNPUNTO/'`.

## Convenciones

- Nombres de archivos/componentes/variables en español donde sea natural
  (Galeria.jsx, ObraCard, obras.js), textos de UI siempre en español.
- Diseño con motivo de puntos (identidad "todo comienza con un punto"): paleta cálida artesanal.
- Mantener el sitio estático y sin backend; cualquier dato editable vive en `src/data/`.

## Skills del proyecto

Las skills viven en `.claude/skills/<nombre>/SKILL.md`. Ver `.claude/skills/README.md`
para el formato.

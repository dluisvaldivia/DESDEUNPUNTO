# Todo comienza con un punto

Galería de arte en **puntillismo estilo mandala** — obras originales hechas a mano, punto a punto.

Sitio: https://dluisvaldivia.github.io/DESDEUNPUNTO/

## Comandos

```bash
npm install       # instalar dependencias (solo la primera vez)
npm run dev       # servidor de desarrollo
npm run build     # build de producción
npm run preview   # previsualizar el build
```

## Cómo editar el contenido

- **Datos de contacto** (WhatsApp, redes, nombre de la artista):
  `src/data/site.js` — los valores con ⚠️ son placeholders que hay que reemplazar.
- **Obras del catálogo**: `src/data/obras.js` — cada obra tiene título, técnica,
  medidas, precio (S/), imagen y si es destacada (aparece en el carrusel de inicio).
- **Imágenes de las obras**: van en `src/assets/obras/`. Para agregar una:
  copiar el archivo (idealmente `.webp`, `.jpg` o `.png` cuadrado, mínimo
  800×800) a esa carpeta, importarlo en `src/data/obras.js` y añadir la entrada.
  Las fotos se muestran recortadas al centro en formato cuadrado.

## Flujo de trabajo

- El trabajo diario se hace en la rama **`develop`**.
- **Publicar** = hacer merge de `develop` a `main` y push. El push a `main`
  dispara el deploy automático a GitHub Pages (`.github/workflows/deploy.yml`).

```bash
git checkout main
git merge develop
git push origin main
git checkout develop
```

> La primera vez: si el deploy falla por permisos, activar Pages manualmente en
> GitHub → Settings → Pages → Source: **GitHub Actions**.

## Stack

Vite + React (JSX) · Tailwind CSS v4 · React Router · Embla Carousel · Lucide Icons

## Claude

El contexto del proyecto para Claude Code está en `CLAUDE.md` y las skills en
`.claude/skills/` (incluye `ui-ux-pro-max` para decisiones de diseño).

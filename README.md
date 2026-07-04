# Desde un Punto

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

- **Datos de contacto** (WhatsApp, email, redes, nombre de la artista):
  `src/data/site.js` — los valores con ⚠️ son placeholders que hay que reemplazar.
- **Obras del catálogo**: `src/data/obras.js` — cada obra tiene título, técnica,
  medidas, precio (S/), imagen y si es destacada (aparece en el carrusel de inicio).
- **Imágenes de las obras**: van en `src/assets/obras/`. Mientras no haya fotos
  reales, hay mandalas SVG generados como placeholder. Para usar fotos reales:
  copiar el archivo (idealmente `.webp` o `.jpg` cuadrado, mínimo 800×800) a esa
  carpeta y actualizar el `import` correspondiente en `src/data/obras.js`.

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

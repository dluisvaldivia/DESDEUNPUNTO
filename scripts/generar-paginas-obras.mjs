// Genera, después de `vite build`, lo que hace falta para que al compartir una
// obra por WhatsApp (o Instagram, Facebook, Telegram…) salga su foto:
//
//   dist/og/<id>.jpg        la imagen de la vista previa
//   dist/obra/<id>/index.html  la página de esa obra, con sus etiquetas og:
//
// Por qué páginas sueltas y no hacerlo desde React: los bots que arman la vista
// previa no ejecutan JavaScript, solo leen el HTML que les llega. Y en GitHub
// Pages una ruta que no es un archivo real (como /galeria?obra=x) responde 404
// —el HTML sale del truco de 404.html—, y con un 404 casi ningún bot muestra
// vista previa. Cada obra necesita entonces un archivo de verdad, que responda
// 200 y ya traiga sus etiquetas escritas. Quien abra el enlace en un navegador
// cae en ObraCompartida.jsx, que lo lleva a la galería con la obra abierta.

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { obras } from '../src/data/obras.js'
import { sitio } from '../src/data/site.js'

const raiz = fileURLToPath(new URL('..', import.meta.url))
const dist = join(raiz, 'dist')
const fotos = join(raiz, 'src/assets/obras')

// 1200×630 es la medida que esperan todas las redes; con otra proporción cada
// una recorta por su cuenta y parte del mandala se pierde.
const ANCHO = 1200
const ALTO = 630
const MARGEN = 60
const FONDO = '#f8f7f0' // marfil, el fondo del sitio

// Las fotos son PNG con fondo transparente. Sin aplanar, cada app compone la
// transparencia sobre lo que se le antoja (normalmente negro), así que la
// pegamos sobre el marfil del sitio y guardamos JPEG, que no tiene alfa.
async function tarjeta(entradas, destino) {
  const alto = ALTO - MARGEN * 2
  const ancho = Math.min(alto, (ANCHO - MARGEN * 2) / entradas.length)
  const separacion = entradas.length > 1 ? 40 : 0
  const total = entradas.length * ancho + (entradas.length - 1) * separacion

  const capas = await Promise.all(
    entradas.map(async (entrada, i) => ({
      input: await sharp(join(fotos, entrada))
        .resize(Math.round(ancho), Math.round(ancho), {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
          kernel: 'lanczos3',
        })
        .toBuffer(),
      left: Math.round((ANCHO - total) / 2 + i * (ancho + separacion)),
      top: Math.round((ALTO - ancho) / 2),
    })),
  )

  await mkdir(dirname(destino), { recursive: true })
  await sharp({ create: { width: ANCHO, height: ALTO, channels: 4, background: FONDO } })
    .composite(capas)
    .flatten({ background: FONDO })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(destino)
}

function escapar(texto) {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function metadatos(obra) {
  const titulo = `${obra.titulo} — ${sitio.nombre}`
  const descripcion = `${obra.descripcion} ${obra.tecnica}, ${obra.medidas}.`
  const enlace = `${sitio.url}/obra/${obra.id}/`
  const imagen = `${sitio.url}/og/${obra.id}.jpg`

  return [
    `<title>${escapar(titulo)}</title>`,
    `<meta name="description" content="${escapar(descripcion)}" />`,
    `<link rel="canonical" href="${enlace}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:site_name" content="${escapar(sitio.nombre)}" />`,
    `<meta property="og:locale" content="es_PE" />`,
    `<meta property="og:title" content="${escapar(titulo)}" />`,
    `<meta property="og:description" content="${escapar(descripcion)}" />`,
    `<meta property="og:url" content="${enlace}" />`,
    `<meta property="og:image" content="${imagen}" />`,
    `<meta property="og:image:width" content="${ANCHO}" />`,
    `<meta property="og:image:height" content="${ALTO}" />`,
    `<meta property="og:image:alt" content="${escapar(obra.descripcion)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ]
    .map((etiqueta) => `    ${etiqueta}`)
    .join('\n')
}

const INICIO = '<!-- metadatos:inicio -->'
const FIN = '<!-- metadatos:fin -->'

const plantilla = await readFile(join(dist, 'index.html'), 'utf8')
const desde = plantilla.indexOf(INICIO)
const hasta = plantilla.indexOf(FIN)
if (desde < 0 || hasta < 0) {
  throw new Error(`index.html ya no tiene los marcadores ${INICIO} … ${FIN} en el <head>`)
}

for (const obra of obras) {
  await tarjeta([obra.imagen], join(dist, 'og', `${obra.id}.jpg`))

  const pagina =
    plantilla.slice(0, desde + INICIO.length) + '\n' + metadatos(obra) + '\n' + plantilla.slice(hasta)
  await mkdir(join(dist, 'obra', obra.id), { recursive: true })
  await writeFile(join(dist, 'obra', obra.id, 'index.html'), pagina)
}

// La vista previa del sitio: las obras destacadas, hasta tres para que no se
// vean como estampillas.
const portada = obras.filter((obra) => obra.destacada).slice(0, 3)
await tarjeta((portada.length ? portada : obras.slice(0, 3)).map((obra) => obra.imagen),
  join(dist, 'og', 'sitio.jpg'))

console.log(`Vistas previas: ${obras.length} obras + portada → dist/og/, dist/obra/`)

// Genera mandalas SVG de puntillismo como placeholders de las obras reales.
// Uso: node scripts/generar-obras-placeholder.mjs
// Es determinista (misma semilla → mismo dibujo). Cuando haya fotos reales,
// basta reemplazar los archivos en src/assets/obras/ y ajustar src/data/obras.js.

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const destino = join(raiz, 'src', 'assets', 'obras')

const TAM = 800
const CX = TAM / 2
const CY = TAM / 2
const RADIO_MAX = 348

function hashCadena(texto) {
  let h = 1779033703 ^ texto.length
  for (let i = 0; i < texto.length; i++) {
    h = Math.imul(h ^ texto.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return h >>> 0
}

function mulberry32(semilla) {
  let a = semilla
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Anillos concéntricos de puntos; con `petalos` el radio ondula formando flor.
function generarAnillos(rnd, nColores, petalos = 0) {
  const puntos = []
  puntos.push({ x: CX, y: CY, r: 9 + rnd() * 4, c: 0 })
  let r = 30 + rnd() * 8
  let anillo = 0
  while (r < RADIO_MAX) {
    const separacion = 15 + rnd() * 6
    const n = Math.max(6, Math.round((2 * Math.PI * r) / separacion))
    const radioPunto = 2.4 + rnd() * 3.8
    const fase = rnd() * Math.PI * 2
    const amplitud = petalos && anillo > 1 ? 8 + rnd() * 18 : 0
    const color = anillo === 0 ? 1 : Math.floor(rnd() * nColores)
    for (let i = 0; i < n; i++) {
      const t = fase + (i * 2 * Math.PI) / n
      const onda = amplitud ? amplitud * Math.sin(petalos * t) : 0
      const rr = r + onda + (rnd() - 0.5) * 2
      const escala = amplitud ? 0.7 + 0.55 * Math.abs(Math.cos((petalos * t) / 2)) : 1
      puntos.push({
        x: CX + rr * Math.cos(t),
        y: CY + rr * Math.sin(t),
        r: radioPunto * escala,
        c: color,
      })
    }
    r += 17 + rnd() * 13 + radioPunto
    anillo++
  }
  return puntos
}

// Espiral de Arquímedes con varios brazos.
function generarEspiral(rnd, nColores) {
  const puntos = []
  puntos.push({ x: CX, y: CY, r: 10 + rnd() * 4, c: 0 })
  const brazos = 4 + Math.floor(rnd() * 3)
  const b = 8.5 + rnd() * 2.5
  for (let brazo = 0; brazo < brazos; brazo++) {
    const faseBrazo = (brazo * 2 * Math.PI) / brazos
    let theta = 0.8
    while (true) {
      const radio = 16 + b * theta
      if (radio > RADIO_MAX) break
      const separacion = 14 + rnd() * 4
      theta += separacion / Math.sqrt(radio * radio + b * b)
      const t = theta + faseBrazo
      const radioPunto = 5.6 - (radio / RADIO_MAX) * 3 + rnd() * 0.9
      const color = Math.floor(theta / (Math.PI / 2)) % nColores
      puntos.push({
        x: CX + radio * Math.cos(t) + (rnd() - 0.5) * 2,
        y: CY + radio * Math.sin(t) + (rnd() - 0.5) * 2,
        r: Math.max(1.6, radioPunto),
        c: color,
      })
    }
  }
  // Anillo exterior que cierra la composición
  const n = 64
  for (let i = 0; i < n; i++) {
    const t = (i * 2 * Math.PI) / n
    puntos.push({ x: CX + 360 * Math.cos(t), y: CY + 360 * Math.sin(t), r: 2.2, c: 1 })
  }
  return puntos
}

function dibujarSVG({ fondo, colores, puntos }) {
  const grupos = new Map()
  for (const p of puntos) {
    const color = colores[p.c % colores.length]
    if (!grupos.has(color)) grupos.set(color, [])
    grupos
      .get(color)
      .push(`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${p.r.toFixed(1)}"/>`)
  }
  const cuerpo = [...grupos]
    .map(([color, circulos]) => `<g fill="${color}">${circulos.join('')}</g>`)
    .join('\n')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TAM} ${TAM}">\n<rect width="${TAM}" height="${TAM}" fill="${fondo}"/>\n${cuerpo}\n</svg>\n`
}

const obras = [
  { id: 'amanecer-en-espiral', estilo: 'espiral', fondo: '#1c1917', colores: ['#d9a05b', '#c67b5c', '#e8c07d', '#f5f0e1', '#a85d3f'] },
  { id: 'flor-de-loto', estilo: 'petalos8', fondo: '#201a24', colores: ['#d98bb6', '#b06ab3', '#e7c6e0', '#f2e9dc', '#8d5a97'] },
  { id: 'geometria-del-alma', estilo: 'anillos', fondo: '#1c1917', colores: ['#4fb3a9', '#2a7f76', '#bfe3dd', '#d9a05b', '#f5f0e1'] },
  { id: 'universo-interior', estilo: 'petalos12', fondo: '#161b2e', colores: ['#7ea8d9', '#4a6fa5', '#cfe0f2', '#d9a05b', '#f5f0e1'] },
  { id: 'raices', estilo: 'anillos', fondo: '#f5f0e1', colores: ['#6b7b3c', '#8b5e34', '#a85d3f', '#4a5528', '#b98a4e'] },
  { id: 'luna-llena', estilo: 'anillos', fondo: '#1a1d24', colores: ['#c9ccd6', '#8e94a5', '#eef0f4', '#6d7486', '#d9a05b'] },
  { id: 'jardin-de-puntos', estilo: 'petalos16', fondo: '#fffdf6', colores: ['#a85d3f', '#6b7b3c', '#d9a05b', '#2a7f76', '#8d5a97'] },
  { id: 'sol-andino', estilo: 'petalos12', fondo: '#1c1917', colores: ['#e0a458', '#b3402e', '#d9a05b', '#f2d5a0', '#f5f0e1'] },
  { id: 'mar-de-paracas', estilo: 'espiral', fondo: '#10222b', colores: ['#4fb3a9', '#7fd1c8', '#2a7f76', '#d9e8e5', '#d9a05b'] },
]

mkdirSync(destino, { recursive: true })

for (const obra of obras) {
  const rnd = mulberry32(hashCadena(obra.id))
  let puntos
  if (obra.estilo === 'espiral') puntos = generarEspiral(rnd, obra.colores.length)
  else if (obra.estilo.startsWith('petalos'))
    puntos = generarAnillos(rnd, obra.colores.length, Number(obra.estilo.replace('petalos', '')))
  else puntos = generarAnillos(rnd, obra.colores.length)

  const svg = dibujarSVG({ fondo: obra.fondo, colores: obra.colores, puntos })
  writeFileSync(join(destino, `${obra.id}.svg`), svg)
  console.log(`✓ ${obra.id}.svg (${puntos.length} puntos)`)
}

console.log(`\nListo: ${obras.length} obras en src/assets/obras/`)

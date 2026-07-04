// Catálogo de obras. Para agregar una: copiar la imagen a src/assets/obras/,
// importarla aquí y añadir una entrada al arreglo. Las imágenes actuales son
// placeholders SVG generados (scripts/generar-obras-placeholder.mjs) — se
// reemplazan por fotos reales de las obras cuando estén listas.

import amanecerEnEspiral from '../assets/obras/amanecer-en-espiral.svg'
import florDeLoto from '../assets/obras/flor-de-loto.svg'
import geometriaDelAlma from '../assets/obras/geometria-del-alma.svg'
import universoInterior from '../assets/obras/universo-interior.svg'
import raices from '../assets/obras/raices.svg'
import lunaLlena from '../assets/obras/luna-llena.svg'
import jardinDePuntos from '../assets/obras/jardin-de-puntos.svg'
import solAndino from '../assets/obras/sol-andino.svg'
import marDeParacas from '../assets/obras/mar-de-paracas.svg'

export const obras = [
  {
    id: 'amanecer-en-espiral',
    titulo: 'Amanecer en Espiral',
    tecnica: 'Puntillismo en acrílico sobre lienzo',
    medidas: '50 × 50 cm',
    precio: 480,
    imagen: amanecerEnEspiral,
    destacada: true,
    descripcion: 'Espiral de puntos dorados y terracota que gira desde el centro, como un amanecer.',
  },
  {
    id: 'flor-de-loto',
    titulo: 'Flor de Loto',
    tecnica: 'Puntillismo en acrílico sobre lienzo',
    medidas: '40 × 40 cm',
    precio: 380,
    imagen: florDeLoto,
    destacada: true,
    descripcion: 'Mandala de ocho pétalos en rosas y lavandas sobre fondo nocturno.',
  },
  {
    id: 'geometria-del-alma',
    titulo: 'Geometría del Alma',
    tecnica: 'Puntillismo en tinta sobre papel',
    medidas: '30 × 30 cm',
    precio: 220,
    imagen: geometriaDelAlma,
    destacada: false,
    descripcion: 'Anillos concéntricos de puntos turquesa y dorado sobre negro.',
  },
  {
    id: 'universo-interior',
    titulo: 'Universo Interior',
    tecnica: 'Puntillismo en acrílico sobre lienzo',
    medidas: '60 × 60 cm',
    precio: 650,
    imagen: universoInterior,
    destacada: true,
    descripcion: 'Mandala de doce pétalos en azules profundos con destellos dorados, como una galaxia.',
  },
  {
    id: 'raices',
    titulo: 'Raíces',
    tecnica: 'Puntillismo en acrílico sobre madera',
    medidas: '35 × 35 cm',
    precio: 320,
    imagen: raices,
    destacada: false,
    descripcion: 'Círculos de puntos oliva y tierra sobre fondo crema, inspirado en los anillos de un árbol.',
  },
  {
    id: 'luna-llena',
    titulo: 'Luna Llena',
    tecnica: 'Puntillismo en acrílico sobre lienzo',
    medidas: '40 × 40 cm',
    precio: 400,
    imagen: lunaLlena,
    destacada: true,
    descripcion: 'Mandala plateado en escala de grises azulados con un toque de oro.',
  },
  {
    id: 'jardin-de-puntos',
    titulo: 'Jardín de Puntos',
    tecnica: 'Puntillismo en tinta sobre papel',
    medidas: '25 × 25 cm',
    precio: 180,
    imagen: jardinDePuntos,
    destacada: false,
    descripcion: 'Flor de dieciséis pétalos multicolor sobre papel marfil.',
  },
  {
    id: 'sol-andino',
    titulo: 'Sol Andino',
    tecnica: 'Puntillismo en acrílico sobre lienzo',
    medidas: '50 × 50 cm',
    precio: 520,
    imagen: solAndino,
    destacada: true,
    descripcion: 'Sol de doce puntas en rojos y dorados intensos sobre fondo negro.',
  },
  {
    id: 'mar-de-paracas',
    titulo: 'Mar de Paracas',
    tecnica: 'Puntillismo en acrílico sobre madera',
    medidas: '45 × 45 cm',
    precio: 450,
    imagen: marDeParacas,
    destacada: false,
    descripcion: 'Espiral de turquesas y espuma sobre un fondo de mar profundo.',
  },
]

export const obrasDestacadas = obras.filter((obra) => obra.destacada)

export function formatearPrecio(precio) {
  return `S/ ${precio.toLocaleString('es-PE')}`
}

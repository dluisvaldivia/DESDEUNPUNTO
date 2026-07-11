// Catálogo de obras. Para agregar una: copiar la foto a src/assets/obras/
// (cuadrada, o se recorta al centro) y añadir una entrada con el nombre del
// archivo en `imagen`.
//
// Este archivo son datos puros a propósito (`imagen` es el nombre del archivo,
// no la foto importada): así lo puede leer tanto la app —vía catalogo.js, que
// resuelve cada nombre a la foto empaquetada— como el script de build que
// genera las páginas para compartir, que corre en Node y no sabe importar .png.
//
// ⚠️ `medidas` y `precio` son provisionales: falta confirmarlos con la artista.
// Los títulos son descriptivos; si las obras ya tienen nombre, cambiar `titulo`
// (y `id`, que se usa en las URLs de la galería y en el enlace para compartir).

export const obras = [
  {
    id: 'flor-de-mil-colores',
    titulo: 'Flor de Mil Colores',
    tecnica: 'Puntillismo en acrílico sobre lienzo',
    medidas: '40 × 40 cm',
    precio: 420,
    imagen: 'flor-de-mil-colores.png',
    destacada: true,
    descripcion:
      'Flor de pétalos multicolor que se abre sobre un fondo negro sembrado de puntos blancos, rodeada de círculos concéntricos y espirales.',
  },
  {
    id: 'telarana-estelar',
    titulo: 'Telaraña Estelar',
    tecnica: 'Puntillismo sobre piedra',
    medidas: '20 cm de diámetro',
    precio: 190,
    imagen: 'telarana-estelar.png',
    destacada: true,
    descripcion:
      'Mandala circular en rojo y azul intensos, con una estrella de hilos de puntos blancos que se tejen como una telaraña.',
  },
  {
    id: 'estrella-azul',
    titulo: 'Estrella Azul',
    tecnica: 'Puntillismo en acrílico sobre lienzo',
    medidas: '30 × 30 cm',
    precio: 350,
    imagen: 'estrella-azul.png',
    destacada: true,
    descripcion:
      'Estrella de cinco puntas con un mandala de puntos en azules y turquesas, enmarcado por un anillo de puntos cobrizos.',
  },
]

export function formatearPrecio(precio) {
  return `S/ ${precio.toLocaleString('es-PE')}`
}

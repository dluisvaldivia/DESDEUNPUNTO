// El catálogo tal como lo consume la app: las obras de obras.js pero con
// `imagen` ya resuelta a la foto empaquetada por Vite (con su hash), lista para
// usar en un <img src>. Las páginas y los componentes importan de aquí.
import { obras as datos } from './obras.js'

const fotos = import.meta.glob('../assets/obras/*.png', { eager: true, import: 'default' })

export const obras = datos.map((obra) => {
  const foto = fotos[`../assets/obras/${obra.imagen}`]
  if (!foto) {
    throw new Error(`No existe la foto src/assets/obras/${obra.imagen} (obra "${obra.id}")`)
  }
  return { ...obra, imagen: foto }
})

export const obrasDestacadas = obras.filter((obra) => obra.destacada)

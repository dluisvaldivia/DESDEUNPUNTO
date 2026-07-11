import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

// La obra abierta en el lightbox vive en la URL (?obra=<id>) y no en el estado
// de React: así cada obra tiene un enlace propio que se puede compartir y el
// botón "atrás" del navegador cierra el lightbox en vez de salir de la página.
export default function useObraEnUrl(obras) {
  const [parametros, setParametros] = useSearchParams()
  const id = parametros.get('obra')
  const indice = id ? obras.findIndex((obra) => obra.id === id) : -1

  const abrir = useCallback(
    (posicion) => setParametros({ obra: obras[posicion].id }),
    [obras, setParametros],
  )

  const cerrar = useCallback(() => setParametros({}, { replace: true }), [setParametros])

  // Pasar de una obra a otra reemplaza la entrada del historial para no llenarlo
  // con cada obra vista.
  const navegar = useCallback(
    (direccion) => {
      if (indice < 0) return
      const siguiente = (indice + direccion + obras.length) % obras.length
      setParametros({ obra: obras[siguiente].id }, { replace: true })
    },
    [indice, obras, setParametros],
  )

  return { indice, abrir, cerrar, navegar }
}

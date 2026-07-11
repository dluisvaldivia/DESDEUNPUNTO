import { Navigate, useParams } from 'react-router-dom'
import { obras } from '../data/catalogo.js'

// Destino de los enlaces que se comparten (/obra/<id>). Cada uno existe como
// página estática propia —la genera scripts/generar-paginas-obras.mjs— para que
// WhatsApp y las redes puedan leer su vista previa, que no ejecutan JavaScript.
// Quien la abre de verdad no necesita otra página: lo mandamos a la galería con
// la obra ya abierta. Se reemplaza la entrada del historial para que el botón
// "atrás" vuelva a WhatsApp y no a este redirector.
export default function ObraCompartida() {
  const { id } = useParams()
  const existe = obras.some((obra) => obra.id === id)
  return <Navigate to={existe ? `/galeria?obra=${id}` : '/galeria'} replace />
}

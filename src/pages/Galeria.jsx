import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { obras } from '../data/obras.js'
import EncabezadoPagina from '../components/EncabezadoPagina.jsx'
import ObraCard from '../components/ObraCard.jsx'
import Lightbox from '../components/Lightbox.jsx'
import Reveal from '../components/Reveal.jsx'

export default function Galeria() {
  const location = useLocation()
  // Si venimos del carrusel de inicio, abrir directamente esa obra
  const [indice, setIndice] = useState(() => {
    const id = location.state?.obraId
    return id ? obras.findIndex((obra) => obra.id === id) : -1
  })

  const navegar = (direccion) =>
    setIndice((actual) => (actual + direccion + obras.length) % obras.length)

  return (
    <>
      <EncabezadoPagina titulo="Galería">
        Todas las obras, punto a punto. Toca cualquiera para verla de cerca.
      </EncabezadoPagina>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        {obras.map((obra, i) => (
          <Reveal key={obra.id} retraso={(i % 3) * 90}>
            <ObraCard obra={obra} onVer={() => setIndice(i)} />
          </Reveal>
        ))}
      </section>

      <Lightbox obras={obras} indice={indice} onCerrar={() => setIndice(-1)} onNavegar={navegar} />
    </>
  )
}

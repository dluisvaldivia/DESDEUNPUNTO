import { useState } from 'react'
import { obras } from '../data/obras.js'
import EncabezadoPagina from '../components/EncabezadoPagina.jsx'
import ObraCard from '../components/ObraCard.jsx'
import Lightbox from '../components/Lightbox.jsx'
import Reveal from '../components/Reveal.jsx'
import BotonWhatsApp from '../components/BotonWhatsApp.jsx'

export default function Productos() {
  const [indice, setIndice] = useState(-1)

  const navegar = (direccion) =>
    setIndice((actual) => (actual + direccion + obras.length) % obras.length)

  return (
    <>
      <EncabezadoPagina titulo="Obras a la venta">
        Todas las piezas son originales y únicas, pintadas a mano. ¿Viste algo que te gustó?
        Consulta por WhatsApp y coordinamos el pago y la entrega.
      </EncabezadoPagina>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 pb-16 sm:grid-cols-2 lg:grid-cols-3">
        {obras.map((obra, i) => (
          <Reveal key={obra.id} retraso={(i % 3) * 90}>
            <ObraCard obra={obra} onVer={() => setIndice(i)} conPrecio conBotones />
          </Reveal>
        ))}
      </section>

      {/* Encargos personalizados */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <Reveal>
          <div className="rounded-3xl bg-tinta px-6 py-12 text-center text-crema sm:px-12">
            <h2 className="text-3xl text-crema sm:text-4xl">¿Quieres un mandala personalizado?</h2>
            <p className="mx-auto mt-4 max-w-xl text-crema/80">
              Se hacen obras por encargo: elige el tamaño, la paleta de colores y la intención, y
              la artista lo convierte en puntos.
            </p>
            <div className="mt-8 flex justify-center">
              <BotonWhatsApp mensaje="Hola, me gustaría encargar un mandala personalizado. ¿Podemos conversar?">
                Pedir un encargo
              </BotonWhatsApp>
            </div>
          </div>
        </Reveal>
      </section>

      <Lightbox obras={obras} indice={indice} onCerrar={() => setIndice(-1)} onNavegar={navegar} />
    </>
  )
}

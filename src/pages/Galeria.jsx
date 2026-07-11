import { obras } from '../data/catalogo.js'
import { sitio } from '../data/site.js'
import useObraEnUrl from '../hooks/useObraEnUrl.js'
import EncabezadoPagina from '../components/EncabezadoPagina.jsx'
import ObraCard from '../components/ObraCard.jsx'
import Lightbox from '../components/Lightbox.jsx'
import Reveal from '../components/Reveal.jsx'
import DivisorPuntos from '../components/DivisorPuntos.jsx'
import BotonWhatsApp from '../components/BotonWhatsApp.jsx'

export default function Galeria() {
  const { indice, abrir, cerrar, navegar } = useObraEnUrl(obras)

  return (
    <>
      <EncabezadoPagina titulo="Galería">
        Todas las obras, punto a punto. Toca cualquiera para verla de cerca.
        <span className="mt-2 block italic text-tinta-suave/70">
          También se aceptan encargos personalizados.
        </span>
      </EncabezadoPagina>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {obras.map((obra, i) => (
          <Reveal key={obra.id} retraso={(i % 3) * 90}>
            <ObraCard obra={obra} onVer={() => abrir(i)} conPrecio conBotones />
          </Reveal>
        ))}
      </section>

      {/* Llamado a encargos, al cierre de la galería */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        <Reveal>
          <DivisorPuntos />
          <h2 className="mt-6 text-3xl text-tinta sm:text-4xl">¿No encuentras la tuya?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-tinta-suave/80">
            Se hacen mandalas por encargo: tú eliges los colores, el tamaño y la idea, y{' '}
            {sitio.artista} la pinta punto a punto.
          </p>
          <div className="mt-8 flex justify-center">
            <BotonWhatsApp mensaje="Hola, me gustaría encargar un mandala personalizado. ¿Me cuentas cómo funciona?">
              Pedir un encargo
            </BotonWhatsApp>
          </div>
        </Reveal>
      </section>

      <Lightbox obras={obras} indice={indice} onCerrar={cerrar} onNavegar={navegar} />
    </>
  )
}

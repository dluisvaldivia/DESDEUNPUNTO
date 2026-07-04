import { sitio } from '../data/site.js'
import EncabezadoPagina from '../components/EncabezadoPagina.jsx'
import Reveal from '../components/Reveal.jsx'
import BotonWhatsApp from '../components/BotonWhatsApp.jsx'
import retratoArtista from '../assets/artista-placeholder.svg'

const pasos = [
  {
    numero: '01',
    titulo: 'Un punto',
    texto:
      'Todo empieza en el centro: un solo punto sobre el lienzo en blanco marca el corazón del mandala.',
  },
  {
    numero: '02',
    titulo: 'Miles de puntos',
    texto:
      'Con pinceles de punta y mucha paciencia, los anillos crecen punto a punto, capa por capa, color por color.',
  },
  {
    numero: '03',
    titulo: 'Una obra única',
    texto:
      'Ningún mandala se repite. Cada pieza se sella, se firma y queda lista para acompañarte en casa.',
  },
]

export default function SobreLaArtista() {
  return (
    <>
      <EncabezadoPagina titulo="Sobre la artista">
        La mano (y la paciencia) detrás de cada punto.
      </EncabezadoPagina>

      <section className="mx-auto grid max-w-5xl items-start gap-10 px-4 pb-16 md:grid-cols-[2fr_3fr]">
        <Reveal>
          <img
            src={retratoArtista}
            alt={`Retrato de ${sitio.artista}`}
            className="w-full rounded-2xl border border-arena/70 shadow-lg shadow-tinta/10"
          />
        </Reveal>
        <Reveal retraso={120}>
          {/* ⚠️ Reemplazar con la biografía real de la artista */}
          <h2 className="text-3xl text-tinta">{sitio.artista}</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-tinta-suave/85">
            <p>
              Artista peruana enamorada del color y del detalle. Descubrió el puntillismo buscando
              una forma de pintar que fuera también una forma de meditar: punto a punto, respiro a
              respiro.
            </p>
            <p>
              Sus mandalas nacen de la geometría sagrada y de los paisajes que la rodean — los
              atardeceres, el mar, las flores del jardín. Cada obra toma días o semanas de trabajo
              minucioso con acrílicos y tintas sobre lienzo, madera y papel.
            </p>
            <p>
              Cuando no está pintando, está enseñando a otros que cualquier cosa enorme — una obra,
              un hábito, una vida — se construye igual: comenzando desde un punto.
            </p>
          </div>
        </Reveal>
      </section>

      {/* El proceso */}
      <section className="bg-tinta text-crema">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <Reveal className="text-center">
            <h2 className="text-3xl text-crema sm:text-4xl">Así nace un mandala</h2>
          </Reveal>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {pasos.map((paso, i) => (
              <Reveal key={paso.numero} retraso={i * 130} className="text-center">
                <p className="font-display text-5xl text-dorado">{paso.numero}</p>
                <h3 className="mt-3 font-display text-2xl text-crema">{paso.titulo}</h3>
                <p className="mt-3 leading-relaxed text-crema/75">{paso.texto}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 text-center">
            <BotonWhatsApp mensaje="Hola, vi la página Desde un Punto y me encantaría conversar con la artista.">
              Conversar con la artista
            </BotonWhatsApp>
          </Reveal>
        </div>
      </section>
    </>
  )
}

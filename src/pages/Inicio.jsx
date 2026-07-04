import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { sitio } from '../data/site.js'
import { obras, obrasDestacadas } from '../data/obras.js'
import MandalaHero from '../components/MandalaHero.jsx'
import Carrusel from '../components/Carrusel.jsx'
import Reveal from '../components/Reveal.jsx'
import DivisorPuntos from '../components/DivisorPuntos.jsx'
import BotonWhatsApp from '../components/BotonWhatsApp.jsx'

export default function Inicio() {
  const obraProceso = obras.find((obra) => obra.id === 'jardin-de-puntos') ?? obras[0]

  return (
    <>
      {/* Hero oscuro: los mandalas brillan sobre tinta */}
      <section className="relative overflow-hidden bg-tinta text-crema">
        <MandalaHero className="pointer-events-none absolute -right-20 top-1/2 hidden w-[460px] -translate-y-1/2 md:block lg:-right-8 lg:w-[540px]" />
        <MandalaHero className="pointer-events-none absolute -right-24 -top-24 w-72 opacity-40 md:hidden" />

        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32">
          <p className="text-sm font-semibold tracking-[0.3em] text-dorado uppercase">
            Arte en puntillismo
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-5xl leading-[1.1] text-crema sm:text-6xl">
            Todo comienza
            <br />
            desde un punto<span className="text-terracota-clara">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-crema/80">
            Mandalas originales pintados a mano por {sitio.artista}. Miles de puntos, paciencia y
            color convertidos en piezas únicas.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/galeria" className="btn-primario">
              Ver la galería
            </Link>
            <Link to="/productos" className="btn-secundario-oscuro">
              Obras a la venta
            </Link>
          </div>
        </div>
      </section>

      {/* Obras destacadas */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        <Reveal className="text-center">
          <DivisorPuntos />
          <h2 className="mt-5 text-3xl text-tinta sm:text-4xl">Obras destacadas</h2>
          <p className="mx-auto mt-3 max-w-xl text-tinta-suave/75">
            Una selección de las piezas favoritas. Desliza para verlas todas.
          </p>
        </Reveal>
        <Reveal className="mt-10" retraso={120}>
          <Carrusel obras={obrasDestacadas} />
        </Reveal>
      </section>

      {/* El proceso, en corto */}
      <section className="border-y border-arena/60 bg-marfil">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-20 md:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl text-tinta sm:text-4xl">El arte de la paciencia</h2>
            <p className="mt-5 text-lg leading-relaxed text-tinta-suave/85">
              Cada obra nace de un solo punto en el centro del lienzo. Alrededor de él crecen
              anillos, pétalos y espirales: miles de puntos aplicados uno a uno, con calma y
              precisión, hasta que el mandala respira solo.
            </p>
            <Link
              to="/sobre-la-artista"
              className="mt-6 inline-flex items-center gap-1.5 font-semibold text-terracota transition-colors hover:text-terracota-clara"
            >
              Conoce a la artista <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <Reveal retraso={150}>
            <img
              src={obraProceso.imagen}
              alt={obraProceso.descripcion}
              loading="lazy"
              className="w-full rounded-2xl border border-arena/70 shadow-lg shadow-tinta/10"
            />
          </Reveal>
        </div>
      </section>

      {/* Llamado a contacto */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-24">
        <Reveal>
          <DivisorPuntos />
          <h2 className="mt-6 text-3xl text-tinta sm:text-4xl">¿Te enamoraste de alguna obra?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-tinta-suave/80">
            Escríbenos y coordinamos la entrega. También se hacen mandalas por encargo, con los
            colores y el tamaño que imagines.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <BotonWhatsApp>Escribir por WhatsApp</BotonWhatsApp>
            <Link to="/contacto" className="btn-secundario">
              Más formas de contacto
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}

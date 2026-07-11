import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import patronHero from '../assets/pattern1.webp'
import { sitio } from '../data/site.js'
import { obrasDestacadas } from '../data/catalogo.js'
import MandalaHero from '../components/MandalaHero.jsx'
import Carrusel from '../components/Carrusel.jsx'
import Reveal from '../components/Reveal.jsx'
import DivisorPuntos from '../components/DivisorPuntos.jsx'
import BotonWhatsApp from '../components/BotonWhatsApp.jsx'

export default function Inicio() {
  return (
    <>
      {/* Hero claro: la foto del mandala se ve a color y el texto va en tinta */}
      <section className="relative overflow-hidden bg-marfil text-tinta">
        <img
          src={patronHero}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />

        <MandalaHero className="pointer-events-none absolute -right-24 top-1/2 hidden w-[580px] -translate-y-1/2 md:block lg:-right-12 lg:w-[680px]" />
        <MandalaHero className="pointer-events-none absolute -right-28 -top-28 w-96 opacity-40 md:hidden" />

        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32">
          <p className="text-sm font-semibold tracking-[0.3em] text-oro-oscuro uppercase">
            Arte en puntillismo
          </p>
          <h1 className="mt-4 max-w-3xl text-6xl leading-[1.15] font-bold text-blanco sm:text-7xl">
            Todo comienza
            <br />
            con un <span className="titulo-puntos">punto</span>
            <span className="text-oro">.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-blanco/85">
            Mandalas originales pintados a mano por {sitio.artista}. Miles de puntos, paciencia y
            color convertidos en piezas únicas.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/galeria" className="btn-primario">
              Ver la galería
            </Link>
          </div>
        </div>
      </section>

      {/* Obras destacadas */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <Reveal className="text-center">
          <DivisorPuntos />
          <h2 className="mt-5 text-3xl text-tinta sm:text-4xl">Obras destacadas</h2>
          <p className="mx-auto mt-3 max-w-xl text-tinta-suave/75">
            Una selección de las piezas favoritas. Desliza para verlas todas.
          </p>
        </Reveal>
        <Reveal className="mt-12" retraso={120}>
          <Carrusel obras={obrasDestacadas} />
        </Reveal>
        <Reveal className="mt-12 flex justify-center" retraso={200}>
          <Link to="/galeria" className="btn-secundario">
            Ver más obras en la galería <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>

      {/* Llamado a contacto */}
      <section className="border-t border-arena-oscuro bg-marfil">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-24">
          <Reveal>
            <DivisorPuntos />
            <h2 className="mt-6 text-3xl text-tinta sm:text-4xl">¿Te enamoraste de alguna obra?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-tinta-suave/80">
              Escríbenos y coordinamos la entrega. También se hacen mandalas por encargo, con los
              colores y el tamaño que imagines.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <BotonWhatsApp>Escribir por WhatsApp</BotonWhatsApp>
              <Link to="/sobre-la-artista" className="btn-secundario">
                Conoce a la artista <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

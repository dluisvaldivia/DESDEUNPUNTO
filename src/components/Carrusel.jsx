import { useCallback, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'

// Cuánto se desvanece una obra por cada "paso" que se aleja del centro.
// Con 0.8, la obra vecina queda en ~0.2 de opacidad y las siguientes en 0.
const FACTOR_DESVANECIDO = 0.8

const entre = (valor, min, max) => Math.min(Math.max(valor, min), max)

export default function Carrusel({ obras }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })
  const factor = useRef(0)

  const calcularFactor = useCallback((embla) => {
    factor.current = FACTOR_DESVANECIDO * embla.scrollSnapList().length
  }, [])

  // Opacidad continua según la distancia de cada slide al centro del carrusel.
  const desvanecer = useCallback((embla, evento) => {
    const engine = embla.internalEngine()
    const progreso = embla.scrollProgress()
    const visibles = embla.slidesInView()
    const esScroll = evento === 'scroll'

    embla.scrollSnapList().forEach((snap, indiceSnap) => {
      let distancia = snap - progreso

      engine.slideRegistry[indiceSnap].forEach((indiceSlide) => {
        if (esScroll && !visibles.includes(indiceSlide)) return

        // En modo loop las obras clonadas a los extremos necesitan su distancia real.
        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((punto) => {
            const objetivo = punto.target()
            if (indiceSlide !== punto.index || objetivo === 0) return

            distancia =
              Math.sign(objetivo) === -1
                ? snap - (1 + progreso)
                : snap + (1 - progreso)
          })
        }

        const opacidad = entre(1 - Math.abs(distancia * factor.current), 0, 1)
        embla.slideNodes()[indiceSlide].style.opacity = String(opacidad)
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    calcularFactor(emblaApi)
    desvanecer(emblaApi)

    emblaApi
      .on('reInit', calcularFactor)
      .on('reInit', desvanecer)
      .on('scroll', desvanecer)
      .on('slideFocus', desvanecer)
  }, [emblaApi, calcularFactor, desvanecer])

  return (
    <div>
      <div className="carrusel-difuminado overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {obras.map((obra) => (
            <div
              key={obra.id}
              className="min-w-0 shrink-0 grow-0 basis-[88%] px-3 sm:basis-[66%] sm:px-4 lg:basis-[50%] lg:px-6"
            >
              <Link to={`/galeria?obra=${obra.id}`} className="group block">
                {/* Mismo paspartú que ObraCard: la obra entera, con aire. */}
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-arena-oscuro bg-marfil p-8 shadow-lg shadow-tinta/10 sm:p-10">
                  <img
                    src={obra.imagen}
                    alt={obra.descripcion}
                    loading="lazy"
                    className="h-full w-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-display text-xl text-tinta">{obra.titulo}</h3>
                  <p className="text-sm text-tinta-suave/70">{obra.tecnica}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Las flechas van debajo, en el espacio que antes ocupaban los puntos. */}
      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => emblaApi && emblaApi.scrollPrev()}
          aria-label="Obra anterior"
          className="cursor-pointer text-oro-oscuro transition-transform duration-200 hover:scale-110 hover:text-oro"
        >
          <FaArrowCircleLeft className="size-9" />
        </button>
        <button
          type="button"
          onClick={() => emblaApi && emblaApi.scrollNext()}
          aria-label="Obra siguiente"
          className="cursor-pointer text-oro-oscuro transition-transform duration-200 hover:scale-110 hover:text-oro"
        >
          <FaArrowCircleRight className="size-9" />
        </button>
      </div>
    </div>
  )
}

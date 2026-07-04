import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Carrusel({ obras }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' }, [
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ])
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const alSeleccionar = () => setIndice(emblaApi.selectedScrollSnap())
    emblaApi.on('select', alSeleccionar)
    return () => {
      emblaApi.off('select', alSeleccionar)
    }
  }, [emblaApi])

  const irA = useCallback((i) => emblaApi && emblaApi.scrollTo(i), [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {obras.map((obra) => (
            <div
              key={obra.id}
              className="min-w-0 shrink-0 grow-0 basis-[84%] px-2.5 sm:basis-[58%] lg:basis-[40%]"
            >
              <Link to="/galeria" state={{ obraId: obra.id }} className="group block">
                <div className="overflow-hidden rounded-2xl shadow-lg shadow-tinta/10">
                  <img
                    src={obra.imagen}
                    alt={obra.descripcion}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
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

      <button
        type="button"
        onClick={() => emblaApi && emblaApi.scrollPrev()}
        aria-label="Obra anterior"
        className="absolute top-[38%] left-1 cursor-pointer rounded-full border border-arena bg-marfil/90 p-2.5 text-tinta shadow-md transition-colors hover:bg-marfil sm:left-3"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => emblaApi && emblaApi.scrollNext()}
        aria-label="Obra siguiente"
        className="absolute top-[38%] right-1 cursor-pointer rounded-full border border-arena bg-marfil/90 p-2.5 text-tinta shadow-md transition-colors hover:bg-marfil sm:right-3"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="mt-6 flex justify-center gap-2.5">
        {obras.map((obra, i) => (
          <button
            key={obra.id}
            type="button"
            onClick={() => irA(i)}
            aria-label={`Ir a la obra ${i + 1}: ${obra.titulo}`}
            aria-current={i === indice}
            className={`size-2.5 cursor-pointer rounded-full transition-all duration-300 ${
              i === indice ? 'scale-125 bg-terracota' : 'bg-arena hover:bg-terracota-clara'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

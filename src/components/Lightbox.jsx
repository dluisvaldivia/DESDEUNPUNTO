import { useEffect, useRef } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ obras, indice, onCerrar, onNavegar }) {
  const botonCerrar = useRef(null)
  const abierto = indice >= 0

  useEffect(() => {
    if (!abierto) return

    function alTeclear(evento) {
      if (evento.key === 'Escape') onCerrar()
      if (evento.key === 'ArrowLeft') onNavegar(-1)
      if (evento.key === 'ArrowRight') onNavegar(1)
    }

    document.addEventListener('keydown', alTeclear)
    document.body.style.overflow = 'hidden'
    botonCerrar.current?.focus()

    return () => {
      document.removeEventListener('keydown', alTeclear)
      document.body.style.overflow = ''
    }
  }, [abierto, onCerrar, onNavegar])

  if (!abierto) return null
  const obra = obras[indice]

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-tinta/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Obra: ${obra.titulo}`}
      onClick={onCerrar}
    >
      <button
        ref={botonCerrar}
        type="button"
        onClick={onCerrar}
        aria-label="Cerrar"
        className="absolute top-4 right-4 z-10 cursor-pointer rounded-full p-2.5 text-crema/80 transition-colors hover:bg-crema/10 hover:text-crema"
      >
        <X className="size-6" />
      </button>

      <div className="flex flex-1 items-center justify-center gap-2 p-4 sm:gap-4 sm:p-8">
        <button
          type="button"
          onClick={(evento) => {
            evento.stopPropagation()
            onNavegar(-1)
          }}
          aria-label="Obra anterior"
          className="shrink-0 cursor-pointer rounded-full p-2 text-crema/70 transition-colors hover:bg-crema/10 hover:text-crema"
        >
          <ChevronLeft className="size-7" />
        </button>

        <figure className="min-w-0" onClick={(evento) => evento.stopPropagation()}>
          <img
            src={obra.imagen}
            alt={obra.descripcion}
            className="mx-auto max-h-[68dvh] w-auto max-w-full rounded-lg shadow-2xl"
          />
          <figcaption className="mt-5 text-center text-crema">
            <span className="block font-display text-2xl">{obra.titulo}</span>
            <span className="mt-1 block text-sm text-crema/70">
              {obra.tecnica} · {obra.medidas}
            </span>
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={(evento) => {
            evento.stopPropagation()
            onNavegar(1)
          }}
          aria-label="Obra siguiente"
          className="shrink-0 cursor-pointer rounded-full p-2 text-crema/70 transition-colors hover:bg-crema/10 hover:text-crema"
        >
          <ChevronRight className="size-7" />
        </button>
      </div>
    </div>
  )
}

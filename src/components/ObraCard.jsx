import { ZoomIn } from 'lucide-react'
import { formatearPrecio } from '../data/obras.js'
import BotonWhatsApp from './BotonWhatsApp.jsx'

export default function ObraCard({ obra, onVer, conPrecio = false, conBotones = false }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-arena-oscuro bg-blanco shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-tinta/10">
      {/* Paspartú: la obra se monta entera sobre marfil, con aire alrededor.
          Nunca object-cover — el encuadre lo decide la artista, no la grilla. */}
      <button
        type="button"
        onClick={onVer}
        aria-label={`Ver «${obra.titulo}» en grande`}
        className="relative flex aspect-square w-full cursor-zoom-in items-center justify-center overflow-hidden border-b border-arena-oscuro bg-marfil p-6 sm:p-8"
      >
        <img
          src={obra.imagen}
          alt={obra.descripcion}
          loading="lazy"
          className="h-full w-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-tinta/85 px-3 py-1.5 text-xs font-semibold text-blanco opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <ZoomIn className="size-3.5" /> Ver de cerca
        </span>
      </button>

      <div className="p-4 sm:p-5">
        <h3 className="font-display text-xl text-tinta">{obra.titulo}</h3>
        <p className="mt-1 text-sm text-tinta-suave/70">
          {obra.tecnica} · {obra.medidas}
        </p>

        {conPrecio ? (
          <p className="mt-3 text-lg font-bold text-oro-oscuro">{formatearPrecio(obra.precio)}</p>
        ) : null}

        {conBotones ? (
          <div className="mt-4 flex flex-wrap gap-2.5">
            <BotonWhatsApp
              mensaje={`Hola, me interesa la obra «${obra.titulo}». ¿Sigue disponible?`}
            >
              Consultar
            </BotonWhatsApp>
          </div>
        ) : null}
      </div>
    </article>
  )
}

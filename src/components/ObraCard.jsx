import { ZoomIn, Mail } from 'lucide-react'
import { formatearPrecio } from '../data/obras.js'
import { enlaceEmail } from '../data/site.js'
import BotonWhatsApp from './BotonWhatsApp.jsx'

export default function ObraCard({ obra, onVer, conPrecio = false, conBotones = false }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-arena/70 bg-marfil shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-tinta/10">
      <button
        type="button"
        onClick={onVer}
        aria-label={`Ver «${obra.titulo}» en grande`}
        className="relative block w-full cursor-zoom-in overflow-hidden"
      >
        <img
          src={obra.imagen}
          alt={obra.descripcion}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <span className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-tinta/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-crema">
            <ZoomIn className="size-4" /> Ver de cerca
          </span>
        </span>
      </button>

      <div className="p-4 sm:p-5">
        <h3 className="font-display text-xl text-tinta">{obra.titulo}</h3>
        <p className="mt-1 text-sm text-tinta-suave/70">
          {obra.tecnica} · {obra.medidas}
        </p>

        {conPrecio ? (
          <p className="mt-3 text-lg font-bold text-terracota">{formatearPrecio(obra.precio)}</p>
        ) : null}

        {conBotones ? (
          <div className="mt-4 flex flex-wrap gap-2.5">
            <BotonWhatsApp
              mensaje={`Hola, me interesa la obra «${obra.titulo}» (${formatearPrecio(obra.precio)}). ¿Sigue disponible?`}
            >
              Consultar
            </BotonWhatsApp>
            <a
              href={enlaceEmail(`Consulta por la obra «${obra.titulo}»`)}
              className="btn-secundario"
              aria-label={`Consultar por «${obra.titulo}» por email`}
            >
              <Mail className="size-5" /> Email
            </a>
          </div>
        ) : null}
      </div>
    </article>
  )
}

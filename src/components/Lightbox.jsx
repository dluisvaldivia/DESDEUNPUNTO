import { useCallback, useEffect, useRef, useState } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Share2, Check } from 'lucide-react'
import { sitio, enlaceObra } from '../data/site.js'

const ZOOM_MINIMO = 1
const ZOOM_MAXIMO = 5
const ZOOM_AL_CLIC = 2.5
const PASO_ZOOM = 0.5

export default function Lightbox({ obras, indice, onCerrar, onNavegar }) {
  const botonCerrar = useRef(null)
  const imagen = useRef(null)
  const marco = useRef(null)
  const arrastre = useRef(null)
  const [zoom, setZoom] = useState(1)
  const [desplazamiento, setDesplazamiento] = useState({ x: 0, y: 0 })
  const [copiado, setCopiado] = useState(false)
  const abierto = indice >= 0
  const ampliada = zoom > 1

  const restablecer = useCallback(() => {
    setZoom(1)
    setDesplazamiento({ x: 0, y: 0 })
    setCopiado(false)
  }, [])

  // Impide arrastrar la obra fuera de la pantalla: solo se puede mover mientras
  // la imagen ampliada sea más grande que el marco visible.
  const limitar = useCallback((posicion, escala) => {
    const img = imagen.current
    const vista = marco.current
    if (!img || !vista) return { x: 0, y: 0 }
    const maximoX = Math.max(0, (img.offsetWidth * escala - vista.clientWidth) / 2)
    const maximoY = Math.max(0, (img.offsetHeight * escala - vista.clientHeight) / 2)
    return {
      x: Math.min(maximoX, Math.max(-maximoX, posicion.x)),
      y: Math.min(maximoY, Math.max(-maximoY, posicion.y)),
    }
  }, [])

  // Cambia el zoom manteniendo fijo el punto de la obra que está bajo el cursor
  // (si no se pasa un punto, amplía desde el centro).
  const aplicarZoom = useCallback(
    (nuevoZoom, punto) => {
      const escala = Math.min(ZOOM_MAXIMO, Math.max(ZOOM_MINIMO, nuevoZoom))
      setZoom((anterior) => {
        setDesplazamiento((posicion) => {
          const img = imagen.current
          if (!img || !punto) return limitar(posicion, escala)
          const caja = img.getBoundingClientRect()
          const centroX = caja.left + caja.width / 2
          const centroY = caja.top + caja.height / 2
          const dx = punto.x - centroX
          const dy = punto.y - centroY
          const factor = escala / anterior
          return limitar(
            { x: dx - factor * (dx - posicion.x), y: dy - factor * (dy - posicion.y) },
            escala,
          )
        })
        return escala
      })
    },
    [limitar],
  )

  useEffect(restablecer, [indice, restablecer])

  useEffect(() => {
    if (!abierto) return

    function alTeclear(evento) {
      if (evento.key === 'Escape') onCerrar()
      if (evento.key === 'ArrowLeft') onNavegar(-1)
      if (evento.key === 'ArrowRight') onNavegar(1)
      if (evento.key === '+' || evento.key === '=') aplicarZoom(zoom + PASO_ZOOM)
      if (evento.key === '-') aplicarZoom(zoom - PASO_ZOOM)
      if (evento.key === '0') restablecer()
    }

    document.addEventListener('keydown', alTeclear)
    document.body.style.overflow = 'hidden'
    botonCerrar.current?.focus()

    return () => {
      document.removeEventListener('keydown', alTeclear)
      document.body.style.overflow = ''
    }
  }, [abierto, zoom, onCerrar, onNavegar, aplicarZoom, restablecer])

  useEffect(() => {
    if (!copiado) return
    const temporizador = setTimeout(() => setCopiado(false), 2000)
    return () => clearTimeout(temporizador)
  }, [copiado])

  if (!abierto) return null
  const obra = obras[indice]

  // Se comparte /obra/<id> y no la dirección actual (/galeria?obra=<id>): esa
  // es la que tiene una página propia con la foto de la obra en la vista previa.
  // En el móvil abre el menú del sistema (WhatsApp, Instagram…); en el
  // escritorio, donde casi ningún navegador lo tiene, copia el enlace.
  async function compartir(evento) {
    evento.stopPropagation()
    const enlace = enlaceObra(obra.id)
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${obra.titulo} — ${sitio.nombre}`,
          text: `Mira "${obra.titulo}", un mandala en puntillismo hecho a mano.`,
          url: enlace,
        })
        return
      }
      await navigator.clipboard.writeText(enlace)
      setCopiado(true)
    } catch {
      // El usuario canceló el menú de compartir: no hay nada que hacer.
    }
  }

  function alRodar(evento) {
    evento.preventDefault()
    const direccion = evento.deltaY < 0 ? PASO_ZOOM : -PASO_ZOOM
    aplicarZoom(zoom + direccion, { x: evento.clientX, y: evento.clientY })
  }

  function alPresionar(evento) {
    evento.currentTarget.setPointerCapture(evento.pointerId)
    arrastre.current = {
      inicioX: evento.clientX,
      inicioY: evento.clientY,
      origenX: evento.clientX - desplazamiento.x,
      origenY: evento.clientY - desplazamiento.y,
      movido: false,
    }
  }

  function alMover(evento) {
    const gesto = arrastre.current
    if (!gesto) return
    if (Math.hypot(evento.clientX - gesto.inicioX, evento.clientY - gesto.inicioY) > 4) {
      gesto.movido = true
    }
    if (!ampliada || !gesto.movido) return
    setDesplazamiento(
      limitar({ x: evento.clientX - gesto.origenX, y: evento.clientY - gesto.origenY }, zoom),
    )
  }

  // Un solo clic amplía; estando ampliada, el clic (sin arrastrar) vuelve al
  // tamaño original.
  function alSoltar(evento) {
    const gesto = arrastre.current
    arrastre.current = null
    if (!gesto || gesto.movido) return
    if (ampliada) restablecer()
    else aplicarZoom(ZOOM_AL_CLIC, { x: evento.clientX, y: evento.clientY })
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-tinta/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Obra: ${obra.titulo}`}
      onClick={onCerrar}
    >
      {/* Marco de la obra: ocupa toda la pantalla para que la imagen ampliada
          pueda crecer más allá de su tamaño original. */}
      <div
        ref={marco}
        className="absolute inset-0 flex touch-none items-center justify-center overflow-hidden px-4 pt-16 pb-28 sm:px-8"
        onClick={(evento) => evento.stopPropagation()}
        onWheel={alRodar}
        onPointerDown={alPresionar}
        onPointerMove={alMover}
        onPointerUp={alSoltar}
        onPointerCancel={() => (arrastre.current = null)}
      >
        <img
          ref={imagen}
          src={obra.imagen}
          alt={obra.descripcion}
          draggable={false}
          style={{
            transform: `translate(${desplazamiento.x}px, ${desplazamiento.y}px) scale(${zoom})`,
          }}
          className={`max-h-full max-w-full rounded-lg shadow-2xl select-none ${
            ampliada
              ? 'cursor-zoom-out active:cursor-grabbing'
              : 'cursor-zoom-in transition-transform duration-200'
          }`}
        />
      </div>

      <div className="absolute top-4 right-4 z-10 flex items-center gap-1">
        <button
          type="button"
          onClick={compartir}
          aria-label={`Compartir «${obra.titulo}»`}
          className="cursor-pointer rounded-full p-2.5 text-blanco/80 transition-colors hover:bg-blanco/10 hover:text-blanco"
        >
          {copiado ? <Check className="size-5" /> : <Share2 className="size-5" />}
        </button>
        <button
          type="button"
          onClick={(evento) => {
            evento.stopPropagation()
            aplicarZoom(zoom - PASO_ZOOM)
          }}
          disabled={zoom <= ZOOM_MINIMO}
          aria-label="Alejar"
          className="cursor-pointer rounded-full p-2.5 text-blanco/80 transition-colors hover:bg-blanco/10 hover:text-blanco disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ZoomOut className="size-5" />
        </button>
        <button
          type="button"
          onClick={(evento) => {
            evento.stopPropagation()
            aplicarZoom(zoom + PASO_ZOOM)
          }}
          disabled={zoom >= ZOOM_MAXIMO}
          aria-label="Acercar"
          className="cursor-pointer rounded-full p-2.5 text-blanco/80 transition-colors hover:bg-blanco/10 hover:text-blanco disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <ZoomIn className="size-5" />
        </button>
        <button
          ref={botonCerrar}
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar"
          className="cursor-pointer rounded-full p-2.5 text-blanco/80 transition-colors hover:bg-blanco/10 hover:text-blanco"
        >
          <X className="size-6" />
        </button>
      </div>

      <div
        aria-live="polite"
        className={`pointer-events-none absolute top-16 right-4 z-10 rounded-full bg-blanco/15 px-3 py-1.5 text-xs text-blanco backdrop-blur-sm transition-opacity duration-200 ${
          copiado ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {copiado ? 'Enlace copiado' : ''}
      </div>

      {/* Flechas y ficha se apartan mientras la obra está ampliada. */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-200 ${
          ampliada ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <button
          type="button"
          onClick={(evento) => {
            evento.stopPropagation()
            onNavegar(-1)
          }}
          disabled={ampliada}
          aria-label="Obra anterior"
          className="pointer-events-auto absolute top-1/2 left-1 -translate-y-1/2 cursor-pointer rounded-full bg-tinta/40 p-2 text-blanco/70 transition-colors hover:bg-blanco/10 hover:text-blanco disabled:pointer-events-none sm:left-4"
        >
          <ChevronLeft className="size-7" />
        </button>
        <button
          type="button"
          onClick={(evento) => {
            evento.stopPropagation()
            onNavegar(1)
          }}
          disabled={ampliada}
          aria-label="Obra siguiente"
          className="pointer-events-auto absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer rounded-full bg-tinta/40 p-2 text-blanco/70 transition-colors hover:bg-blanco/10 hover:text-blanco disabled:pointer-events-none sm:right-4"
        >
          <ChevronRight className="size-7" />
        </button>

        <div className="absolute inset-x-0 bottom-5 text-center text-blanco">
          <span className="block font-display text-2xl">{obra.titulo}</span>
          <span className="mt-1 block text-sm text-blanco/70">
            {obra.tecnica} · {obra.medidas}
          </span>
          <span className="mt-2 block text-xs text-blanco/50">
            Haz clic en la obra para acercar · arrastra para moverte
          </span>
        </div>
      </div>
    </div>
  )
}

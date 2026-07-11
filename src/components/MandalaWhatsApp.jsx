import { TRAZO_WHATSAPP } from './BotonWhatsApp.jsx'

// Mandala de puntos que corona el ícono de WhatsApp en Contacto. Fuera de la
// paleta del sitio a propósito: todos los tonos salen de la marca WhatsApp
// (verde #25d366, teal #128c7e, verde oscuro #075e54) para que la tarjeta se
// reconozca de un vistazo.
//
// Los anillos alternan tono claro / oscuro hacia afuera y van desfasados media
// posición para que los puntos no se alineen en radios.
const ANILLOS = [
  { radio: 23, cantidad: 8, r: 2.6, color: '#25d366' },
  { radio: 30, cantidad: 12, r: 1.8, color: '#128c7e', fase: 0.5 },
  { radio: 36, cantidad: 16, r: 2.8, color: '#1ebea5' },
  { radio: 42, cantidad: 24, r: 1.7, color: '#075e54', fase: 0.5 },
  { radio: 47, cantidad: 32, r: 2.3, color: '#25d366', opacidad: 0.7 },
]

function Anillo({ radio, cantidad, r, color, fase = 0, opacidad = 1 }) {
  const puntos = Array.from({ length: cantidad }, (_, i) => {
    const angulo = ((i + fase) * 2 * Math.PI) / cantidad
    return (
      <circle
        key={i}
        cx={(radio * Math.cos(angulo)).toFixed(2)}
        cy={(radio * Math.sin(angulo)).toFixed(2)}
        r={r}
      />
    )
  })
  return (
    <g fill={color} opacity={opacidad}>
      {puntos}
    </g>
  )
}

export default function MandalaWhatsApp({ className = '' }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true">
      {/* transform-box: fill-box para que el giro sea sobre el centro del propio
          mandala y no sobre el 0,0 del viewBox (ver MandalaHero). El ícono queda
          fuera del grupo: gira el mandala, no el logo. */}
      <g
        className="animate-girar-lento"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        {ANILLOS.map((anillo) => (
          <Anillo key={anillo.radio} {...anillo} />
        ))}
      </g>
      {/* El trazo viene en 24×24: se escala a 28 unidades y se centra. Cabe de
          sobra dentro del primer anillo (radio 23 − punto 2.6 = 20.4 libre). */}
      <g transform="translate(-14 -14) scale(1.1667)" fill="#075e54">
        <path d={TRAZO_WHATSAPP} />
      </g>
    </svg>
  )
}

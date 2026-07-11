// Mandala decorativo de puntos para el hero. Gira muy lento (se detiene con
// prefers-reduced-motion, ver index.css).

// Los anillos recorren la tetrada (oro → magenta → jade → índigo). La foto del
// hero es casi negra donde cae el mandala, así que ningún anillo puede ir en
// tinta: se pierde contra el fondo.
const ANILLOS = [
  { radio: 26, cantidad: 8, r: 4.8, color: '#a3236f' },
  { radio: 46, cantidad: 14, r: 4.1, color: '#1e8a48' },
  { radio: 66, cantidad: 20, r: 3.5, color: '#f8f7f0', opacidad: 0.9 },
  { radio: 88, cantidad: 24, r: 4.9, color: '#7a6f14' },
  { radio: 110, cantidad: 30, r: 3.4, color: '#3343cc', opacidad: 0.9 },
  { radio: 131, cantidad: 36, r: 4.1, color: '#a3236f', opacidad: 0.8 },
  { radio: 151, cantidad: 46, r: 2.7, color: '#1e8a48', opacidad: 0.55 },
]

function Anillo({ radio, cantidad, r, color, opacidad = 1 }) {
  const puntos = Array.from({ length: cantidad }, (_, i) => {
    const angulo = (i * 2 * Math.PI) / cantidad
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

export default function MandalaHero({ className = '' }) {
  return (
    <svg viewBox="-160 -160 320 320" className={className} aria-hidden="true">
      {/* transform-box: fill-box hace que el giro sea sobre el centro del propio
          mandala. Sin él, el origen se resuelve contra el viewBox (cuyo 0,0 es la
          esquina) y el mandala orbita hasta salirse de la vista. */}
      <g
        className="animate-girar-lento"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <circle r="8.5" fill="#7a6f14" />
        {ANILLOS.map((anillo) => (
          <Anillo key={anillo.radio} {...anillo} />
        ))}
      </g>
    </svg>
  )
}

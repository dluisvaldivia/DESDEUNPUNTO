// Mandala decorativo de puntos para el hero. Gira muy lento (se detiene con
// prefers-reduced-motion, ver index.css).

const ANILLOS = [
  { radio: 26, cantidad: 8, r: 3.4, color: '#d9a05b' },
  { radio: 46, cantidad: 14, r: 2.9, color: '#c67b5c' },
  { radio: 66, cantidad: 20, r: 2.5, color: '#f5f0e1', opacidad: 0.9 },
  { radio: 88, cantidad: 24, r: 3.5, color: '#a85d3f' },
  { radio: 110, cantidad: 30, r: 2.4, color: '#d9a05b', opacidad: 0.85 },
  { radio: 131, cantidad: 36, r: 2.9, color: '#c67b5c', opacidad: 0.8 },
  { radio: 151, cantidad: 46, r: 1.9, color: '#f5f0e1', opacidad: 0.55 },
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
      <circle r="6" fill="#d9a05b" />
      <g className="animate-girar-lento" style={{ transformOrigin: 'center' }}>
        {ANILLOS.map((anillo) => (
          <Anillo key={anillo.radio} {...anillo} />
        ))}
      </g>
    </svg>
  )
}

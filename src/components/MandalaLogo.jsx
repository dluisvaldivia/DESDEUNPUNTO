// Mandala compacto que hace de logo en el navbar. A 44px los puntos finos se
// pierden, así que son pocos anillos y de radio grande. La tetrada va del oro al
// jade hacia afuera; los anillos intermedios van desfasados media posición para
// que los puntos no queden alineados en radios.
const ANILLOS = [
  { radio: 20, cantidad: 6, r: 6.5, color: '#a3236f' },
  { radio: 32, cantidad: 6, r: 3.6, color: '#3343cc', fase: 0.5 },
  { radio: 43, cantidad: 12, r: 5, color: '#1e8a48' },
]

function Anillo({ radio, cantidad, r, color, fase = 0 }) {
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
  return <g fill={color}>{puntos}</g>
}

export default function MandalaLogo({ className = '' }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden="true">
      <circle r="8.5" fill="#7a6f14" />
      {ANILLOS.map((anillo) => (
        <Anillo key={anillo.radio} {...anillo} />
      ))}
    </svg>
  )
}

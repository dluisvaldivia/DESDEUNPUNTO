import { useEffect, useRef } from 'react'

// Envuelve contenido para que aparezca con una transición suave al entrar en
// pantalla. Respeta prefers-reduced-motion (aparece sin animación).
export default function Reveal({ children, className = '', retraso = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const elemento = ref.current
    if (!elemento) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elemento.classList.add('visible')
      return
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          elemento.classList.add('visible')
          observador.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observador.observe(elemento)
    return () => observador.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={retraso ? { transitionDelay: `${retraso}ms` } : undefined}
    >
      {children}
    </div>
  )
}

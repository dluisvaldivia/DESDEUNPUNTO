import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const enlaces = [
  { a: '/', texto: 'Inicio' },
  { a: '/galeria', texto: 'Galería' },
  { a: '/productos', texto: 'Productos' },
  { a: '/sobre-la-artista', texto: 'Sobre la artista' },
  { a: '/contacto', texto: 'Contacto' },
]

function claseEnlace({ isActive }) {
  return [
    'py-2 font-medium transition-colors duration-200',
    isActive
      ? 'text-terracota underline decoration-dotted decoration-2 underline-offset-8'
      : 'text-tinta-suave hover:text-terracota',
  ].join(' ')
}

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)

  return (
    <nav className="sticky top-0 z-40 border-b border-arena/60 bg-crema/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link
          to="/"
          className="font-display text-2xl lowercase text-tinta"
          onClick={() => setAbierto(false)}
        >
          desde un punto<span className="text-terracota">.</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {enlaces.map((enlace) => (
            <NavLink key={enlace.a} to={enlace.a} className={claseEnlace} end={enlace.a === '/'}>
              {enlace.texto}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          className="cursor-pointer rounded-lg p-2 text-tinta-suave hover:bg-arena/40 md:hidden"
          onClick={() => setAbierto(!abierto)}
          aria-expanded={abierto}
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        >
          {abierto ? <X /> : <Menu />}
        </button>
      </div>

      {abierto ? (
        <div className="border-t border-arena/60 px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {enlaces.map((enlace) => (
              <NavLink
                key={enlace.a}
                to={enlace.a}
                className={claseEnlace}
                end={enlace.a === '/'}
                onClick={() => setAbierto(false)}
              >
                {enlace.texto}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  )
}

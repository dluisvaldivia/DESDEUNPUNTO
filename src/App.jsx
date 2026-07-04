import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Inicio from './pages/Inicio.jsx'
import Galeria from './pages/Galeria.jsx'
import Productos from './pages/Productos.jsx'
import SobreLaArtista from './pages/SobreLaArtista.jsx'
import Contacto from './pages/Contacto.jsx'
import NoEncontrada from './pages/NoEncontrada.jsx'

function VolverArriba() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#contenido"
        className="btn-primario sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
      >
        Saltar al contenido
      </a>
      <VolverArriba />
      <Navbar />
      <main id="contenido" className="flex-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/sobre-la-artista" element={<SobreLaArtista />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NoEncontrada />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

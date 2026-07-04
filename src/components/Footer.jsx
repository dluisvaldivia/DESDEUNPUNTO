import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { sitio, enlaceWhatsApp, enlaceEmail } from '../data/site.js'
import { IconoWhatsApp } from './BotonWhatsApp.jsx'
import { IconoInstagram, IconoFacebook } from './IconosSociales.jsx'

export default function Footer() {
  return (
    <footer className="bg-tinta text-crema">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-2xl lowercase">
            desde un punto<span className="text-terracota-clara">.</span>
          </p>
          <p className="mt-3 max-w-xs text-crema/70">{sitio.lema}.</p>
        </div>

        <nav aria-label="Mapa del sitio" className="text-crema/80">
          <p className="mb-3 text-sm font-semibold tracking-widest text-dorado uppercase">Explora</p>
          <ul className="space-y-2">
            <li><Link className="hover:text-crema" to="/galeria">Galería</Link></li>
            <li><Link className="hover:text-crema" to="/productos">Obras a la venta</Link></li>
            <li><Link className="hover:text-crema" to="/sobre-la-artista">Sobre la artista</Link></li>
            <li><Link className="hover:text-crema" to="/contacto">Contacto</Link></li>
          </ul>
        </nav>

        <div className="text-crema/80">
          <p className="mb-3 text-sm font-semibold tracking-widest text-dorado uppercase">Contacto</p>
          <ul className="space-y-2">
            <li>
              <a className="inline-flex items-center gap-2 hover:text-crema" href={enlaceWhatsApp()} target="_blank" rel="noopener noreferrer">
                <IconoWhatsApp className="size-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 hover:text-crema" href={enlaceEmail()}>
                <Mail className="size-4" /> {sitio.email}
              </a>
            </li>
            {sitio.instagram ? (
              <li>
                <a className="inline-flex items-center gap-2 hover:text-crema" href={sitio.instagram} target="_blank" rel="noopener noreferrer">
                  <IconoInstagram className="size-4" /> Instagram
                </a>
              </li>
            ) : null}
            {sitio.facebook ? (
              <li>
                <a className="inline-flex items-center gap-2 hover:text-crema" href={sitio.facebook} target="_blank" rel="noopener noreferrer">
                  <IconoFacebook className="size-4" /> Facebook
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-crema/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-center text-sm text-crema/50">
          © {new Date().getFullYear()} {sitio.nombre} · Hecho a mano, punto a punto
        </p>
      </div>
    </footer>
  )
}

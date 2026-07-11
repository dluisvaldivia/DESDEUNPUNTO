import { Link } from 'react-router-dom'
import { sitio, enlaceWhatsApp } from '../data/site.js'
import { IconoWhatsApp } from './BotonWhatsApp.jsx'
import { IconoInstagram, IconoFacebook } from './IconosSociales.jsx'

export default function Footer() {
  return (
    <footer className="bg-tinta text-blanco">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-2xl lowercase">
            todo comienza con un punto<span className="text-oro">.</span>
          </p>
          <p className="mt-3 max-w-xs text-blanco/70">{sitio.lema}.</p>
        </div>

        <nav aria-label="Mapa del sitio" className="text-blanco/80">
          <p className="mb-3 text-sm font-semibold tracking-widest text-oro uppercase">Explora</p>
          <ul className="space-y-2">
            <li><Link className="hover:text-blanco" to="/galeria">Galería</Link></li>
            <li><Link className="hover:text-blanco" to="/sobre-la-artista">Sobre la artista</Link></li>
            <li><Link className="hover:text-blanco" to="/contacto">Contacto</Link></li>
          </ul>
        </nav>

        <div className="text-blanco/80">
          <p className="mb-3 text-sm font-semibold tracking-widest text-oro uppercase">Contacto</p>
          <ul className="space-y-2">
            <li>
              <a className="inline-flex items-center gap-2 hover:text-blanco" href={enlaceWhatsApp()} target="_blank" rel="noopener noreferrer">
                <IconoWhatsApp className="size-4" /> WhatsApp
              </a>
            </li>
            {sitio.instagram ? (
              <li>
                <a className="inline-flex items-center gap-2 hover:text-blanco" href={sitio.instagram} target="_blank" rel="noopener noreferrer">
                  <IconoInstagram className="size-4" /> Instagram
                </a>
              </li>
            ) : null}
            {sitio.facebook ? (
              <li>
                <a className="inline-flex items-center gap-2 hover:text-blanco" href={sitio.facebook} target="_blank" rel="noopener noreferrer">
                  <IconoFacebook className="size-4" /> Facebook
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-blanco/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-center text-sm text-blanco/50">
          © {new Date().getFullYear()} Hecho por{' '}
          <a
            className="underline underline-offset-4 hover:text-blanco"
            href="https://dluisvaldivia.github.io/DVPortfolio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Danny Valdivia
          </a>
        </p>
      </div>
    </footer>
  )
}

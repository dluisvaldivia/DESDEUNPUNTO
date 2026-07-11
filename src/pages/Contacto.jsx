import { sitio, enlaceWhatsApp } from '../data/site.js'
import EncabezadoPagina from '../components/EncabezadoPagina.jsx'
import Reveal from '../components/Reveal.jsx'
import MandalaWhatsApp from '../components/MandalaWhatsApp.jsx'
import { IconoInstagram, IconoFacebook } from '../components/IconosSociales.jsx'

export default function Contacto() {
  return (
    <>
      <EncabezadoPagina titulo="Contacto">
        Conversemos sin compromiso: consultas, precios, envíos o encargos personalizados.
      </EncabezadoPagina>

      <section className="mx-auto max-w-3xl px-4 pb-24">
        <Reveal>
          <div className="grid gap-5">
            <a
              href={enlaceWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 rounded-2xl border border-arena-oscuro bg-marfil p-8 text-center transition-all duration-300 hover:border-jade hover:shadow-lg hover:shadow-tinta/10"
            >
              <MandalaWhatsApp className="size-28 transition-transform duration-500 group-hover:scale-105" />
              <span className="font-display text-2xl text-tinta">WhatsApp</span>
              <span className="text-sm text-tinta-suave/70">
                La forma más rápida de recibir respuesta
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal retraso={150} className="mt-12 text-center">
          <p className="text-sm font-semibold tracking-widest text-tinta-suave/60 uppercase">
            Redes sociales
          </p>
          <div className="mt-4 flex justify-center gap-4">
            {sitio.instagram ? (
              <a
                href={sitio.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-arena-oscuro p-3.5 text-tinta-suave transition-colors hover:border-magenta hover:text-magenta"
              >
                <IconoInstagram className="size-6" />
              </a>
            ) : null}
            {sitio.facebook ? (
              <a
                href={sitio.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full border border-arena-oscuro p-3.5 text-tinta-suave transition-colors hover:border-magenta hover:text-magenta"
              >
                <IconoFacebook className="size-6" />
              </a>
            ) : null}
          </div>
        </Reveal>
      </section>
    </>
  )
}

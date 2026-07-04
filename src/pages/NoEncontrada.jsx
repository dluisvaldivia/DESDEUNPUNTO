import { Link } from 'react-router-dom'
import DivisorPuntos from '../components/DivisorPuntos.jsx'

export default function NoEncontrada() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
      <p className="font-display text-7xl text-terracota">404</p>
      <DivisorPuntos className="mt-6" />
      <h1 className="mt-6 text-3xl text-tinta">Esta página se salió del punto</h1>
      <p className="mt-4 text-lg text-tinta-suave/75">
        La dirección que buscas no existe (o todavía no la pintamos).
      </p>
      <Link to="/" className="btn-primario mt-8">
        Volver al inicio
      </Link>
    </section>
  )
}

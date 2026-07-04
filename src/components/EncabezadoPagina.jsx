import DivisorPuntos from './DivisorPuntos.jsx'

export default function EncabezadoPagina({ titulo, children }) {
  return (
    <header className="mx-auto max-w-6xl px-4 pt-14 pb-10 text-center sm:pt-20">
      <DivisorPuntos />
      <h1 className="mt-5 text-4xl text-tinta sm:text-5xl">{titulo}</h1>
      {children ? <p className="mx-auto mt-4 max-w-xl text-lg text-tinta-suave/75">{children}</p> : null}
    </header>
  )
}

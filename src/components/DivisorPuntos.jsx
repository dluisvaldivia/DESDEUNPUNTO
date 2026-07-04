export default function DivisorPuntos({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-2.5 ${className}`} role="presentation">
      <span className="size-1.5 rounded-full bg-arena" />
      <span className="size-2 rounded-full bg-terracota-clara" />
      <span className="size-3 rounded-full bg-terracota" />
      <span className="size-2 rounded-full bg-terracota-clara" />
      <span className="size-1.5 rounded-full bg-arena" />
    </div>
  )
}

export default function DivisorPuntos({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-2.5 ${className}`} role="presentation">
      {/* Los cuatro tonos de la tetrada, con el oro (principal) al centro */}
      <span className="size-1.5 rounded-full bg-jade" />
      <span className="size-2 rounded-full bg-indigo" />
      <span className="size-3 rounded-full bg-oro" />
      <span className="size-2 rounded-full bg-magenta" />
      <span className="size-1.5 rounded-full bg-jade" />
    </div>
  )
}

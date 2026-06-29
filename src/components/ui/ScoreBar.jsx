export default function ScoreBar({
  value,
  max = 100,
  tone = 'brand',
  size = 'md',
  label,
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  const tones = {
    brand: 'bg-[color:var(--color-brand)]',
    accent: 'bg-[color:var(--color-accent)]',
    cool: 'bg-cool',
    green: 'bg-green',
    amber: 'bg-amber',
  }
  const heights = { sm: 'h-1', md: 'h-1.5', lg: 'h-2' }
  return (
    <div
      className={`w-full bg-pill rounded-full overflow-hidden ${heights[size]}`}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label ?? `Score ${Math.round(value)} de ${max}`}
    >
      <div
        className={`${tones[tone]} ${heights[size]} rounded-full transition-all duration-700`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

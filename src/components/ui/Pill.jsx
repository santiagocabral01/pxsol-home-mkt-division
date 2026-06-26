export default function Pill({ children, tone = 'neutral', className = '' }) {
  const tones = {
    neutral: 'bg-pill text-ink-soft',
    brand: 'bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand-text)]',
    cool: 'bg-cool-soft text-cool',
    green: 'bg-green-soft text-green',
    amber: 'bg-amber-soft text-[#8B6F1F]',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

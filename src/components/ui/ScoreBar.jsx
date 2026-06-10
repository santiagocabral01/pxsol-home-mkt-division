export default function ScoreBar({ value, max = 100, tone = 'warm', size = 'md' }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  const tones = {
    warm: 'bg-warm',
    cool: 'bg-cool',
    green: 'bg-green',
    amber: 'bg-amber',
  }
  const heights = { sm: 'h-1', md: 'h-1.5', lg: 'h-2' }
  return (
    <div className={`w-full bg-pill rounded-full overflow-hidden ${heights[size]}`}>
      <div
        className={`${tones[tone]} ${heights[size]} rounded-full transition-all duration-700`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

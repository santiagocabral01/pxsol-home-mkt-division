// Indicador editorial de los 4 pasos del flujo inicial (onboarding → hub).
export default function Stepper({ current = 1 }) {
  const steps = [
    { n: 1, label: 'Hotel' },
    { n: 2, label: 'Brand DNA' },
    { n: 3, label: 'Generación' },
    { n: 4, label: 'Hub' },
  ]
  return (
    <div className="flex items-center gap-3 text-[12px] text-ink-soft">
      {steps.map((s, i) => {
        const isActive = current === s.n
        const isDone = current > s.n
        return (
          <div key={s.n} className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-medium ${
                  isActive
                    ? 'bg-ink text-white'
                    : isDone
                    ? 'bg-warm-soft text-warm'
                    : 'bg-pill text-ink-mute'
                }`}
              >
                {s.n}
              </span>
              <span
                className={`${
                  isActive
                    ? 'text-ink font-medium'
                    : isDone
                    ? 'text-ink-soft'
                    : 'text-ink-mute'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span className="w-6 h-px bg-border" aria-hidden />
            )}
          </div>
        )
      })}
    </div>
  )
}

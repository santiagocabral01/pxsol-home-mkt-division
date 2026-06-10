export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[12px] font-medium text-ink-soft uppercase tracking-wider">
          {label}
        </span>
        {hint && <span className="text-[11px] text-ink-mute">{hint}</span>}
      </div>
      {children}
    </label>
  )
}

export function Input(props) {
  return <input {...props} className={`hp-input ${props.className || ''}`} />
}

export function Textarea(props) {
  return (
    <textarea
      {...props}
      className={`hp-input min-h-[100px] ${props.className || ''}`}
    />
  )
}

export function Select({ children, ...props }) {
  return (
    <select {...props} className={`hp-input pr-9 ${props.className || ''}`}>
      {children}
    </select>
  )
}

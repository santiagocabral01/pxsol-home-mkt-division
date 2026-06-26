export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}) {
  const variants = {
    primary:
      'bg-ink text-white hover:bg-[#000] shadow-[0_4px_14px_rgba(0,0,0,0.18)]',
    secondary:
      'bg-card text-ink border border-border hover:border-border-strong hover:bg-surface-hover',
    ghost: 'bg-transparent text-ink-soft hover:text-ink hover:bg-surface-hover',
    brand: 'bg-[color:var(--color-brand)] text-white hover:bg-[color:var(--color-brand-hover)]',
  }
  const sizes = {
    sm: 'h-8 px-3 text-[12px] rounded-md gap-1.5',
    md: 'h-10 px-4 text-[13px] rounded-lg gap-2',
    lg: 'h-12 px-6 text-[14px] rounded-lg gap-2',
  }
  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

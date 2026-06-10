import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, children, title, maxWidth = 'max-w-md' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.25)' }}
      onClick={onClose}
    >
      <div
        className={`hp-fade-in relative w-full ${maxWidth} bg-card rounded-2xl shadow-float p-7`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md text-ink-soft hover:bg-surface-hover hover:text-ink transition"
          aria-label="Cerrar"
        >
          <X size={16} />
        </button>
        {title && (
          <h3 className="font-display text-2xl mb-3 pr-8">{title}</h3>
        )}
        <div>{children}</div>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Loader2, Sparkles, ArrowRight } from 'lucide-react'
import Headline from '../components/ui/Headline'
import Pill from '../components/ui/Pill'
import Button from '../components/ui/Button'
import Stepper from '../components/Stepper'
import { generationSteps } from '../data/hotel'

export default function Generating() {
  const navigate = useNavigate()
  const [doneIdx, setDoneIdx] = useState(-1)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let cumulative = 0
    const total = generationSteps.reduce((a, s) => a + s.durationMs, 0)
    const timers = []
    generationSteps.forEach((s, i) => {
      cumulative += s.durationMs
      timers.push(
        setTimeout(() => {
          setDoneIdx(i)
          setProgress(Math.round((cumulative / total) * 100))
        }, cumulative),
      )
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  const finished = doneIdx === generationSteps.length - 1

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-10 py-6 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[color:var(--color-brand-text)]" />
          <span className="font-display text-[18px]">Hotel Presence</span>
        </div>
        <Stepper current={3} />
        <Pill tone="brand">
          <Sparkles size={11} /> Demo en vivo
        </Pill>
      </header>

      <main className="flex-1 flex items-center justify-center px-10">
        <div className="hp-card max-w-[560px] w-full p-10 hp-fade-in">
          <Pill tone="neutral" className="mb-4">
            ✦ Paso 3 — Generando todo tu hub
          </Pill>
          <Headline
            as="h2"
            highlight="canales"
            className="text-[32px] leading-tight mb-2"
          >
            Tu marca, en todos tus canales.
          </Headline>
          <p className="text-ink-soft text-[14px] mb-7">
            Estamos creando tu sitio, tus posts y tus perfiles. Esto suele
            tomar entre 30 y 60 segundos en producción.
          </p>

          <div className="flex items-center justify-between mb-2">
            <div className="text-[11px] uppercase tracking-wider text-ink-soft">
              Progreso
            </div>
            <div className="font-mono text-[12px] text-ink">{progress}%</div>
          </div>
          <div className="w-full bg-pill rounded-full h-1.5 overflow-hidden mb-7">
            <div
              className="h-full bg-[color:var(--color-brand)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="space-y-3">
            {generationSteps.map((s, i) => {
              const done = i <= doneIdx
              const active = i === doneIdx + 1
              return (
                <div
                  key={s.id}
                  className={`flex items-center gap-3 text-[13px] transition-all ${
                    done ? 'text-ink' : active ? 'text-ink' : 'text-ink-mute'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      done
                        ? 'bg-green-soft text-green'
                        : active
                        ? 'bg-[color:var(--color-brand-soft)]'
                        : 'bg-pill'
                    }`}
                  >
                    {done ? (
                      <Check size={11} strokeWidth={3} />
                    ) : active ? (
                      <Loader2 size={11} className="text-ink-soft hp-spin" />
                    ) : null}
                  </span>
                  <span>{s.label}</span>
                </div>
              )
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <Button
              size="lg"
              className="w-full"
              disabled={!finished}
              onClick={() => navigate('/app/hub/sitio-web')}
            >
              {finished ? (
                <>
                  Ver mi hub de presencia <ArrowRight size={16} />
                </>
              ) : (
                <>
                  <Loader2 size={14} className="hp-spin" /> Generando…
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

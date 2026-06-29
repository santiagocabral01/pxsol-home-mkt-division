import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Lightbulb,
  ArrowUpRight,
  X,
  RefreshCw,
  Inbox,
  TrendingUp,
  Bot,
  CalendarClock,
} from 'lucide-react'
import ChannelHeader from '../../components/ChannelHeader'
import Pill from '../../components/ui/Pill'
import Button from '../../components/ui/Button'
import { useSeoGeo, useSimulatedAsync } from '../../context/SeoGeoContext'
import { SimOverlay } from './_shared'

const reasonUi = {
  opportunity_keyword: { icon: TrendingUp, tone: 'brand', label: 'Oportunidad de keyword' },
  ai_faq: { icon: Bot, tone: 'cool', label: 'Pregunta frecuente en IA' },
  seasonality: { icon: CalendarClock, tone: 'green', label: 'Estacionalidad' },
}

export default function Suggestions() {
  const navigate = useNavigate()
  const { suggestions, rejectSuggestion, requestVariant } = useSeoGeo()
  const { loading, message, run } = useSimulatedAsync()
  const [variantingId, setVariantingId] = useState(null)

  const onVariant = (id) => {
    setVariantingId(id)
    run('Buscando un ángulo distinto…', () => {
      requestVariant(id)
      setVariantingId(null)
    }, { min: 1100, max: 1900 })
  }

  const onApprove = (s) => {
    navigate(
      `/app/hub/seo-geo/generador?topic=${encodeURIComponent(s.topic)}&type=${s.contentType}`
    )
  }

  return (
    <div className="px-10 py-10 max-w-[1400px] mx-auto relative">
      <SimOverlay active={loading} message={message} />

      <ChannelHeader
        eyebrow="SEO / GEO con IA · Sugerencias"
        highlight="cada semana"
        title="Tres ideas listas para producir cada semana."
        subtitle="No tenés que pensar qué publicar. Te llegan curadas, con motivo, tipo y un brief listo para mandar al generador."
        right={
          <Pill tone="neutral">
            <Lightbulb size={11} /> Semana del 8 al 14 de junio
          </Pill>
        }
      />

      {suggestions.length === 0 ? (
        <div className="hp-card p-12 text-center">
          <div className="w-14 h-14 rounded-full bg-pill text-ink-soft flex items-center justify-center mx-auto mb-4">
            <Inbox size={22} />
          </div>
          <div className="font-heading text-[22px] font-medium tracking-tight mb-2">
            Sin sugerencias pendientes.
          </div>
          <div className="text-[13px] text-ink-soft max-w-md mx-auto">
            Las próximas 3 sugerencias se generan cada lunes a las 9 AM, basadas en oportunidades de la semana.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {suggestions.map((s) => {
            const cfg = reasonUi[s.reason] || reasonUi.opportunity_keyword
            const Icon = cfg.icon
            return (
              <div
                key={s.id}
                className={`hp-card p-6 flex flex-col transition relative ${
                  variantingId === s.id ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Pill tone={cfg.tone}>
                    <Icon size={11} /> {cfg.label}
                  </Pill>
                  <button
                    onClick={() => rejectSuggestion(s.id)}
                    className="p-1 text-ink-mute hover:text-ink transition"
                    aria-label="Rechazar"
                  >
                    <X size={14} />
                  </button>
                </div>

                <h3 className="font-heading text-[18px] font-medium tracking-tight leading-tight mb-3 flex-1">
                  {s.title}
                </h3>

                <div className="text-[12px] text-ink-soft mb-5 leading-relaxed">
                  {s.why}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => onApprove(s)}
                  >
                    Aprobar <ArrowUpRight size={11} />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onVariant(s.id)}
                  >
                    <RefreshCw size={11} /> Variante
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Bloque "Cómo funciona": fondo y ícono neutros — regla del 10% (QA punto 3) */}
      <div className="hp-card p-6 mt-8 bg-pill border border-border">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-ink text-white flex items-center justify-center flex-shrink-0">
            <Lightbulb size={16} />
          </div>
          <div>
            <div className="text-[13px] font-medium text-ink mb-1">
              ¿Cómo decidimos qué sugerirte?
            </div>
            <div className="text-[12px] text-ink-soft leading-relaxed">
              Cruzamos tu data orgánica (GSC), las queries donde no aparecés en IA, y eventos estacionales de Cartagena. Cada lunes recibís 3 ideas con prioridad alta — vos aprobás, rechazás o pedís otro ángulo.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

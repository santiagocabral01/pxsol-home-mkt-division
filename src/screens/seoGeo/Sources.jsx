import { useMemo, useState } from 'react'
import { Quote, CheckCircle2, Clock, Circle, ExternalLink } from 'lucide-react'
import ChannelHeader from '../../components/ChannelHeader'
import Pill from '../../components/ui/Pill'
import Button from '../../components/ui/Button'
import { sources, sourceRecommendations } from '../../data/seoGeo'
import { AuthorityBadge } from './_shared'

const filters = [
  { id: 'all', label: 'Todas' },
  { id: 'high', label: 'Alta autoridad' },
  { id: 'medium', label: 'Media' },
  { id: 'low', label: 'Baja' },
]

function statusUi(status) {
  if (status === 'present')
    return { icon: CheckCircle2, label: 'Presente', tone: 'text-green', bg: 'bg-green-soft' }
  if (status === 'pending')
    return { icon: Clock, label: 'Pendiente', tone: 'text-[#8B6F1F]', bg: 'bg-amber-soft' }
  /* Ausente usa amber — estado negativo, no debe compartir el rojo de marca (QA punto 2) */
  return { icon: Circle, label: 'Ausente', tone: 'text-[#8B6F1F]', bg: 'bg-amber-soft' }
}

export default function Sources() {
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(
    () => (filter === 'all' ? sources : sources.filter((s) => s.llmAuthority === filter)),
    [filter]
  )

  const counts = useMemo(() => {
    const c = { high: 0, medium: 0, low: 0 }
    sources.forEach((s) => c[s.llmAuthority]++)
    return c
  }, [])

  return (
    <div className="px-10 py-10 max-w-[1400px] mx-auto">
      <ChannelHeader
        eyebrow="SEO / GEO con IA · Fuentes"
        highlight="citan"
        title="Quiénes te citan, y quiénes deberían."
        subtitle="Los LLMs no inventan respuestas: las arman a partir de fuentes que confían. Conocer cuáles te mencionan y cuáles te ignoran es la diferencia entre aparecer y desaparecer."
        right={
          <Pill tone="cool">
            <Quote size={11} /> {sources.length} dominios detectados
          </Pill>
        }
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="Alta autoridad para LLM" value={counts.high} tone="green" />
        <StatCard label="Media" value={counts.medium} tone="cool" />
        <StatCard label="Baja" value={counts.low} tone="neutral" />
      </div>

      <div className="hp-card overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-4">
          <div>
            <div className="font-heading text-[20px] font-medium tracking-tight">Dominios que te mencionan</div>
            <div className="text-[12px] text-ink-soft mt-0.5">
              Backlinks y citas en menciones editoriales, listings y foros.
            </div>
          </div>
          <div className="inline-flex rounded-lg bg-pill p-0.5">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 h-7 text-[11px] rounded-md transition ${
                  filter === f.id
                    ? 'bg-card text-ink shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="px-6 py-16 text-center text-ink-soft text-[13px]">
            No hay fuentes en este nivel de autoridad.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium border-b border-border">
                <th className="px-6 py-3 font-medium text-left">Dominio</th>
                <th className="px-6 py-3 font-medium text-left">Tipo de mención</th>
                <th className="px-6 py-3 font-medium text-left">Autoridad</th>
                <th className="px-6 py-3 font-medium text-right">Fecha</th>
                <th className="px-6 py-3 font-medium w-12" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr
                  key={s.domain}
                  className="border-b border-border last:border-0 hover:bg-surface-hover transition group"
                >
                  <td className="px-6 py-3.5 text-[13px] text-ink font-mono">{s.domain}</td>
                  <td className="px-6 py-3.5 text-[13px] text-ink-soft">{s.mentionType}</td>
                  <td className="px-6 py-3.5">
                    <AuthorityBadge level={s.llmAuthority} />
                  </td>
                  <td className="px-6 py-3.5 text-[12px] text-ink-soft font-mono text-right">
                    {s.date}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <ExternalLink
                      size={13}
                      className="text-ink-mute group-hover:text-ink inline"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Recomendaciones */}
      <div className="hp-card p-6">
        <div className="flex items-center gap-2 mb-3">
          <Quote size={14} className="text-ink-soft" />
          <div className="font-heading text-[20px] font-medium tracking-tight text-ink">Fuentes recomendadas</div>
        </div>
        <p className="text-[13px] text-ink-soft mb-5">
          Dónde priorizar para conseguir menciones — ordenado por impacto en motores generativos.
        </p>
        <div className="space-y-3">
          {sourceRecommendations.map((r) => {
            const cfg = statusUi(r.status)
            const Icon = cfg.icon
            return (
              <div
                key={r.name}
                className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-surface-hover transition"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                  <Icon size={16} className={cfg.tone} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-[14px] text-ink font-medium">{r.name}</div>
                    <Pill tone={r.priority === 'high' ? 'brand' : r.priority === 'medium' ? 'cool' : 'neutral'}>
                      {r.priority === 'high' ? 'Prioridad alta' : r.priority === 'medium' ? 'Media' : 'Baja'}
                    </Pill>
                  </div>
                  <div className="text-[12px] text-ink-soft">{r.why}</div>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2">
                  <span className={`text-[11px] uppercase tracking-wider font-medium ${cfg.tone}`}>
                    {cfg.label}
                  </span>
                  <Button size="sm" variant="secondary">
                    Plan
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, tone }) {
  const tones = {
    green: 'text-green',
    cool: 'text-cool',
    neutral: 'text-ink-soft',
  }
  return (
    <div className="hp-card p-5">
      <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-2">
        {label}
      </div>
      <div className={`font-mono text-[34px] leading-none ${tones[tone]}`}>{value}</div>
      <div className="text-[11px] text-ink-soft mt-2">dominios detectados</div>
    </div>
  )
}

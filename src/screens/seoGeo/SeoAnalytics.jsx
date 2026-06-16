import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  ArrowUpDown,
  Sparkles,
  Wand2,
  CheckCircle2,
  Link2,
  ArrowUpRight,
} from 'lucide-react'
import ChannelHeader from '../../components/ChannelHeader'
import Pill from '../../components/ui/Pill'
import Button from '../../components/ui/Button'
import { gscSummary, keywords, organicPages } from '../../data/seoGeo'
import { TrendArrow } from './_shared'

const columns = [
  { id: 'term', label: 'Keyword', align: 'left' },
  { id: 'impressions', label: 'Impresiones', align: 'right', numeric: true },
  { id: 'clicks', label: 'Clics', align: 'right', numeric: true },
  { id: 'ctr', label: 'CTR', align: 'right', numeric: true, suffix: '%' },
  { id: 'position', label: 'Posición', align: 'right', numeric: true },
  { id: 'trend', label: 'Tendencia', align: 'center' },
]

function fmt(n) {
  return n.toLocaleString('es-AR')
}

export default function SeoAnalytics() {
  const navigate = useNavigate()
  const [sort, setSort] = useState({ col: 'impressions', dir: 'desc' })

  const sorted = useMemo(() => {
    const copy = [...keywords]
    copy.sort((a, b) => {
      const va = a[sort.col]
      const vb = b[sort.col]
      if (typeof va === 'number' && typeof vb === 'number') {
        return sort.dir === 'asc' ? va - vb : vb - va
      }
      return sort.dir === 'asc'
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va))
    })
    return copy
  }, [sort])

  const onSort = (col) => {
    setSort((s) =>
      s.col === col
        ? { col, dir: s.dir === 'asc' ? 'desc' : 'asc' }
        : { col, dir: col === 'position' ? 'asc' : 'desc' }
    )
  }

  const opportunities = keywords.filter((k) => k.isOpportunity).slice(0, 4)

  return (
    <div className="px-10 py-10 max-w-[1400px] mx-auto">
      <ChannelHeader
        eyebrow="SEO / GEO con IA · SEO Analytics"
        highlight="orgánico"
        title="Tu data de Google, en castellano."
        subtitle="Lo que normalmente leerías en Google Search Console — pero curado, accionable y conectado al generador de contenido."
        right={
          <div className="flex items-center gap-2">
            <Pill tone="green">
              <CheckCircle2 size={11} /> GSC conectado
            </Pill>
            <Pill>
              <Link2 size={11} /> Sync {gscSummary.lastSync}
            </Pill>
          </div>
        }
      />

      {/* GSC Summary */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <SummaryCard
          label="Impresiones"
          value={fmt(gscSummary.impressions)}
          delta={`+${gscSummary.deltas.impressions}%`}
          tone="green"
        />
        <SummaryCard
          label="Clics"
          value={fmt(gscSummary.clicks)}
          delta={`+${gscSummary.deltas.clicks}%`}
          tone="green"
        />
        <SummaryCard
          label="CTR"
          value={`${gscSummary.ctr}%`}
          delta={`+${gscSummary.deltas.ctr} pts`}
          tone="green"
        />
        <SummaryCard
          label="Posición promedio"
          value={gscSummary.avgPosition}
          delta={`${gscSummary.deltas.avgPosition} puestos`}
          tone="green"
          deltaHint="(mejora)"
        />
      </div>

      {/* Oportunidades */}
      <div className="hp-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-warm" />
          <div className="font-display text-[18px] text-ink">Oportunidades</div>
        </div>
        <p className="text-[13px] text-ink-soft mb-5">
          Keywords donde aparecés en posición 4 a 20 — basta un empujón para entrar al top 3. Cada una abre un brief listo en el Generador.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {opportunities.map((k) => (
            <div
              key={k.term}
              className="flex items-center gap-3 p-3 rounded-lg border border-border bg-warm-soft/30 hover:bg-warm-soft/50 transition"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-warm text-white flex items-center justify-center font-mono text-[13px]">
                #{Math.round(k.position)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] text-ink font-medium truncate">{k.term}</div>
                <div className="text-[11px] text-ink-soft">
                  {fmt(k.impressions)} imp · CTR {k.ctr}%
                </div>
              </div>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  navigate(
                    `/app/hub/seo-geo/generador?topic=${encodeURIComponent(k.term)}&type=landing`
                  )
                }
              >
                <Wand2 size={11} /> Generar
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Top keywords */}
      <div className="hp-card overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <div className="font-display text-[20px]">Top keywords orgánicas</div>
            <div className="text-[12px] text-ink-soft mt-0.5">
              Ordenable por cualquier columna. Las marcadas en ámbar son oportunidades.
            </div>
          </div>
          <Pill tone="warm">
            <TrendingUp size={11} /> Últimos 28 días
          </Pill>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium border-b border-border">
              {columns.map((c) => (
                <th
                  key={c.id}
                  onClick={() => onSort(c.id)}
                  className={`px-6 py-3 font-medium cursor-pointer hover:text-ink select-none ${
                    c.align === 'right'
                      ? 'text-right'
                      : c.align === 'center'
                      ? 'text-center'
                      : 'text-left'
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    {c.label}
                    <ArrowUpDown
                      size={10}
                      className={sort.col === c.id ? 'text-warm' : 'opacity-30'}
                    />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((k) => (
              <tr
                key={k.term}
                className={`border-b border-border last:border-0 hover:bg-surface-hover transition ${
                  k.isOpportunity ? 'bg-warm-soft/20' : ''
                }`}
              >
                <td className="px-6 py-3 text-[13px] text-ink">{k.term}</td>
                <td className="px-6 py-3 text-[13px] font-mono text-ink-soft text-right">
                  {fmt(k.impressions)}
                </td>
                <td className="px-6 py-3 text-[13px] font-mono text-ink-soft text-right">
                  {fmt(k.clicks)}
                </td>
                <td className="px-6 py-3 text-[13px] font-mono text-ink-soft text-right">
                  {k.ctr}%
                </td>
                <td className="px-6 py-3 text-[13px] font-mono text-ink text-right">
                  {k.position.toFixed(1)}
                </td>
                <td className="px-6 py-3 text-center">
                  <TrendArrow trend={k.trend} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top pages */}
      <div className="hp-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <div className="font-display text-[20px]">Páginas con mayor tráfico</div>
          <div className="text-[12px] text-ink-soft mt-0.5">
            Top URLs de tu sitio según GSC.
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium border-b border-border">
              <th className="px-6 py-3 font-medium text-left">URL</th>
              <th className="px-6 py-3 font-medium text-right">Clics</th>
              <th className="px-6 py-3 font-medium text-right">Impresiones</th>
              <th className="px-6 py-3 font-medium text-right">CTR</th>
              <th className="px-6 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {organicPages.map((p) => {
              const ctr = ((p.clicks / p.impressions) * 100).toFixed(1)
              return (
                <tr
                  key={p.url}
                  className="border-b border-border last:border-0 hover:bg-surface-hover transition group"
                >
                  <td className="px-6 py-3 text-[13px] text-ink font-mono">{p.url}</td>
                  <td className="px-6 py-3 text-[13px] font-mono text-ink-soft text-right">
                    {fmt(p.clicks)}
                  </td>
                  <td className="px-6 py-3 text-[13px] font-mono text-ink-soft text-right">
                    {fmt(p.impressions)}
                  </td>
                  <td className="px-6 py-3 text-[13px] font-mono text-ink-soft text-right">
                    {ctr}%
                  </td>
                  <td className="px-6 py-3 text-right">
                    <ArrowUpRight
                      size={13}
                      className="text-ink-mute group-hover:text-ink inline"
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SummaryCard({ label, value, delta, tone, deltaHint }) {
  return (
    <div className="hp-card p-5">
      <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-2">
        {label}
      </div>
      <div className="font-mono text-[32px] text-ink leading-none mb-2">{value}</div>
      <div className={`text-[11px] inline-flex items-center gap-1 ${tone === 'green' ? 'text-green' : 'text-warm'}`}>
        <TrendingUp size={11} />
        {delta}
        {deltaHint && <span className="text-ink-soft ml-1">{deltaHint}</span>}
      </div>
    </div>
  )
}

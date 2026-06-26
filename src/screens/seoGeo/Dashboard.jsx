import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Bot,
  Hash,
  FileText,
  AlertTriangle,
  Sparkles,
  Bell,
} from 'lucide-react'
import ChannelHeader from '../../components/ChannelHeader'
import Pill from '../../components/ui/Pill'
import ScoreBar from '../../components/ui/ScoreBar'
import { visibilityOverview } from '../../data/seoGeo'
import { LineChart } from './_shared'

const rangeOptions = [
  { id: '30d', label: '30 días' },
  { id: '90d', label: '90 días' },
]

function Delta({ value, suffix = '' }) {
  const positive = value > 0
  const Icon = positive ? TrendingUp : TrendingDown
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[11px] font-medium ${
        positive ? 'text-green' : 'text-[color:var(--color-brand-text)]'
      }`}
    >
      <Icon size={11} />
      {positive ? '+' : ''}
      {value}
      {suffix}
    </span>
  )
}

function alertIcon(type) {
  if (type === 'ai_mention') return <Bot size={14} />
  if (type === 'new_keyword') return <Hash size={14} />
  if (type === 'drop') return <AlertTriangle size={14} />
  return <Bell size={14} />
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [range, setRange] = useState('30d')
  const series =
    range === '30d' ? visibilityOverview.series30d : visibilityOverview.series90d

  return (
    <div className="px-10 py-10 max-w-[1400px] mx-auto">
      <ChannelHeader
        eyebrow="SEO / GEO con IA · Dashboard"
        highlight="visible"
        title="Cuán visible sos en buscadores y en IA."
        subtitle="Tu score global y todo lo que está moviendo la aguja esta semana — en orgánico de Google y en las nuevas referencias de ChatGPT, Perplexity y Google AI Overviews."
        right={
          <div className="flex items-center gap-2">
            <Pill tone="brand">
              <Sparkles size={11} /> IA monitoreando 12 motores
            </Pill>
          </div>
        }
      />

      <div className="grid grid-cols-[1.4fr_1fr] gap-6 mb-6">
        {/* Score global + sub-scores */}
        <div className="hp-card p-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-2">
                Score global de visibilidad
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[56px] text-ink leading-none">
                  {visibilityOverview.globalScore}
                </span>
                <span className="text-ink-soft text-[14px]">/ 100</span>
                <Delta value={visibilityOverview.delta.global} />
              </div>
            </div>
            <Pill tone="green">● en mejora</Pill>
          </div>

          <div className="grid grid-cols-2 gap-5 pt-5 border-t border-border">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] text-ink-soft">SEO orgánico</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[20px] text-ink">
                    {visibilityOverview.seoScore}
                  </span>
                  <Delta value={visibilityOverview.delta.seo} />
                </div>
              </div>
              <ScoreBar value={visibilityOverview.seoScore} tone="brand" />
              <div className="text-[11px] text-ink-mute mt-2">
                Google · Bing · Yandex
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] text-ink-soft">GEO (IA)</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[20px] text-ink">
                    {visibilityOverview.geoScore}
                  </span>
                  <Delta value={visibilityOverview.delta.geo} />
                </div>
              </div>
              <ScoreBar value={visibilityOverview.geoScore} tone="cool" />
              <div className="text-[11px] text-ink-mute mt-2">
                ChatGPT · Perplexity · Google AI · Claude
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="hp-card p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-1">
                Evolución
              </div>
              <div className="font-display text-[18px] text-ink">
                SEO vs GEO
              </div>
            </div>
            <div className="inline-flex rounded-lg bg-pill p-0.5">
              {rangeOptions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRange(r.id)}
                  className={`px-2.5 h-7 text-[11px] rounded-md transition ${
                    range === r.id
                      ? 'bg-card text-ink shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
          <LineChart series={series} height={170} />
          <div className="flex items-center gap-4 mt-3 text-[11px] text-ink-soft">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-[color:var(--color-brand)] rounded" /> SEO
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-cool rounded" /> GEO
            </span>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <KpiCard
          label="Menciones en IA esta semana"
          value={visibilityOverview.kpis.aiMentionsThisWeek}
          deltaLabel="+4 vs. semana pasada"
          deltaTone="green"
          icon={Bot}
          accent="cool"
          onClick={() => navigate('/app/hub/seo-geo/geo-tracker')}
        />
        <KpiCard
          label="Posición promedio en Google"
          value={visibilityOverview.kpis.avgGooglePosition}
          deltaLabel="-1.2 puestos (mejora)"
          deltaTone="green"
          icon={TrendingUp}
          accent="warm"
          onClick={() => navigate('/app/hub/seo-geo/seo')}
        />
        <KpiCard
          label="Páginas indexadas"
          value={visibilityOverview.kpis.indexedPages}
          deltaLabel="+2 esta semana"
          deltaTone="green"
          icon={FileText}
          accent="green"
          onClick={() => navigate('/app/hub/seo-geo/seo')}
        />
      </div>

      {/* Alerts */}
      <div className="hp-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <div className="font-display text-[20px]">Alertas automáticas</div>
            <div className="text-[12px] text-ink-soft mt-0.5">
              Lo que cambió en tu visibilidad — clic para ver el detalle.
            </div>
          </div>
          <Pill tone="brand">
            <Sparkles size={11} /> Generadas por IA
          </Pill>
        </div>
        <ul>
          {visibilityOverview.alerts.map((a) => (
            <li
              key={a.id}
              onClick={() => navigate(a.link)}
              className="px-6 py-4 border-b border-border last:border-0 hover:bg-surface-hover transition cursor-pointer group flex items-start gap-3"
            >
              <span
                className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  a.tone === 'green'
                    ? 'bg-green-soft text-green'
                    : a.tone === 'cool'
                    ? 'bg-cool-soft text-cool'
                    : a.tone === 'brand'
                    ? 'bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand-text)]'
                    : 'bg-amber-soft text-[#8B6F1F]'
                }`}
              >
                {alertIcon(a.type)}
              </span>
              <div className="flex-1">
                <div className="text-[13px] text-ink">{a.text}</div>
                <div className="text-[11px] text-ink-mute mt-0.5">{a.time}</div>
              </div>
              <ArrowUpRight
                size={14}
                className="text-ink-mute group-hover:text-ink mt-1"
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Quick links a las 7 vistas */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <QuickLink
          title="GEO Tracker"
          desc="Dónde y cómo aparece tu hotel en motores de IA."
          to="/app/hub/seo-geo/geo-tracker"
        />
        <QuickLink
          title="Generador de contenido"
          desc="Borradores SEO/GEO con tu tono, listos para publicar."
          to="/app/hub/seo-geo/generador"
        />
        <QuickLink
          title="Reporte del mes"
          desc="PDF para vos o tu agencia — exportable y programable."
          to="/app/hub/seo-geo/reportes"
        />
      </div>
    </div>
  )
}

function KpiCard({ label, value, deltaLabel, deltaTone, icon: Icon, accent, onClick }) {
  const accents = {
    warm: 'bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand-text)]',
    cool: 'bg-cool-soft text-cool',
    green: 'bg-green-soft text-green',
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="hp-card p-5 text-left hover:shadow-[var(--shadow-card-hover)] transition group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium">
          {label}
        </div>
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${accents[accent]}`}>
          <Icon size={15} />
        </span>
      </div>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-mono text-[34px] text-ink leading-none">{value}</span>
      </div>
      <div className={`text-[11px] ${deltaTone === 'green' ? 'text-green' : 'text-[color:var(--color-brand-text)]'}`}>
        {deltaLabel}
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition text-[11px] text-ink-soft mt-3 inline-flex items-center gap-1">
        Ver detalle <ArrowUpRight size={11} />
      </div>
    </button>
  )
}

function QuickLink({ title, desc, to }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(to)}
      className="hp-card p-5 text-left hover:shadow-[var(--shadow-card-hover)] transition group"
    >
      <div className="flex items-center justify-between mb-1">
        <div className="font-display text-[18px] text-ink">{title}</div>
        <ArrowUpRight
          size={14}
          className="text-ink-mute group-hover:text-[color:var(--color-brand-text)] transition"
        />
      </div>
      <div className="text-[12px] text-ink-soft">{desc}</div>
    </button>
  )
}

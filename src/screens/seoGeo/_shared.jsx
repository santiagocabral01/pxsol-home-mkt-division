import { useMemo } from 'react'
import { Loader2 } from 'lucide-react'

// Línea SVG simple. series: [{ date, seo, geo }]. Devuelve dos polylines + área.
export function LineChart({ series, height = 220 }) {
  const { width, paths, ticks } = useMemo(() => {
    if (!series?.length) return { width: 0, paths: { seo: '', geo: '', seoArea: '', geoArea: '' }, ticks: [] }
    const w = 800
    const padX = 12
    const padY = 18
    const usableW = w - padX * 2
    const usableH = height - padY * 2

    const seo = series.map((d) => d.seo)
    const geo = series.map((d) => d.geo)
    const allVals = [...seo, ...geo]
    const min = Math.min(...allVals) - 4
    const max = Math.max(...allVals) + 4

    const x = (i) => padX + (i / (series.length - 1)) * usableW
    const y = (v) => padY + (1 - (v - min) / (max - min)) * usableH

    const buildLine = (arr) =>
      arr.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')

    const buildArea = (arr) =>
      `${buildLine(arr)} L${x(arr.length - 1).toFixed(1)},${(padY + usableH).toFixed(1)} L${x(0).toFixed(1)},${(padY + usableH).toFixed(1)} Z`

    const tickIdx = [0, Math.floor(series.length / 2), series.length - 1]
    const ticks = tickIdx.map((i) => ({ x: x(i), label: series[i].date }))

    return {
      width: w,
      paths: {
        seo: buildLine(seo),
        geo: buildLine(geo),
        seoArea: buildArea(seo),
        geoArea: buildArea(geo),
      },
      ticks,
    }
  }, [series, height])

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height + 22}`}
        className="w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="warmFade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#D4845A" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#D4845A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="coolFade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#5B8FBF" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#5B8FBF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={paths.seoArea} fill="url(#warmFade)" />
        <path d={paths.geoArea} fill="url(#coolFade)" />
        <path d={paths.seo} fill="none" stroke="#D4845A" strokeWidth="2" />
        <path d={paths.geo} fill="none" stroke="#5B8FBF" strokeWidth="2" />
        {ticks.map((t) => (
          <text
            key={t.label}
            x={t.x}
            y={height + 14}
            fontSize="10"
            fill="#b0b0b0"
            textAnchor="middle"
            fontFamily="JetBrains Mono, monospace"
          >
            {t.label}
          </text>
        ))}
      </svg>
    </div>
  )
}

// Overlay de "IA pensando" durante simulaciones — se monta como hijo de la card.
export function SimOverlay({ active, message }) {
  if (!active) return null
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-card/85 backdrop-blur-sm rounded-[12px]">
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-warm-soft flex items-center justify-center">
            <Loader2 size={20} className="hp-spin text-warm" />
          </div>
          <span className="absolute -inset-1 rounded-full border border-warm/30 hp-pulse" />
        </div>
        <div className="text-[12px] text-ink-soft font-medium">{message}</div>
      </div>
    </div>
  )
}

// Bandera de autoridad para LLM.
export function AuthorityBadge({ level }) {
  const map = {
    high: { label: 'Alta', tone: 'green' },
    medium: { label: 'Media', tone: 'cool' },
    low: { label: 'Baja', tone: 'neutral' },
  }
  const cfg = map[level] || map.low
  const tones = {
    green: 'bg-green-soft text-green',
    cool: 'bg-cool-soft text-cool',
    neutral: 'bg-pill text-ink-soft',
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${tones[cfg.tone]}`}
    >
      {cfg.label} autoridad
    </span>
  )
}

export function EngineBadge({ engine }) {
  const map = {
    chatgpt: { label: 'ChatGPT', color: '#10A37F' },
    perplexity: { label: 'Perplexity', color: '#5B8FBF' },
    google_ai: { label: 'Google AI', color: '#D4A853' },
  }
  const cfg = map[engine] || { label: engine, color: '#6b7280' }
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-ink">
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: cfg.color }}
      />
      {cfg.label}
    </span>
  )
}

export function TrendArrow({ trend }) {
  if (trend === 'up')
    return <span className="text-green text-[12px] inline-flex items-center">▲</span>
  if (trend === 'down')
    return <span className="text-warm text-[12px] inline-flex items-center">▼</span>
  return <span className="text-ink-mute text-[12px] inline-flex items-center">·</span>
}

// Mini-spark inline para tarjetas de KPI.
export function MiniSpark({ data, color = '#D4845A' }) {
  if (!data?.length) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * 80},${20 - ((v - min) / (max - min || 1)) * 18 - 1}`)
    .join(' ')
  return (
    <svg viewBox="0 0 80 20" className="w-20 h-5">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}

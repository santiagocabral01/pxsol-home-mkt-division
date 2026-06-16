import { NavLink, Outlet } from 'react-router-dom'
import {
  Gauge,
  Bot,
  TrendingUp,
  Quote,
  Wand2,
  Lightbulb,
  FileBarChart2,
} from 'lucide-react'

const subnav = [
  { to: '/app/hub/seo-geo', end: true, label: 'Dashboard', icon: Gauge },
  { to: '/app/hub/seo-geo/geo-tracker', label: 'GEO Tracker', icon: Bot },
  { to: '/app/hub/seo-geo/seo', label: 'SEO Analytics', icon: TrendingUp },
  { to: '/app/hub/seo-geo/fuentes', label: 'Fuentes', icon: Quote },
  { to: '/app/hub/seo-geo/generador', label: 'Generador', icon: Wand2 },
  { to: '/app/hub/seo-geo/sugerencias', label: 'Sugerencias', icon: Lightbulb },
  { to: '/app/hub/seo-geo/reportes', label: 'Reportes', icon: FileBarChart2 },
]

export default function SeoGeoLayout() {
  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-20 bg-bg/85 backdrop-blur-md border-b border-border">
        <div className="px-10 pt-5 pb-0 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-2">
            <span className="inline-flex items-center gap-1.5 text-warm">
              <span className="w-1 h-1 rounded-full bg-warm" />
              SEO / GEO con IA
            </span>
            <span className="text-ink-mute">·</span>
            <span>Presencia orgánica + visibilidad en motores generativos</span>
          </div>
          <nav className="flex items-center gap-1 -mb-px overflow-x-auto">
            {subnav.map((s) => (
              <NavLink
                key={s.to}
                to={s.to}
                end={s.end}
                className={({ isActive }) =>
                  `inline-flex items-center gap-1.5 px-3 h-10 text-[13px] border-b-2 transition-colors whitespace-nowrap ${
                    isActive
                      ? 'border-warm text-ink font-medium'
                      : 'border-transparent text-ink-soft hover:text-ink'
                  }`
                }
              >
                <s.icon size={14} strokeWidth={1.75} />
                {s.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

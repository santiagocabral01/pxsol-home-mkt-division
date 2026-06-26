import { TrendingUp, Sparkles, ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ChannelHeader from '../../components/ChannelHeader'
import Button from '../../components/ui/Button'
import Pill from '../../components/ui/Pill'
import ScoreBar from '../../components/ui/ScoreBar'
import { summary } from '../../data/hotel'
import { useHotel } from '../../context/HotelContext'

function StatusDot({ status }) {
  const colors = {
    active: 'bg-green',
    pending: 'bg-amber',
    ready: 'bg-cool',
  }
  return (
    <span
      className={`w-2 h-2 rounded-full ${colors[status]} hp-pulse inline-block`}
    />
  )
}

const channelRoutes = {
  'Sitio web': '/app/hub/sitio-web',
  'Google Business': '/app/hub/google-business',
  'Booking.com': '/app/hub/otas',
  Instagram: '/app/hub/redes-sociales',
  Facebook: '/app/hub/redes-sociales',
  'Email Marketing': '/app/hub/email',
}

export default function Summary() {
  const navigate = useNavigate()
  const { hotel } = useHotel()
  return (
    <div className="px-10 py-10 max-w-[1400px] mx-auto">
      <ChannelHeader
        eyebrow="Resumen"
        highlight="presencia"
        title="Tu presencia online, en un vistazo."
        subtitle="Estado de cada canal, lo que está activo y lo que falta. Cuanto más completo, más reservas directas."
        right={
          <Button>
            <Sparkles size={14} /> Activar todo
          </Button>
        }
      />

      {/* Big numbers */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="hp-card p-6">
          <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-2">
            Score de presencia
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-mono text-[42px] text-ink leading-none">
              {summary.presenceScore}
            </span>
            <span className="text-ink-soft text-[14px]">/ 100</span>
          </div>
          <ScoreBar value={summary.presenceScore} tone="brand" />
          <div className="flex items-center gap-1.5 mt-3 text-[11px] text-green">
            <TrendingUp size={11} /> +18 puntos esta semana
          </div>
        </div>

        <div className="hp-card p-6">
          <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-2">
            Assets generados
          </div>
          <div className="font-mono text-[42px] text-ink leading-none mb-3">
            {summary.totalAssets}
          </div>
          <div className="text-[11px] text-ink-soft">
            Posts, banners, descripciones, emails — todos con tu marca.
          </div>
        </div>

        <div className="hp-card p-6">
          <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-2">
            Canales activos
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-mono text-[42px] text-ink leading-none">
              {summary.activeChannels}
            </span>
            <span className="text-ink-soft text-[14px]">
              de {summary.totalChannels}
            </span>
          </div>
          <ScoreBar
            value={(summary.activeChannels / summary.totalChannels) * 100}
            tone="cool"
          />
          <div className="text-[11px] text-ink-soft mt-3">
            Faltan 3 canales por revisar y publicar.
          </div>
        </div>

        <div className="hp-card p-6">
          <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-2">
            Reservas directas
          </div>
          <div className="font-mono text-[42px] text-ink leading-none mb-3">
            +28%
          </div>
          <div className="text-[11px] text-ink-soft">
            Proyección estimada vs últimos 90 días, asumiendo todos los canales activos.
          </div>
        </div>
      </div>

      {/* Tabla de canales */}
      <div className="hp-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div>
            <div className="font-display text-[20px]">Canales de {hotel.name}</div>
            <div className="text-[12px] text-ink-soft mt-0.5">
              Estado actualizado hace 12 minutos
            </div>
          </div>
          <Pill tone="brand">✦ Generado con IA</Pill>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium border-b border-border">
              <th className="px-6 py-3 font-medium">Canal</th>
              <th className="px-6 py-3 font-medium">Estado</th>
              <th className="px-6 py-3 font-medium">Detalle</th>
              <th className="px-6 py-3 font-medium text-right" />
            </tr>
          </thead>
          <tbody>
            {summary.channels.map((c) => (
              <tr
                key={c.name}
                className="border-b border-border last:border-0 hover:bg-surface-hover transition group"
              >
                <td className="px-6 py-4 text-[13px] text-ink font-medium">
                  {c.name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-[13px] text-ink">
                    <StatusDot status={c.status} />
                    {c.statusLabel}
                  </div>
                </td>
                <td className="px-6 py-4 text-[13px] text-ink-soft font-mono">
                  {c.detail}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() =>
                      navigate(channelRoutes[c.name] || '/app/hub/sitio-web')
                    }
                    className="inline-flex items-center gap-1 text-[12px] text-ink-soft hover:text-ink opacity-0 group-hover:opacity-100 transition"
                  >
                    Abrir <ArrowUpRight size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recomendaciones */}
      <div className="hp-card p-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={14} className="text-[color:var(--color-brand-text)]" />
          <span className="text-[11px] uppercase tracking-wider text-ink font-medium">
            Próximos pasos sugeridos
          </span>
        </div>
        <div className="space-y-3">
          {[
            {
              t: 'Completá tu ficha de Google Business',
              s: 'Faltan 3 fotos y la política de desayuno. Es lo que más impacta tu score esta semana.',
              tone: 'amber',
            },
            {
              t: 'Activá la campaña "Oferta de temporada alta"',
              s: 'Tu lista actual tiene 1.240 contactos. Send estimado: ~470 aperturas, ~38 reservas.',
              tone: 'cool',
            },
            {
              t: 'Respondé las 3 reseñas pendientes',
              s: 'Las propiedades que responden todas las reseñas convierten 31% más.',
              tone: 'brand',
            },
          ].map((r) => (
            <div
              key={r.t}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface-hover transition"
            >
              <div
                className={`mt-1 w-1.5 h-1.5 rounded-full bg-${r.tone}`}
                style={{
                  background:
                    r.tone === 'brand'
                      ? '#e84a2c'
                      : r.tone === 'cool'
                      ? '#5B8FBF'
                      : '#D4A853',
                }}
              />
              <div className="flex-1">
                <div className="text-[13px] text-ink font-medium">{r.t}</div>
                <div className="text-[12px] text-ink-soft mt-0.5">{r.s}</div>
              </div>
              <Button variant="ghost" size="sm">
                Resolver <ArrowUpRight size={11} />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { NavLink, useNavigate } from 'react-router-dom'
import {
  Globe,
  Camera,
  MapPin,
  BedDouble,
  Mail,
  Settings,
  LayoutDashboard,
  Pencil,
} from 'lucide-react'
import { useHotel } from '../context/HotelContext'

const channels = [
  { to: '/app/hub/sitio-web', label: 'Sitio Web', icon: Globe },
  { to: '/app/hub/redes-sociales', label: 'Redes Sociales', icon: Camera },
  { to: '/app/hub/google-business', label: 'Google Business', icon: MapPin },
  { to: '/app/hub/otas', label: 'OTAs / Booking', icon: BedDouble },
  { to: '/app/hub/email', label: 'Email Marketing', icon: Mail },
]

const accountItems = [
  { to: '/app/hub/configuracion', label: 'Configuración', icon: Settings },
  { to: '/app/hub/resumen', label: 'Resumen', icon: LayoutDashboard },
]

function Item({ to, label, icon: Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group relative flex items-center gap-2.5 pl-6 pr-4 h-9 text-[13px] transition-colors ${
          isActive
            ? 'text-ink font-semibold'
            : 'text-ink-soft hover:bg-surface-hover hover:text-ink'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-warm" />
          )}
          <Icon size={16} strokeWidth={1.75} />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  )
}

export default function Sidebar() {
  const { hotel } = useHotel()
  const navigate = useNavigate()
  return (
    <aside className="w-[252px] flex-shrink-0 bg-card border-r border-border flex flex-col h-full">
      <div className="px-6 pt-6 pb-5 border-b border-border">
        <div className="text-[11px] uppercase tracking-wider text-ink-mute mb-1">
          Hotel
        </div>
        <div className="font-display text-[20px] leading-tight text-ink">
          {hotel.name}
        </div>
        <div className="text-[12px] text-ink-soft mt-0.5">
          {hotel.city}, {hotel.country}
        </div>
        <button
          onClick={() => navigate('/app/brand-dna')}
          className="mt-3 inline-flex items-center gap-1 text-[12px] text-ink-soft hover:text-ink transition"
        >
          <Pencil size={11} />
          Editar perfil
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-6 mb-2 text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium">
          Canales
        </div>
        {channels.map((c) => (
          <Item key={c.to} {...c} />
        ))}

        <div className="px-6 mt-6 mb-2 text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium">
          Cuenta
        </div>
        {accountItems.map((c) => (
          <Item key={c.to} {...c} />
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-warm-soft text-warm flex items-center justify-center text-[11px] font-semibold">
            CM
          </div>
          <div className="min-w-0">
            <div className="text-[12px] text-ink truncate">Camila Mendoza</div>
            <div className="text-[11px] text-ink-soft truncate">Recepción</div>
          </div>
        </div>
      </div>
    </aside>
  )
}

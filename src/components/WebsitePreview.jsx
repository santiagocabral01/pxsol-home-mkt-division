// Render simulado del sitio web del hotel. Hardcodeado, no funcional.
import { MapPin, Phone, Calendar } from 'lucide-react'
import { hotelImages, websiteMeta } from '../data/hotel'
import { useHotel } from '../context/HotelContext'

export default function WebsitePreview() {
  const { hotel, brand } = useHotel()
  const primary = brand.palette[0]?.hex || '#1A3C5E'
  const accent = brand.palette[1]?.hex || '#D4A853'

  return (
    <div
      className="overflow-y-auto h-full"
      style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        background: '#FBFAF6',
        color: '#1A1A1A',
      }}
    >
      {/* topbar */}
      <div
        className="flex items-center justify-between px-10 py-5"
        style={{ background: 'rgba(251,250,246,0.95)' }}
      >
        <div
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 22,
            letterSpacing: '0.04em',
            color: primary,
          }}
        >
          {hotel.name.toUpperCase()}
        </div>
        <nav className="flex items-center gap-7 text-[12px] tracking-wide uppercase text-[#3a3a3a]">
          {websiteMeta.sections.map((s) => (
            <span key={s.id}>{s.label}</span>
          ))}
          <button
            className="px-4 py-2 text-[11px] uppercase tracking-wider text-white rounded"
            style={{ background: primary }}
          >
            Reservar
          </button>
        </nav>
      </div>

      {/* hero */}
      <div className="relative">
        <img
          src={hotelImages.hero}
          alt=""
          className="w-full h-[440px] object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.45))',
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
          <div
            className="text-[11px] uppercase tracking-[0.3em] text-white/80 mb-4"
            style={{ fontFamily: 'Inter' }}
          >
            {hotel.city} · {hotel.country}
          </div>
          <h1
            className="text-white"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 58,
              lineHeight: 1.05,
              fontWeight: 500,
              maxWidth: 720,
              letterSpacing: '-0.01em',
            }}
          >
            {websiteMeta.headline}
          </h1>
          <p
            className="text-white/85 mt-4 max-w-[540px] text-[14px] leading-relaxed"
            style={{ fontFamily: 'Inter' }}
          >
            {websiteMeta.subheadline}
          </p>
          <button
            className="mt-7 px-7 py-3 text-[12px] uppercase tracking-wider text-white rounded-sm"
            style={{ background: accent, color: '#1a1a1a' }}
          >
            Consultar disponibilidad
          </button>
        </div>
      </div>

      {/* rooms */}
      <section className="max-w-[1100px] mx-auto px-10 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div
              className="text-[11px] uppercase tracking-[0.2em] mb-3"
              style={{ color: accent }}
            >
              Habitaciones
            </div>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 36,
                color: primary,
              }}
            >
              Tres maneras de quedarse.
            </h2>
          </div>
          <a
            className="text-[12px] uppercase tracking-wider"
            style={{ color: primary }}
          >
            Ver todas →
          </a>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {websiteMeta.rooms.map((r) => (
            <div key={r.name} className="group">
              <div className="aspect-[4/5] overflow-hidden mb-4">
                <img
                  src={r.image}
                  alt={r.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div
                className="font-display text-[20px] mb-1"
                style={{ color: primary, fontFamily: 'Playfair Display' }}
              >
                {r.name}
              </div>
              <div className="text-[12px] text-[#5a5a5a] mb-3">{r.pitch}</div>
              <div
                className="text-[11px] uppercase tracking-wider"
                style={{ color: accent }}
              >
                {r.price}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* experiences */}
      <section className="py-16" style={{ background: '#F4EFE4' }}>
        <div className="max-w-[1100px] mx-auto px-10">
          <div
            className="text-[11px] uppercase tracking-[0.2em] mb-3"
            style={{ color: accent }}
          >
            Experiencias
          </div>
          <h2
            className="mb-10"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 36,
              color: primary,
              maxWidth: 500,
            }}
          >
            Más que dónde dormir: cómo vivirlo.
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {websiteMeta.experiences.map((e) => (
              <div key={e.title}>
                <div className="aspect-[5/4] overflow-hidden mb-3">
                  <img
                    src={e.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="text-[16px] mb-1"
                  style={{
                    fontFamily: 'Playfair Display',
                    color: primary,
                  }}
                >
                  {e.title}
                </div>
                <div className="text-[12px] text-[#5a5a5a]">{e.copy}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* location */}
      <section className="max-w-[1100px] mx-auto px-10 py-16 grid grid-cols-2 gap-12 items-center">
        <div>
          <div
            className="text-[11px] uppercase tracking-[0.2em] mb-3"
            style={{ color: accent }}
          >
            Ubicación
          </div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 36,
              color: primary,
              maxWidth: 400,
            }}
          >
            Dentro de la muralla. A 40 pasos del mar.
          </h2>
          <p className="text-[14px] text-[#5a5a5a] mt-4 leading-relaxed max-w-[420px]">
            En el corazón del Centro Histórico de Cartagena, una de las ciudades
            más bellas del Caribe. Caminás todo, no necesitás taxi.
          </p>
          <div className="mt-6 space-y-2 text-[13px]">
            <div className="flex items-center gap-2">
              <MapPin size={14} style={{ color: accent }} /> Calle del Curato
              38-42
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} style={{ color: accent }} /> +57 5 664 0000
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} style={{ color: accent }} /> Check-in 15:00
              · Check-out 12:00
            </div>
          </div>
        </div>
        <div
          className="aspect-[4/3] rounded overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #E1E5DA, #F4EFE4), url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'sepia(0.15) saturate(0.85)',
          }}
        />
      </section>

      {/* footer */}
      <footer
        className="py-10 px-10 text-center"
        style={{ background: primary, color: '#fff' }}
      >
        <div
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 24,
            letterSpacing: '0.04em',
          }}
        >
          {hotel.name.toUpperCase()}
        </div>
        <div className="text-[11px] uppercase tracking-[0.2em] mt-2 opacity-70">
          {hotel.city} · {hotel.country}
        </div>
        <div className="text-[11px] mt-6 opacity-60">
          © 2026 {hotel.name} · Todos los derechos reservados
        </div>
      </footer>

      {/* floating reservar */}
      <div
        className="fixed right-6 bottom-6 rounded-full px-5 py-3 shadow-lg text-white text-[12px] uppercase tracking-wider"
        style={{ background: primary, position: 'sticky', float: 'right' }}
      >
        Reservar ahora
      </div>
    </div>
  )
}

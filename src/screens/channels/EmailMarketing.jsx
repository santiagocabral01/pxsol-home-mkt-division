import { useState } from 'react'
import { Pencil, Copy, Download, Mail, ChevronRight } from 'lucide-react'
import ChannelHeader from '../../components/ChannelHeader'
import Button from '../../components/ui/Button'
import Pill from '../../components/ui/Pill'
import { emailCampaigns, hotelImages } from '../../data/hotel'
import { useHotel } from '../../context/HotelContext'

function StatusPill({ status }) {
  const tone =
    status === 'Listo'
      ? 'green'
      : status === 'Enviado'
      ? 'cool'
      : status === 'Borrador'
      ? 'amber'
      : 'neutral'
  return <Pill tone={tone}>{status}</Pill>
}

export default function EmailMarketing() {
  const [selected, setSelected] = useState(emailCampaigns[0].id)
  const { hotel, brand } = useHotel()
  const campaign = emailCampaigns.find((c) => c.id === selected)
  const primary = brand.palette[0]?.hex || '#1A3C5E'
  const accent = brand.palette[1]?.hex || '#D4A853'

  return (
    <div className="px-10 py-10 max-w-[1400px] mx-auto">
      <ChannelHeader
        eyebrow="Canal · Email Marketing"
        highlight="recuerden"
        title="Para que tus huéspedes te recuerden."
        subtitle="Cuatro campañas pre-armadas con tu tono y tu marca. Conectá tu lista y empezá a enviar."
        right={
          <Button>
            <Mail size={14} /> Conectar lista
          </Button>
        }
      />

      <div className="grid grid-cols-[340px_1fr] gap-6 items-start">
        {/* Lista de campañas */}
        <aside className="hp-card p-3 sticky top-6">
          <div className="px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium">
            Campañas
          </div>
          <div className="space-y-1">
            {emailCampaigns.map((c) => {
              const active = c.id === selected
              return (
                <button
                  key={c.id}
                  onClick={() => setSelected(c.id)}
                  className={`w-full text-left px-3 py-3 rounded-lg transition group ${
                    active ? 'bg-[color:var(--color-brand-soft)]' : 'hover:bg-surface-hover'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div
                      className={`text-[13px] font-medium ${
                        active ? 'text-ink' : 'text-ink'
                      }`}
                    >
                      {c.name}
                    </div>
                    <ChevronRight
                      size={14}
                      className={`flex-shrink-0 mt-0.5 transition-transform ${
                        active ? 'text-[color:var(--color-brand-text)] translate-x-0.5' : 'text-ink-mute'
                      }`}
                    />
                  </div>
                  <div className="text-[11px] text-ink-soft mb-2">{c.detail}</div>
                  <StatusPill status={c.status} />
                </button>
              )
            })}
          </div>

          <div className="border-t border-border mt-3 pt-3 px-3 pb-2">
            <div className="text-[11px] text-ink-soft mb-2">Métricas estimadas</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { k: 'Open', v: '38%' },
                { k: 'Click', v: '11%' },
                { k: 'Conv', v: '3.2%' },
              ].map((m) => (
                <div key={m.k} className="bg-pill rounded-lg py-2">
                  <div className="font-mono text-[13px] text-ink">{m.v}</div>
                  <div className="text-[10px] uppercase tracking-wider text-ink-soft">
                    {m.k}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Preview del email */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-heading text-[24px] font-medium tracking-tight text-ink">
                {campaign.name}
              </div>
              <div className="text-[12px] text-ink-soft">
                Asunto:{' '}
                <span className="text-ink">{campaign.subject}</span>{' '}
                <span className="mx-1.5">·</span>
                Preheader: {campaign.preheader}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm">
                <Pencil size={11} /> Editar
              </Button>
              <Button variant="secondary" size="sm">
                <Copy size={11} /> Duplicar
              </Button>
              <Button variant="secondary" size="sm">
                <Download size={11} /> Exportar HTML
              </Button>
            </div>
          </div>

          <div className="hp-card overflow-hidden">
            {/* email client topbar */}
            <div className="px-5 py-3 border-b border-border flex items-center gap-3 bg-surface-hover">
              <div className="w-7 h-7 rounded-full bg-pill text-ink-soft flex items-center justify-center text-[11px] font-medium">
                HM
              </div>
              <div className="flex-1">
                <div className="text-[12px] text-ink font-medium">
                  {hotel.name}{' '}
                  <span className="text-ink-soft font-normal">
                    &lt;hola@hotelazulmarino.com&gt;
                  </span>
                </div>
                <div className="text-[11px] text-ink-soft">{campaign.preheader}</div>
              </div>
              <div className="text-[11px] text-ink-soft font-mono">11:42</div>
            </div>

            {/* email body */}
            <div className="px-6 pt-0 pb-0 bg-[#FBFAF6]">
              <div
                className="py-7 text-center"
                style={{ background: primary, color: '#fff' }}
              >
                <div
                  className="font-display text-[24px]"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    letterSpacing: '0.04em',
                  }}
                >
                  {hotel.name.toUpperCase()}
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] opacity-70 mt-1">
                  {hotel.city} · {hotel.country}
                </div>
              </div>
              <img
                src={hotelImages.hero}
                alt=""
                className="w-full h-[260px] object-cover"
              />
              <div className="px-8 py-8 max-w-[540px] mx-auto">
                <h2
                  className="text-[26px] mb-4"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    color: primary,
                    lineHeight: 1.15,
                  }}
                >
                  {campaign.subject}
                </h2>
                <div className="space-y-3.5 text-[14px] leading-relaxed text-[#3a3a3a]">
                  {campaign.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="mt-7 text-center">
                  <button
                    className="inline-flex items-center gap-2 px-7 py-3.5 text-[12px] uppercase tracking-wider text-white rounded-sm"
                    style={{ background: primary }}
                  >
                    {campaign.cta} →
                  </button>
                </div>
                <div
                  className="mt-10 pt-6 text-[10px] uppercase tracking-[0.2em] text-center"
                  style={{ borderTop: '1px solid #E5DDC9', color: '#9a8e72' }}
                >
                  Hotel Azul Marino · Calle del Curato 38-42 · Cartagena
                </div>
                <div className="text-[10px] text-center text-[#9a8e72] mt-2">
                  Si no querés recibir más estos correos,{' '}
                  <span style={{ color: accent }}>cancelá tu suscripción</span>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

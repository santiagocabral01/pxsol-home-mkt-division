import { useState } from 'react'
import {
  Sparkles,
  Star,
  MapPin,
  Phone,
  Clock,
  Globe,
  MessageSquare,
  Plus,
  Check,
} from 'lucide-react'
import ChannelHeader from '../../components/ChannelHeader'
import Button from '../../components/ui/Button'
import Pill from '../../components/ui/Pill'
import Modal from '../../components/ui/Modal'
import { Field, Input, Textarea } from '../../components/ui/Field'
import { googleBusiness as gb, hotelImages } from '../../data/hotel'

function StarRow({ value }) {
  const full = Math.floor(value)
  const half = value % 1 >= 0.5
  return (
    <div className="flex items-center gap-0.5 text-amber">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < full ? 'currentColor' : half && i === full ? 'currentColor' : 'none'}
          strokeWidth={1.5}
        />
      ))}
      <span className="ml-1 font-mono text-[11px] text-ink">{value.toFixed(1)}</span>
    </div>
  )
}

/* Acento producto: ads — azul (#0C73A6 dark · #3CAEE7 base · #CBE4F1 soft)
   --color-accent-dark (#0C73A6) ~5:1 sobre blanco → pasa WCAG AA texto pequeño. */
const ADS_ACCENT = {
  '--color-accent':      '#3CAEE7',
  '--color-accent-dark': '#0C73A6',
  '--color-accent-soft': '#CBE4F1',
}

export default function GoogleBusiness() {
  const [data, setData] = useState(gb)
  const [openReply, setOpenReply] = useState(null)

  const update = (k, v) => setData((d) => ({ ...d, [k]: v }))
  const toggleAttr = (id) =>
    setData((d) => ({
      ...d,
      attributes: d.attributes.map((a) =>
        a.id === id ? { ...a, on: !a.on } : a,
      ),
    }))

  return (
    <div className="px-10 py-10 max-w-[1400px] mx-auto" style={ADS_ACCENT}>
      <ChannelHeader
        eyebrow="Canal · Google Business Profile"
        highlight="encuentren"
        title="Para que te encuentren al primer click."
        subtitle="La ficha que Google muestra cuando alguien busca tu hotel. Optimizada con tu marca, fotos y horarios."
        right={
          <div className="flex items-center gap-2">
            <Pill tone="amber">87% completo</Pill>
            <Button>
              <Sparkles size={14} /> Publicar cambios
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-[1fr_1.1fr] gap-6 items-start">
        {/* Mock Google Maps card */}
        <div className="hp-card overflow-hidden sticky top-6">
          <div className="px-3 py-2.5 border-b border-border flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09a6.6 6.6 0 010-4.18V7.07H2.18a11 11 0 000 9.86l3.66-2.84z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
                />
              </svg>
            </div>
            <span className="font-mono text-[11px] text-ink-soft">
              google.com/maps
            </span>
            <Pill tone="green" className="ml-auto">
              vista previa
            </Pill>
          </div>
          <div
            className="h-[180px] relative"
            style={{
              background: '#E8EAED',
              backgroundImage:
                "url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-75.5512,10.4236,14,0/600x180@2x?access_token=demo'), linear-gradient(135deg,#E8EAED,#F1F3F4)",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
              <div
                className="w-7 h-7 rounded-full bg-[#EA4335] border-2 border-white shadow-md flex items-center justify-center text-white"
                style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.25))' }}
              >
                <MapPin size={14} fill="currentColor" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-0.5 h-[120px]">
            {data.photos.slice(0, 3).map((p, i) => (
              <img key={i} src={p} alt="" className="w-full h-full object-cover" />
            ))}
          </div>
          <div className="p-4">
            <div className="font-heading text-[20px] font-medium tracking-tight mb-0.5">{data.name}</div>
            <div className="flex items-center gap-2 mb-1.5">
              <StarRow value={4.6} />
              <span className="text-[12px] text-ink-soft">(284 reseñas)</span>
            </div>
            <div className="text-[12px] text-ink-soft mb-3">
              {data.category} · 4 estrellas · {data.secondaryCategories[0]}
            </div>
            <div className="text-[13px] text-ink leading-relaxed mb-3">
              {data.shortDescription}
            </div>
            <div className="space-y-1.5 text-[12px] text-ink-soft">
              <div className="flex items-center gap-2">
                <MapPin size={12} /> {data.address}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={12} /> {data.hours}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} /> {data.phone}
              </div>
              <div className="flex items-center gap-2">
                <Globe size={12} /> {data.website}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="h-9 rounded-md bg-[#1A73E8] text-white text-[12px] font-medium">
                Llamar
              </button>
              <button className="h-9 rounded-md border border-border text-ink text-[12px] font-medium">
                Cómo llegar
              </button>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="space-y-6">
          <div className="hp-card p-6 space-y-5">
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium">
              Datos del negocio
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nombre">
                <Input
                  value={data.name}
                  onChange={(e) => update('name', e.target.value)}
                />
              </Field>
              <Field label="Categoría principal">
                <Input
                  value={data.category}
                  onChange={(e) => update('category', e.target.value)}
                />
              </Field>
            </div>
            <Field label="Categorías secundarias">
              <div className="flex flex-wrap gap-2">
                {data.secondaryCategories.map((c) => (
                  <Pill key={c} tone="cool">
                    {c}
                  </Pill>
                ))}
                <button className="inline-flex items-center gap-1 text-[12px] text-ink-soft hover:text-ink">
                  <Plus size={12} /> Agregar
                </button>
              </div>
            </Field>
            <Field
              label="Descripción corta"
              hint={
                <span style={{ color: 'var(--color-accent-dark)' }}>
                  ✦ generada con IA
                </span>
              }
            >
              <Textarea
                value={data.shortDescription}
                onChange={(e) => update('shortDescription', e.target.value)}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Teléfono">
                <Input
                  value={data.phone}
                  onChange={(e) => update('phone', e.target.value)}
                />
              </Field>
              <Field label="WhatsApp">
                <Input
                  value={data.whatsapp}
                  onChange={(e) => update('whatsapp', e.target.value)}
                />
              </Field>
            </div>
            <Field label="Sitio web">
              <Input
                value={data.website}
                onChange={(e) => update('website', e.target.value)}
              />
            </Field>
          </div>

          <div className="hp-card p-6">
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-3">
              Atributos
            </div>
            <div className="grid grid-cols-2 gap-2">
              {data.attributes.map((a) => (
                <label
                  key={a.id}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-hover cursor-pointer"
                >
                  <span
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      a.on
                        ? 'bg-ink border-ink text-white'
                        : 'border-border bg-card'
                    }`}
                  >
                    {a.on && <Check size={11} strokeWidth={3} />}
                  </span>
                  <span className="text-[13px] text-ink">{a.label}</span>
                  <input
                    type="checkbox"
                    checked={a.on}
                    onChange={() => toggleAttr(a.id)}
                    className="sr-only"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="hp-card p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium">
                Fotos asignadas
              </div>
              <span className="text-[11px] text-ink-soft">
                {data.photos.length} de 20
              </span>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {data.photos.map((p, i) => (
                <div key={i} className="aspect-square rounded-md overflow-hidden">
                  <img src={p} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              <button className="aspect-square rounded-md border border-dashed border-border-strong text-ink-soft hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-dark)] flex items-center justify-center">
                <Plus size={14} />
              </button>
            </div>
          </div>

          <div className="hp-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-0.5">
                  Reseñas recientes
                </div>
                <div className="font-heading text-[18px] font-medium tracking-tight">
                  3 esperando respuesta
                </div>
              </div>
              <StarRow value={4.6} />
            </div>
            <div className="space-y-3">
              {data.reviews.map((r) => (
                <div
                  key={r.author}
                  className="p-4 rounded-lg border border-border hover:border-border-strong transition"
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <div>
                      <div className="text-[13px] font-medium text-ink">
                        {r.author}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StarRow value={r.stars} />
                        <span className="text-[11px] text-ink-soft">{r.date}</span>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setOpenReply(r)}
                    >
                      <MessageSquare size={11} /> Responder con IA
                    </Button>
                  </div>
                  <p className="text-[12.5px] text-ink-soft leading-relaxed">
                    {r.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={!!openReply}
        onClose={() => setOpenReply(null)}
        title="Respuesta generada con IA"
        maxWidth="max-w-lg"
      >
        {openReply && (
          <>
            <div className="text-[12px] text-ink-soft mb-3">
              En respuesta a <span className="text-ink font-medium">{openReply.author}</span>
              <span className="mx-1.5">·</span>
              <StarRow value={openReply.stars} />
            </div>
            <div className="p-4 rounded-lg bg-pill text-[13px] text-ink leading-relaxed mb-4">
              {openReply.aiReply}
            </div>
            <div className="text-[11px] text-ink-soft mb-5">
              Tono adaptado a la reseña original. Editá antes de publicar si querés cambiar algo.
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="ghost" onClick={() => setOpenReply(null)}>
                Cancelar
              </Button>
              <Button variant="secondary">Regenerar</Button>
              <Button onClick={() => setOpenReply(null)}>Publicar respuesta</Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}

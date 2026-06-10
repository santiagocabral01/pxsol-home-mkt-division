import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ImagePlus, Sparkles, X } from 'lucide-react'
import Headline from '../components/ui/Headline'
import Pill from '../components/ui/Pill'
import Button from '../components/ui/Button'
import Stepper from '../components/Stepper'
import { Field, Input, Textarea, Select } from '../components/ui/Field'
import { useHotel } from '../context/HotelContext'
import { hotelImages } from '../data/hotel'

const categories = ['Boutique', 'Resort', 'Apart-hotel', 'Hostal', 'Eco-lodge']

const previewImages = [
  hotelImages.facade,
  hotelImages.pool,
  hotelImages.room2,
  hotelImages.restaurant,
]

export default function Onboarding() {
  const navigate = useNavigate()
  const { hotel, setHotel } = useHotel()
  const [rooms, setRoomsLocal] = useState(hotel.rooms.join(', '))
  const [uploaded] = useState(previewImages) // hardcoded preview

  const update = (k, v) => setHotel((h) => ({ ...h, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    setHotel((h) => ({
      ...h,
      rooms: rooms
        .split(',')
        .map((r) => r.trim())
        .filter(Boolean),
    }))
    navigate('/app/brand-dna')
  }

  return (
    <div className="min-h-screen w-full">
      <header className="flex items-center justify-between px-10 py-6 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-warm" />
          <span className="font-display text-[18px]">Hotel Presence</span>
        </div>
        <Stepper current={1} />
        <Pill tone="warm">
          <Sparkles size={11} /> Demo en vivo
        </Pill>
      </header>

      <div className="max-w-[1100px] mx-auto px-10 py-14 grid grid-cols-[1.05fr_0.95fr] gap-16 items-start">
        <section className="hp-fade-in">
          <Pill tone="warm" className="mb-5">
            ✦ Paso 1 — Cuéntanos sobre tu hotel
          </Pill>
          <Headline
            as="h1"
            highlight="presencia"
            className="text-[44px] leading-[1.05] tracking-tight mb-4"
          >
            Construimos tu presencia online en cinco minutos.
          </Headline>
          <p className="text-ink-soft text-[15px] leading-relaxed mb-10 max-w-[440px]">
            Contanos lo básico de tu propiedad. Con eso generamos tu sitio,
            tus redes, tu ficha de Google y tu perfil en Booking — todo con
            la misma identidad.
          </p>

          <form className="space-y-6" onSubmit={submit}>
            <Field label="Nombre del hotel">
              <Input
                value={hotel.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Hotel Azul Marino"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Ciudad">
                <Input
                  value={hotel.city}
                  onChange={(e) => update('city', e.target.value)}
                />
              </Field>
              <Field label="País">
                <Input
                  value={hotel.country}
                  onChange={(e) => update('country', e.target.value)}
                />
              </Field>
            </div>

            <Field label="Categoría">
              <Select
                value={hotel.category}
                onChange={(e) => update('category', e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </Field>

            <Field label="Descripción libre" hint={`${hotel.description.length} / 400`}>
              <Textarea
                value={hotel.description}
                onChange={(e) => update('description', e.target.value)}
                maxLength={400}
              />
            </Field>

            <Field label="Tipos de habitación" hint="separá por comas">
              <Input
                value={rooms}
                onChange={(e) => setRoomsLocal(e.target.value)}
                placeholder="Habitación Standard, Suite Junior, Suite Master"
              />
            </Field>

            <Field label="Imágenes del hotel" hint={`${uploaded.length} cargadas`}>
              <div className="grid grid-cols-4 gap-2">
                {uploaded.map((src, i) => (
                  <div
                    key={i}
                    className="relative group aspect-square rounded-lg overflow-hidden bg-pill"
                  >
                    <img
                      src={src}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                    <button
                      type="button"
                      className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/90 text-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow"
                    >
                      <X size={11} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="aspect-square rounded-lg border border-dashed border-border-strong text-ink-soft hover:text-ink hover:border-warm flex flex-col items-center justify-center gap-1 transition"
                >
                  <ImagePlus size={18} />
                  <span className="text-[11px]">Subir</span>
                </button>
              </div>
            </Field>

            <div className="pt-2">
              <Button type="submit" size="lg" className="w-full">
                Analizar mi hotel
                <ArrowRight size={16} />
              </Button>
            </div>
          </form>
        </section>

        <aside className="sticky top-10 hp-fade-in">
          <div
            className="hp-card overflow-hidden"
            style={{
              transform: 'perspective(1400px) rotateY(-3deg) rotateX(2deg)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.15)',
            }}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={hotelImages.hero}
                alt="Hotel preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] uppercase tracking-wider text-ink-mute">
                  Vista previa del hub
                </span>
                <Pill tone="green">● en vivo</Pill>
              </div>
              <div className="font-display text-[22px] leading-tight">
                {hotel.name}
              </div>
              <div className="text-[12px] text-ink-soft mt-0.5">
                {hotel.city}, {hotel.country} · {hotel.category}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  { k: 'Assets', v: '47' },
                  { k: 'Canales', v: '6' },
                  { k: 'Score', v: '94' },
                ].map((m) => (
                  <div key={m.k} className="bg-pill rounded-lg py-2.5">
                    <div className="font-mono text-[15px] text-ink">{m.v}</div>
                    <div className="text-[10px] uppercase tracking-wider text-ink-soft">
                      {m.k}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 text-[12px] text-ink-soft text-center max-w-[340px] mx-auto">
            Así se ve tu hub una vez que terminamos. Hoteleros ya activos:{' '}
            <span className="text-ink font-medium">128 propiedades</span> en LATAM.
          </div>
        </aside>
      </div>
    </div>
  )
}

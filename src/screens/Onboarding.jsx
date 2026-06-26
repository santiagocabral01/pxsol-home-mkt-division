import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles, Check } from 'lucide-react'
import Headline from '../components/ui/Headline'
import Pill from '../components/ui/Pill'
import Button from '../components/ui/Button'
import Stepper from '../components/Stepper'
import ChatFlow, { BOT_NAME } from '../components/ChatFlow'
import { useHotel } from '../context/HotelContext'
import { hotelImages } from '../data/hotel'

const previewImages = [
  hotelImages.facade,
  hotelImages.pool,
  hotelImages.room2,
  hotelImages.restaurant,
]

function PhotoGrid() {
  return (
    <div className="grid grid-cols-4 gap-1.5 w-[220px]">
      {previewImages.map((src, i) => (
        <div
          key={i}
          className="aspect-square rounded-md overflow-hidden border border-border"
          style={{ animation: `hp-bubble-in 0.4s ease-out ${i * 0.1}s both` }}
        >
          <img src={src} className="w-full h-full object-cover" alt="" />
        </div>
      ))}
    </div>
  )
}

export default function Onboarding() {
  const navigate = useNavigate()
  const { hotel, setHotel } = useHotel()
  const [done, setDone] = useState(false)

  const go = () => navigate('/app/brand-dna')

  // Conversational, auto-played onboarding. The answers mirror the hotel
  // already in context — the chat just fills it in with transitions.
  const script = useMemo(
    () => [
      {
        role: 'bot',
        text: `¡Hola! Soy ${BOT_NAME}. Contame lo básico de tu hotel. ✨`,
      },
      { role: 'bot', text: '¿Cómo se llama y dónde queda?' },
      {
        role: 'user',
        text: `${hotel.name} — ${hotel.city}, ${hotel.country}`,
      },
      { role: 'bot', text: '¿Qué tipo de propiedad es?' },
      {
        role: 'user',
        text: `${hotel.category} · ${hotel.stars} estrellas · ${hotel.rooms.length} tipos de habitación`,
      },
      {
        role: 'bot',
        text: '¿Tenés fotos para mostrar?',
      },
      {
        role: 'user',
        text: 'Estas 👇',
        attachment: <PhotoGrid />,
        pause: 600,
      },
      {
        role: 'bot',
        text: 'Listo. Ya puedo detectar tu identidad de marca.',
        pause: 250,
      },
    ],
    [hotel],
  )

  // Keep context coherent (the demo data is already loaded, this is a no-op
  // in practice but keeps the screen self-contained).
  useEffect(() => {
    if (done) setHotel((h) => ({ ...h }))
  }, [done, setHotel])

  return (
    <div className="min-h-screen w-full">
      <header className="flex items-center justify-between px-10 py-6 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[color:var(--color-brand-text)]" />
          <span className="font-display text-[18px]">Hotel Presence</span>
        </div>
        <Stepper current={1} />
        <Pill tone="brand">
          <Sparkles size={11} /> Demo en vivo
        </Pill>
      </header>

      <div className="max-w-[1100px] mx-auto px-10 py-12 grid grid-cols-[1.05fr_0.95fr] gap-16 items-start">
        <section className="hp-fade-in">
          <Pill tone="neutral" className="mb-5">
            ✦ Paso 1 — Contanos sobre tu hotel
          </Pill>
          <Headline
            as="h1"
            highlight="conversando"
            className="text-[40px] leading-[1.05] tracking-tight mb-4"
          >
            Construimos tu presencia conversando.
          </Headline>
          <p className="text-ink-soft text-[15px] leading-relaxed mb-8 max-w-[440px]">
            Sin formularios largos. {BOT_NAME} te hace unas preguntas y con eso
            generamos tu sitio, tus redes, tu ficha de Google y tu perfil en
            Booking — todo con la misma identidad.
          </p>

          {/* Chat window */}
          <div className="hp-card flex flex-col overflow-hidden">
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border bg-surface-hover">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, #e84a2c 0%, #d03d21 100%)',
                }}
              >
                <Sparkles size={15} className="text-white" strokeWidth={2.4} />
              </span>
              <div className="leading-tight">
                <div className="text-[13px] font-medium text-ink">
                  {BOT_NAME}
                </div>
                <div className="text-[11px] text-green flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green" /> en línea
                </div>
              </div>
            </div>

            <ChatFlow
              script={script}
              onComplete={() => setDone(true)}
              className="h-[440px] px-4 py-5"
            />

            <div className="border-t border-border p-3">
              {done ? (
                <Button
                  size="lg"
                  className="w-full group hp-bubble-in"
                  onClick={go}
                >
                  Analizar mi hotel
                  <ArrowRight size={16} className="hp-arrow" />
                </Button>
              ) : (
                <div className="h-12 rounded-lg bg-pill flex items-center justify-center text-[12px] text-ink-mute">
                  {BOT_NAME} está completando tu perfil…
                </div>
              )}
            </div>
          </div>
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
                <Pill tone={done ? 'green' : 'neutral'}>
                  {done ? (
                    <>
                      <Check size={11} /> listo
                    </>
                  ) : (
                    <>● en vivo</>
                  )}
                </Pill>
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

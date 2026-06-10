import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Sparkles, Loader2 } from 'lucide-react'
import Headline from '../components/ui/Headline'
import Pill from '../components/ui/Pill'
import Button from '../components/ui/Button'
import Stepper from '../components/Stepper'
import { Field, Input, Textarea } from '../components/ui/Field'
import { useHotel } from '../context/HotelContext'

const analyzingSteps = [
  'Leyendo la información de tu hotel…',
  'Identificando atributos visuales…',
  'Detectando paleta y tipografía…',
  'Construyendo tu Brand DNA…',
]

function ColorChip({ hex, name, onChange }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <label className="relative w-14 h-14 rounded-xl shadow-card overflow-hidden cursor-pointer">
        <div className="w-full h-full" style={{ background: hex }} />
        <input
          type="color"
          value={hex}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </label>
      <div className="text-center">
        <div className="font-mono text-[11px] text-ink uppercase tracking-wider">
          {hex}
        </div>
        <div className="text-[11px] text-ink-soft">{name}</div>
      </div>
    </div>
  )
}

export default function BrandDNA() {
  const navigate = useNavigate()
  const { hotel, brand, setBrand } = useHotel()
  const [analyzing, setAnalyzing] = useState(true)
  const [stepIdx, setStepIdx] = useState(0)

  useEffect(() => {
    if (!analyzing) return
    const t1 = setTimeout(() => setStepIdx(1), 800)
    const t2 = setTimeout(() => setStepIdx(2), 1700)
    const t3 = setTimeout(() => setStepIdx(3), 2600)
    const t4 = setTimeout(() => setAnalyzing(false), 3600)
    return () => {
      ;[t1, t2, t3, t4].forEach(clearTimeout)
    }
  }, [analyzing])

  if (analyzing) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="flex items-center justify-between px-10 py-6 border-b border-border bg-card/60 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-warm" />
            <span className="font-display text-[18px]">Hotel Presence</span>
          </div>
          <Stepper current={2} />
          <Pill tone="warm">
            <Sparkles size={11} /> Demo en vivo
          </Pill>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-10">
          <Loader2 size={36} className="text-warm hp-spin mb-8" />
          <Headline
            as="h2"
            highlight="analizando"
            className="text-[32px] mb-3 text-center max-w-[520px]"
          >
            Estamos analizando tu hotel
          </Headline>
          <p className="text-ink-soft text-center max-w-[460px] mb-8">
            Leemos tu descripción, tus imágenes y comparamos con otros 1.200 hoteles
            boutique para sacar tu identidad.
          </p>
          <div className="w-full max-w-[400px] space-y-2.5">
            {analyzingSteps.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 text-[13px] transition-all ${
                  i <= stepIdx ? 'text-ink' : 'text-ink-mute'
                }`}
              >
                {i < stepIdx ? (
                  <span className="text-green">✓</span>
                ) : i === stepIdx ? (
                  <Loader2 size={12} className="text-warm hp-spin" />
                ) : (
                  <span className="w-3 h-3 rounded-full border border-border" />
                )}
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const setPaletteHex = (idx, hex) => {
    setBrand((b) => ({
      ...b,
      palette: b.palette.map((p, i) => (i === idx ? { ...p, hex } : p)),
    }))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-10 py-6 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-warm" />
          <span className="font-display text-[18px]">Hotel Presence</span>
        </div>
        <Stepper current={2} />
        <Pill tone="warm">
          <Sparkles size={11} /> Demo en vivo
        </Pill>
      </header>

      <main className="max-w-[920px] mx-auto px-10 py-12 w-full hp-fade-in">
        <div className="flex items-center justify-between mb-2">
          <Pill tone="warm">
            ✦ Paso 2 — Brand DNA generado
          </Pill>
          <span className="text-[12px] text-ink-soft">
            Para <span className="text-ink font-medium">{hotel.name}</span>
          </span>
        </div>

        <Headline
          as="h1"
          highlight="identidad"
          className="text-[40px] leading-tight tracking-tight mt-4 mb-3"
        >
          Esta es la identidad que detectamos.
        </Headline>
        <p className="text-ink-soft text-[14px] max-w-[560px] mb-10">
          Editá cualquier cosa que no se sienta tuya. Cuando confirmes, generamos
          todos tus canales con este sistema.
        </p>

        <div className="hp-card p-8 space-y-8">
          <section>
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute mb-3 font-medium">
              Paleta detectada
            </div>
            <div className="flex gap-6 flex-wrap">
              {brand.palette.map((c, i) => (
                <ColorChip
                  key={i}
                  hex={c.hex}
                  name={c.name}
                  onChange={(hex) => setPaletteHex(i, hex)}
                />
              ))}
            </div>
          </section>

          <div className="grid grid-cols-2 gap-6">
            <Field label="Tipografía display">
              <Input
                value={brand.typography.display}
                onChange={(e) =>
                  setBrand((b) => ({
                    ...b,
                    typography: { ...b.typography, display: e.target.value },
                  }))
                }
              />
            </Field>
            <Field label="Tipografía body / UI">
              <Input
                value={brand.typography.body}
                onChange={(e) =>
                  setBrand((b) => ({
                    ...b,
                    typography: { ...b.typography, body: e.target.value },
                  }))
                }
              />
            </Field>
          </div>

          <Field label="Tono de voz">
            <Input
              value={brand.voice}
              onChange={(e) =>
                setBrand((b) => ({ ...b, voice: e.target.value }))
              }
            />
          </Field>

          <Field label="Categoría">
            <Input
              value={brand.category}
              onChange={(e) =>
                setBrand((b) => ({ ...b, category: e.target.value }))
              }
            />
          </Field>

          <Field label="Propuesta de valor">
            <Textarea
              value={brand.valueProp}
              onChange={(e) =>
                setBrand((b) => ({ ...b, valueProp: e.target.value }))
              }
              className="min-h-[70px]"
            />
          </Field>

          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <Pill tone="cool">
              {brand.roomCategories} categorías identificadas
            </Pill>
            <Pill tone="green">✓ {hotel.rooms.length} tipos de habitación</Pill>
          </div>
        </div>

        <div className="flex items-center justify-between mt-8">
          <Button variant="ghost" onClick={() => navigate('/app/onboarding')}>
            <ArrowLeft size={14} /> Volver
          </Button>
          <Button size="lg" onClick={() => navigate('/app/generating')}>
            Generar presencia completa
            <ArrowRight size={16} />
          </Button>
        </div>
      </main>
    </div>
  )
}

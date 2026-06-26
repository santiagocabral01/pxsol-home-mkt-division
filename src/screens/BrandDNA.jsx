import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Loader2,
  UploadCloud,
  FileText,
  X,
} from 'lucide-react'
import Headline from '../components/ui/Headline'
import Pill from '../components/ui/Pill'
import Button from '../components/ui/Button'
import Stepper from '../components/Stepper'
import ChatFlow, { BOT_NAME } from '../components/ChatFlow'
import { useHotel } from '../context/HotelContext'

const analyzingSteps = [
  'Leyendo la información de tu hotel…',
  'Identificando atributos visuales…',
  'Detectando paleta y tipografía…',
  'Construyendo tu Brand DNA…',
]

/* ---------- Chat attachments (each reads/writes context itself, so the
   scripted conversation can be built once without restarting on edits) ---------- */

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function BrandManualUpload() {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)

  const handleFiles = (files) => {
    if (files && files[0]) setFile(files[0])
  }

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-hover px-3.5 py-2.5 w-[300px]">
        <span className="w-9 h-9 rounded-lg bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand-text)] flex items-center justify-center flex-shrink-0">
          <FileText size={16} strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[12.5px] text-ink font-medium truncate">
            {file.name}
          </div>
          <div className="text-[11px] text-ink-soft">
            {formatBytes(file.size)} · lo usaré como referencia
          </div>
        </div>
        <button
          type="button"
          onClick={() => setFile(null)}
          aria-label="Quitar archivo"
          className="w-7 h-7 rounded-md flex items-center justify-center text-ink-soft hover:text-ink hover:bg-card transition"
        >
          <X size={15} />
        </button>
      </div>
    )
  }

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        handleFiles(e.dataTransfer.files)
      }}
      className={`flex items-center gap-3 rounded-xl border border-dashed px-3.5 py-3 cursor-pointer transition w-[300px] ${
        dragging
          ? 'border-[color:var(--color-brand)] bg-[color:var(--color-brand-soft)]/40'
          : 'border-border-strong hover:border-[color:var(--color-brand)] hover:bg-surface-hover'
      }`}
    >
      <span className="w-9 h-9 rounded-lg bg-[color:var(--color-brand-soft)] text-[color:var(--color-brand-text)] flex items-center justify-center flex-shrink-0">
        <UploadCloud size={17} strokeWidth={1.75} />
      </span>
      <div className="flex-1">
        <div className="text-[12.5px] text-ink font-medium">
          Subí tu manual de marca
        </div>
        <div className="text-[11px] text-ink-soft leading-snug">
          Arrastrá o hacé clic — PDF, imagen o documento. Opcional.
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,image/*"
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />
    </label>
  )
}

function PaletteEditor() {
  const { brand, setBrand } = useHotel()
  const setHex = (idx, hex) =>
    setBrand((b) => ({
      ...b,
      palette: b.palette.map((p, i) => (i === idx ? { ...p, hex } : p)),
    }))

  return (
    <div className="flex gap-4 flex-wrap">
      {brand.palette.map((c, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <label className="relative w-12 h-12 rounded-xl shadow-card overflow-hidden cursor-pointer">
            <div className="w-full h-full" style={{ background: c.hex }} />
            <input
              type="color"
              value={c.hex}
              onChange={(e) => setHex(i, e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </label>
          <div className="text-center">
            <div className="font-mono text-[10px] text-ink uppercase tracking-wide">
              {c.hex}
            </div>
            <div className="text-[10px] text-ink-soft">{c.name}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function TypographyCard() {
  const { brand } = useHotel()
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-display text-[40px] leading-none">Aa</span>
      <div>
        <div className="text-[13px] text-ink">{brand.typography.display}</div>
        <div className="text-[11px] text-ink-soft mt-0.5">
          Cuerpo · {brand.typography.body}
        </div>
      </div>
    </div>
  )
}

export default function BrandDNA() {
  const navigate = useNavigate()
  const { hotel, brand } = useHotel()
  const [analyzing, setAnalyzing] = useState(true)
  const [stepIdx, setStepIdx] = useState(0)
  const [done, setDone] = useState(false)

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
            <Sparkles size={16} className="text-[color:var(--color-brand-text)]" />
            <span className="font-display text-[18px]">Hotel Presence</span>
          </div>
          <Stepper current={2} />
          <Pill tone="brand">
            <Sparkles size={11} /> Demo en vivo
          </Pill>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-10">
          <Loader2 size={36} className="text-ink-soft hp-spin mb-8" />
          <Headline
            as="h2"
            highlight="analizando"
            className="text-[32px] mb-3 text-center max-w-[520px]"
          >
            {BOT_NAME} está analizando tu hotel
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
                  <Loader2 size={12} className="text-ink-soft hp-spin" />
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

  // Conversational reveal of the detected Brand DNA. Attachments read context
  // directly so this script is stable across edits.
  const script = [
    {
      role: 'bot',
      text: `Listo, terminé de analizar ${hotel.name}. Esta es la identidad que detecté. 🎨`,
    },
    {
      role: 'bot',
      text: 'Antes de mostrártela: ¿ya tenés un manual de marca? Si lo subís, ajusto todo a partir de él.',
      attachment: <BrandManualUpload />,
      pause: 700,
    },
    {
      role: 'bot',
      text: 'Esta es la paleta que detecté en tus fotos y tu historia. Tocá cualquier color para editarlo.',
      attachment: <PaletteEditor />,
      pause: 650,
    },
    {
      role: 'bot',
      text: 'Para la tipografía elegí una serif elegante para los títulos y una sans limpia para el cuerpo.',
      attachment: <TypographyCard />,
      pause: 600,
    },
    {
      role: 'bot',
      text: `Tu tono de voz: «${brand.voice}».`,
    },
    {
      role: 'bot',
      text: `Y tu propuesta de valor: «${brand.valueProp}».`,
    },
    {
      role: 'bot',
      text: `Detecté ${brand.roomCategories} categorías de habitación y ${hotel.rooms.length} tipos cargados. ¿Generamos tu presencia completa con esta identidad?`,
      pause: 300,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-10 py-6 border-b border-border bg-card/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[color:var(--color-brand-text)]" />
          <span className="font-display text-[18px]">Hotel Presence</span>
        </div>
        <Stepper current={2} />
        <Pill tone="brand">
          <Sparkles size={11} /> Demo en vivo
        </Pill>
      </header>

      <main className="max-w-[760px] mx-auto px-10 py-12 w-full hp-fade-in">
        <div className="flex items-center justify-between mb-2">
          <Pill tone="neutral">✦ Paso 2 — Brand DNA generado</Pill>
          <span className="text-[12px] text-ink-soft">
            Para <span className="text-ink font-medium">{hotel.name}</span>
          </span>
        </div>

        <Headline
          as="h1"
          highlight="identidad"
          className="text-[38px] leading-tight tracking-tight mt-4 mb-3"
        >
          Tu identidad, contada por {BOT_NAME}.
        </Headline>
        <p className="text-ink-soft text-[14px] max-w-[560px] mb-8">
          Editá cualquier cosa que no se sienta tuya — los colores son
          interactivos. Cuando confirmes, generamos todos tus canales con este
          sistema.
        </p>

        {/* Chat window */}
        <div className="hp-card flex flex-col overflow-hidden">
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border bg-surface-hover">
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #e84a2c 0%, #d03d21 100%)',
              }}
            >
              <Sparkles size={15} className="text-white" strokeWidth={2.4} />
            </span>
            <div className="leading-tight">
              <div className="text-[13px] font-medium text-ink">{BOT_NAME}</div>
              <div className="text-[11px] text-green flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green" /> presentando
                tu marca
              </div>
            </div>
          </div>

          <ChatFlow
            script={script}
            onComplete={() => setDone(true)}
            className="max-h-[460px] px-4 py-5"
          />
        </div>

        <div className="flex items-center justify-between mt-8">
          <Button variant="ghost" onClick={() => navigate('/app/onboarding')}>
            <ArrowLeft size={14} /> Volver
          </Button>
          {done && (
            <Button
              size="lg"
              className="group hp-bubble-in"
              onClick={() => navigate('/app/generating')}
            >
              Generar presencia completa
              <ArrowRight size={16} className="hp-arrow" />
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}

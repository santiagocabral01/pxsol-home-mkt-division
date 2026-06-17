import { useState } from 'react'
import {
  Sparkles,
  Send,
  TrendingUp,
  Bot,
  Globe,
  Link2,
  FileText,
  Check,
  CalendarClock,
} from 'lucide-react'
import ChannelHeader from '../../components/ChannelHeader'
import Pill from '../../components/ui/Pill'
import ChatFlow from '../../components/ChatFlow'

/* ---------- Chat attachments (static, demo data) ---------- */

function ScoreCard() {
  const rows = [
    { k: 'Global', v: 71, d: '+6', color: '#1a1a1a' },
    { k: 'SEO', v: 78, d: '+4', color: '#D4845A' },
    { k: 'GEO (IA)', v: 64, d: '+11', color: '#5B8FBF' },
  ]
  return (
    <div className="w-[280px] space-y-2.5">
      {rows.map((r) => (
        <div key={r.k}>
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="text-ink-soft">{r.k}</span>
            <span className="font-mono text-ink">
              {r.v}
              <span className="text-green ml-1.5">▲ {r.d}</span>
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-pill overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${r.v}%`, background: r.color }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function RecoList() {
  const items = [
    {
      icon: Bot,
      title: 'Página de FAQ "Spa frente al mar"',
      body: 'Perplexity cita fuentes con respuestas directas a preguntas.',
    },
    {
      icon: Link2,
      title: 'Datos estructurados (schema FAQPage + Hotel)',
      body: 'Ayudan a los motores a entender y citar tu contenido.',
    },
    {
      icon: Globe,
      title: '2-3 menciones en medios locales',
      body: 'Perplexity pondera la autoridad de dominio de las fuentes.',
    },
  ]
  return (
    <div className="w-[300px] space-y-2.5">
      {items.map((it, i) => (
        <div key={i} className="flex gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-warm-soft text-warm flex items-center justify-center flex-shrink-0">
            <it.icon size={14} strokeWidth={1.9} />
          </span>
          <div>
            <div className="text-[12.5px] font-medium text-ink leading-tight">
              {it.title}
            </div>
            <div className="text-[11.5px] text-ink-soft leading-snug mt-0.5">
              {it.body}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function BriefCard() {
  return (
    <div className="w-[290px] rounded-xl border border-border bg-surface-hover p-3.5">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-7 h-7 rounded-lg bg-cool-soft text-cool flex items-center justify-center">
          <FileText size={14} />
        </span>
        <div className="text-[12.5px] font-medium leading-tight">
          Spa frente al mar en Cartagena: guía 2026
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Pill tone="neutral">Artículo · ~900 palabras</Pill>
        <Pill tone="green">
          <Check size={10} /> Enviado al Generador
        </Pill>
      </div>
    </div>
  )
}

const QUICK_PROMPTS = [
  'Analizá mi visibilidad en IA',
  'Dónde estoy perdiendo posiciones',
  'Generá una idea de contenido',
]

export default function Assistant() {
  const [done, setDone] = useState(false)

  const script = [
    {
      role: 'bot',
      text: '¡Hola! Soy tu asistente de SEO y GEO. Puedo analizar tu visibilidad, detectar oportunidades y proponerte mejoras. ¿Qué querés revisar?',
    },
    {
      role: 'user',
      text: '¿Cómo viene mi visibilidad en motores de IA este mes?',
    },
    {
      role: 'bot',
      text: 'Tu GEO Score está en 64/100, +11 vs. el mes pasado 🎉. Te mencionan en 14 respuestas esta semana, sobre todo en ChatGPT para «hoteles boutique en Cartagena». Donde más perdés es en Perplexity (-3%).',
      attachment: <ScoreCard />,
      pause: 700,
    },
    {
      role: 'user',
      text: '¿Qué puedo mejorar para aparecer más en Perplexity?',
    },
    {
      role: 'bot',
      text: 'Tres acciones de alto impacto, ordenadas por prioridad:',
      attachment: <RecoList />,
      pause: 700,
    },
    {
      role: 'user',
      text: 'Generá un borrador para la primera.',
    },
    {
      role: 'bot',
      text: 'Listo, armé el brief con el tono de tu marca y lo mandé al Generador.',
      attachment: <BriefCard />,
      pause: 600,
    },
    {
      role: 'bot',
      text: '¿Querés que lo programe para publicar?',
    },
    { role: 'user', text: 'Sí, dale.' },
    {
      role: 'bot',
      text: 'Hecho ✅. Queda agendado para el lunes 9 AM. Te aviso cuando esté indexado y empiece a aparecer en las respuestas de IA.',
      pause: 250,
    },
  ]

  return (
    <div className="px-10 py-10 max-w-[1100px] mx-auto">
      <ChannelHeader
        eyebrow="SEO / GEO con IA · Asistente"
        highlight="tu asistente"
        title="Pedile análisis y mejoras a tu asistente."
        subtitle="Chateá con la IA para revisar tu visibilidad, entender dónde estás perdiendo posiciones y pedir contenido — todo con el contexto de tu hotel."
        right={
          <Pill tone="warm">
            <Sparkles size={11} /> Demo en vivo
          </Pill>
        }
      />

      <div className="hp-card flex flex-col overflow-hidden max-w-[820px]">
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border bg-surface-hover">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #D4845A 0%, #D4A853 100%)' }}
          >
            <Sparkles size={15} className="text-white" strokeWidth={2.4} />
          </span>
          <div className="leading-tight flex-1">
            <div className="text-[13px] font-medium text-ink">
              Asistente SEO / GEO
            </div>
            <div className="text-[11px] text-green flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green" /> en línea ·
              con el contexto de tu hotel
            </div>
          </div>
          <Pill tone="cool">
            <TrendingUp size={11} /> GEO 64
          </Pill>
        </div>

        <ChatFlow
          script={script}
          onComplete={() => setDone(true)}
          className="h-[500px] px-5 py-6"
        />

        {/* Faux composer — quick prompts + disabled input (demo) */}
        <div className="border-t border-border p-3 space-y-2.5">
          {done && (
            <div className="flex flex-wrap gap-1.5 hp-bubble-in">
              {QUICK_PROMPTS.map((q) => (
                <button
                  key={q}
                  className="px-3 h-7 rounded-full bg-pill text-ink-soft text-[11.5px] hover:text-ink hover:bg-surface-hover transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 h-11">
            <input
              disabled
              placeholder={
                done
                  ? 'Escribí tu consulta…'
                  : 'El asistente está respondiendo…'
              }
              className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-ink-mute"
            />
            <span className="w-8 h-8 rounded-lg bg-ink/90 text-white flex items-center justify-center">
              <Send size={15} />
            </span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[12px] text-ink-mute flex items-center gap-1.5">
        <CalendarClock size={13} /> Demo: la conversación se reproduce sola al
        abrir la pestaña. En la versión completa, el chat es en tiempo real con
        tus datos de GSC, GEO Tracker y tu Brand DNA.
      </p>
    </div>
  )
}

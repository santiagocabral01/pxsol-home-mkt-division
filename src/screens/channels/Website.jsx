import { useState } from 'react'
import {
  Pencil,
  ExternalLink,
  Globe,
  CheckCircle2,
  Smartphone,
  Gauge,
  ChevronRight,
} from 'lucide-react'
import ChannelHeader from '../../components/ChannelHeader'
import Button from '../../components/ui/Button'
import Pill from '../../components/ui/Pill'
import ScoreBar from '../../components/ui/ScoreBar'
import Modal from '../../components/ui/Modal'
import { Field, Input } from '../../components/ui/Field'
import WebsitePreview from '../../components/WebsitePreview'
import { websiteMeta } from '../../data/hotel'

/* Acento producto: web — verde (#5E882B dark · #95C160 base · #DFE6D6 soft)
   --color-accent-dark (#5E882B) ~5:1 sobre blanco → pasa WCAG AA texto pequeño. */
const WEB_ACCENT = {
  '--color-accent':      '#95C160',
  '--color-accent-dark': '#5E882B',
  '--color-accent-soft': '#DFE6D6',
}

export default function Website() {
  const [openDomain, setOpenDomain] = useState(false)
  const [openInfo, setOpenInfo] = useState(null)
  const [domain, setDomain] = useState('hotelazulmarino.com')

  return (
    <div className="px-10 py-10 max-w-[1400px] mx-auto" style={WEB_ACCENT}>
      <ChannelHeader
        eyebrow="Canal · Sitio Web"
        highlight="completo"
        title="Tu sitio completo, listo para publicar."
        subtitle="Una página única, optimizada para conversión, con todas tus habitaciones y experiencias."
        right={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="md">
              <Pencil size={14} /> Editar sitio
            </Button>
            <Button variant="secondary" size="md">
              <ExternalLink size={14} /> Ver en nueva pestaña
            </Button>
            <Button size="md" onClick={() => setOpenDomain(true)}>
              <Globe size={14} /> Publicar dominio
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-[1fr_300px] gap-6">
        <div className="hp-card overflow-hidden">
          <div className="px-4 py-2.5 border-b border-border flex items-center gap-2.5 bg-surface-hover">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6058]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEBE2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 mx-2 px-3 py-1 text-[12px] text-ink-soft bg-card rounded font-mono">
              {websiteMeta.domain}
            </div>
            <Pill tone="green">● en vivo</Pill>
          </div>
          <div className="h-[640px] overflow-hidden">
            <WebsitePreview />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="hp-card p-5">
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-3">
              Dominio
            </div>
            <div className="font-mono text-[13px] text-ink break-all mb-1">
              {websiteMeta.domain}
            </div>
            <div className="text-[11px] text-ink-soft">
              Última edición {websiteMeta.lastEdited}
            </div>
          </div>

          <div className="hp-card p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Gauge size={13} className="text-ink-soft" />
                  <span className="text-[12px] text-ink font-medium">
                    SEO Score
                  </span>
                </div>
                <span className="font-mono text-[13px] text-ink">
                  {websiteMeta.seoScore}/100
                </span>
              </div>
              <ScoreBar value={websiteMeta.seoScore} tone="accent" />
            </div>
            <button
              onClick={() =>
                setOpenInfo({
                  title: 'Core Web Vitals',
                  body: 'LCP 1.4s · INP 142ms · CLS 0.03. Los tres en verde — Google considera tu sitio "rápido" en mobile y desktop.',
                })
              }
              className="flex w-full items-center justify-between text-left group"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-green" />
                <span className="text-[12px] text-ink">Core Web Vitals</span>
              </div>
              <div className="flex items-center gap-1 text-[12px] text-ink-soft group-hover:text-ink">
                Passed <ChevronRight size={12} />
              </div>
            </button>
            <button
              onClick={() =>
                setOpenInfo({
                  title: 'Mobile Optimized',
                  body: 'Tu sitio se ve y funciona correctamente en pantallas de hasta 360px. Botones grandes, tipografía legible, sin scroll horizontal.',
                })
              }
              className="flex w-full items-center justify-between text-left group"
            >
              <div className="flex items-center gap-1.5">
                <Smartphone size={13} className="text-green" />
                <span className="text-[12px] text-ink">Mobile Optimized</span>
              </div>
              <div className="flex items-center gap-1 text-[12px] text-ink-soft group-hover:text-ink">
                Sí <ChevronRight size={12} />
              </div>
            </button>
          </div>

          <div className="hp-card p-5">
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-3">
              Tráfico estimado
            </div>
            <div className="font-mono text-[24px] text-ink">+186%</div>
            <div className="text-[11px] text-ink-soft mt-1">
              vs tu sitio anterior, según mismo periodo
            </div>
          </div>

          <div className="hp-card p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium">
                Páginas generadas
              </div>
              <span className="font-mono text-[12px] text-ink">7</span>
            </div>
            <ul className="space-y-1.5 text-[12px] text-ink-soft">
              {[
                'Home',
                'Habitaciones',
                'Suite Master',
                'Experiencias',
                'Restaurante',
                'Ubicación',
                'Contacto',
              ].map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-ink-mute" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <Modal
        open={openDomain}
        onClose={() => setOpenDomain(false)}
        title="Publicar en tu dominio"
        maxWidth="max-w-md"
      >
        <p className="text-[13px] text-ink-soft mb-5">
          Conectá tu dominio propio. Configuramos los registros DNS por vos —
          solo tenés que esperar 24h para la propagación.
        </p>
        <Field label="Dominio">
          <Input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="hotelazulmarino.com"
          />
        </Field>
        <div className="mt-4 p-3 rounded-lg bg-pill text-[12px] text-ink-soft font-mono">
          A · @ → 76.76.21.21
          <br />
          CNAME · www → cname.presence.io
        </div>
        <div className="mt-6 flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpenDomain(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              setOpenDomain(false)
              setOpenInfo({
                title: '✓ Dominio conectado',
                body: `Conectamos ${domain}. En la versión completa la propagación de DNS toma hasta 24 horas y te avisamos por email cuando esté listo.`,
              })
            }}
          >
            Publicar
          </Button>
        </div>
      </Modal>

      <Modal
        open={!!openInfo}
        onClose={() => setOpenInfo(null)}
        title={openInfo?.title}
        maxWidth="max-w-md"
      >
        <p className="text-[13px] text-ink-soft">{openInfo?.body}</p>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => setOpenInfo(null)}>Entendido</Button>
        </div>
      </Modal>
    </div>
  )
}

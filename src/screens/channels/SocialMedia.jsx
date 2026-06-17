import { useState } from 'react'
import {
  Download,
  Pencil,
  Sparkles,
  Loader2,
  Camera,
  Users,
  Smartphone,
  EyeOff,
} from 'lucide-react'
import ChannelHeader from '../../components/ChannelHeader'
import Button from '../../components/ui/Button'
import Pill from '../../components/ui/Pill'
import Modal from '../../components/ui/Modal'
import { Select } from '../../components/ui/Field'
import SocialPhonePreview from '../../components/SocialPhonePreview'
import { socialPosts, campaignOptions } from '../../data/hotel'

const networks = [
  { id: 'Instagram', label: 'Instagram', icon: Camera },
  { id: 'Facebook', label: 'Facebook', icon: Users },
  { id: 'TikTok', label: 'TikTok', icon: null },
]

function aspectFor(size) {
  if (!size) return 'aspect-square'
  const [w, h] = size.split('×').map(Number)
  if (!w || !h) return 'aspect-square'
  const ratio = w / h
  if (ratio > 1.3) return 'aspect-[16/9]'
  if (ratio < 0.75) return 'aspect-[9/16]'
  if (ratio < 0.95) return 'aspect-[4/5]'
  return 'aspect-square'
}

function PostCard({ post, onAction }) {
  return (
    <div className="hp-card group relative overflow-hidden transition-all hover:shadow-[var(--shadow-card-hover)]">
      <div className={`${aspectFor(post.size)} relative overflow-hidden`}>
        <img src={post.image} alt="" className="w-full h-full object-cover" />
        <div
          className="absolute inset-0 flex flex-col justify-end p-4 text-white"
          style={{
            background:
              'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6))',
          }}
        >
          <div
            className="font-display text-[20px] leading-tight"
            style={{ fontFamily: 'Playfair Display' }}
          >
            {post.overlay}
          </div>
          <div className="text-[11px] opacity-90 mt-1">{post.sub}</div>
        </div>
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className="bg-white/90 text-ink px-2 py-0.5 rounded-full text-[10px] font-medium">
            {post.type}
          </span>
        </div>
      </div>
      <div className="px-3.5 py-3 flex items-center justify-between">
        <span className="font-mono text-[10px] text-ink-soft">{post.size}</span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onAction('edit')}
            className="px-2.5 h-7 inline-flex items-center gap-1 text-[11px] text-ink-soft hover:text-ink rounded-md hover:bg-surface-hover transition"
          >
            <Pencil size={11} /> Editar
          </button>
          <button
            onClick={() => onAction('download')}
            className="px-2.5 h-7 inline-flex items-center gap-1 text-[11px] text-ink-soft hover:text-ink rounded-md hover:bg-surface-hover transition"
          >
            <Download size={11} /> Descargar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SocialMedia() {
  const [network, setNetwork] = useState('Instagram')
  const [campaign, setCampaign] = useState(campaignOptions[0])
  const [generating, setGenerating] = useState(false)
  const [modal, setModal] = useState(null)
  const [showPhone, setShowPhone] = useState(true)

  const posts = socialPosts[network] || []
  const total = Object.values(socialPosts).reduce((a, p) => a + p.length, 0)

  const triggerGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      setGenerating(false)
      setModal({
        title: '✓ 6 nuevos assets listos',
        body: `Generamos 6 piezas para "${campaign}" en ${network}. En la versión completa esto se sincroniza con tu calendario editorial.`,
      })
    }, 1800)
  }

  return (
    <div className="px-10 py-10 max-w-[1400px] mx-auto">
      <ChannelHeader
        eyebrow="Canal · Redes Sociales"
        highlight="publicar"
        title="Tus assets, listos para publicar."
        subtitle={`${total} piezas generadas en tu tono — feed, stories, reels y ads. Editá lo que quieras y descargá lo que necesites.`}
        right={
          <Button variant="secondary">
            <Sparkles size={14} /> Conectar cuenta
          </Button>
        }
      />

      <div className="hp-card p-5 mb-6 flex items-center gap-4 flex-wrap">
        <div className="flex-1 min-w-[280px]">
          <div className="text-[11px] uppercase tracking-wider text-ink-soft mb-1.5">
            ¿Qué querés comunicar?
          </div>
          <Select value={campaign} onChange={(e) => setCampaign(e.target.value)}>
            {campaignOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </Select>
        </div>
        <div className="pt-5">
          <Button onClick={triggerGenerate} disabled={generating}>
            {generating ? (
              <>
                <Loader2 size={14} className="hp-spin" /> Generando…
              </>
            ) : (
              <>
                <Sparkles size={14} /> Generar nuevos assets
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 border-b border-border">
        {networks.map((n) => {
          const Icon = n.icon
          const active = network === n.id
          return (
            <button
              key={n.id}
              onClick={() => setNetwork(n.id)}
              className={`relative flex items-center gap-2 px-4 py-3 text-[13px] transition ${
                active ? 'text-ink font-medium' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {Icon ? (
                <Icon size={14} />
              ) : (
                <span className="font-mono text-[11px]">TT</span>
              )}
              {n.label}
              <Pill tone="neutral" className="ml-1">
                {socialPosts[n.id].length}
              </Pill>
              {active && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-warm" />
              )}
            </button>
          )
        })}
        {!showPhone && (
          <button
            onClick={() => setShowPhone(true)}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-ink-soft hover:text-ink rounded-md hover:bg-surface-hover transition"
          >
            <Smartphone size={14} /> Ver previsualización
          </button>
        )}
      </div>

      <div className="flex gap-8 items-start">
        <div
          className={`grid gap-5 flex-1 min-w-0 ${
            showPhone ? 'grid-cols-2 2xl:grid-cols-3' : 'grid-cols-3'
          }`}
        >
          {posts.map((p, i) => (
            <PostCard
              key={i}
              post={p}
              onAction={(a) =>
                setModal({
                  title: a === 'edit' ? 'Editor de assets' : '✓ Descarga iniciada',
                  body:
                    a === 'edit'
                      ? 'En la versión completa abrimos el editor visual con tu marca aplicada, listo para tweaks finales.'
                      : 'Generamos un .zip con la pieza en todas las variantes (PNG, JPG, formato vertical y cuadrado).',
                })
              }
            />
          ))}
        </div>

        {showPhone && (
          <aside className="hidden lg:block flex-shrink-0 w-[320px] sticky top-6 hp-fade-in">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-[12px] text-ink-soft">
                <Smartphone size={14} className="text-warm" />
                Previsualización · {network}
              </div>
              <button
                onClick={() => setShowPhone(false)}
                className="flex items-center gap-1.5 px-2.5 h-7 text-[11px] text-ink-soft hover:text-ink rounded-md hover:bg-surface-hover transition"
              >
                <EyeOff size={13} /> Ocultar
              </button>
            </div>
            <SocialPhonePreview network={network} />
            <p className="mt-3 text-[11px] text-ink-mute text-center leading-relaxed">
              Tocá Feed / Reels y cualquier publicación para previsualizarla.
            </p>
          </aside>
        )}
      </div>

      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal?.title}
        maxWidth="max-w-md"
      >
        <p className="text-[13px] text-ink-soft">{modal?.body}</p>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => setModal(null)}>Entendido</Button>
        </div>
      </Modal>
    </div>
  )
}

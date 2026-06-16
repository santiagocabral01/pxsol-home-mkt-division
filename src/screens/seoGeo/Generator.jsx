import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Wand2,
  Copy,
  Download,
  Send,
  Sparkles,
  CheckCircle2,
  FileText,
  BookOpen,
  HelpCircle,
  Layers,
  RefreshCw,
} from 'lucide-react'
import ChannelHeader from '../../components/ChannelHeader'
import Button from '../../components/ui/Button'
import Pill from '../../components/ui/Pill'
import { Field, Input, Textarea } from '../../components/ui/Field'
import { generatedDrafts, optimizeExample } from '../../data/seoGeo'
import { useSimulatedAsync, useSeoGeo } from '../../context/SeoGeoContext'
import { SimOverlay } from './_shared'

const types = [
  { id: 'landing', label: 'Página de destino', icon: FileText },
  { id: 'blog', label: 'Post de blog', icon: BookOpen },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'service', label: 'Habitación / servicio', icon: Layers },
]

export default function Generator() {
  const [params] = useSearchParams()
  const { toneLearned } = useSeoGeo()
  const { loading, message, run } = useSimulatedAsync()

  const [mode, setMode] = useState('create')
  const [type, setType] = useState(params.get('type') || 'blog')
  const [topic, setTopic] = useState(params.get('topic') || '')
  const [draft, setDraft] = useState(null)
  const [original, setOriginal] = useState(optimizeExample.original)
  const [diff, setDiff] = useState(null)
  const [toast, setToast] = useState('')

  const onGenerate = useCallback(
    (typeOverride) =>
      run(
        'Redactando con el tono del hotel…',
        () => {
          setDraft(generatedDrafts[typeOverride || type])
        },
        { min: 1400, max: 2600 }
      ),
    [run, type]
  )

  const onOptimize = () =>
    run('Analizando estructura y reescribiendo…', () => {
      setDiff(optimizeExample)
    }, { min: 1400, max: 2400 })

  // si llega con topic, autogenerar una vez al montar
  useEffect(() => {
    if (params.get('topic')) {
      onGenerate(params.get('type') || 'blog')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // limpiar toast
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2500)
    return () => clearTimeout(t)
  }, [toast])

  const onCopy = async () => {
    if (!draft) return
    const text = [
      `# ${draft.h1}`,
      '',
      `*Meta description:* ${draft.metaDescription}`,
      '',
      ...draft.sections.map((s) => `${s.level === 2 ? '##' : '###'} ${s.heading}\n\n${s.body}`),
      '',
      '```json',
      draft.richSnippetSchema,
      '```',
    ].join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setToast('Copiado al portapapeles')
    } catch {
      setToast('No se pudo copiar — pegá manualmente')
    }
  }

  const onInsertCms = () => {
    setToast('Insertado en el CMS de tu sitio · borrador creado')
  }
  const onDownload = () => {
    setToast('Descarga simulada · .docx generado')
  }

  const currentType = types.find((t) => t.id === type)

  return (
    <div className="px-10 py-10 max-w-[1400px] mx-auto relative">
      <SimOverlay active={loading} message={message} />

      <ChannelHeader
        eyebrow="SEO / GEO con IA · Generador"
        highlight="tono"
        title="Tu próximo contenido, con el tono del hotel."
        subtitle="Aprendió cómo escribís. Generá borradores completos — H1, secciones, meta description y rich snippet — listos para revisar y publicar."
        right={
          <Pill tone={toneLearned ? 'green' : 'amber'}>
            <Sparkles size={11} />
            {toneLearned ? 'Tono del hotel: aprendido' : 'Tono pendiente'}
          </Pill>
        }
      />

      {/* Mode tabs */}
      <div className="inline-flex bg-pill rounded-lg p-0.5 mb-6">
        <button
          onClick={() => setMode('create')}
          className={`px-4 h-9 text-[13px] rounded-md transition ${
            mode === 'create'
              ? 'bg-card text-ink shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
              : 'text-ink-soft hover:text-ink'
          }`}
        >
          Crear contenido nuevo
        </button>
        <button
          onClick={() => setMode('optimize')}
          className={`px-4 h-9 text-[13px] rounded-md transition ${
            mode === 'optimize'
              ? 'bg-card text-ink shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
              : 'text-ink-soft hover:text-ink'
          }`}
        >
          Optimizar página existente
        </button>
      </div>

      {mode === 'create' ? (
        <div className="grid grid-cols-[340px_1fr] gap-6">
          {/* Form */}
          <div className="hp-card p-6 h-fit sticky top-[120px]">
            <div className="space-y-5">
              <div>
                <div className="text-[12px] font-medium text-ink-soft uppercase tracking-wider mb-2">
                  Tipo de contenido
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {types.map((t) => {
                    const Icon = t.icon
                    const active = type === t.id
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setType(t.id)
                          setDraft(null)
                        }}
                        className={`p-3 rounded-lg border text-left transition ${
                          active
                            ? 'border-warm bg-warm-soft/40'
                            : 'border-border hover:border-border-strong hover:bg-surface-hover'
                        }`}
                      >
                        <Icon size={15} className={active ? 'text-warm' : 'text-ink-soft'} />
                        <div className="text-[12px] text-ink mt-1.5 leading-tight">
                          {t.label}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
              <Field label="Tema o keyword objetivo">
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="hotel boutique cartagena con jacuzzi"
                />
              </Field>
              <Button onClick={onGenerate} className="w-full" size="lg">
                <Wand2 size={14} /> Generar borrador
              </Button>
              {draft && (
                <button
                  onClick={onGenerate}
                  className="w-full text-[12px] text-ink-soft hover:text-ink inline-flex items-center justify-center gap-1"
                >
                  <RefreshCw size={11} /> Regenerar
                </button>
              )}
            </div>
          </div>

          {/* Output */}
          <div className="space-y-4">
            {!draft && !loading && (
              <div className="hp-card p-10 text-center">
                <div className="w-12 h-12 rounded-full bg-warm-soft text-warm flex items-center justify-center mx-auto mb-4">
                  <Wand2 size={20} />
                </div>
                <div className="font-display text-[20px] mb-1">
                  Elegí el tipo y dale a Generar.
                </div>
                <div className="text-[13px] text-ink-soft">
                  Vamos a redactar el borrador completo con tu tono, estructura SEO y rich snippet incluido.
                </div>
              </div>
            )}
            {draft && (
              <>
                <div className="hp-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Pill tone="warm">
                      <currentType.icon size={11} /> {currentType.label}
                    </Pill>
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm" onClick={onCopy}>
                        <Copy size={11} /> Copiar
                      </Button>
                      <Button variant="secondary" size="sm" onClick={onDownload}>
                        <Download size={11} /> .docx
                      </Button>
                      <Button size="sm" onClick={onInsertCms}>
                        <Send size={11} /> Insertar en CMS
                      </Button>
                    </div>
                  </div>

                  <h1 className="font-display text-[32px] leading-[1.1] mb-3">
                    {draft.h1}
                  </h1>

                  <div className="p-3 rounded-lg bg-cool-soft/40 border border-cool/20 mb-5">
                    <div className="text-[10px] uppercase tracking-[0.12em] text-cool font-semibold mb-1">
                      Meta description
                    </div>
                    <div className="text-[13px] text-ink">{draft.metaDescription}</div>
                  </div>

                  <div className="space-y-5">
                    {draft.sections.map((s, i) => {
                      const Tag = s.level === 2 ? 'h2' : 'h3'
                      const cls = s.level === 2 ? 'text-[22px]' : 'text-[18px] text-ink-soft'
                      return (
                        <div key={i}>
                          <Tag className={`font-display ${cls} mb-2`}>{s.heading}</Tag>
                          <p className="text-[14px] text-ink leading-relaxed">{s.body}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Rich snippet schema */}
                <div className="hp-card p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-green" />
                      <div className="font-display text-[16px]">Rich snippet schema</div>
                    </div>
                    <Pill tone="green">JSON-LD válido</Pill>
                  </div>
                  <pre className="text-[12px] font-mono text-ink-soft bg-pill rounded-lg p-4 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    {draft.richSnippetSchema}
                  </pre>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          <div className="hp-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-display text-[18px]">Contenido original</div>
              <Pill>Pegalo acá</Pill>
            </div>
            <Textarea
              rows={14}
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              placeholder="Pegá la página o sección que querés optimizar."
            />
            <Button onClick={onOptimize} className="mt-4 w-full">
              <Wand2 size={14} /> Optimizar
            </Button>
          </div>

          <div className="hp-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-display text-[18px]">Versión optimizada</div>
              {diff && (
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" onClick={onCopy}>
                    <Copy size={11} /> Copiar
                  </Button>
                  <Button size="sm" onClick={onInsertCms}>
                    <Send size={11} /> Aplicar
                  </Button>
                </div>
              )}
            </div>

            {!diff ? (
              <div className="text-center py-10 text-ink-soft text-[13px]">
                <Wand2 size={20} className="text-ink-mute mx-auto mb-2" />
                La versión optimizada aparecerá acá, con cada mejora explicada.
              </div>
            ) : (
              <>
                <div className="p-4 rounded-lg bg-green-soft/40 border border-green/20 mb-4">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-green font-semibold mb-2">
                    Texto propuesto
                  </div>
                  <div className="text-[14px] text-ink leading-relaxed">
                    {diff.optimized}
                  </div>
                </div>
                <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-2">
                  Mejoras aplicadas
                </div>
                <ul className="space-y-2">
                  {diff.improvements.map((imp, i) => (
                    <li key={i} className="flex items-start gap-2 text-[12px] text-ink-soft">
                      <CheckCircle2 size={12} className="text-green mt-0.5 flex-shrink-0" />
                      {imp}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hp-fade-in bg-ink text-white text-[13px] px-4 py-2.5 rounded-lg shadow-[var(--shadow-float)] flex items-center gap-2">
          <CheckCircle2 size={14} className="text-green" />
          {toast}
        </div>
      )}
    </div>
  )
}

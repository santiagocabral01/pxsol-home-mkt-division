import { useMemo, useState } from 'react'
import {
  Bot,
  Plus,
  RefreshCw,
  Search,
  X,
  CheckCircle2,
  Circle,
  ExternalLink,
  Trophy,
} from 'lucide-react'
import ChannelHeader from '../../components/ChannelHeader'
import Button from '../../components/ui/Button'
import Pill from '../../components/ui/Pill'
import ScoreBar from '../../components/ui/ScoreBar'
import Modal from '../../components/ui/Modal'
import { Field, Input, Select } from '../../components/ui/Field'
import { useSeoGeo, useSimulatedAsync } from '../../context/SeoGeoContext'
import { EngineBadge, SimOverlay } from './_shared'

const engineFilters = [
  { id: 'all', label: 'Todos' },
  { id: 'chatgpt', label: 'ChatGPT' },
  { id: 'perplexity', label: 'Perplexity' },
  { id: 'google_ai', label: 'Google AI' },
]

export default function GeoTracker() {
  const {
    geoQueries,
    competitors,
    addCompetitor,
    removeCompetitor,
    addGeoQuery,
    refreshGeoRun,
    lastGeoRun,
  } = useSeoGeo()
  const { loading, message, run } = useSimulatedAsync()

  const [engine, setEngine] = useState('all')
  const [selected, setSelected] = useState(null)
  const [openAddQuery, setOpenAddQuery] = useState(false)
  const [openAddComp, setOpenAddComp] = useState(false)
  const [queryDraft, setQueryDraft] = useState('')
  const [categoryDraft, setCategoryDraft] = useState('Cartagena · Boutique')
  const [engineDraft, setEngineDraft] = useState('chatgpt')
  const [compDraft, setCompDraft] = useState('')

  const filtered = useMemo(
    () => (engine === 'all' ? geoQueries : geoQueries.filter((q) => q.engine === engine)),
    [engine, geoQueries]
  )

  const visibilityScore = useMemo(() => {
    const mentioned = geoQueries.filter((q) => q.mentioned).length
    return Math.round((mentioned / Math.max(geoQueries.length, 1)) * 100)
  }, [geoQueries])

  const byEngine = useMemo(() => {
    const result = { chatgpt: { ok: 0, total: 0 }, perplexity: { ok: 0, total: 0 }, google_ai: { ok: 0, total: 0 } }
    geoQueries.forEach((q) => {
      if (!result[q.engine]) return
      result[q.engine].total++
      if (q.mentioned) result[q.engine].ok++
    })
    return result
  }, [geoQueries])

  const onRunAll = () =>
    run('Consultando ChatGPT, Perplexity y Google AI…', () => {
      refreshGeoRun()
    })

  const onAddQuery = async () => {
    if (!queryDraft.trim()) return
    setOpenAddQuery(false)
    const q = queryDraft.trim()
    const c = categoryDraft
    const e = engineDraft
    setQueryDraft('')
    await run(`Consultando "${q}" en ${e === 'chatgpt' ? 'ChatGPT' : e === 'perplexity' ? 'Perplexity' : 'Google AI'}…`, () => {
      addGeoQuery(q, c, e)
    })
  }

  const onAddCompetitor = async () => {
    if (!compDraft.trim()) return
    const name = compDraft.trim()
    setCompDraft('')
    setOpenAddComp(false)
    await run(`Analizando visibilidad de ${name}…`, () => {
      addCompetitor(name)
    }, { min: 800, max: 1400 })
  }

  return (
    <div className="px-10 py-10 max-w-[1400px] mx-auto relative">
      <SimOverlay active={loading} message={message} />

      <ChannelHeader
        eyebrow="SEO / GEO con IA · GEO Tracker"
        highlight="aparecés"
        title="Dónde aparecés cuando un viajero le pregunta a una IA."
        subtitle="Monitoreamos qué motores generativos te mencionan, con qué texto y qué URL citan. Sin esto, no sabés si la IA te está recomendando o recomendando a tu competencia."
        right={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="md" onClick={() => setOpenAddQuery(true)}>
              <Plus size={14} /> Agregar query
            </Button>
            <Button size="md" onClick={onRunAll}>
              <RefreshCw size={14} /> Ejecutar queries
            </Button>
          </div>
        }
      />

      {/* AI Visibility + breakdown */}
      <div className="grid grid-cols-[1fr_1.4fr] gap-6 mb-6">
        <div className="hp-card p-6">
          <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-3">
            AI Visibility Score
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-mono text-[56px] text-ink leading-none">{visibilityScore}</span>
            <span className="text-ink-soft text-[16px]">%</span>
          </div>
          <div className="text-[12px] text-ink-soft mb-4">
            de las {geoQueries.length} queries monitoreadas te mencionan.
          </div>
          <ScoreBar value={visibilityScore} tone="cool" />
          <div className="text-[11px] text-ink-mute mt-3">
            Última corrida: {lastGeoRun}
          </div>
        </div>

        <div className="hp-card p-6">
          <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-4">
            Por motor
          </div>
          <div className="space-y-4">
            {['chatgpt', 'perplexity', 'google_ai'].map((eng) => {
              const { ok, total } = byEngine[eng]
              const pct = total ? Math.round((ok / total) * 100) : 0
              return (
                <div key={eng}>
                  <div className="flex items-center justify-between mb-1.5">
                    <EngineBadge engine={eng} />
                    <div className="text-[12px] text-ink-soft">
                      <span className="font-mono text-ink">{ok}</span> de{' '}
                      <span className="font-mono">{total}</span> ·{' '}
                      <span className="font-mono">{pct}%</span>
                    </div>
                  </div>
                  <ScoreBar
                    value={pct}
                    tone={eng === 'chatgpt' ? 'green' : eng === 'perplexity' ? 'cool' : 'amber'}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Filters + table */}
      <div className="hp-card overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-4">
          <div>
            <div className="font-display text-[20px]">Queries monitoreadas</div>
            <div className="text-[12px] text-ink-soft mt-0.5">
              Cada fila es una pregunta real que viajeros le hacen a una IA. Clic para ver el extracto.
            </div>
          </div>
          <div className="inline-flex rounded-lg bg-pill p-0.5">
            {engineFilters.map((e) => (
              <button
                key={e.id}
                onClick={() => setEngine(e.id)}
                className={`px-3 h-7 text-[11px] rounded-md transition ${
                  engine === e.id
                    ? 'bg-card text-ink shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="px-6 py-16 text-center text-ink-soft text-[13px]">
            <Search size={24} className="mx-auto mb-3 text-ink-mute" />
            No hay queries para este motor todavía. Agregá una con el botón superior.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium border-b border-border">
                <th className="px-6 py-3 font-medium w-12" />
                <th className="px-6 py-3 font-medium">Query</th>
                <th className="px-6 py-3 font-medium">Motor</th>
                <th className="px-6 py-3 font-medium">Categoría</th>
                <th className="px-6 py-3 font-medium">Posición</th>
                <th className="px-6 py-3 font-medium text-right">Última corrida</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((q) => (
                <tr
                  key={q.id}
                  onClick={() => setSelected(q)}
                  className="border-b border-border last:border-0 hover:bg-surface-hover transition cursor-pointer"
                >
                  <td className="px-6 py-3.5">
                    {q.mentioned ? (
                      <CheckCircle2 size={16} className="text-green" />
                    ) : (
                      <Circle size={16} className="text-ink-mute" />
                    )}
                  </td>
                  <td className="px-6 py-3.5 text-[13px] text-ink max-w-[400px]">
                    <div className="line-clamp-1">{q.query}</div>
                  </td>
                  <td className="px-6 py-3.5">
                    <EngineBadge engine={q.engine} />
                  </td>
                  <td className="px-6 py-3.5 text-[12px] text-ink-soft">{q.category}</td>
                  <td className="px-6 py-3.5 text-[13px] font-mono text-ink">
                    {q.mentioned ? `#${q.position}` : <span className="text-ink-mute">—</span>}
                  </td>
                  <td className="px-6 py-3.5 text-[12px] text-ink-soft text-right">
                    {q.lastRun}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Competidores */}
      <div className="hp-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Trophy size={14} className="text-ink-soft" />
              <div className="font-display text-[20px] text-ink">Comparativa de competidores</div>
            </div>
            <div className="text-[12px] text-ink-soft mt-0.5">
              Cómo ranquea tu hotel vs. otros boutique de Cartagena en motores de IA.
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setOpenAddComp(true)}>
            <Plus size={12} /> Agregar competidor
          </Button>
        </div>

        <div className="space-y-3">
          {/* Tu hotel siempre primero */}
          <CompetitorRow name="Hotel Azul Marino (tú)" score={visibilityScore} self />
          {competitors.map((c) => (
            <CompetitorRow
              key={c.id}
              name={c.name}
              score={c.aiVisibilityScore}
              onRemove={() => removeCompetitor(c.id)}
            />
          ))}
          {competitors.length === 0 && (
            <div className="text-[12px] text-ink-soft italic">
              Agregá hasta 3 competidores para comparar.
            </div>
          )}
        </div>
      </div>

      {/* Detalle de query */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={null}
        maxWidth="max-w-2xl"
      >
        {selected && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <EngineBadge engine={selected.engine} />
              <span className="text-ink-mute text-[11px]">·</span>
              <span className="text-[11px] text-ink-soft">{selected.category}</span>
              <span className="text-ink-mute text-[11px]">·</span>
              <span className="text-[11px] text-ink-mute">{selected.lastRun}</span>
            </div>
            <h3 className="font-display text-[24px] mb-4 leading-tight pr-8">
              "{selected.query}"
            </h3>
            {selected.mentioned ? (
              <>
                <div className="mb-4">
                  <Pill tone="green">
                    <CheckCircle2 size={11} /> Mencionado · posición #{selected.position}
                  </Pill>
                </div>
                <div className="hp-card p-4 bg-surface-hover mb-4">
                  <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-2">
                    Extracto de la respuesta
                  </div>
                  <div className="text-[14px] text-ink leading-relaxed italic">
                    "{selected.excerpt}"
                  </div>
                </div>
                {selected.citedUrl && (
                  <div className="flex items-center gap-2 text-[12px] text-ink-soft">
                    <ExternalLink size={12} />
                    URL citada: <span className="font-mono text-ink">{selected.citedUrl}</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="mb-4">
                  <Pill tone="amber">
                    <Circle size={11} /> No mencionado
                  </Pill>
                </div>
                <div className="hp-card p-4 bg-surface-hover">
                  <div className="text-[13px] text-ink-soft leading-relaxed">
                    La IA respondió esta query sin mencionar a tu hotel. Considerá generar contenido específico para subir en esta intención de búsqueda.
                  </div>
                </div>
              </>
            )}
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setSelected(null)}>
                Cerrar
              </Button>
              <Button onClick={() => setSelected(null)}>
                <Bot size={13} /> Ver en motor
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Agregar query */}
      <Modal
        open={openAddQuery}
        onClose={() => setOpenAddQuery(false)}
        title="Agregar query personalizada"
        maxWidth="max-w-md"
      >
        <p className="text-[13px] text-ink-soft mb-5">
          Definí qué le preguntás a la IA. Vamos a correrla y guardar el resultado.
        </p>
        <div className="space-y-4">
          <Field label="Query">
            <Input
              value={queryDraft}
              onChange={(e) => setQueryDraft(e.target.value)}
              placeholder="¿Cuál es el mejor hotel para luna de miel en Cartagena?"
            />
          </Field>
          <Field label="Categoría">
            <Input
              value={categoryDraft}
              onChange={(e) => setCategoryDraft(e.target.value)}
              placeholder="Cartagena · Parejas"
            />
          </Field>
          <Field label="Motor">
            <Select value={engineDraft} onChange={(e) => setEngineDraft(e.target.value)}>
              <option value="chatgpt">ChatGPT</option>
              <option value="perplexity">Perplexity</option>
              <option value="google_ai">Google AI Overviews</option>
            </Select>
          </Field>
        </div>
        <div className="mt-6 flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpenAddQuery(false)}>
            Cancelar
          </Button>
          <Button onClick={onAddQuery}>
            <Bot size={13} /> Ejecutar
          </Button>
        </div>
      </Modal>

      {/* Agregar competidor */}
      <Modal
        open={openAddComp}
        onClose={() => setOpenAddComp(false)}
        title="Agregar competidor"
        maxWidth="max-w-md"
      >
        <p className="text-[13px] text-ink-soft mb-5">
          Vamos a calcular su AI Visibility Score con las mismas queries que tenés activas.
        </p>
        <Field label="Nombre del competidor">
          <Input
            value={compDraft}
            onChange={(e) => setCompDraft(e.target.value)}
            placeholder="Sofitel Legend Santa Clara"
          />
        </Field>
        <div className="mt-6 flex items-center justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpenAddComp(false)}>
            Cancelar
          </Button>
          <Button onClick={onAddCompetitor}>Analizar</Button>
        </div>
      </Modal>
    </div>
  )
}

function CompetitorRow({ name, score, self, onRemove }) {
  return (
    <div
      className={`flex items-center gap-4 p-3 rounded-lg ${
        self ? 'bg-[color:var(--color-brand-soft)]/40 border border-[color:var(--color-brand)]/20' : 'hover:bg-surface-hover'
      } transition group`}
    >
      <div className="flex-1 min-w-0">
        <div className="text-[13px] text-ink font-medium truncate">{name}</div>
      </div>
      <div className="flex items-center gap-3 flex-1 max-w-[420px]">
        <ScoreBar value={score} tone={self ? 'brand' : 'cool'} />
        <span className="font-mono text-[14px] text-ink min-w-[40px] text-right">
          {score}
        </span>
      </div>
      {!self && onRemove && (
        <button
          onClick={onRemove}
          className="opacity-0 group-hover:opacity-100 p-1 text-ink-mute hover:text-ink transition"
          aria-label="Quitar"
        >
          <X size={13} />
        </button>
      )}
    </div>
  )
}

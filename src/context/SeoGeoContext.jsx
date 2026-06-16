import { createContext, useContext, useState, useCallback, useRef } from 'react'
import {
  initialGeoQueries,
  initialCompetitors,
  initialSuggestions,
  suggestionVariants,
  initialReportConfig,
  newQueryMockResponses,
} from '../data/seoGeo'

const SeoGeoContext = createContext(null)

export function SeoGeoProvider({ children }) {
  const [geoQueries, setGeoQueries] = useState(initialGeoQueries)
  const [competitors, setCompetitors] = useState(initialCompetitors)
  const [suggestions, setSuggestions] = useState(initialSuggestions)
  const [reportConfig, setReportConfig] = useState(initialReportConfig)
  const [toneLearned, setToneLearned] = useState(true)
  const [lastGeoRun, setLastGeoRun] = useState('hace 12 min')

  // contadores para nombres de fixtures rotativos
  const variantIdxRef = useRef({ s1: 0, s2: 0, s3: 0 })
  const mockIdxRef = useRef(0)

  const addCompetitor = useCallback((name) => {
    const score = 40 + Math.floor(((name.length * 7) % 35))
    setCompetitors((c) => [
      ...c,
      { id: `c${Date.now()}`, name, aiVisibilityScore: score },
    ])
  }, [])

  const removeCompetitor = useCallback((id) => {
    setCompetitors((c) => c.filter((x) => x.id !== id))
  }, [])

  const addGeoQuery = useCallback((query, category, engine) => {
    const idx = mockIdxRef.current++ % newQueryMockResponses.length
    const mock = newQueryMockResponses[idx]
    const id = `qx${Date.now()}`
    setGeoQueries((q) => [
      {
        id,
        engine: engine || mock.engine,
        query,
        category: category || 'Personalizado',
        mentioned: mock.mentioned,
        position: mock.position,
        excerpt: mock.excerpt,
        citedUrl: mock.citedUrl,
        lastRun: 'hace unos segundos',
      },
      ...q,
    ])
    return id
  }, [])

  const refreshGeoRun = useCallback(() => {
    setLastGeoRun('hace unos segundos')
    setGeoQueries((q) => q.map((x) => ({ ...x, lastRun: 'hace unos segundos' })))
  }, [])

  const rejectSuggestion = useCallback((id) => {
    setSuggestions((s) => s.filter((x) => x.id !== id))
  }, [])

  const requestVariant = useCallback((id) => {
    const pool = suggestionVariants[id] || []
    if (pool.length === 0) return
    const idx = variantIdxRef.current[id] ?? 0
    const next = pool[idx % pool.length]
    variantIdxRef.current[id] = idx + 1
    setSuggestions((s) =>
      s.map((x) => (x.id === id ? { ...x, title: next } : x))
    )
  }, [])

  const scheduleReport = useCallback((cfg) => {
    setReportConfig((c) => ({ ...c, ...cfg, scheduled: true }))
  }, [])

  const updateReport = useCallback((cfg) => {
    setReportConfig((c) => ({ ...c, ...cfg }))
  }, [])

  return (
    <SeoGeoContext.Provider
      value={{
        geoQueries,
        competitors,
        suggestions,
        reportConfig,
        toneLearned,
        lastGeoRun,
        addCompetitor,
        removeCompetitor,
        addGeoQuery,
        refreshGeoRun,
        rejectSuggestion,
        requestVariant,
        scheduleReport,
        updateReport,
        setToneLearned,
      }}
    >
      {children}
    </SeoGeoContext.Provider>
  )
}

export function useSeoGeo() {
  const ctx = useContext(SeoGeoContext)
  if (!ctx) throw new Error('useSeoGeo must be used within SeoGeoProvider')
  return ctx
}

// Hook reutilizable: dispara un "estado de carga" falso con duración aleatoria
// dentro del rango y luego ejecuta el callback (o resuelve la promesa).
export function useSimulatedAsync() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const run = useCallback(async (msg, fn, { min = 1000, max = 2500 } = {}) => {
    setMessage(msg)
    setLoading(true)
    const ms = min + Math.floor((max - min) * 0.65)
    await new Promise((r) => setTimeout(r, ms))
    const result = fn ? await fn() : undefined
    setLoading(false)
    setMessage('')
    return result
  }, [])

  return { loading, message, run }
}

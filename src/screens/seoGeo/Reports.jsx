import { useRef, useState } from 'react'
import {
  FileBarChart2,
  Upload,
  Download,
  CalendarClock,
  CheckCircle2,
  Mail,
  Trash2,
} from 'lucide-react'
import ChannelHeader from '../../components/ChannelHeader'
import Button from '../../components/ui/Button'
import Pill from '../../components/ui/Pill'
import { Field, Input, Select } from '../../components/ui/Field'
import { reportPreview, visibilityOverview } from '../../data/seoGeo'
import { useSeoGeo, useSimulatedAsync } from '../../context/SeoGeoContext'
import { LineChart, SimOverlay } from './_shared'

export default function Reports() {
  const { reportConfig, updateReport, scheduleReport } = useSeoGeo()
  const { loading, message, run } = useSimulatedAsync()
  const fileInputRef = useRef(null)
  const [toast, setToast] = useState('')

  const onUploadLogo = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => updateReport({ logoUrl: reader.result })
    reader.readAsDataURL(file)
  }

  const onPdf = () =>
    run('Generando PDF con tu branding…', () => {
      setToast('Reporte mayo-2026.pdf descargado')
      setTimeout(() => setToast(''), 2500)
    }, { min: 1400, max: 2400 })

  const onSchedule = () => {
    scheduleReport({})
    setToast(
      `Envío programado · ${reportConfig.frequency === 'monthly' ? 'mensual' : 'semanal'} a ${reportConfig.email}`
    )
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <div className="px-10 py-10 max-w-[1400px] mx-auto relative">
      <SimOverlay active={loading} message={message} />

      <ChannelHeader
        eyebrow="SEO / GEO con IA · Reportes"
        highlight="exportable"
        title="El reporte del mes, exportable y compartible."
        subtitle="El PDF que le mandás a tu director o a tu agencia. Mismo data que ves acá, con tu branding, listo en un clic."
        right={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="md">
              <Mail size={14} /> Enviar ahora
            </Button>
            <Button size="md" onClick={onPdf}>
              <Download size={14} /> Generar PDF
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-[340px_1fr] gap-6">
        {/* Config side */}
        <div className="space-y-4 h-fit sticky top-[120px]">
          {/* Branding */}
          <div className="hp-card p-5">
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-3">
              Branding del reporte
            </div>
            {reportConfig.logoUrl ? (
              <div className="flex items-center gap-3 mb-3 p-3 rounded-lg border border-border">
                <img
                  src={reportConfig.logoUrl}
                  alt="logo"
                  className="w-12 h-12 object-contain rounded bg-pill"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-ink">Logo cargado</div>
                  <div className="text-[11px] text-ink-soft">Aparece en la portada</div>
                </div>
                <button
                  onClick={() => updateReport({ logoUrl: null })}
                  className="p-1 text-ink-mute hover:text-[color:var(--color-brand-text)]"
                  aria-label="Quitar logo"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-24 border-2 border-dashed border-border rounded-lg text-ink-soft hover:bg-surface-hover transition flex flex-col items-center justify-center gap-1 mb-3"
              >
                <Upload size={16} />
                <span className="text-[12px]">Subí el logo del hotel o agencia</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onUploadLogo}
            />
            <div className="text-[11px] text-ink-mute">
              PNG o SVG con fondo transparente — mejor resultado.
            </div>
          </div>

          {/* Programación */}
          <div className="hp-card p-5 space-y-4">
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium">
              Programación de envío
            </div>
            <Field label="Frecuencia">
              <Select
                value={reportConfig.frequency}
                onChange={(e) => updateReport({ frequency: e.target.value })}
              >
                <option value="monthly">Mensual</option>
                <option value="weekly">Semanal</option>
              </Select>
            </Field>
            <Field label="Email destinatario">
              <Input
                type="email"
                value={reportConfig.email || ''}
                onChange={(e) => updateReport({ email: e.target.value })}
                placeholder="director@hotel.com"
              />
            </Field>
            <Button
              onClick={onSchedule}
              variant={reportConfig.scheduled ? 'secondary' : 'primary'}
              className="w-full"
            >
              {reportConfig.scheduled ? (
                <>
                  <CheckCircle2 size={13} className="text-green" /> Programado · Actualizar
                </>
              ) : (
                <>
                  <CalendarClock size={13} /> Programar envío
                </>
              )}
            </Button>
            {reportConfig.scheduled && (
              <div className="text-[11px] text-green inline-flex items-center gap-1">
                <CheckCircle2 size={11} />
                Próximo envío: 1 jul · {reportConfig.email}
              </div>
            )}
          </div>
        </div>

        {/* Preview side */}
        <div className="hp-card overflow-hidden">
          <div className="bg-ink text-white px-8 py-6 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-white/60 font-medium mb-1">
                Reporte SEO / GEO · {reportPreview.period}
              </div>
              <div className="font-heading text-[26px] font-medium tracking-tight leading-tight">
                Hotel Azul Marino
              </div>
              <div className="text-[12px] text-white/70 mt-1">
                Cartagena de Indias · Colombia
              </div>
            </div>
            {reportConfig.logoUrl ? (
              <img
                src={reportConfig.logoUrl}
                alt="logo"
                className="h-12 max-w-[120px] object-contain bg-white p-1.5 rounded"
              />
            ) : (
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-[0.12em] text-white/50 mb-1">
                  Generado por
                </div>
                <div className="font-display text-[16px]">Presence · IA</div>
              </div>
            )}
          </div>

          <div className="px-8 py-7 space-y-7">
            {/* Highlights */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-3">
                Highlights del período
              </div>
              <div className="grid grid-cols-2 gap-3">
                {reportPreview.highlights.map((h) => (
                  <div
                    key={h.label}
                    className="p-4 rounded-lg border border-border"
                  >
                    <div className="text-[11px] text-ink-soft mb-1">{h.label}</div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-[24px] text-ink leading-none">
                        {h.value}
                      </span>
                      <span
                        className={`text-[11px] font-medium ${
                          h.delta.startsWith('-') && h.label.includes('Posición')
                            ? 'text-green'
                            : h.delta.startsWith('-')
                            ? 'text-[color:var(--color-brand-text)]'
                            : 'text-green'
                        }`}
                      >
                        {h.delta}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-3">
                Evolución SEO + GEO (últimos 30 días)
              </div>
              <div className="p-4 rounded-lg border border-border">
                <LineChart series={visibilityOverview.series30d} height={170} />
                <div className="flex items-center gap-4 mt-2 text-[11px] text-ink-soft">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-0.5 bg-[color:var(--color-brand)] rounded" /> SEO
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-0.5 bg-cool rounded" /> GEO
                  </span>
                </div>
              </div>
            </div>

            {/* Top contents */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-3">
                Top contenidos publicados
              </div>
              <ul className="space-y-2">
                {reportPreview.topContents.map((c) => (
                  <li
                    key={c.title}
                    className="flex items-center justify-between p-3 rounded-lg border border-border"
                  >
                    <div>
                      <div className="text-[13px] text-ink">{c.title}</div>
                      <div className="text-[11px] text-ink-soft">Publicado {c.date}</div>
                    </div>
                    <div className="font-mono text-[14px] text-ink">
                      {c.clicks.toLocaleString('es-AR')} clics
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Acciones recomendadas */}
            <div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-3">
                Acciones recomendadas para el próximo mes
              </div>
              <ol className="space-y-2 list-decimal list-inside marker:text-[color:var(--color-brand-text)] marker:font-mono marker:text-[11px]">
                {reportPreview.recommendations.map((r) => (
                  <li key={r} className="text-[13px] text-ink leading-relaxed pl-1">
                    {r}
                  </li>
                ))}
              </ol>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="text-[11px] text-ink-mute">
                Generado automáticamente · Presence · SEO + GEO con IA
              </div>
              <Pill tone="green">
                <FileBarChart2 size={11} /> Listo para exportar
              </Pill>
            </div>
          </div>
        </div>
      </div>

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

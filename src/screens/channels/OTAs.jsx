import { useState } from 'react'
import { Sparkles, AlertCircle, Plus, X } from 'lucide-react'
import ChannelHeader from '../../components/ChannelHeader'
import Button from '../../components/ui/Button'
import Pill from '../../components/ui/Pill'
import ScoreBar from '../../components/ui/ScoreBar'
import { Field, Textarea, Input, Select } from '../../components/ui/Field'
import { otas, otaRooms } from '../../data/hotel'

const otaList = Object.keys(otas)

function AmenityChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 bg-pill text-ink-soft text-[11px] px-2.5 py-1 rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="text-ink-mute hover:text-ink ml-0.5"
      >
        <X size={10} />
      </button>
    </span>
  )
}

export default function OTAs() {
  const [active, setActive] = useState(otaList[0])
  const [data, setData] = useState({ otas, rooms: otaRooms })
  const [policies, setPolicies] = useState({
    cancellation: 'Moderada',
    checkin: '15:00',
    checkout: '12:00',
    pets: 'Permitidas con cargo',
    smoking: 'No permitido',
  })

  const ota = data.otas[active]

  const updateOtaDesc = (text) => {
    setData((d) => ({
      ...d,
      otas: { ...d.otas, [active]: { ...d.otas[active], description: text } },
    }))
  }

  return (
    <div className="px-10 py-10 max-w-[1400px] mx-auto">
      <ChannelHeader
        eyebrow="Canal · OTAs / Booking"
        highlight="adaptado"
        title="Tu hotel, adaptado a cada plataforma."
        subtitle="Cada OTA tiene su lenguaje. Generamos descripción, fotos y políticas optimizadas para cada una."
        right={
          <Button>
            <Sparkles size={14} /> Sincronizar cambios
          </Button>
        }
      />

      <div className="flex items-center gap-2 mb-6 border-b border-border">
        {otaList.map((o) => {
          const isActive = o === active
          return (
            <button
              key={o}
              onClick={() => setActive(o)}
              className={`relative px-4 py-3 text-[13px] transition ${
                isActive ? 'text-ink font-medium' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {o}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[color:var(--color-brand)]" />
              )}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-[1.4fr_1fr] gap-6 items-start">
        <div className="space-y-6">
          {/* Descripción */}
          <div className="hp-card p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium">
                Descripción generada
              </div>
              <Pill tone="brand">{ota.badge}</Pill>
            </div>
            <Textarea
              value={ota.description}
              onChange={(e) => updateOtaDesc(e.target.value)}
              className="min-h-[140px]"
            />
            <div className="flex items-center justify-between mt-3 text-[11px] text-ink-soft">
              <span>{ota.description.length} caracteres</span>
              <button className="inline-flex items-center gap-1 hover:text-ink">
                <Sparkles size={11} /> Regenerar con IA
              </button>
            </div>
          </div>

          {/* Habitaciones */}
          <div className="hp-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-0.5">
                  Tipos de habitación
                </div>
                <div className="font-display text-[20px]">
                  3 categorías publicadas
                </div>
              </div>
              <Button variant="secondary" size="sm">
                <Plus size={11} /> Agregar tipo
              </Button>
            </div>
            <div className="space-y-3">
              {data.rooms.map((r, idx) => (
                <div
                  key={r.name}
                  className="border border-border rounded-xl overflow-hidden flex"
                >
                  <div className="w-[140px] flex-shrink-0">
                    <img src={r.image} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-1">
                      <div className="font-display text-[16px] text-ink">
                        {r.name}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-ink-soft uppercase tracking-wider">
                          desde
                        </span>
                        <span className="font-mono text-[14px] text-ink">
                          USD {r.price}
                        </span>
                      </div>
                    </div>
                    <p className="text-[12px] text-ink-soft mb-2.5 leading-relaxed">
                      {r.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {r.amenities.map((a) => (
                        <AmenityChip
                          key={a}
                          label={a}
                          onRemove={() => {
                            setData((d) => ({
                              ...d,
                              rooms: d.rooms.map((rr, i) =>
                                i === idx
                                  ? {
                                      ...rr,
                                      amenities: rr.amenities.filter(
                                        (x) => x !== a,
                                      ),
                                    }
                                  : rr,
                              ),
                            }))
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Políticas */}
          <div className="hp-card p-6">
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-4">
              Políticas
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Cancelación">
                <Select
                  value={policies.cancellation}
                  onChange={(e) =>
                    setPolicies((p) => ({ ...p, cancellation: e.target.value }))
                  }
                >
                  <option>Flexible</option>
                  <option>Moderada</option>
                  <option>Estricta</option>
                </Select>
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Check-in">
                  <Input
                    type="time"
                    value={policies.checkin}
                    onChange={(e) =>
                      setPolicies((p) => ({ ...p, checkin: e.target.value }))
                    }
                  />
                </Field>
                <Field label="Check-out">
                  <Input
                    type="time"
                    value={policies.checkout}
                    onChange={(e) =>
                      setPolicies((p) => ({ ...p, checkout: e.target.value }))
                    }
                  />
                </Field>
              </div>
              <Field label="Mascotas">
                <Input
                  value={policies.pets}
                  onChange={(e) =>
                    setPolicies((p) => ({ ...p, pets: e.target.value }))
                  }
                />
              </Field>
              <Field label="Fumadores">
                <Input
                  value={policies.smoking}
                  onChange={(e) =>
                    setPolicies((p) => ({ ...p, smoking: e.target.value }))
                  }
                />
              </Field>
            </div>
          </div>
        </div>

        {/* Sidebar: completitud */}
        <aside className="space-y-4 sticky top-6">
          <div className="hp-card p-6">
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-2">
              Score de completitud
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="font-mono text-[36px] text-ink leading-none">
                {ota.completeness}
              </span>
              <span className="text-ink-soft text-[14px]">% completo</span>
            </div>
            <ScoreBar value={ota.completeness} tone={ota.completeness > 85 ? 'green' : 'amber'} />
            <div className="mt-4 text-[12px] text-ink-soft">
              Perfil <span className="text-ink font-medium">{active}</span>
            </div>
          </div>

          <div className="hp-card p-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={14} className="text-ink-soft" />
              <span className="text-[11px] uppercase tracking-wider text-ink font-medium">
                Falta completar
              </span>
            </div>
            <ul className="space-y-2 text-[13px] text-ink-soft">
              {ota.missing.map((m) => (
                <li key={m} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-ink-mute mt-2 flex-shrink-0" />
                  {m}
                </li>
              ))}
            </ul>
            <Button variant="secondary" size="sm" className="w-full mt-4">
              Completar pendientes
            </Button>
          </div>

          <div className="hp-card p-6">
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-3">
              Performance estimada
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[12px] text-ink-soft">Visibilidad</span>
                  <span className="font-mono text-[12px] text-ink">+34%</span>
                </div>
                <ScoreBar value={68} tone="cool" size="sm" />
              </div>
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[12px] text-ink-soft">CTR</span>
                  <span className="font-mono text-[12px] text-ink">+22%</span>
                </div>
                <ScoreBar value={55} tone="cool" size="sm" />
              </div>
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[12px] text-ink-soft">Conversión</span>
                  <span className="font-mono text-[12px] text-ink">+12%</span>
                </div>
                <ScoreBar value={42} tone="cool" size="sm" />
              </div>
            </div>
            <div className="text-[10px] text-ink-mute mt-3">
              vs benchmark de hoteles boutique en LATAM
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

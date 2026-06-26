import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import ChannelHeader from '../../components/ChannelHeader'
import Button from '../../components/ui/Button'
import Pill from '../../components/ui/Pill'
import { Field, Input, Textarea, Select } from '../../components/ui/Field'
import { useHotel } from '../../context/HotelContext'

export default function Settings() {
  const navigate = useNavigate()
  const { hotel, setHotel, brand } = useHotel()
  const update = (k, v) => setHotel((h) => ({ ...h, [k]: v }))

  return (
    <div className="px-10 py-10 max-w-[920px] mx-auto">
      <ChannelHeader
        eyebrow="Cuenta · Configuración"
        highlight="hotel"
        title="Configuración de tu hotel."
        subtitle="Los datos base de la propiedad. Cambiarlos regenera tu identidad y los assets afectados."
        right={
          <Button variant="secondary" onClick={() => navigate('/app/brand-dna')}>
            <Sparkles size={14} /> Regenerar Brand DNA <ArrowRight size={12} />
          </Button>
        }
      />

      <div className="hp-card p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Nombre del hotel">
            <Input
              value={hotel.name}
              onChange={(e) => update('name', e.target.value)}
            />
          </Field>
          <Field label="Categoría">
            <Select
              value={hotel.category}
              onChange={(e) => update('category', e.target.value)}
            >
              {['Boutique', 'Resort', 'Apart-hotel', 'Hostal', 'Eco-lodge'].map(
                (c) => (
                  <option key={c}>{c}</option>
                ),
              )}
            </Select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Ciudad">
            <Input
              value={hotel.city}
              onChange={(e) => update('city', e.target.value)}
            />
          </Field>
          <Field label="País">
            <Input
              value={hotel.country}
              onChange={(e) => update('country', e.target.value)}
            />
          </Field>
        </div>
        <Field label="Descripción">
          <Textarea
            value={hotel.description}
            onChange={(e) => update('description', e.target.value)}
          />
        </Field>
      </div>

      <div className="hp-card p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-1">
              Brand DNA actual
            </div>
            <div className="font-display text-[20px]">{brand.category}</div>
          </div>
          <div className="flex gap-1.5">
            {brand.palette.map((c) => (
              <div
                key={c.hex}
                className="w-7 h-7 rounded-md shadow-card"
                style={{ background: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
        <p className="text-[13px] text-ink-soft leading-relaxed">
          Tono: <span className="text-ink">{brand.voice}</span>.{' '}
          Tipografía display: <span className="text-ink">{brand.typography.display}</span>.
          Si cambiás cualquier dato del hotel, te ofrecemos regenerar el Brand DNA
          para que la identidad siga siendo coherente.
        </p>
      </div>

      <div className="hp-card p-6 mt-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[13px] text-ink font-medium mb-1">Plan</div>
            <div className="flex items-center gap-2">
              <Pill tone="neutral">Pro · Mensual</Pill>
              <span className="text-[12px] text-ink-soft">
                USD 89/mes · próxima factura 1 jul
              </span>
            </div>
          </div>
          <Button variant="secondary" size="sm">
            Cambiar plan
          </Button>
        </div>
      </div>
    </div>
  )
}

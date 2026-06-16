import { useEffect, useRef, useState } from 'react'
import {
  Play,
  Pause,
  RotateCcw,
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Loader2,
  Globe,
  Camera,
  MapPin,
  BedDouble,
  Mail,
  LayoutDashboard,
  MousePointer2,
  Star,
} from 'lucide-react'
import {
  hotelImages,
  brandDNA,
  generationSteps,
  websiteMeta,
  socialPosts,
  googleBusiness,
  summary,
} from '../data/hotel'

/* ---------------------------------------------------------------- *
 *  Easing + small math helpers (everything is driven by the master
 *  clock `t`, so playback stays smooth and pause-accurate).
 * ---------------------------------------------------------------- */
const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x)
const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)
const easeOut = (x) => 1 - Math.pow(1 - x, 3)
const easeOutBack = (x) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}
const lerp = (a, b, e) => a + (b - a) * e

// Entrance animation length — measure targets only after it settles, or the
// scale in `.hpd-scene-in` skews the geometry.
const SCENE_IN_MS = 620

/* ---------------------------------------------------------------- *
 *  useFocus — measures the real position of a target element and,
 *  from the clock `t`, returns where the cursor sits, whether it's
 *  clicking, and the camera zoom (origin locked to the element).
 *  Because cursor + content live inside the same zoom layer, they
 *  scale together and stay perfectly aligned.
 * ---------------------------------------------------------------- */
function useFocus(rootRef, targetRef, t, opts) {
  const {
    start = { xp: 0.3, yp: 0.42 },
    moveAt = 0,
    travel = 950,
    clickAt = 1000,
    scale = 1.18,
    zoomDur = 700,
  } = opts
  // Measured geometry of the target relative to the stage. Stored in state
  // (not a ref) so it can drive render; measured once after mount in a rAF
  // callback — the button's layout position is static thereafter.
  const [geo, setGeo] = useState(null)

  useEffect(() => {
    let raf = 0
    const measure = () => {
      const root = rootRef.current
      const el = targetRef.current
      if (!root || !el) return
      const rs = root.getBoundingClientRect()
      const re = el.getBoundingClientRect()
      const cx = re.left + re.width / 2 - rs.left
      const cy = re.top + re.height / 2 - rs.top
      setGeo({
        cx,
        cy,
        w: rs.width,
        h: rs.height,
        oxp: (cx / rs.width) * 100,
        oyp: (cy / rs.height) * 100,
      })
    }
    // Wait for the scene-in animation to settle so the geometry is unscaled.
    const id = setTimeout(() => {
      raf = requestAnimationFrame(measure)
    }, SCENE_IN_MS + 40)
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(id)
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', measure)
    }
  }, [rootRef, targetRef])

  // Camera scale derived from the clock — overshoots slightly then settles
  // for a snappy, cinematic punch.
  const zScale = t >= clickAt ? 1 + (scale - 1) * easeOutBack(clamp01((t - clickAt) / zoomDur)) : 1

  let cursor = null
  let zoom = { scale: zScale, ox: 50, oy: 50 }
  if (geo) {
    const sx = start.xp * geo.w
    const sy = start.yp * geo.h
    const e = easeInOut(clamp01((t - moveAt) / travel))
    cursor = { x: lerp(sx, geo.cx, e), y: lerp(sy, geo.cy, e) }
    zoom = { scale: zScale, ox: geo.oxp, oy: geo.oyp }
  }
  const clicking = t >= clickAt && t < clickAt + 340
  return { cursor, clicking, clicked: t >= clickAt, zoom }
}

/* Slow, eased push-in for scenes with no explicit click target. */
function autoZoom(t, { from = 1, to = 1.08, start = 0, dur = 4000, ox = 50, oy = 46 }) {
  return { scale: lerp(from, to, easeInOut(clamp01((t - start) / dur))), ox, oy }
}

/* The layer that the camera zoom is applied to. */
function ZoomLayer({ zoom, children }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        transform: `scale(${zoom.scale})`,
        transformOrigin: `${zoom.ox}% ${zoom.oy}%`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}

/* A little firework of sparks at the click point. */
function SparkBurst() {
  return (
    <>
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const r = 24
        const sx = Math.cos((a * Math.PI) / 180) * r
        const sy = Math.sin((a * Math.PI) / 180) * r
        return (
          <span
            key={i}
            className="absolute left-0 top-0 w-1.5 h-1.5 rounded-full"
            style={{
              background: i % 2 ? '#D4A853' : '#D4845A',
              '--sx': `${sx}px`,
              '--sy': `${sy}px`,
              animation: 'hpd-spark 0.55s ease-out forwards',
            }}
          />
        )
      })}
    </>
  )
}

/* The animated pointer. Position comes straight from the clock, so it
   glides smoothly and pauses correctly — no CSS transition needed. */
function CursorView({ cursor, clicking }) {
  if (!cursor) return null
  return (
    <div className="absolute z-40 pointer-events-none" style={{ left: cursor.x, top: cursor.y }}>
      {clicking && (
        <>
          <SparkBurst />
          <span
            className="absolute -left-3 -top-3 w-9 h-9 rounded-full border-2 border-warm"
            style={{ animation: 'hpd-ripple 0.55s ease-out forwards' }}
          />
          <span
            className="absolute -left-1.5 -top-1.5 w-4 h-4 rounded-full bg-warm/30"
            style={{ animation: 'hpd-ripple 0.45s ease-out forwards' }}
          />
        </>
      )}
      <MousePointer2
        size={20}
        className="text-ink drop-shadow-[0_3px_6px_rgba(0,0,0,0.32)]"
        fill="white"
        strokeWidth={1.5}
        style={{
          transform: clicking ? 'scale(0.8)' : 'scale(1)',
          transition: 'transform 0.14s ease-out',
        }}
      />
    </div>
  )
}

/* CTA that lights + presses when "clicked". `shine` adds a sweeping sheen. */
function CtaButton({ clicked, clicking, shine = false, variant = 'ink', className = '', children }) {
  const base = variant === 'warm' ? 'bg-warm text-white' : 'bg-ink text-white'
  return (
    <button
      className={`relative overflow-hidden inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg text-[13px] font-medium ${base} ${className}`}
      style={{
        transform: clicking ? 'scale(0.96)' : clicked ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.18s cubic-bezier(.3,1.4,.5,1), box-shadow 0.25s ease',
        boxShadow: clicked
          ? '0 0 0 4px rgba(212,132,90,0.28), 0 10px 26px rgba(212,132,90,0.35)'
          : '0 6px 18px rgba(0,0,0,0.15)',
      }}
    >
      {children}
      {shine && !clicked && <span className="hpd-shine rounded-lg" />}
    </button>
  )
}

/* Stat callout that bursts in — the marketing "wow" numbers. */
function Burst({ delay = 0, className = '', children }) {
  return (
    <div
      className={className}
      style={{ animation: `hpd-burst 0.6s cubic-bezier(.2,.9,.3,1.1) ${delay}s both` }}
    >
      {children}
    </div>
  )
}

/* Typewriter text driven by scene-local time `t`. */
function typed(text, t, { start = 0, perChar = 55 } = {}) {
  const n = Math.max(0, Math.floor((t - start) / perChar))
  return text.slice(0, Math.min(text.length, n))
}

/* ---------------------------------------------------------------- *
 *  App chrome — mirrors the real onboarding/brand/generating header.
 * ---------------------------------------------------------------- */
function AppHeader({ step }) {
  return (
    <div className="flex items-center justify-between px-5 py-2.5 border-b border-border bg-card/70 backdrop-blur-sm flex-shrink-0">
      <div className="flex items-center gap-1.5">
        <Sparkles size={13} className="text-warm" />
        <span className="font-display text-[14px]">Hotel Presence</span>
      </div>
      <div className="flex items-center gap-1.5">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              n === step ? 'w-5 bg-warm' : n < step ? 'w-1.5 bg-warm/50' : 'w-1.5 bg-border-strong'
            }`}
          />
        ))}
      </div>
      <span className="hp-pill" style={{ background: '#f7e7dc', color: '#d4845a' }}>
        <Sparkles size={9} /> Demo en vivo
      </span>
    </div>
  )
}

const HUB_CHANNELS = [
  { key: 'web', i: Globe, l: 'Sitio Web' },
  { key: 'social', i: Camera, l: 'Redes Sociales' },
  { key: 'google', i: MapPin, l: 'Google Business' },
  { key: 'ota', i: BedDouble, l: 'OTAs / Booking' },
  { key: 'email', i: Mail, l: 'Email Marketing' },
  { key: 'summary', i: LayoutDashboard, l: 'Resumen' },
]

/* Hub shell with channel sidebar — ties the channel scenes together. */
function HubFrame({ active, title, kicker, action, rootRef, children }) {
  return (
    <div ref={rootRef} className="absolute inset-0 flex bg-bg">
      <aside className="w-[178px] flex-shrink-0 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="text-[8px] uppercase tracking-wider text-ink-mute mb-0.5">Hotel</div>
          <div className="font-display text-[14px] leading-tight">Hotel Azul Marino</div>
          <div className="text-[9px] text-ink-soft mt-0.5">Cartagena, Colombia</div>
        </div>
        <nav className="flex-1 py-3">
          <div className="px-4 text-[8px] uppercase tracking-[0.15em] text-ink-mute mb-1.5 font-medium">
            Canales
          </div>
          {HUB_CHANNELS.map((c) => {
            const on = c.key === active
            return (
              <div
                key={c.key}
                className={`relative flex items-center gap-2 pl-5 pr-3 h-8 text-[11px] transition-colors duration-300 ${
                  on ? 'text-ink font-semibold bg-surface-hover' : 'text-ink-soft'
                }`}
              >
                {on && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-[2.5px] rounded-full bg-warm" />
                )}
                <c.i size={13} strokeWidth={1.75} />
                <span>{c.l}</span>
              </div>
            )
          })}
        </nav>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border flex-shrink-0">
          <div>
            <div className="text-[8px] uppercase tracking-[0.15em] text-ink-mute font-medium mb-0.5">
              {kicker}
            </div>
            <div className="font-display text-[17px] leading-tight">{title}</div>
          </div>
          {action}
        </div>
        <div className="flex-1 min-h-0 relative">{children}</div>
      </div>
    </div>
  )
}

/* ================================================================ *
 *  SCENES
 * ================================================================ */

function SceneLogo() {
  const vRef = useRef(null)
  // Restart from the top whenever this scene (re)mounts — covers replay/seek.
  useEffect(() => {
    const v = vRef.current
    if (!v) return
    v.currentTime = 0
    const p = v.play()
    if (p && p.catch) p.catch(() => {})
  }, [])
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-bg overflow-hidden">
      <video
        ref={vRef}
        src="/logo-intro.mp4"
        muted
        playsInline
        autoPlay
        preload="auto"
        className="w-full h-full object-cover"
      />
    </div>
  )
}

function SceneIntro({ t }) {
  const z = autoZoom(t, { from: 1.06, to: 1, start: 0, dur: 1400, ox: 50, oy: 50 })
  return (
    <ZoomLayer zoom={z}>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 bg-bg">
        <div style={{ animation: 'hpd-float 4s ease-in-out infinite' }}>
          <span
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_16px_40px_rgba(212,132,90,0.4)]"
            style={{
              background: 'linear-gradient(135deg, #D4845A 0%, #D4A853 100%)',
              animation: 'hpd-pop 0.6s ease-out both',
            }}
          >
            <Sparkles size={30} className="text-white" strokeWidth={2.2} />
          </span>
        </div>
        <div
          className="font-display text-[46px] leading-[1.05] tracking-tight"
          style={{ animation: 'hpd-rise 0.6s ease-out 0.1s both' }}
        >
          Toda tu presencia online.
          <br />
          <span className="hp-underline">En un minuto.</span>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 hpd-tilt" style={{ transformStyle: 'preserve-3d' }}>
          {[
            { v: '6', k: 'canales' },
            { v: '47', k: 'assets' },
            { v: '94', k: 'SEO' },
          ].map((s, i) => (
            <Burst
              key={s.k}
              delay={0.35 + i * 0.12}
              className="hp-card px-4 py-2 text-center"
            >
              <div className="font-display text-[22px] leading-none text-ink">{s.v}</div>
              <div className="text-[9px] uppercase tracking-wider text-ink-soft mt-0.5">{s.k}</div>
            </Burst>
          ))}
        </div>
        <div className="mt-6 hp-pill" style={{ animation: 'hpd-pop 0.5s ease-out 0.8s both' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-warm" style={{ animation: 'hpd-rec 1.2s infinite' }} />
          Demo · 45 segundos
        </div>
      </div>
    </ZoomLayer>
  )
}

function SceneOnboarding({ t }) {
  const rootRef = useRef(null)
  const ctaRef = useRef(null)
  const focus = useFocus(rootRef, ctaRef, t, {
    start: { xp: 0.26, yp: 0.32 },
    moveAt: 3000,
    travel: 1000,
    clickAt: 4200,
    scale: 1.2,
  })
  const name = typed('Hotel Azul Marino', t, { start: 350, perChar: 50 })
  const city = typed('Cartagena de Indias', t, { start: 1450, perChar: 40 })
  const shots = [hotelImages.facade, hotelImages.pool, hotelImages.room2, hotelImages.terrace]

  return (
    <div className="absolute inset-0 flex flex-col bg-bg">
      <AppHeader step={1} />
      <div ref={rootRef} className="relative flex-1 min-h-0">
        <ZoomLayer zoom={focus.zoom}>
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="hp-card p-7 w-full max-w-[440px]">
              <div className="text-[9px] uppercase tracking-[0.18em] text-warm mb-1 font-medium">
                ✦ Paso 1 — Contanos sobre tu hotel
              </div>
              <div className="font-display text-[23px] leading-tight mb-5">
                Construimos tu presencia en cinco minutos.
              </div>

              <label className="text-[11px] text-ink-soft font-medium">Nombre del hotel</label>
              <div className="hp-input mt-1.5 mb-4 flex items-center">
                {name}
                {name.length < 'Hotel Azul Marino'.length && (
                  <span className="hpd-blink ml-0.5 w-[2px] h-[15px] bg-ink inline-block" />
                )}
              </div>

              <label className="text-[11px] text-ink-soft font-medium">Ciudad</label>
              <div className="hp-input mt-1.5 mb-4 flex items-center">
                {city}
                {t > 1450 && city.length < 'Cartagena de Indias'.length && (
                  <span className="hpd-blink ml-0.5 w-[2px] h-[15px] bg-ink inline-block" />
                )}
              </div>

              <label className="text-[11px] text-ink-soft font-medium">Imágenes del hotel</label>
              <div className="grid grid-cols-4 gap-2 mt-1.5 mb-6">
                {shots.map((s, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-md overflow-hidden border border-border"
                    style={{ animation: `hpd-pop 0.4s ease-out ${2.4 + i * 0.16}s both` }}
                  >
                    <img src={s} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              <span ref={ctaRef} className="block">
                <CtaButton clicked={focus.clicked} clicking={focus.clicking} className="w-full">
                  Analizar mi hotel <ArrowRight size={14} />
                </CtaButton>
              </span>
            </div>
          </div>
          <CursorView cursor={focus.cursor} clicking={focus.clicking} />
        </ZoomLayer>
      </div>
    </div>
  )
}

function SceneBrandDNA({ t }) {
  const rootRef = useRef(null)
  const ctaRef = useRef(null)
  const focus = useFocus(rootRef, ctaRef, t, {
    start: { xp: 0.3, yp: 0.4 },
    moveAt: 2700,
    travel: 1050,
    clickAt: 4000,
    scale: 1.28, // the climactic "Generar" punch
  })

  return (
    <div className="absolute inset-0 flex flex-col bg-bg">
      <AppHeader step={2} />
      <div ref={rootRef} className="relative flex-1 min-h-0">
        <ZoomLayer zoom={focus.zoom}>
          <div className="absolute inset-0 flex flex-col justify-center px-7 py-5">
            <div className="mb-4" style={{ animation: 'hpd-rise 0.5s ease-out both' }}>
              <span className="hp-pill" style={{ background: '#f7e7dc', color: '#d4845a' }}>
                ✦ Paso 2 — Brand DNA generado
              </span>
              <div className="font-display text-[24px] leading-tight mt-2">
                Esta es la <span className="hp-underline">identidad</span> que detectamos.
              </div>
            </div>

            <div
              className="hp-card p-5 grid grid-cols-2 gap-5"
              style={{ animation: 'hpd-flip-in 0.55s cubic-bezier(.2,.85,.25,1) both' }}
            >
              <div>
                <div className="text-[9px] uppercase tracking-[0.15em] text-ink-mute mb-2.5">
                  Paleta detectada
                </div>
                <div className="flex gap-2.5">
                  {brandDNA.palette.map((c, i) => (
                    <div
                      key={c.hex}
                      className="flex-1 text-center"
                      style={{ animation: `hpd-pop 0.4s ease-out ${0.3 + i * 0.12}s both` }}
                    >
                      <div className="h-11 rounded-lg mb-1.5 shadow-card" style={{ background: c.hex }} />
                      <div className="font-mono text-[8px] text-ink uppercase">{c.hex}</div>
                      <div className="text-[8px] text-ink-soft leading-tight">{c.name}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ animation: 'hpd-pop 0.45s ease-out 0.35s both' }}>
                <div className="text-[9px] uppercase tracking-[0.15em] text-ink-mute mb-2.5">
                  Tipografía
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-[34px] leading-none">Aa</span>
                  <div>
                    <div className="text-[12px] text-ink">{brandDNA.typography.display}</div>
                    <div className="text-[10px] text-ink-soft mt-0.5">
                      Cuerpo · {brandDNA.typography.body}
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="text-[9px] uppercase tracking-[0.15em] text-ink-mute mb-1">
                    Tono de voz
                  </div>
                  <div className="font-display text-[14px] leading-snug text-ink">
                    “{brandDNA.voice}”
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-5">
              <button className="inline-flex items-center gap-1.5 text-[12px] text-ink-soft h-10 px-3">
                <ArrowLeft size={13} /> Volver
              </button>
              <span ref={ctaRef} className="inline-block">
                <CtaButton clicked={focus.clicked} clicking={focus.clicking} shine>
                  Generar presencia completa <ArrowRight size={15} />
                </CtaButton>
              </span>
            </div>
          </div>
          <CursorView cursor={focus.cursor} clicking={focus.clicking} />
        </ZoomLayer>
      </div>
    </div>
  )
}

function SceneGenerating({ t }) {
  const span = 4000
  const pct = Math.min(100, Math.round(easeOut(clamp01(t / span)) * 100))
  const finished = t > span + 350
  const z = autoZoom(t, { from: 1, to: 1.05, start: 0, dur: span, ox: 50, oy: 50 })
  return (
    <div className="absolute inset-0 flex flex-col bg-bg">
      <AppHeader step={3} />
      <ZoomLayer zoom={z}>
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="hp-card p-7 w-full max-w-[480px]">
            <span className="hp-pill mb-4" style={{ background: '#f7e7dc', color: '#d4845a' }}>
              ✦ Paso 3 — Generando todo tu hub
            </span>
            <div className="font-display text-[22px] leading-tight mt-3 mb-1">
              Tu marca, en todos tus <span className="hp-underline">canales</span>.
            </div>
            <p className="text-[12px] text-ink-soft mb-6">
              Creamos tu sitio, tus posts y tus perfiles al mismo tiempo.
            </p>

            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase tracking-wider text-ink-soft">Progreso</span>
              <span className="font-mono text-[12px] text-ink">{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-pill overflow-hidden mb-6">
              <div
                className="h-full rounded-full"
                style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#D4845A,#D4A853)' }}
              />
            </div>

            <div className="space-y-2.5">
              {generationSteps.map((s, i) => {
                const doneAt = (i + 1) * (span / generationSteps.length)
                const done = t >= doneAt
                const active = !done && t >= doneAt - span / generationSteps.length
                return (
                  <div key={s.id} className="flex items-center gap-3 text-[12.5px]">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        done ? 'bg-green-soft text-green' : active ? 'bg-warm-soft' : 'bg-pill'
                      }`}
                    >
                      {done ? (
                        <Check size={11} strokeWidth={3} />
                      ) : active ? (
                        <Loader2 size={11} className="text-warm hp-spin" />
                      ) : null}
                    </span>
                    <span className={done || active ? 'text-ink' : 'text-ink-mute'}>{s.label}</span>
                  </div>
                )
              })}
            </div>

            {finished && (
              <Burst className="mt-5 flex items-center justify-center gap-2 text-[12px] text-green font-medium">
                <span className="w-5 h-5 rounded-full bg-green-soft flex items-center justify-center">
                  <Check size={11} strokeWidth={3} />
                </span>
                47 assets generados en 38 segundos
              </Burst>
            )}

            <div className="mt-6 pt-5 border-t border-border">
              <CtaButton
                clicked={finished}
                clicking={false}
                shine={finished}
                className={`w-full transition-opacity duration-300 ${finished ? '' : 'opacity-60'}`}
              >
                {finished ? (
                  <>Ver mi hub de presencia <ArrowRight size={15} /></>
                ) : (
                  <><Loader2 size={14} className="hp-spin" /> Generando…</>
                )}
              </CtaButton>
            </div>
          </div>
        </div>
      </ZoomLayer>
    </div>
  )
}

function SceneWebsite({ t }) {
  const rootRef = useRef(null)
  const ctaRef = useRef(null)
  const focus = useFocus(rootRef, ctaRef, t, {
    start: { xp: 0.45, yp: 0.6 },
    moveAt: 1900,
    travel: 1000,
    clickAt: 3100,
    scale: 1.16,
  })
  return (
    <ZoomLayer zoom={focus.zoom}>
      <HubFrame
        rootRef={rootRef}
        active="web"
        kicker="Canal · Sitio Web"
        title="Tu sitio, listo para publicar"
        action={
          <span ref={ctaRef} className="inline-block">
            <CtaButton clicked={focus.clicked} clicking={focus.clicking} className="h-9 px-4 text-[12px]">
              Publicar <ArrowRight size={13} />
            </CtaButton>
          </span>
        }
      >
        <div className="absolute inset-0 p-5" style={{ perspective: '1500px' }}>
          <div
            className="hp-card overflow-hidden h-full"
            style={{
              transform: 'rotateY(-5deg) rotateX(3deg)',
              transformStyle: 'preserve-3d',
              boxShadow: '0 30px 70px rgba(0,0,0,0.22)',
            }}
          >
            <div className="relative h-[56%] overflow-hidden">
              <img src={hotelImages.hero} alt="" className="w-full h-full object-cover hpd-kenburns" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <div className="text-[8px] uppercase tracking-[0.18em] text-white/80">
                  Cartagena · Colombia
                </div>
                <div className="font-display text-[22px] text-white leading-tight">
                  {websiteMeta.headline}
                </div>
              </div>
            </div>
            <div className="p-3.5 bg-[#FBFAF6] h-[44%]">
              <div className="text-[9px] uppercase tracking-[0.15em] text-ink-mute mb-2">Habitaciones</div>
              <div className="grid grid-cols-3 gap-2">
                {websiteMeta.rooms.map((room, i) => (
                  <div
                    key={room.name}
                    className="rounded-lg overflow-hidden border border-border bg-card"
                    style={{ animation: `hpd-rise 0.5s ease-out ${0.25 + i * 0.14}s both` }}
                  >
                    <img src={room.image} alt="" className="w-full h-[52px] object-cover" />
                    <div className="p-1.5">
                      <div className="text-[9px] font-medium leading-tight truncate">{room.name}</div>
                      <div className="text-[8px] text-warm mt-0.5">{room.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="absolute top-2 left-7 hp-card px-3 py-1.5 flex items-center gap-2"
            style={{ animation: 'hpd-pop 0.5s ease-out 0.9s both', boxShadow: '0 10px 24px rgba(0,0,0,0.15)' }}
          >
            <span className="w-7 h-7 rounded-full bg-warm-soft text-warm flex items-center justify-center font-display text-[13px]">
              {websiteMeta.seoScore}
            </span>
            <div className="leading-tight">
              <div className="text-[10px] font-medium">Score SEO</div>
              <div className="text-[9px] text-green">{websiteMeta.webVitals}</div>
            </div>
          </div>
        </div>
      </HubFrame>
      <CursorView cursor={focus.cursor} clicking={focus.clicking} />
    </ZoomLayer>
  )
}

function SceneSocial({ t }) {
  const posts = [...socialPosts.Instagram.slice(0, 4), ...socialPosts.Facebook.slice(0, 2)]
  const z = autoZoom(t, { from: 1, to: 1.1, start: 600, dur: 3200, ox: 50, oy: 44 })
  return (
    <ZoomLayer zoom={z}>
      <HubFrame
        active="social"
        kicker="Canal · Redes Sociales"
        title="23 piezas, con tu estética"
        action={
          <div className="flex gap-1.5">
            <span className="hp-pill">12 IG</span>
            <span className="hp-pill">8 FB</span>
            <span className="hp-pill">3 TT</span>
          </div>
        }
      >
        <div className="absolute inset-0 p-5 flex items-center justify-center" style={{ perspective: '1100px' }}>
          <div
            className="grid grid-cols-3 gap-3 w-full max-w-[440px] hpd-tilt"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {posts.map((p, i) => {
              // Stagger depth so the tilt reveals real 3D parallax. Depth lives
              // on the outer wrapper; the pop entrance on the inner (so the
              // animation's transform doesn't clobber translateZ).
              const depth = [18, 4, 14, 8, 16, 2][i] ?? 8
              return (
                <div key={i} style={{ transform: `translateZ(${depth}px)` }}>
                  <div
                    className="relative rounded-xl overflow-hidden aspect-square"
                    style={{
                      boxShadow: '0 12px 26px rgba(0,0,0,0.22)',
                      animation: `hpd-pop 0.5s cubic-bezier(.2,.9,.3,1.2) ${i * 0.1}s both`,
                    }}
                  >
                    <img src={p.image} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
                    <span className="absolute top-1.5 left-1.5 text-[7px] uppercase tracking-wide bg-white/85 text-ink px-1.5 py-0.5 rounded">
                      {p.type}
                    </span>
                    <div className="absolute bottom-1.5 left-2 right-2">
                      <div className="text-[10px] text-white font-medium leading-tight drop-shadow">
                        {p.overlay}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </HubFrame>
    </ZoomLayer>
  )
}

function SceneGoogleBusiness({ t }) {
  const review = googleBusiness.reviews[0]
  const reply = typed(review.aiReply, t, { start: 900, perChar: 9 })
  const replyDone = reply.length >= review.aiReply.length
  const z = autoZoom(t, { from: 1.02, to: 1.12, start: 600, dur: 4200, ox: 50, oy: 70 })
  return (
    <ZoomLayer zoom={z}>
      <HubFrame
        active="google"
        kicker="Canal · Google Business"
        title="Reseñas respondidas con IA"
        action={
          <CtaButton clicked={replyDone} clicking={false} className="h-9 px-4 text-[12px]">
            Publicar respuesta
          </CtaButton>
        }
      >
        <div className="absolute inset-0 p-5 flex items-center justify-center">
          <div className="hp-card p-5 w-full max-w-[520px]" style={{ animation: 'hpd-flip-in 0.55s cubic-bezier(.2,.85,.25,1) both' }}>
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <img src={hotelImages.facade} alt="" className="w-9 h-9 rounded-full object-cover" />
              <div>
                <div className="text-[12px] font-medium">{review.author}</div>
                <div className="flex items-center gap-1 text-amber">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={10} fill="currentColor" strokeWidth={0} />
                  ))}
                  <span className="text-[9px] text-ink-mute ml-1">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-[11.5px] text-ink-soft leading-relaxed mt-3">{review.text}</p>

            <div
              className="mt-3 border-l-2 border-warm bg-warm-soft/40 rounded-r-lg p-3 transition-shadow duration-500"
              style={{ boxShadow: replyDone ? '0 0 0 2px rgba(212,132,90,0.2)' : 'none' }}
            >
              <div className="flex items-center gap-1.5 text-[9px] text-warm font-medium uppercase tracking-wide mb-1.5">
                <Sparkles size={10} className={replyDone ? '' : 'hp-pulse'} /> Respuesta sugerida · en tu tono
              </div>
              <p className="text-[11.5px] text-ink leading-relaxed">
                {reply}
                {t > 900 && !replyDone && (
                  <span className="hpd-blink ml-0.5 w-[2px] h-[13px] bg-ink inline-block align-middle" />
                )}
              </p>
            </div>
          </div>
        </div>
      </HubFrame>
    </ZoomLayer>
  )
}

function SceneSummary({ t }) {
  const score = Math.round(easeOut(clamp01(t / 1500)) * summary.presenceScore)
  const z = autoZoom(t, { from: 1, to: 1.08, start: 300, dur: 3000, ox: 24, oy: 48 })
  const statusTone = {
    active: 'bg-green-soft text-green',
    ready: 'bg-cool-soft text-cool',
    pending: 'bg-amber-soft text-[#8B6F1F]',
  }
  return (
    <ZoomLayer zoom={z}>
      <HubFrame active="summary" kicker="Cuenta · Resumen" title="Toda tu presencia, en un panel">
        <div className="absolute inset-0 p-5 flex items-center">
          <div className="grid grid-cols-[180px_1fr] gap-4 w-full max-w-[600px] mx-auto">
            <div
              className="hp-card p-5 flex flex-col items-center justify-center text-center"
              style={{ animation: 'hpd-flip-in 0.6s cubic-bezier(.2,.85,.25,1) both' }}
            >
              <div className="text-[9px] uppercase tracking-[0.15em] text-ink-mute mb-2">
                Score de presencia
              </div>
              <div
                className="font-display text-[50px] leading-none text-ink"
                style={{ transform: `scale(${1 + (score / summary.presenceScore) * 0.05})` }}
              >
                {score}
              </div>
              <div className="text-[11px] text-green mt-1">↑ creciendo</div>
              <div className="text-[10px] text-ink-soft mt-3">
                {summary.totalAssets} assets · {summary.activeChannels}/{summary.totalChannels} canales activos
              </div>
            </div>

            <div className="hp-card p-4 space-y-1.5" style={{ animation: 'hpd-pop 0.5s ease-out 0.25s both' }}>
              {summary.channels.map((c, i) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between text-[12px] py-1"
                  style={{ animation: `hpd-rise 0.4s ease-out ${0.4 + i * 0.08}s both` }}
                >
                  <span className="text-ink">{c.name}</span>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${
                      statusTone[c.status] || 'bg-pill text-ink-soft'
                    }`}
                  >
                    {c.statusLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </HubFrame>
    </ZoomLayer>
  )
}

function SceneOutro({ onStart }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 100%)' }}
    >
      <div
        className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full opacity-40"
        style={{ background: 'radial-gradient(circle, #D4845A 0%, transparent 70%)', animation: 'hpd-float 5s ease-in-out infinite' }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-[300px] h-[300px] rounded-full opacity-25"
        style={{ background: 'radial-gradient(circle, #D4A853 0%, transparent 70%)', animation: 'hpd-float 6s ease-in-out infinite' }}
      />
      <div className="relative">
        <div className="hp-pill mx-auto w-fit mb-5" style={{ animation: 'hpd-pop 0.5s ease-out both' }}>
          <Sparkles size={11} className="text-warm" /> En menos de 6 minutos
        </div>
        <div
          className="font-display text-[34px] leading-tight text-white max-w-[460px] mx-auto"
          style={{ animation: 'hpd-rise 0.6s ease-out 0.1s both' }}
        >
          Ahora hacelo con <span className="hp-underline">tu hotel</span>.
        </div>
        <p
          className="mt-4 text-[14px] text-white/70 max-w-[400px] mx-auto"
          style={{ animation: 'hpd-rise 0.6s ease-out 0.25s both' }}
        >
          Gratis, sin tarjeta de crédito. 14 días para probarlo todo.
        </p>
        <button
          onClick={onStart}
          className="mt-7 bg-warm text-white h-12 px-7 rounded-lg inline-flex items-center gap-2 text-[14px] font-medium hover:bg-[#c2754d] transition-colors"
          style={{ animation: 'hpd-pop 0.5s ease-out 0.4s both' }}
        >
          Comenzar gratis <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

/* ================================================================ *
 *  Timeline
 * ================================================================ */
const SCENES = [
  { id: 'logo', chapter: 'Logo', dur: 3200, subtitle: '', render: () => <SceneLogo /> },
  { id: 'intro', chapter: 'Intro', dur: 2800, subtitle: 'Toda tu presencia online. En un minuto.', render: (t) => <SceneIntro t={t} /> },
  { id: 'onboarding', chapter: 'Onboarding', dur: 6000, subtitle: 'Solo contás lo básico de tu hotel.', render: (t) => <SceneOnboarding t={t} /> },
  { id: 'brand', chapter: 'Brand DNA', dur: 6000, subtitle: 'Tu identidad, detectada al instante.', render: (t) => <SceneBrandDNA t={t} /> },
  { id: 'generating', chapter: 'Generación', dur: 5500, subtitle: 'Todos tus canales. Al mismo tiempo.', render: (t) => <SceneGenerating t={t} /> },
  { id: 'website', chapter: 'Sitio web', dur: 5000, subtitle: 'Tu sitio, listo para publicar.', render: (t) => <SceneWebsite t={t} /> },
  { id: 'social', chapter: 'Redes', dur: 4500, subtitle: '23 piezas con tu estética. Listas.', render: (t) => <SceneSocial t={t} /> },
  { id: 'google', chapter: 'Google', dur: 6000, subtitle: 'Hasta tus reseñas, respondidas en tu tono.', render: (t) => <SceneGoogleBusiness t={t} /> },
  { id: 'summary', chapter: 'Resumen', dur: 4500, subtitle: 'Toda tu presencia, en un panel.', render: (t) => <SceneSummary t={t} /> },
  { id: 'outro', chapter: 'Empezá', dur: 4500, subtitle: 'Ahora hacelo con tu hotel. Gratis.', renderOutro: true },
]
const TOTAL = SCENES.reduce((a, s) => a + s.dur, 0)

function fmt(ms) {
  const s = Math.floor(ms / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

export default function DemoPlayer({ onClose, onStart }) {
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(true)
  const rafRef = useRef(null)
  const lastRef = useRef(0)

  // Lock body scroll + keyboard controls.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === ' ') {
        e.preventDefault()
        setPlaying((p) => !p)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  // rAF playback loop.
  useEffect(() => {
    if (!playing) return
    lastRef.current = performance.now()
    const tick = (now) => {
      const dt = now - lastRef.current
      lastRef.current = now
      setElapsed((e) => {
        const n = e + dt
        if (n >= TOTAL) {
          setPlaying(false)
          return TOTAL
        }
        return n
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [playing])

  // Resolve current scene + scene-local time.
  let acc = 0
  let idx = SCENES.length - 1
  let sceneStart = TOTAL - SCENES[SCENES.length - 1].dur
  for (let i = 0; i < SCENES.length; i++) {
    if (elapsed < acc + SCENES[i].dur) {
      idx = i
      sceneStart = acc
      break
    }
    acc += SCENES[i].dur
  }
  const scene = SCENES[idx]
  const sceneT = elapsed - sceneStart
  const finished = elapsed >= TOTAL

  const seekToScene = (i) => {
    setElapsed(SCENES.slice(0, i).reduce((a, x) => a + x.dur, 0))
    setPlaying(true)
  }

  const togglePlay = () => {
    if (finished) {
      setElapsed(0)
      setPlaying(true)
    } else {
      setPlaying((p) => !p)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      style={{
        background: 'rgba(15,15,18,0.78)',
        backdropFilter: 'blur(6px)',
        animation: 'hpd-backdrop-in 0.25s ease-out',
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[940px]"
        style={{ animation: 'hpd-player-in 0.4s cubic-bezier(.2,.8,.2,1) both' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* animated warm glow halo behind the screen */}
        <div className="absolute -inset-12 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                'radial-gradient(38% 50% at 28% 30%, rgba(212,132,90,0.55), transparent 70%), radial-gradient(40% 50% at 74% 72%, rgba(212,168,83,0.45), transparent 70%)',
              filter: 'blur(36px)',
              animation: 'hpd-bg-pan 9s ease-in-out infinite',
            }}
          />
        </div>

        <button
          onClick={onClose}
          className="absolute -top-11 right-0 text-white/70 hover:text-white flex items-center gap-1.5 text-[13px]"
        >
          Cerrar <X size={16} />
        </button>

        {/* Screen */}
        <div
          className="relative rounded-2xl overflow-hidden bg-card aspect-[16/10] shadow-[0_40px_120px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
          style={{ perspective: '1800px' }}
        >
          <div key={scene.id} className="absolute inset-0 hpd-scene-in">
            {scene.renderOutro ? <SceneOutro onStart={onStart} /> : scene.render(sceneT)}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-3 bg-black/40 backdrop-blur-md rounded-xl px-4 py-3 flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="w-9 h-9 rounded-full bg-white text-ink flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform"
          >
            {finished ? (
              <RotateCcw size={16} />
            ) : playing ? (
              <Pause size={16} fill="currentColor" />
            ) : (
              <Play size={16} fill="currentColor" className="ml-0.5" />
            )}
          </button>

          <span className="text-[11px] text-white/80 font-mono tabular-nums flex-shrink-0">
            {fmt(elapsed)} / {fmt(TOTAL)}
          </span>

          {/* segmented chapter timeline */}
          <div className="flex-1 flex items-center gap-1">
            {SCENES.map((s, i) => {
              const segStart = SCENES.slice(0, i).reduce((a, x) => a + x.dur, 0)
              const local = Math.min(1, Math.max(0, (elapsed - segStart) / s.dur))
              return (
                <button
                  key={s.id}
                  onClick={() => seekToScene(i)}
                  title={s.chapter}
                  className="group relative h-1.5 rounded-full bg-white/20 overflow-hidden hover:h-2 transition-all"
                  style={{ flexGrow: s.dur, flexBasis: 0 }}
                >
                  <span
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${local * 100}%`,
                      background: i <= idx ? 'linear-gradient(90deg,#D4845A,#D4A853)' : 'transparent',
                    }}
                  />
                </button>
              )
            })}
          </div>

          <button
            onClick={onStart}
            className="hidden sm:inline-flex items-center gap-1.5 bg-warm text-white text-[12px] font-medium px-3.5 h-8 rounded-lg hover:bg-[#c2754d] transition-colors flex-shrink-0"
          >
            Comenzar gratis <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}

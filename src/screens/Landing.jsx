import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Sparkles,
  Globe,
  Camera,
  MapPin,
  BedDouble,
  Mail,
  LayoutDashboard,
  Check,
  Star,
  Zap,
  Eye,
  Compass,
} from 'lucide-react'
import Headline from '../components/ui/Headline'
import Pill from '../components/ui/Pill'
import Button from '../components/ui/Button'
import { hotelImages } from '../data/hotel'

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <span className="relative inline-flex">
        <span
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{
            background:
              'linear-gradient(135deg, #D4845A 0%, #D4A853 100%)',
          }}
        >
          <Sparkles size={14} className="text-white" strokeWidth={2.4} />
        </span>
      </span>
      <span className="font-display text-[19px] tracking-tight text-ink">
        Hotel Presence
      </span>
    </Link>
  )
}

function ProductScreenshot() {
  return (
    <div
      className="relative"
      style={{
        transform: 'perspective(1800px) rotateX(8deg) rotateY(-4deg)',
        transformOrigin: '50% 100%',
      }}
    >
      <div
        className="hp-card overflow-hidden"
        style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.18)' }}
      >
        {/* mock topbar */}
        <div className="px-4 py-2.5 border-b border-border flex items-center gap-2.5 bg-surface-hover">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6058]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBE2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 mx-2 px-3 py-1 text-[11px] text-ink-soft bg-card rounded font-mono">
            hotelazulmarino.presence.io
          </div>
          <Pill tone="green">● en vivo</Pill>
        </div>

        {/* mock hub: sidebar + content */}
        <div className="flex h-[480px]">
          <aside className="w-[200px] flex-shrink-0 bg-card border-r border-border flex flex-col">
            <div className="p-4 border-b border-border">
              <div className="text-[9px] uppercase tracking-wider text-ink-mute mb-0.5">
                Hotel
              </div>
              <div className="font-display text-[15px] leading-tight">
                Hotel Azul Marino
              </div>
              <div className="text-[10px] text-ink-soft mt-0.5">
                Cartagena, Colombia
              </div>
            </div>
            <nav className="flex-1 py-3 text-[11px]">
              <div className="px-4 text-[8px] uppercase tracking-[0.15em] text-ink-mute mb-1.5 font-medium">
                Canales
              </div>
              {[
                { i: Globe, l: 'Sitio Web', active: true },
                { i: Camera, l: 'Redes Sociales' },
                { i: MapPin, l: 'Google Business' },
                { i: BedDouble, l: 'OTAs / Booking' },
                { i: Mail, l: 'Email Marketing' },
              ].map((it) => (
                <div
                  key={it.l}
                  className={`relative flex items-center gap-2 pl-5 pr-3 h-7 ${
                    it.active
                      ? 'text-ink font-semibold'
                      : 'text-ink-soft'
                  }`}
                >
                  {it.active && (
                    <span className="absolute left-2 w-[3px] h-[3px] rounded-full bg-warm" />
                  )}
                  <it.i size={12} strokeWidth={1.75} />
                  <span>{it.l}</span>
                </div>
              ))}
              <div className="px-4 mt-4 mb-1.5 text-[8px] uppercase tracking-[0.15em] text-ink-mute font-medium">
                Cuenta
              </div>
              {[LayoutDashboard].map((I, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 pl-5 pr-3 h-7 text-ink-soft"
                >
                  <I size={12} strokeWidth={1.75} />
                  <span>Resumen</span>
                </div>
              ))}
            </nav>
          </aside>

          <div className="flex-1 p-5 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[8px] uppercase tracking-[0.15em] text-ink-mute font-medium mb-1">
                  Canal · Sitio Web
                </div>
                <div className="font-display text-[18px] leading-tight">
                  Tu sitio completo, listo para{' '}
                  <span className="hp-underline" style={{ textDecorationThickness: 2, textUnderlineOffset: 4 }}>
                    publicar
                  </span>
                  .
                </div>
              </div>
              <div className="flex gap-1.5">
                <span className="hp-pill">✦ Editar</span>
                <span className="hp-pill bg-ink! text-white!" style={{ background: '#1a1a1a', color: '#fff' }}>
                  Publicar
                </span>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border border-border h-[330px]">
              <img
                src={hotelImages.hero}
                alt=""
                className="w-full h-[160px] object-cover"
              />
              <div className="p-3 bg-[#FBFAF6] h-[170px]">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[8px] uppercase tracking-[0.18em] text-warm">
                    Cartagena · Colombia
                  </span>
                </div>
                <div
                  className="text-[15px] leading-tight font-display mb-2"
                  style={{ color: '#1A3C5E' }}
                >
                  Cartagena como pocos la conocen.
                </div>
                <div className="grid grid-cols-3 gap-1.5 mt-2">
                  {[hotelImages.room1, hotelImages.room2, hotelImages.room3].map(
                    (s, i) => (
                      <div key={i} className="aspect-[4/3] overflow-hidden rounded-sm">
                        <img src={s} className="w-full h-full object-cover" alt="" />
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* floating chips */}
      <div
        className="absolute -top-4 -left-8 hp-card px-4 py-2.5 flex items-center gap-2"
        style={{ boxShadow: '0 12px 32px rgba(0,0,0,0.12)' }}
      >
        <span className="w-6 h-6 rounded-full bg-green-soft text-green flex items-center justify-center">
          <Check size={12} strokeWidth={3} />
        </span>
        <div className="text-left">
          <div className="text-[11px] text-ink font-medium leading-tight">
            47 assets generados
          </div>
          <div className="text-[10px] text-ink-soft">en 38 segundos</div>
        </div>
      </div>

      <div
        className="absolute -bottom-6 -right-6 hp-card px-4 py-2.5 flex items-center gap-2"
        style={{ boxShadow: '0 12px 32px rgba(0,0,0,0.12)' }}
      >
        <span className="w-6 h-6 rounded-full bg-warm-soft text-warm flex items-center justify-center">
          <Sparkles size={12} />
        </span>
        <div className="text-left">
          <div className="text-[11px] text-ink font-medium leading-tight">
            Score 94/100
          </div>
          <div className="text-[10px] text-ink-soft">SEO de tu sitio</div>
        </div>
      </div>
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <div className="font-display text-[36px] text-ink leading-none">
        {value}
      </div>
      <div className="text-[11px] uppercase tracking-wider text-ink-soft mt-2">
        {label}
      </div>
    </div>
  )
}

function StepCard({ n, icon: Icon, title, body }) {
  return (
    <div className="hp-card p-7 relative overflow-hidden group transition-all hover:shadow-[var(--shadow-card-hover)]">
      <div className="flex items-start justify-between mb-5">
        <div className="font-mono text-[11px] text-ink-mute tracking-wider">
          0{n}
        </div>
        <Icon size={20} className="text-warm" strokeWidth={1.5} />
      </div>
      <div className="font-display text-[22px] mb-2 leading-tight">{title}</div>
      <p className="text-[13px] text-ink-soft leading-relaxed">{body}</p>
    </div>
  )
}

function ChannelCard({ icon: Icon, title, body, items }) {
  return (
    <div className="hp-card p-6 transition-all hover:shadow-[var(--shadow-card-hover)]">
      <Icon size={18} className="text-warm mb-4" strokeWidth={1.75} />
      <div className="font-display text-[20px] mb-1.5 leading-tight">
        {title}
      </div>
      <p className="text-[12.5px] text-ink-soft leading-relaxed mb-4">{body}</p>
      <ul className="space-y-1.5">
        {items.map((i) => (
          <li
            key={i}
            className="flex items-center gap-1.5 text-[12px] text-ink-soft"
          >
            <span className="w-1 h-1 rounded-full bg-warm" /> {i}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const start = () => navigate('/app/onboarding')

  return (
    <div className="min-h-screen">
      {/* TOP NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[rgba(250,250,248,0.7)] border-b border-border/60">
        <div className="max-w-[1180px] mx-auto px-8 h-16 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8 text-[13px] text-ink-soft">
            <a href="#cómo-funciona" className="hover:text-ink transition">
              Cómo funciona
            </a>
            <a href="#canales" className="hover:text-ink transition">
              Canales
            </a>
            <a href="#testimonios" className="hover:text-ink transition">
              Hoteleros
            </a>
            <a href="#precios" className="hover:text-ink transition">
              Precios
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Iniciar sesión
            </Button>
            <Button size="sm" onClick={start}>
              Comenzar gratis <ArrowRight size={12} />
            </Button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative max-w-[1180px] mx-auto px-8 pt-24 pb-32 text-center">
        <div className="hp-fade-in">
          <Pill tone="warm" className="mb-6">
            <Sparkles size={11} /> Demo en vivo · 100% editable
          </Pill>

          <Headline
            as="h1"
            highlight="presencia"
            className="font-display text-[clamp(40px,6vw,72px)] leading-[1.02] tracking-tight max-w-[920px] mx-auto"
          >
            Toda tu presencia online en un solo lugar.
          </Headline>

          <p className="mt-7 text-[17px] text-ink-soft max-w-[600px] mx-auto leading-relaxed">
            Sitio web, redes sociales, Google Business, Booking y email.
            Generados con tu marca, listos en minutos. Para hoteles
            independientes que no tienen tiempo de hacerlo todo.
          </p>

          <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
            <Button size="lg" onClick={start} className="px-7">
              Comenzar gratis <ArrowRight size={16} />
            </Button>
            <Button variant="secondary" size="lg" onClick={start} className="px-6">
              Ver demo de 2 minutos
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-6 text-[12px] text-ink-soft">
            <span className="flex items-center gap-1.5">
              <Check size={12} className="text-green" /> Sin tarjeta de crédito
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={12} className="text-green" /> 14 días gratis
            </span>
            <span className="flex items-center gap-1.5">
              <Check size={12} className="text-green" /> Cancelás cuando quieras
            </span>
          </div>
        </div>

        {/* product screenshot */}
        <div className="mt-20 max-w-[1080px] mx-auto hp-fade-in">
          <ProductScreenshot />
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-border bg-[rgba(255,255,255,0.55)]">
        <div className="max-w-[1180px] mx-auto px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          <Stat value="128" label="Hoteles activos en LATAM" />
          <Stat value="6 min" label="De onboarding al primer post" />
          <Stat value="+28%" label="Más reservas directas" />
          <Stat value="4.8 / 5" label="Rating de hoteleros" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="cómo-funciona"
        className="max-w-[1180px] mx-auto px-8 py-28"
      >
        <div className="text-center mb-14">
          <Pill tone="warm" className="mb-4">
            ✦ Cómo funciona
          </Pill>
          <Headline
            as="h2"
            highlight="tres"
            className="font-display text-[44px] leading-tight tracking-tight max-w-[700px] mx-auto"
          >
            De cero a tu marca completa en tres pasos.
          </Headline>
          <p className="mt-4 text-[15px] text-ink-soft max-w-[540px] mx-auto leading-relaxed">
            Nada de templates genéricos. Lo que generamos sale de tu hotel —
            de tus fotos, tu historia y tu propuesta.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <StepCard
            n={1}
            icon={Eye}
            title="Contanos tu hotel."
            body="Tres minutos de formulario: nombre, ubicación, fotos, tipos de habitación. Eso es todo."
          />
          <StepCard
            n={2}
            icon={Zap}
            title="Generamos tu Brand DNA."
            body="Identificamos paleta, tipografía, tono de voz y propuesta de valor. Editás lo que no se sienta tuyo."
          />
          <StepCard
            n={3}
            icon={Compass}
            title="Activás cada canal."
            body="Sitio, redes, Google, Booking, email. Todo creado en menos de un minuto y con tu identidad coherente."
          />
        </div>
      </section>

      {/* CANALES */}
      <section
        id="canales"
        className="relative py-28"
        style={{
          background:
            'linear-gradient(180deg, transparent, rgba(255,255,255,0.5), transparent)',
        }}
      >
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
            <div>
              <Pill tone="warm" className="mb-4">
                ✦ Seis canales · un solo hub
              </Pill>
              <Headline
                as="h2"
                highlight="canales"
                className="font-display text-[44px] leading-tight tracking-tight max-w-[600px]"
              >
                Todos tus canales bajo la misma marca.
              </Headline>
            </div>
            <p className="text-[14px] text-ink-soft max-w-[400px] leading-relaxed">
              No necesitás contratar a un diseñador, ni a un community
              manager, ni a una agencia. Nosotros generamos. Vos publicás.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            <ChannelCard
              icon={Globe}
              title="Sitio web"
              body="Una página única, optimizada para conversión, con tus habitaciones y experiencias."
              items={['Dominio propio', 'SEO 94/100', 'Mobile + Web Vitals']}
            />
            <ChannelCard
              icon={Camera}
              title="Redes sociales"
              body="12 posts para Instagram, 8 para Facebook, 3 para TikTok. Feed, stories, reels y ads."
              items={['Editor visual', 'Calendario editorial', 'Variantes por formato']}
            />
            <ChannelCard
              icon={MapPin}
              title="Google Business"
              body="Tu ficha de Google completa, con respuestas a reseñas generadas en tu tono."
              items={['Fotos asignadas', 'Atributos', 'Responder con IA']}
            />
            <ChannelCard
              icon={BedDouble}
              title="OTAs / Booking"
              body="Descripción optimizada para cada plataforma: Booking, Expedia, Airbnb, TripAdvisor."
              items={['Copy por OTA', 'Score de completitud', 'Políticas']}
            />
            <ChannelCard
              icon={Mail}
              title="Email Marketing"
              body="Cuatro campañas pre-armadas: bienvenida, oferta, post-estadía, newsletter mensual."
              items={['Plantillas HTML', 'Asuntos generados', 'Exportar a tu lista']}
            />
            <ChannelCard
              icon={LayoutDashboard}
              title="Resumen ejecutivo"
              body="Score de presencia, próximos pasos sugeridos y métricas en tiempo real."
              items={['Estado por canal', 'Recomendaciones IA', 'Performance']}
            />
          </div>
        </div>
      </section>

      {/* TESTIMONIO */}
      <section id="testimonios" className="max-w-[1180px] mx-auto px-8 py-28">
        <div className="hp-card p-12 md:p-16 max-w-[900px] mx-auto text-center">
          <div className="flex items-center justify-center gap-1 text-amber mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill="currentColor" strokeWidth={1.5} />
            ))}
          </div>
          <p
            className="font-display text-[28px] md:text-[34px] leading-[1.25] tracking-tight max-w-[760px] mx-auto"
            style={{ color: '#1A1A1A' }}
          >
            "Nuestra ficha de Booking tenía fotos de 2017 y una descripción
            que no decía nada. En menos de una semana ya teníamos sitio,
            redes y Google Business al día.{' '}
            <span className="hp-underline">Las reservas directas crecieron 28% el primer mes.</span>"
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <img
              src={hotelImages.facade}
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-left">
              <div className="text-[13px] font-medium text-ink">
                Camila Mendoza
              </div>
              <div className="text-[12px] text-ink-soft">
                Hotel Azul Marino · Cartagena de Indias
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section id="precios" className="max-w-[1180px] mx-auto px-8 pb-28">
        <div
          className="rounded-2xl p-12 md:p-16 relative overflow-hidden text-center"
          style={{
            background:
              'linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 100%)',
            color: '#fff',
          }}
        >
          <div
            className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-30"
            style={{
              background:
                'radial-gradient(circle, #D4845A 0%, transparent 70%)',
            }}
          />
          <div
            className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-20"
            style={{
              background:
                'radial-gradient(circle, #D4A853 0%, transparent 70%)',
            }}
          />
          <div className="relative">
            <Pill
              tone="warm"
              className="mb-5"
            >
              <Sparkles size={11} /> Demo en vivo
            </Pill>
            <h2
              className="font-display text-[44px] md:text-[56px] leading-[1.05] tracking-tight max-w-[760px] mx-auto"
              style={{ color: '#fff' }}
            >
              Probá Hotel Presence con tu hotel{' '}
              <span
                className="underline decoration-warm decoration-[3px] underline-offset-[6px]"
                style={{ textDecorationColor: '#D4845A' }}
              >
                ahora mismo
              </span>
              .
            </h2>
            <p className="mt-6 text-[15px] text-white/70 max-w-[520px] mx-auto leading-relaxed">
              No necesitás contratar nada. Cargás los datos, miramos juntos
              cómo se ve, y si te gusta lo activás.
            </p>
            <div className="mt-9 flex items-center justify-center gap-3 flex-wrap">
              <Button
                size="lg"
                onClick={start}
                variant="warm"
                className="px-7"
              >
                Comenzar gratis <ArrowRight size={16} />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={start}
                className="text-white hover:bg-white/10 px-6"
              >
                Hablar con ventas
              </Button>
            </div>
            <div className="mt-5 text-[12px] text-white/50">
              Plan Pro · USD 89/mes · 14 días gratis · sin tarjeta de crédito
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60 bg-[rgba(255,255,255,0.55)]">
        <div className="max-w-[1180px] mx-auto px-8 py-10 grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8">
          <div>
            <Logo />
            <p className="mt-3 text-[12px] text-ink-soft max-w-[260px] leading-relaxed">
              El hub de presencia online para hoteles independientes en
              Latinoamérica.
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-3">
              Producto
            </div>
            <ul className="space-y-2 text-[12px] text-ink-soft">
              <li>Canales</li>
              <li>Brand DNA</li>
              <li>Precios</li>
              <li>Demo</li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-3">
              Empresa
            </div>
            <ul className="space-y-2 text-[12px] text-ink-soft">
              <li>Sobre nosotros</li>
              <li>Blog</li>
              <li>Casos de éxito</li>
              <li>Carreras</li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-3">
              Soporte
            </div>
            <ul className="space-y-2 text-[12px] text-ink-soft">
              <li>Centro de ayuda</li>
              <li>Contacto</li>
              <li>Estado del sistema</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/60">
          <div className="max-w-[1180px] mx-auto px-8 py-5 flex items-center justify-between text-[11px] text-ink-soft flex-wrap gap-2">
            <span>© 2026 Hotel Presence · Cartagena · Buenos Aires</span>
            <span className="flex items-center gap-5">
              <span>Términos</span>
              <span>Privacidad</span>
              <span>Cookies</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

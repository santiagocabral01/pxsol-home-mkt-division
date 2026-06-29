import { useEffect, useState } from 'react'
import {
  Grid3x3,
  Film,
  Heart,
  Play,
  MessageCircle,
  Share2,
  ThumbsUp,
  MoreHorizontal,
  ChevronLeft,
  Search,
  Bookmark,
  Music2,
  Send,
  Wifi,
  BadgeCheck,
  Lock,
  Menu,
  Plus,
  Globe,
  ChevronDown,
  Link2,
} from 'lucide-react'

const IOS_FONT =
  '-apple-system, system-ui, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
import { socialPosts, hotelImages } from '../data/hotel'

/* ---------------------------------------------------------------- *
 *  Mock profile + engagement data per network. Hardcoded for the
 *  demo hotel (Azul Marino, Cartagena).
 * ---------------------------------------------------------------- */
const profiles = {
  Instagram: {
    handle: 'hotelazulmarino',
    name: 'Hotel Azul Marino',
    category: 'Hotel boutique',
    avatar: hotelImages.facade,
    bio: [
      'Boutique frente al mar 🌊',
      'Cartagena de Indias · 18 habitaciones',
      'Reservá directo ↓',
    ],
    link: 'hotelazulmarino.presence.io',
    stats: [
      { k: 'publicaciones', v: '248' },
      { k: 'seguidores', v: '14,2 mil' },
      { k: 'seguidos', v: '312' },
    ],
  },
  Facebook: {
    handle: 'Hotel Azul Marino',
    name: 'Hotel Azul Marino',
    category: 'Hotel · Cartagena de Indias',
    avatar: hotelImages.facade,
    cover: hotelImages.hero,
    stats: [
      { k: 'Me gusta', v: '9.840' },
      { k: 'Seguidores', v: '10.512' },
    ],
  },
  TikTok: {
    handle: 'hotelazulmarino',
    name: 'Hotel Azul Marino',
    avatar: hotelImages.facade,
    bio: 'Tu próxima escapada al Caribe 🌊\nCartagena de Indias',
    stats: [
      { k: 'Siguiendo', v: '48' },
      { k: 'Seguidores', v: '32,4 mil' },
      { k: 'Me gusta', v: '418,9 mil' },
    ],
  },
}

const VIEWS = [
  '12,4 mil',
  '8.940',
  '23,6 mil',
  '5.210',
  '41,2 mil',
  '3.180',
  '18,7 mil',
  '9.450',
  '30,1 mil',
  '6.620',
]
const viewsAt = (i) => VIEWS[i % VIEWS.length]

const viewsByNetwork = {
  Instagram: [
    { id: 'feed', icon: Grid3x3 },
    { id: 'reels', icon: Film },
  ],
  Facebook: [
    { id: 'feed', icon: AlignList },
    { id: 'fotos', icon: Grid3x3 },
  ],
  TikTok: [
    { id: 'videos', icon: Grid3x3 },
    { id: 'liked', icon: Heart },
  ],
}

// tiny inline icon for FB "publicaciones" tab (list)
function AlignList(props) {
  return (
    <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="14" y2="17" />
    </svg>
  )
}

/* ---------------------------------------------------------------- *
 *  Phone shell — status bar, notch, home indicator.
 * ---------------------------------------------------------------- */
function SignalBars({ color }) {
  return (
    <div className="flex items-end gap-[2px]">
      {[5, 7, 9, 11].map((h, i) => (
        <span
          key={i}
          className="w-[3px] rounded-[1px]"
          style={{ height: `${h}px`, background: color }}
        />
      ))}
    </div>
  )
}

function Battery({ color, outline }) {
  return (
    <div className="flex items-center">
      <div
        className="relative flex items-center px-[1.5px]"
        style={{
          width: 23,
          height: 12,
          borderRadius: 3.5,
          border: `1px solid ${outline}`,
        }}
      >
        <div
          className="rounded-[1.5px]"
          style={{ width: '74%', height: 7, background: color }}
        />
      </div>
      <span
        style={{
          width: 2,
          height: 4,
          marginLeft: 1,
          borderRadius: '0 2px 2px 0',
          background: outline,
        }}
      />
    </div>
  )
}

/* Realistic iOS status bar — its height reserves the safe area so the
   dynamic island never overlaps app content. */
function StatusBar({ dark = false }) {
  const color = dark ? '#ffffff' : '#0a0a0a'
  const outline = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)'
  return (
    <div className="relative flex-shrink-0 h-[46px] flex items-center justify-between pl-7 pr-5">
      <span
        className="text-[15px] font-semibold tracking-[-0.02em]"
        style={{ color, fontVariantNumeric: 'tabular-nums' }}
      >
        9:41
      </span>
      <div className="flex items-center gap-[6px]" style={{ color }}>
        <SignalBars color={color} />
        <Wifi size={16} strokeWidth={2.6} />
        <Battery color={color} outline={outline} />
      </div>
    </div>
  )
}

function Phone({ statusDark, children }) {
  return (
    <div className="relative w-[300px] mx-auto">
      <div
        className="rounded-[2.6rem] bg-ink p-[5px]"
        style={{ boxShadow: '0 34px 70px rgba(0,0,0,0.32)' }}
      >
        <div
          className="relative rounded-[2.3rem] overflow-hidden bg-white h-[600px] flex flex-col ring-1 ring-black/10"
          style={{
            fontFamily: IOS_FONT,
            letterSpacing: '-0.01em',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          <StatusBar dark={statusDark} />
          {/* content area — in-app overlays are scoped here, below the status bar */}
          <div className="relative flex-1 min-h-0 flex flex-col">{children}</div>
          {/* dynamic island — device chrome, floats within the status bar area */}
          <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[94px] h-[27px] bg-black rounded-full z-50 flex items-center justify-end pr-2.5">
            <span
              className="w-[8px] h-[8px] rounded-full"
              style={{
                background: '#16181b',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)',
              }}
            />
          </div>
          {/* home indicator */}
          <div
            className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[112px] h-[4px] rounded-full z-50"
            style={{ background: 'rgba(0,0,0,0.3)' }}
          />
        </div>
      </div>
    </div>
  )
}

function ViewTabs({ views, active, onChange, color = '#1a1a1a' }) {
  return (
    <div className="flex border-t border-border">
      {views.map((v) => {
        const Icon = v.icon
        const on = v.id === active
        return (
          <button
            key={v.id}
            onClick={() => onChange(v.id)}
            className="flex-1 py-2 flex items-center justify-center relative transition-colors"
            style={{ color: on ? color : '#b0b0b0' }}
          >
            <Icon size={18} />
            {on && (
              <span
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ background: color }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

/* Overlapping reaction badges, like Facebook's like/love stack. */
function ReactionStack() {
  return (
    <span className="flex items-center">
      <span
        className="w-[15px] h-[15px] rounded-full flex items-center justify-center ring-[1.5px] ring-white"
        style={{ background: '#1877F2' }}
      >
        <ThumbsUp size={8} className="text-white" fill="white" />
      </span>
      <span
        className="w-[15px] h-[15px] rounded-full flex items-center justify-center ring-[1.5px] ring-white -ml-1"
        style={{ background: '#F33E58' }}
      >
        <Heart size={8} className="text-white" fill="white" />
      </span>
    </span>
  )
}

function GridItem({ src, i, onClick, ratio = 'aspect-square', views }) {
  return (
    <button
      onClick={onClick}
      className={`relative ${ratio} overflow-hidden bg-pill`}
      style={{ animation: `hp-bubble-in 0.32s ease-out ${i * 0.03}s both` }}
    >
      <img src={src} alt="" className="w-full h-full object-cover" />
      {views && (
        <span className="absolute bottom-1 left-1 flex items-center gap-0.5 text-white text-[9px] font-semibold drop-shadow">
          <Play size={9} fill="currentColor" /> {views}
        </span>
      )}
    </button>
  )
}

/* ---------------------------------------------------------------- *
 *  Post detail overlay (tap a tile to open it inside the phone).
 * ---------------------------------------------------------------- */
function PostDetail({ network, post, profile, onBack }) {
  if (network === 'TikTok') {
    return (
      <div className="absolute inset-0 z-40 bg-black flex flex-col hp-fade-in">
        <img src={post.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        <button
          onClick={onBack}
          className="relative z-10 m-3 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="relative z-10 mt-auto flex items-end justify-between p-3.5 text-white">
          <div className="max-w-[78%]">
            <div className="text-[13px] font-semibold">@{profile.handle}</div>
            <div className="text-[12px] leading-snug mt-1">{post.overlay}</div>
            <div className="text-[11px] opacity-80 mt-1">{post.sub}</div>
            <div className="flex items-center gap-1.5 mt-2 text-[11px]">
              <Music2 size={12} /> Sonido original — Azul Marino
            </div>
          </div>
          <div className="flex flex-col items-center gap-3.5">
            <div className="flex flex-col items-center text-[10px]">
              <Heart size={24} fill="white" /> 41,2 mil
            </div>
            <div className="flex flex-col items-center text-[10px]">
              <MessageCircle size={23} fill="white" /> 312
            </div>
            <div className="flex flex-col items-center text-[10px]">
              <Share2 size={23} /> 1.204
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Instagram / Facebook single-post view
  return (
    <div className="absolute inset-0 z-40 bg-white flex flex-col hp-fade-in">
      <div className="flex items-center gap-3 px-3 py-2.5 border-b border-border">
        <button onClick={onBack} className="text-ink">
          <ChevronLeft size={20} />
        </button>
        <span className="text-[13px] font-semibold">Publicación</span>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto" style={{ overscrollBehavior: 'contain' }}>
        <div className="flex items-center gap-2 px-3 py-2">
          <img src={profile.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
          <span className="text-[12px] font-semibold">{profile.handle}</span>
          <MoreHorizontal size={16} className="ml-auto text-ink-soft" />
        </div>
        <div className="relative">
          <img src={post.image} alt="" className="w-full object-cover" />
        </div>
        <div className="flex items-center gap-4 px-3 py-2.5 text-ink">
          <Heart size={20} />
          <MessageCircle size={20} />
          <Send size={19} />
          <Bookmark size={19} className="ml-auto" />
        </div>
        <div className="px-3 text-[12px] font-semibold">1.842 Me gusta</div>
        <div className="px-3 mt-1 text-[12px] leading-snug">
          <span className="font-semibold">{profile.handle}</span> {post.overlay}{' '}
          <span className="text-ink-soft">{post.sub}</span>
        </div>
        <div className="px-3 mt-2 mb-4 text-[11px] text-ink-mute">Hace 2 horas</div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- *
 *  Per-network screens
 * ---------------------------------------------------------------- */
const IG_HIGHLIGHTS = [
  { label: 'Suites', img: hotelImages.room2 },
  { label: 'Playa', img: hotelImages.beach },
  { label: 'Spa', img: hotelImages.spa },
  { label: 'Resto', img: hotelImages.restaurant },
  { label: 'Tour', img: hotelImages.facade },
]

function InstagramScreen({ posts, view, setView, onOpen }) {
  const p = profiles.Instagram
  const reels = posts.filter((x) => /Reel|Story/.test(x.type))
  const grid = view === 'reels' ? (reels.length ? reels : posts) : posts
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2">
        <span className="font-semibold text-[16px] flex items-center gap-1.5 tracking-[-0.02em]">
          <Lock size={12} strokeWidth={2.5} className="text-ink/80" />
          {p.handle}
          <ChevronDown size={15} className="text-ink/70" strokeWidth={2.5} />
        </span>
        <div className="flex items-center gap-4 text-ink/90">
          <Plus size={21} strokeWidth={2} />
          <Menu size={21} strokeWidth={2} />
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto" style={{ overscrollBehavior: 'contain' }}>
        <div className="px-4 pt-1">
          <div className="flex items-center gap-6">
            {/* Gradiente de Instagram Stories — intencional, NO es la marca PXSOL */}
            <div className="p-[2.5px] rounded-full bg-gradient-to-tr from-amber via-[#d4845a] to-[#C13584]">
              <img
                src={p.avatar}
                alt=""
                className="w-[72px] h-[72px] rounded-full object-cover ring-[2.5px] ring-white"
              />
            </div>
            <div className="flex-1 flex justify-around text-center">
              {p.stats.map((s) => (
                <div key={s.k}>
                  <div className="text-[16px] font-semibold leading-none tracking-[-0.02em]">
                    {s.v}
                  </div>
                  <div className="text-[11px] text-ink-soft mt-1">{s.k}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[12.5px] font-semibold">
            {p.name}
            <BadgeCheck size={13} className="text-cool" fill="#5B8FBF" stroke="white" />
          </div>
          <div className="text-[11.5px] text-ink-soft mt-0.5">{p.category}</div>
          <div className="text-[12px] leading-[1.45] mt-1 text-ink/90">
            {p.bio.map((b) => (
              <div key={b}>{b}</div>
            ))}
          </div>
          <a className="inline-flex items-center gap-1 text-[12px] text-[#385898] font-medium mt-0.5">
            <Link2 size={12} strokeWidth={2.5} /> {p.link}
          </a>
          <div className="flex gap-1.5 mt-3">
            <button className="flex-1 h-[34px] rounded-[10px] bg-[#0095F6] text-white text-[12.5px] font-semibold active:opacity-80 transition">
              Seguir
            </button>
            <button className="flex-1 h-[34px] rounded-[10px] bg-[#EFEFEF] text-ink text-[12.5px] font-semibold active:opacity-80 transition">
              Mensaje
            </button>
            <button className="w-[34px] h-[34px] rounded-[10px] bg-[#EFEFEF] flex items-center justify-center">
              <ChevronDown size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* story highlights */}
          <div className="flex gap-4 mt-4 overflow-x-auto pb-1">
            {IG_HIGHLIGHTS.map((h) => (
              <div key={h.label} className="flex flex-col items-center gap-1 flex-shrink-0">
                <div className="w-[54px] h-[54px] rounded-full p-[2px] ring-[1.5px] ring-black/10">
                  <img src={h.img} alt="" className="w-full h-full rounded-full object-cover" />
                </div>
                <span className="text-[10px] text-ink/80">{h.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3">
          <ViewTabs views={viewsByNetwork.Instagram} active={view} onChange={setView} />
          <div key={view} className="grid grid-cols-3 gap-[1.5px] hp-fade-in">
            {grid.map((post, i) => (
              <GridItem
                key={i}
                src={post.image}
                i={i}
                ratio={view === 'reels' ? 'aspect-[9/16]' : 'aspect-square'}
                views={view === 'reels' ? viewsAt(i) : undefined}
                onClick={() => onOpen(post)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function FacebookScreen({ posts, view, setView, onOpen }) {
  const p = profiles.Facebook
  return (
    <>
      <div className="flex items-center justify-between px-3.5 py-1.5">
        <span className="text-[19px] font-bold tracking-[-0.04em]" style={{ color: '#1877F2' }}>
          facebook
        </span>
        <div className="flex items-center gap-2.5 text-ink-soft">
          <span className="w-7 h-7 rounded-full bg-pill flex items-center justify-center">
            <Search size={15} />
          </span>
          <span className="w-7 h-7 rounded-full bg-pill flex items-center justify-center">
            <MessageCircle size={15} />
          </span>
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto bg-[#f0f2f5]" style={{ overscrollBehavior: 'contain' }}>
        <div className="bg-white">
          <div className="h-[92px] overflow-hidden">
            <img src={p.cover} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="px-3.5 pb-3 -mt-7">
            <img src={p.avatar} alt="" className="w-[70px] h-[70px] rounded-full object-cover ring-4 ring-white" />
            <div className="mt-1.5 flex items-center gap-1 text-[17px] font-bold leading-tight tracking-[-0.02em]">
              {p.name}
              <BadgeCheck size={15} className="text-cool" fill="#5B8FBF" stroke="white" />
            </div>
            <div className="text-[11px] text-ink-soft mt-0.5">{p.category}</div>
            <div className="flex gap-3 mt-1 text-[11px] text-ink-soft">
              {p.stats.map((s) => (
                <span key={s.k}>
                  <span className="font-semibold text-ink">{s.v}</span> {s.k}
                </span>
              ))}
            </div>
            <div className="flex gap-1.5 mt-2.5">
              <button className="flex-1 h-8 rounded-md text-white text-[12px] font-semibold flex items-center justify-center gap-1.5" style={{ background: '#1877F2' }}>
                <ThumbsUp size={13} /> Me gusta
              </button>
              <button className="flex-1 h-8 rounded-md bg-pill text-ink text-[12px] font-semibold flex items-center justify-center gap-1.5">
                <MessageCircle size={13} /> Mensaje
              </button>
            </div>
          </div>
          <ViewTabs views={viewsByNetwork.Facebook} active={view} onChange={setView} color="#1877F2" />
        </div>

        {view === 'fotos' ? (
          <div className="grid grid-cols-3 gap-[3px] p-[3px] bg-white" key="fotos">
            {posts.map((post, i) => (
              <GridItem key={i} src={post.image} i={i} onClick={() => onOpen(post)} />
            ))}
          </div>
        ) : (
          <div key="feed">
            {posts.map((post, i) => (
              <div key={i} className="bg-white mt-2" style={{ animation: `hp-bubble-in 0.32s ease-out ${i * 0.05}s both` }}>
                <div className="flex items-center gap-2.5 px-3.5 pt-3">
                  <img src={p.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                  <div className="leading-tight">
                    <div className="text-[12.5px] font-semibold">{p.name}</div>
                    <div className="flex items-center gap-1 text-[10px] text-ink-soft mt-0.5">
                      3 h · <Globe size={10} />
                    </div>
                  </div>
                  <MoreHorizontal size={17} className="ml-auto text-ink-soft" />
                </div>
                <div className="px-3.5 py-2 text-[12px] leading-[1.4] text-ink/90">{post.overlay}</div>
                <button onClick={() => onOpen(post)} className="block w-full">
                  <img src={post.image} alt="" className="w-full aspect-[1.91/1] object-cover" />
                </button>
                <div className="flex items-center justify-between px-3.5 py-2 text-[11px] text-ink-soft">
                  <span className="flex items-center gap-1.5">
                    <ReactionStack /> 1,2 mil
                  </span>
                  <span>84 comentarios · 12 compartidos</span>
                </div>
                <div className="flex border-t border-black/[0.07] mx-3.5 text-[12px] text-ink-soft font-medium">
                  <span className="flex-1 py-2 flex items-center justify-center gap-1.5"><ThumbsUp size={15} /> Me gusta</span>
                  <span className="flex-1 py-2 flex items-center justify-center gap-1.5"><MessageCircle size={15} /> Comentar</span>
                  <span className="flex-1 py-2 flex items-center justify-center gap-1.5"><Share2 size={15} /> Compartir</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

function TikTokScreen({ posts, view, setView, onOpen }) {
  const p = profiles.TikTok
  return (
    <>
      <div className="flex items-center justify-between px-3.5 py-1.5 text-ink">
        <span className="w-6" />
        <span className="font-semibold text-[14px]">{p.handle}</span>
        <MoreHorizontal size={18} />
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto" style={{ overscrollBehavior: 'contain' }}>
        <div className="flex flex-col items-center px-4 pt-1">
          <img src={p.avatar} alt="" className="w-[80px] h-[80px] rounded-full object-cover ring-1 ring-black/5" />
          <div className="mt-2 flex items-center gap-1 text-[14px] font-semibold tracking-[-0.01em]">
            @{p.handle}
            <BadgeCheck size={13} className="text-cool" fill="#5B8FBF" stroke="white" />
          </div>
          <div className="flex gap-7 mt-3.5">
            {p.stats.map((s) => (
              <div key={s.k} className="text-center">
                <div className="text-[16px] font-semibold leading-none tracking-[-0.02em]">{s.v}</div>
                <div className="text-[10.5px] text-ink-soft mt-1.5">{s.k}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-3.5 w-full">
            <button className="flex-1 h-9 rounded-[8px] text-white text-[13px] font-semibold active:opacity-80 transition" style={{ background: '#FE2C55' }}>
              Seguir
            </button>
            <button className="w-11 h-9 rounded-[8px] bg-[#F1F1F2] flex items-center justify-center active:opacity-80 transition">
              <ChevronDown size={16} strokeWidth={2.5} />
            </button>
            <button className="w-11 h-9 rounded-[8px] bg-[#F1F1F2] flex items-center justify-center active:opacity-80 transition">
              <Send size={15} />
            </button>
          </div>
          <div className="text-[12px] text-center mt-3.5 leading-[1.45] whitespace-pre-line text-ink/90">
            {p.bio}
          </div>
        </div>
        <div className="mt-3">
          <ViewTabs views={viewsByNetwork.TikTok} active={view} onChange={setView} color="#1a1a1a" />
          <div key={view} className="grid grid-cols-3 gap-[2px] hp-fade-in">
            {posts.map((post, i) => (
              <GridItem
                key={i}
                src={post.image}
                i={i}
                ratio="aspect-[9/16]"
                views={viewsAt(i)}
                onClick={() => onOpen(post)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* ---------------------------------------------------------------- *
 *  Public component
 * ---------------------------------------------------------------- */
export default function SocialPhonePreview({ network }) {
  const defaultView = viewsByNetwork[network][0].id
  const [view, setView] = useState(defaultView)
  const [selected, setSelected] = useState(null)

  // Reset the in-phone view + detail when switching networks.
  useEffect(() => {
    setView(viewsByNetwork[network][0].id)
    setSelected(null)
  }, [network])

  const posts = socialPosts[network] || []
  const profile = profiles[network]

  const screen =
    network === 'Instagram' ? (
      <InstagramScreen posts={posts} view={view} setView={setView} onOpen={setSelected} />
    ) : network === 'Facebook' ? (
      <FacebookScreen posts={posts} view={view} setView={setView} onOpen={setSelected} />
    ) : (
      <TikTokScreen posts={posts} view={view} setView={setView} onOpen={setSelected} />
    )

  return (
    <Phone>
      {screen}
      {selected && (
        <PostDetail
          network={network}
          post={selected}
          profile={profile}
          onBack={() => setSelected(null)}
        />
      )}
    </Phone>
  )
}

import { useEffect, useRef, useState } from 'react'
import { Sparkles } from 'lucide-react'

/* ---------------------------------------------------------------- *
 *  ChatFlow — a scripted, auto-playing conversation.
 *
 *  Feed it a `script` of steps; on mount it plays them out one by one
 *  with a typing indicator, a per-character typewriter, and (optionally)
 *  a rich `attachment` rendered under the message. Calls `onComplete`
 *  once the whole script has been delivered.
 *
 *  Each step:
 *    { role: 'bot' | 'user',
 *      text?: string,          // typed out char by char
 *      attachment?: ReactNode, // revealed after the text finishes
 *      think?: number,         // ms the typing indicator shows
 *      pause?: number }        // ms to wait after the bubble completes
 * ---------------------------------------------------------------- */

const BOT_NAME = 'Marina'

function Avatar({ role }) {
  if (role === 'user') {
    return (
      <span className="w-7 h-7 rounded-full bg-pill text-ink-soft flex items-center justify-center text-[11px] font-medium flex-shrink-0">
        Tú
      </span>
    )
  }
  return (
    <span
      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: 'linear-gradient(135deg, #e84a2c 0%, #d03d21 100%)' }}
    >
      <Sparkles size={13} className="text-white" strokeWidth={2.4} />
    </span>
  )
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 px-1 text-ink-soft">
      <span className="hp-dot" />
      <span className="hp-dot" style={{ animationDelay: '0.15s' }} />
      <span className="hp-dot" style={{ animationDelay: '0.3s' }} />
    </span>
  )
}

function Bubble({ role, children, caret, attachment }) {
  const isUser = role === 'user'
  return (
    <div className={`flex items-end gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}>
      <Avatar role={role} />
      <div
        className={`hp-bubble-in max-w-[78%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed ${
          isUser
            ? 'bg-ink text-white rounded-br-md'
            : 'bg-card border border-border text-ink rounded-bl-md shadow-card'
        }`}
      >
        {children}
        {caret && <span className="hp-caret" />}
        {attachment && <div className="mt-3">{attachment}</div>}
      </div>
    </div>
  )
}

const updateLast = (list, patch) =>
  list.map((m, i) => (i === list.length - 1 ? { ...m, ...patch } : m))

export default function ChatFlow({ script, onComplete, className = '' }) {
  const [messages, setMessages] = useState([])
  const [typingRole, setTypingRole] = useState(null)
  const scrollRef = useRef(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // Keep the latest message in view by scrolling ONLY this container —
  // never scrollIntoView(), which would hijack the whole page's scroll.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typingRole])

  // Drive the whole conversation from a single cancellable async loop.
  useEffect(() => {
    let cancelled = false
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

    async function run() {
      for (const step of script) {
        if (cancelled) return
        const isBot = step.role === 'bot'

        setTypingRole(step.role)
        await sleep(step.think ?? (isBot ? 700 : 480))
        if (cancelled) return
        setTypingRole(null)

        setMessages((m) => [
          ...m,
          { role: step.role, text: '', attachment: null, caret: true },
        ])

        const full = step.text || ''
        const speed = isBot ? 16 : 24
        for (let c = 1; c <= full.length; c++) {
          if (cancelled) return
          setMessages((m) => updateLast(m, { text: full.slice(0, c) }))
          await sleep(speed)
        }

        // Drop the caret and reveal any attachment now that the text is done.
        setMessages((m) =>
          updateLast(m, { caret: false, attachment: step.attachment ?? null }),
        )
        if (step.attachment) await sleep(220)
        await sleep(step.pause ?? 520)
      }
      if (!cancelled) onCompleteRef.current?.()
    }

    run()
    return () => {
      cancelled = true
    }
    // The script is defined once per screen mount; play it a single time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={scrollRef}
      className={`overflow-y-auto ${className}`}
      style={{ overscrollBehavior: 'contain' }}
    >
      <div className="space-y-4">
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role} caret={m.caret} attachment={m.attachment}>
            {m.text}
          </Bubble>
        ))}

        {typingRole && (
          <div
            className={`flex items-end gap-2.5 ${
              typingRole === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <Avatar role={typingRole} />
            <div
              className={`rounded-2xl px-3 py-3 ${
                typingRole === 'user'
                  ? 'bg-ink/90 rounded-br-md'
                  : 'bg-card border border-border rounded-bl-md shadow-card'
              }`}
            >
              <TypingDots />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { BOT_NAME }

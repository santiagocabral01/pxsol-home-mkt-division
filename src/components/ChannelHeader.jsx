import Headline from './ui/Headline'

export default function ChannelHeader({
  eyebrow,
  title,
  highlight,
  subtitle,
  right,
}) {
  return (
    <div className="flex items-end justify-between gap-6 mb-8">
      <div>
        {eyebrow && (
          <div className="text-[11px] uppercase tracking-[0.12em] text-ink-mute font-medium mb-2">
            {eyebrow}
          </div>
        )}
        <Headline
          as="h1"
          highlight={highlight}
          className="text-[32px] leading-[1.1] tracking-tight mb-2"
        >
          {title}
        </Headline>
        {subtitle && (
          <p className="text-ink-soft text-[14px] max-w-[560px]">{subtitle}</p>
        )}
      </div>
      {right && <div className="flex-shrink-0">{right}</div>}
    </div>
  )
}

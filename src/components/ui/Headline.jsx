// Renderiza un h1/h2 con una palabra subrayada en el accent cálido (NoteWise-style).
// Uso: <Headline as="h1" highlight="publicar">Tus assets, listos para publicar.</Headline>
export default function Headline({
  as: Tag = 'h1',
  highlight,
  children,
  className = '',
}) {
  if (!highlight || typeof children !== 'string') {
    return <Tag className={className}>{children}</Tag>
  }
  const idx = children.toLowerCase().indexOf(highlight.toLowerCase())
  if (idx === -1) return <Tag className={className}>{children}</Tag>
  const before = children.slice(0, idx)
  const mid = children.slice(idx, idx + highlight.length)
  const after = children.slice(idx + highlight.length)
  return (
    <Tag className={className}>
      {before}
      <span className="hp-underline">{mid}</span>
      {after}
    </Tag>
  )
}

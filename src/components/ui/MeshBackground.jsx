// Mesh gradient ambient ya vive en body (index.css). Este componente expone
// un wrapper para casos donde queremos el fondo aplicado a un contenedor local.
export default function MeshBackground({ children, className = '' }) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 15% 20%, #FDE8D0 0%, transparent 50%),
          radial-gradient(ellipse at 85% 10%, #D6E8F7 0%, transparent 45%),
          radial-gradient(ellipse at 50% 80%, #E8F0E8 0%, transparent 50%)
        `,
        backgroundColor: '#FAFAF8',
      }}
    >
      {children}
    </div>
  )
}

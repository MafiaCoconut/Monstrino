export function SeoHeader({ title, description }: { title: string; description?: string }) {
  return (
    <section style={{ padding: '2.5rem 1.5rem 1rem' }}>
      <h1 style={{ margin: 0, fontSize: '2.25rem', fontWeight: 800 }}>{title}</h1>
      {description && (
        <p style={{ marginTop: '0.75rem', maxWidth: 720, color: 'rgba(255,255,255,0.72)' }}>
          {description}
        </p>
      )}
    </section>
  );
}

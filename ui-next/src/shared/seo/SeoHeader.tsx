const seoHiddenStyle = {
  position: 'absolute' as const,
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap' as const,
  border: 0,
};

export function SeoHeader({ title, description }: { title: string; description?: string }) {
  return (
    <section style={seoHiddenStyle}>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </section>
  );
}

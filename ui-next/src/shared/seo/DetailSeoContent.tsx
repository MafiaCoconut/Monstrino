export type DetailSeoLink = {
  href: string;
  label: string;
};

type DetailSeoContentProps = {
  body?: string | null;
  links?: DetailSeoLink[];
};

export function DetailSeoContent({ body, links }: DetailSeoContentProps) {
  const trimmedBody = body?.trim();
  const hasLinks = Boolean(links && links.length > 0);

  if (!trimmedBody && !hasLinks) {
    return null;
  }

  return (
    <section style={{ padding: '0 1.5rem 2rem' }}>
      {trimmedBody && (
        <p
          style={{
            margin: 0,
            maxWidth: 760,
            color: 'rgba(255,255,255,0.78)',
            fontSize: '1rem',
            lineHeight: 1.6,
          }}
        >
          {trimmedBody}
        </p>
      )}
      {hasLinks && (
        <nav
          aria-label="Related links"
          style={{ marginTop: trimmedBody ? '0.9rem' : 0 }}
        >
          <span
            style={{
              display: 'block',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '0.4rem',
            }}
          >
            Related
          </span>
          <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
            {links!.map((link) => (
              <li key={link.href} style={{ marginBottom: '0.35rem' }}>
                <a
                  href={link.href}
                  style={{
                    color: '#8B5CF6',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </section>
  );
}

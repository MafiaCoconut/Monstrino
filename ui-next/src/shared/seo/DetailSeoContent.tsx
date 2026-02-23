export type DetailSeoLink = {
  href: string;
  label: string;
};

type DetailSeoContentProps = {
  body?: string | null;
  links?: DetailSeoLink[];
};

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

export function DetailSeoContent({ body, links }: DetailSeoContentProps) {
  const trimmedBody = body?.trim();
  const hasLinks = Boolean(links && links.length > 0);

  if (!trimmedBody && !hasLinks) {
    return null;
  }

  return (
    <section style={seoHiddenStyle}>
      {trimmedBody && <p>{trimmedBody}</p>}
      {hasLinks && (
        <nav aria-label="Related links">
          <span>Related</span>
          <ul>
            {links!.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </section>
  );
}

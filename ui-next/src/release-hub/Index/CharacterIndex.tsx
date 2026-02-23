'use client';

import { useMemo, useEffect, useRef, useState, type ReactNode } from 'react';
import { useParams } from '@/shared/router';
import {
  Box,
  Typography,
  Chip,
  Collapse,
  IconButton,
  Divider,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { ReleaseBreadcrumb } from '@/widgets/navigation/breadcrumb';
import { PetCardSimple } from '@cards/pet-card';
import { ReleaseCardMinimal } from '@cards/release-card';
import { CharacterCard } from '@cards/character-card';
import { SurfaceCard, SectionTitle } from '@/shared/ui/release-hub';
import { characterIndexMockById } from '@/data/real-data/CharacterIndexMock';
import type { CharacterId, CharacterSummary, HexColor } from '../entities';
import type { CharacterIndexData } from '../entities/character-index';

const borderColor = 'rgba(255,255,255,0.08)';
const softSurface = 'rgba(255,255,255,0.03)';
const characterAccentPalette: HexColor[] = ['#ec4899', '#8b5cf6', '#22d3ee', '#f59e0b', '#22c55e', '#f97316'];

const sectionTitleSx = { fontSize: { xs: '1.1rem', md: '1.2rem' } };

const relationshipCardLayout = {
  cardSx: { width: '100%', maxWidth: { xs: 180, sm: 220 }, margin: '0 auto' },
  mediaSx: { height: 160 },
  contentSx: { pb: 2 },
};

const petCardLayout = {
  cardSx: { width: '100%', maxWidth: { xs: 180, sm: 220 }, margin: '0 auto' },
  mediaSx: { height: 150 },
  contentSx: { pb: 1.5 },
};

const relationshipGridSx = {
  display: 'grid',
  gridTemplateColumns: { xs: 'repeat(auto-fit, minmax(150px, 1fr))', sm: 'repeat(auto-fit, minmax(200px, 220px))' },
  justifyContent: 'start',
  gap: { xs: 1, md: 1.5 },
  width: '100%',
  overflow: 'visible',
  paddingTop: '0.25rem',
  paddingBottom: '0.75rem',
};

const releaseGridSx = {
  display: 'grid',
  gridTemplateColumns: { xs: 'repeat(auto-fit, minmax(150px, 1fr))', sm: 'repeat(auto-fit, minmax(200px, 220px))' },
  justifyContent: 'start',
  gap: { xs: 1, md: 1.5 },
  width: '100%',
  overflow: 'visible',
  paddingTop: '0.25rem',
  paddingBottom: '0.75rem',
};

const releaseCardLayout = {
  containerSx: { display: 'flex', height: '100%', minWidth: 0 },
  cardSx: { maxWidth: { xs: 180, sm: 220 }, minWidth: { xs: 0, sm: 160 } },
  imageSx: { paddingTop: '140%' },
  contentSx: { p: { xs: '0.6rem', md: '0.75rem' } },
};

const heroCardLayout = {
  cardSx: { p: { xs: 2, md: 3 } },
  imageWrapSx: {
    width: '100%',
    aspectRatio: '3 / 4',
    borderRadius: 2,
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
};

const factRowSx = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: { xs: 'flex-start', sm: 'center' },
  justifyContent: 'space-between',
  gap: { xs: 0.5, sm: 2 },
  py: 1.5,
};

const factLabelSx = { color: 'text.secondary', fontSize: '0.9rem' };

const factValueSx = {
  fontWeight: 600,
  textAlign: { xs: 'left', sm: 'right' },
  maxWidth: { xs: '100%', sm: 480 },
  width: { xs: '100%', sm: 'auto' },
};

const ReleasesCount = ({ count }: { count: number }) => (
  <Typography
    component="span"
    sx={{
      fontSize: { xs: '0.75rem', md: '0.8rem' },
      color: 'text.secondary',
      fontWeight: 500,
      letterSpacing: 0.2,
    }}
  >
    {count} total
  </Typography>
);

type SegmentBaseProps = {
  title: string;
  count: number;
  countLabel: string;
  defaultExpanded?: boolean;
  children: ReactNode;
};

const SegmentBase = ({
  title,
  count,
  countLabel,
  defaultExpanded = count > 0,
  children,
}: SegmentBaseProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexWrap: 'wrap',
          gap: { xs: 0.75, sm: 1 },
          mb: expanded ? { xs: 1, md: 1.5 } : 0,
          cursor: 'pointer',
          pb: { xs: 1.5, md: 2 },
          '&:hover': {
            backgroundColor: `${borderColor}40`,
          },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography sx={{ fontSize: { xs: 18, md: 20 }, fontWeight: 600, color: 'text.primary' }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: { xs: 13, md: 14 }, color: 'text.secondary' }}>
            {count} {countLabel}
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          {expanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </Box>
      <Collapse in={expanded}>
        {count === 0 ? (
          <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
            No records yet.
          </Typography>
        ) : (
          children
        )}
      </Collapse>
    </Box>
  );
};

type RelationshipItem = CharacterIndexData['relationships']['family'][number];
const RelationshipSection = ({ title, items }: { title: string; items: RelationshipItem[] }) => {
  const cards: CharacterSummary[] = items.map((item, index) => {
    const related = characterIndexMockById(item.name);
    const accentColor = characterAccentPalette[index % characterAccentPalette.length] ?? '#ec4899';
    return {
      id: (related.id ?? item.name) as CharacterId,
      name: related.name ?? item.name,
      species: related.species ?? item.role ?? 'Unknown',
      releaseCount: related.releaseCount ?? 0,
      imageUrl: related.heroImage,
      accentColor,
    };
  });

  return (
    <SegmentBase
      title={title}
      count={items.length}
      countLabel={`item${items.length !== 1 ? 's' : ''}`}
    >
      <Box sx={[relationshipGridSx, { mt: { xs: 2, md: 3 } }]}>
        {cards.map((card) => (
          <CharacterCard
            key={`${title}-${card.id}`}
            {...card}
            cardSx={relationshipCardLayout.cardSx}
            mediaSx={relationshipCardLayout.mediaSx}
            contentSx={relationshipCardLayout.contentSx}
          />
        ))}
      </Box>
    </SegmentBase>
  );
};

type PetRelationshipItem = CharacterIndexData['relationships']['pets'][number];
const PetsSection = ({ items }: { items: PetRelationshipItem[] }) => (
  <SegmentBase
    title="Pets"
    count={items.length}
    countLabel={`pet${items.length !== 1 ? 's' : ''}`}
  >
    <Box sx={relationshipGridSx}>
      {items.map((pet) => (
        <PetCardSimple
          key={pet.name}
          name={pet.name}
          species={pet.species}
          imageUrl={pet.image}
          to={pet.link}
          cardSx={petCardLayout.cardSx}
          mediaSx={petCardLayout.mediaSx}
          contentSx={petCardLayout.contentSx}
        />
      ))}
    </Box>
  </SegmentBase>
);

const CharacterIndex = () => {
  const { internal_id, id } = useParams();
  const resolveParam = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value);
  const resolvedId = resolveParam(internal_id) ?? resolveParam(id) ?? '';
  const data = useMemo(() => characterIndexMockById(resolvedId), [resolvedId]);
  const [hoveredReleaseId, setHoveredReleaseId] = useState<string | number | null>(null);
  const [hideBreadcrumb, setHideBreadcrumb] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY <= 64) {
        setHideBreadcrumb(false);
      } else if (currentY > lastScrollY.current) {
        setHideBreadcrumb(true);
      } else {
        setHideBreadcrumb(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const facts = [
    { label: 'Species', value: data.species || 'Unknown' },
    { label: 'Age', value: data.age || 'Unknown' },
    { label: 'Birthday', value: data.birthday || 'Unknown' },
    { label: 'Debut Year', value: data.debutYear ? `${data.debutYear}` : 'Unknown' },
    { label: 'Release Count', value: data.releaseCount ? `${data.releaseCount}` : '0' },
    {
      label: 'Signature Colors',
      value: data.signatureColors?.length ? data.signatureColors.join(', ') : 'Unknown',
    },
    { label: 'Motifs', value: data.motifs?.length ? data.motifs.join(', ') : 'Unknown' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#0B0D11',
        backgroundImage:
          'radial-gradient(900px 600px at 15% 0%, rgba(64, 160, 255, 0.16), transparent 60%), radial-gradient(900px 700px at 90% 10%, rgba(255, 120, 200, 0.12), transparent 65%), linear-gradient(180deg, #0B0D11 0%, #121622 100%)',
        color: 'text.primary',
        pb: 6,
      }}
    >
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 4 }, py: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            // position: 'sticky',
            top: { xs: 46, sm: 56 },
            zIndex: 20,
            transform: hideBreadcrumb ? 'translateY(-120%)' : 'translateY(0)',
            opacity: hideBreadcrumb ? 0 : 1,
            transition: 'transform 0.2s ease, opacity 0.2s ease',
            pointerEvents: hideBreadcrumb ? 'none' : 'auto',
          }}
        >
          <ReleaseBreadcrumb
            items={[
              { label: 'Characters', link: '/catalog/c' },
              { label: data.name },
            ]}
            colors={{
              textPrimary: '#fff',
              textSecondary: '#9CA3AF',
              textMuted: '#6B7280',
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
            gap: { xs: 3, md: 4 },
            alignItems: 'start',
          }}
        >
          <Box sx={{ order: { xs: 2, sm: 2, md: 1, lg: 1 } }}>
            <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: '2rem', md: '2.8rem' } }}>
              {data.name}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mt: 1, fontSize: '1rem' }}>{data.tagline}</Typography>
            {data.alternativeNames?.length ? (
              <Typography sx={{ color: 'text.secondary', mt: 1, fontSize: '0.85rem' }}>
                Also known as {data.alternativeNames.join(' · ')}
              </Typography>
            ) : null}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              <Chip
                label={data.species}
                sx={{
                  backgroundColor: softSurface,
                  color: 'text.secondary',
                  border: `1px solid ${borderColor}`,
                }}
              />
              <Chip
                label={`Debut ${data.debutYear}`}
                sx={{
                  backgroundColor: softSurface,
                  color: 'text.secondary',
                  border: `1px solid ${borderColor}`,
                }}
              />
              <Chip
                label={`${data.releaseCount} releases`}
                sx={{
                  backgroundColor: 'rgba(236, 72, 153, 0.2)',
                  color: '#ec4899',
                  border: `1px solid ${borderColor}`,
                  fontWeight: 600,
                }}
              />
              {(data.generations ?? []).map((gen) => (
                <Chip
                  key={gen}
                  label={gen}
                  sx={{
                    backgroundColor: 'rgba(139, 92, 246, 0.2)',
                    color: 'primary.main',
                    border: `1px solid ${borderColor}`,
                    fontWeight: 600,
                  }}
                />
              ))}
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 2,
                mt: 3,
              }}
            >
              <SurfaceCard>
                <Typography sx={{ fontWeight: 700, mb: 1 }}>About</Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {data.officialDescription}
                </Typography>
              </SurfaceCard>
              <Box>
                <SectionTitle title="Facts & Details" titleSx={sectionTitleSx} />
                <SurfaceCard>
                  {facts.map((fact, index) => (
                    <Box
                      key={fact.label}
                      sx={[factRowSx, { borderBottom: index < facts.length - 1 ? `1px solid ${borderColor}` : 'none' }]}
                    >
                      <Typography sx={factLabelSx}>{fact.label}</Typography>
                      <Typography
                        sx={factValueSx}
                      >
                        {fact.value}
                      </Typography>
                    </Box>
                  ))}
                </SurfaceCard>
              </Box>
            </Box>
          </Box>

          <Box sx={{ order: { xs: 1, sm: 1, md: 2, lg: 2 } }}>
            <SurfaceCard sx={heroCardLayout.cardSx}>
              <Box
                sx={heroCardLayout.imageWrapSx}
              >
                <Box
                  component="img"
                  src={data.heroImage}
                  alt={data.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </SurfaceCard>
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
            <Typography sx={{ fontWeight: 700, ...sectionTitleSx }}>Releases</Typography>
            <ReleasesCount count={data.releases.length} />
          </Box>
          <Box
            sx={releaseGridSx}
          >
            {data.releases.map((release) => (
                <ReleaseCardMinimal
                  key={release.id}
                  doll={{
                    id: release.id,
                    releaseId: release.id,
                    character: data.name,
                    variant: release.name,
                    imageUrl: release.image,
                    rarity: release.edition === 'special' ? 'Rare' : 'Common',
                    year: release.year,
                  }}
                  isHovered={hoveredReleaseId === release.id}
                  onMouseEnter={() => setHoveredReleaseId(release.id)}
                  onMouseLeave={() => setHoveredReleaseId(null)}
                  size="reduced"
                  enableHoverLift
                  containerSx={releaseCardLayout.containerSx}
                  cardSx={releaseCardLayout.cardSx}
                  imageSx={releaseCardLayout.imageSx}
                  contentSx={releaseCardLayout.contentSx}
                />
            ))}
          </Box>
        </Box>

        <Divider sx={{ mt: 4, borderColor }} />

        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography sx={{ fontWeight: 800, fontSize: { xs: '1.35rem', md: '1.5rem' } }}>
              Relationships
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gap: { xs: 3, md: 4 } }}>
            <RelationshipSection title="Family" items={data.relationships.family} />
            <RelationshipSection title="Friends" items={data.relationships.friends} />
            <RelationshipSection title="Romantic" items={data.relationships.romantic} />
            <PetsSection items={data.relationships.pets} />
          </Box>
        </Box>

        {/* <Divider sx={{ mt: 4, borderColor }} /> */}

        {/* <Box sx={{ mt: 4 }}>
          <SectionTitle title="Timeline" titleSx={sectionTitleSx} />
          <SurfaceCard>
            {data.timeline.map((item, index) => (
              <Box
                key={`${item.year}-${item.event}`}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '80px 1fr' },
                  gap: 2,
                  py: 1.5,
                  borderBottom: index < data.timeline.length - 1 ? `1px solid ${borderColor}` : 'none',
                }}
              >
                <Typography sx={{ color: 'primary.main', fontWeight: 700 }}>{item.year}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{item.event}</Typography>
              </Box>
            ))}
          </SurfaceCard>
        </Box> */}

        {/* <Divider sx={{ mt: 4, borderColor }} /> */}

        {/* <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' }, gap: 2 }}>
          <Box>
            <SectionTitle title="Trivia" titleSx={sectionTitleSx} />
            <Box sx={{ display: 'grid', gap: 2 }}>
              {data.trivia.map((item, index) => (
                <Box
                  key={`${item.category}-${index}`}
                  sx={{
                    borderRadius: 2,
                    border: `1px solid ${borderColor}`,
                    backgroundColor: softSurface,
                    p: 2,
                    display: 'grid',
                    gap: 1,
                  }}
                >
                  <Chip
                    label={item.category}
                    size="small"
                    sx={{
                      width: 'fit-content',
                      backgroundColor: 'rgba(139, 92, 246, 0.2)',
                      color: 'primary.main',
                      fontWeight: 600,
                    }}
                  />
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box>
            <SectionTitle title="Community" titleSx={sectionTitleSx} />
            <Box sx={{ display: 'grid', gap: 2 }}>
              {data.communityContent.map((item, index) => (
                <Box
                  key={`${item.title}-${index}`}
                  component="a"
                  href={item.link}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    borderRadius: 2,
                    border: `1px solid ${borderColor}`,
                    backgroundColor: softSurface,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>
                      {item.type}
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
                  </Box>
                  <Chip
                    label={`${item.count}`}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(236, 72, 153, 0.18)',
                      color: '#ec4899',
                      fontWeight: 700,
                    }}
                  />
                </Box>
              ))}
            </Box>
            {collectorNotes.length ? (
              <Box sx={{ mt: 3 }}>
                <Typography sx={{ fontWeight: 700, mb: 1 }}>Collector notes</Typography>
                <SurfaceCard>
                  <Box sx={{ display: 'grid', gap: 1.5 }}>
                    {collectorNotes.map((note, index) => (
                      <Box key={`${note.text}-${index}`} sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                        <Avatar sx={{ width: 28, height: 28, fontSize: '0.8rem', backgroundColor: softSurface }}>
                          {note.icon}
                        </Avatar>
                        <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>{note.text}</Typography>
                      </Box>
                    ))}
                  </Box>
                </SurfaceCard>
              </Box>
            ) : null}
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};

export default CharacterIndex;

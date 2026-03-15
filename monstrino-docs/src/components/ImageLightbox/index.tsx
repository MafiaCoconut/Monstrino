import React, { type ReactNode, useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './ImageLightbox.module.css';

interface ImageLightboxProps {
  /** Image source URL */
  src: string;
  /** Optional image source for screens narrower than mobileSrcBreakpoint */
  mobileSrc?: string;
  /** Breakpoint in px below which mobileSrc is used (default: 900) */
  mobileSrcBreakpoint?: number;
  /** Alt text */
  alt?: string;
  /** Optional className for the trigger image */
  className?: string;
  /** Optional inline style for the trigger image */
  style?: React.CSSProperties;
  /** Disable lightbox on mobile (uses mobileSrcBreakpoint, default 900px) */
  disableLightboxOnMobile?: boolean;
}

const MIN_SCALE = 0.1;
const MAX_SCALE = 10;
const SCALE_STEP = 0.25;

const CLOSE_BTN_HEIGHT = 125; // navbar (~60px) + offset (12px) + btn (44px) + gap (8px)
const CONTROLS_HEIGHT = 72;

/**
 * Reusable image lightbox component.
 *
 * Usage in TSX:
 *   <ImageLightbox src="/img/diagram.png" alt="Diagram" />
 *
 * Usage in MDX:
 *   import ImageLightbox from '@site/src/components/ImageLightbox';
 *   <ImageLightbox src="/img/diagram.png" alt="Diagram" />
 */
export default function ImageLightbox({
  src,
  mobileSrc,
  mobileSrcBreakpoint = 900,
  alt = '',
  className,
  style,
  disableLightboxOnMobile = false,
}: ImageLightboxProps): ReactNode {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!mobileSrc && !disableLightboxOnMobile) return;
    const mq = window.matchMedia(`(max-width: ${mobileSrcBreakpoint - 1}px)`);
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [mobileSrc, mobileSrcBreakpoint, disableLightboxOnMobile]);

  const activeSrc = mobileSrc && isMobile ? mobileSrc : src;
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [fitScale, setFitScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const lightboxImgRef = useRef<HTMLImageElement>(null);

  // ---------- fit-to-screen calculation ----------
  const calculateFitScale = useCallback(() => {
    const img = lightboxImgRef.current;
    if (!img || !img.naturalWidth || !img.naturalHeight) return;
    const availW = window.innerWidth * 0.96;
    const availH = window.innerHeight - CLOSE_BTN_HEIGHT - CONTROLS_HEIGHT - 16;
    const scaleW = availW / img.naturalWidth;
    const scaleH = availH / img.naturalHeight;
    const fit = Math.min(scaleW, scaleH, 1);
    setFitScale(fit);
    setScale(fit);
    setTranslate({ x: 0, y: 0 });
  }, []);

  // ---------- open / close ----------
  const openLightbox = useCallback(() => {
    if (disableLightboxOnMobile && isMobile) return;
    setTranslate({ x: 0, y: 0 });
    setScale(1);
    setOpen(true);
  }, [disableLightboxOnMobile, isMobile]);

  const closeLightbox = useCallback(() => setOpen(false), []);

  // When lightbox opens, compute fit scale (handles cached images)
  useEffect(() => {
    if (!open) return;
    const img = lightboxImgRef.current;
    if (img?.complete && img.naturalWidth) {
      calculateFitScale();
    }
  }, [open, calculateFitScale]);

  // Recalculate on resize
  useEffect(() => {
    if (!open) return;
    window.addEventListener('resize', calculateFitScale);
    return () => window.removeEventListener('resize', calculateFitScale);
  }, [open, calculateFitScale]);

  // ---------- zoom ----------
  const zoomIn = useCallback(
    () => setScale((s) => Math.min(s + SCALE_STEP, MAX_SCALE)),
    [],
  );
  const zoomOut = useCallback(
    () => setScale((s) => Math.max(s - SCALE_STEP, MIN_SCALE)),
    [],
  );
  const resetZoom = useCallback(() => {
    setScale(fitScale);
    setTranslate({ x: 0, y: 0 });
  }, [fitScale]);

  // ---------- keyboard ----------
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-') zoomOut();
      if (e.key === '0') resetZoom();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, closeLightbox, zoomIn, zoomOut, resetZoom]);

  // ---------- mouse wheel zoom ----------
  useEffect(() => {
    if (!open) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      setScale((s) => {
        const delta = e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
        return Math.min(Math.max(s + delta, MIN_SCALE), MAX_SCALE);
      });
    };
    window.addEventListener('wheel', handler, { passive: false });
    return () => window.removeEventListener('wheel', handler);
  }, [open]);

  // ---------- drag / pan ----------
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    lastPos.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setTranslate((t) => ({ x: t.x + dx, y: t.y + dy }));
  }, []);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  // ---------- prevent body scroll + hide footer ----------
  useEffect(() => {
    const footer = document.querySelector('footer') as HTMLElement | null;
    if (open) {
      document.body.style.overflow = 'hidden';
      if (footer) footer.style.visibility = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (footer) footer.style.visibility = '';
    }
    return () => {
      document.body.style.overflow = '';
      if (footer) footer.style.visibility = '';
    };
  }, [open]);

  return (
    <>
      {/* Trigger image */}
      {(() => {
        const lightboxDisabled = disableLightboxOnMobile && isMobile;
        if (lightboxDisabled) {
          return (
            <img
              src={activeSrc}
              alt={alt}
              className={className ?? ''}
              style={style}
            />
          );
        }

        return (
          <div
            className={styles.trigger}
            onClick={openLightbox}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox()}
            title="Click to zoom"
          >
            <img
              src={activeSrc}
              alt={alt}
              className={className ?? ''}
              style={style}
            />
            <span className={styles.expandHint}>⤢</span>
          </div>
        );
      })()}

      {/* Lightbox overlay */}
      {open && typeof document !== 'undefined' && createPortal(
        <div className={styles.overlay} onClick={closeLightbox}>
          {/* Close */}
          <button
            className={styles.closeBtn}
            onClick={closeLightbox}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Keyboard shortcuts hint */}
          <div className={styles.shortcutsHint} onClick={(e) => e.stopPropagation()}>
            <span><kbd>scroll</kbd> zoom</span>
            <span><kbd>drag</kbd> pan</span>
            <span><kbd>+</kbd><kbd>−</kbd> zoom</span>
            <span><kbd>0</kbd> fit</span>
            <span><kbd>Esc</kbd> close</span>
          </div>

          {/* Image */}
          <div
            className={styles.imageWrapper}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <img
              ref={lightboxImgRef}
              src={activeSrc}
              alt={alt}
              className={styles.lightboxImage}
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
              }}
              draggable={false}
              onLoad={calculateFitScale}
            />
          </div>

          {/* Controls */}
          <div className={styles.controls} onClick={(e) => e.stopPropagation()}>
            <button className={styles.controlBtn} onClick={zoomOut} title="Zoom out (-)">
              −
            </button>
            <span className={styles.zoomLabel}>{Math.round(scale * 100)}%</span>
            <button className={styles.controlBtn} onClick={zoomIn} title="Zoom in (+)">
              +
            </button>
            <button className={styles.controlBtn} onClick={resetZoom} title="Fit to screen (0)">
              ⊡
            </button>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

import React, { type ReactNode, useState, useCallback, useEffect, useRef } from 'react';
import styles from './ImageLightbox.module.css';

interface ImageLightboxProps {
  /** Image source URL */
  src: string;
  /** Alt text */
  alt?: string;
  /** Optional className for the trigger image */
  className?: string;
  /** Optional inline style for the trigger image */
  style?: React.CSSProperties;
}

const MIN_SCALE = 0.25;
const MAX_SCALE = 5;
const SCALE_STEP = 0.25;

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
  alt = '',
  className,
  style,
}: ImageLightboxProps): ReactNode {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // ---------- open / close ----------
  const openLightbox = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    setOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setOpen(false), []);

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
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

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
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
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

  // ---------- prevent body scroll ----------
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Trigger image */}
      <img
        src={src}
        alt={alt}
        className={`${styles.trigger} ${className ?? ''}`}
        style={style}
        onClick={openLightbox}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && openLightbox()}
      />

      {/* Lightbox overlay */}
      {open && (
        <div className={styles.overlay} onClick={closeLightbox}>
          {/* Close */}
          <button
            className={styles.closeBtn}
            onClick={closeLightbox}
            aria-label="Close"
          >
            ✕
          </button>

          {/* Image */}
          <div
            className={styles.imageWrapper}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <img
              src={src}
              alt={alt}
              className={styles.lightboxImage}
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
              }}
              draggable={false}
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
            <button className={styles.controlBtn} onClick={resetZoom} title="Reset (0)">
              ⟲
            </button>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState, useCallback, useEffect, useRef } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import MermaidOriginal from '@theme-original/Mermaid';
import type { Props } from '@theme/Mermaid';
import styles from './Mermaid.module.css';

const MIN_SCALE = 0.1;
const MAX_SCALE = 10;
const SCALE_STEP = 0.25;

const CLOSE_BTN_HEIGHT = 125; // navbar (~60px) + offset (12px) + btn (44px) + gap (8px)
const CONTROLS_HEIGHT = 72;

function MermaidWithLightbox(props: Props): React.JSX.Element {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [fitScale, setFitScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const diagramInnerRef = useRef<HTMLDivElement>(null);

  // ---------- fit-to-screen calculation ----------
  const calculateFitScale = useCallback(() => {
    const inner = diagramInnerRef.current;
    if (!inner) return;
    const svg = inner.querySelector('svg');
    if (!svg) return;
    const svgWidth = svg.scrollWidth;
    const svgHeight = svg.scrollHeight;
    if (!svgWidth || !svgHeight) return;
    const availW = window.innerWidth * 0.96;
    const availH = window.innerHeight - CLOSE_BTN_HEIGHT - CONTROLS_HEIGHT - 16;
    const fit = Math.min(availW / svgWidth, availH / svgHeight);
    setFitScale(fit);
    setScale(fit);
    setTranslate({ x: 0, y: 0 });
  }, []);

  // ---------- open / close ----------
  const openLightbox = useCallback(() => {
    if (isMobile) return;
    setTranslate({ x: 0, y: 0 });
    setScale(1);
    setOpen(true);
  }, [isMobile]);

  const closeLightbox = useCallback(() => setOpen(false), []);

  // After overlay opens, wait for Mermaid to render SVG then fit
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(calculateFitScale, 80);
    return () => clearTimeout(timer);
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

  if (isMobile) {
    return <MermaidOriginal {...props} />;
  }

  return (
    <>
      {/* Inline diagram — click to open lightbox */}
      <div
        className={styles.trigger}
        onClick={openLightbox}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && openLightbox()}
        title="Click to zoom"
      >
        <MermaidOriginal {...props} />
        <span className={styles.expandHint}>⤢</span>
      </div>

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

          {/* Keyboard shortcuts hint */}
          <div className={styles.shortcutsHint} onClick={(e) => e.stopPropagation()}>
            <span><kbd>scroll</kbd> zoom</span>
            <span><kbd>drag</kbd> pan</span>
            <span><kbd>+</kbd><kbd>−</kbd> zoom</span>
            <span><kbd>0</kbd> fit</span>
            <span><kbd>Esc</kbd> close</span>
          </div>

          {/* Diagram pan area */}
          <div
            className={styles.diagramWrapper}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <div
              ref={diagramInnerRef}
              className={styles.diagramInner}
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
              }}
            >
              <MermaidOriginal {...props} />
            </div>
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
        </div>
      )}
    </>
  );
}

export default function Mermaid(props: Props): React.JSX.Element {
  return (
    <BrowserOnly fallback={<div />}>
      {() => <MermaidWithLightbox {...props} />}
    </BrowserOnly>
  );
}

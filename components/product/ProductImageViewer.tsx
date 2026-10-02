"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/Icon";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  /** Extra images for lightbox prev/next */
  gallery?: { src: string; alt: string }[];
  className?: string;
  imageClassName?: string;
  roundedClassName?: string;
};

export default function ProductImageViewer({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 55vw",
  gallery,
  className = "",
  imageClassName = "",
  roundedClassName = "rounded-3xl",
}: Props) {
  const frameRef = useRef<HTMLButtonElement>(null);
  const [zooming, setZooming] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [lightbox, setLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const slides = gallery && gallery.length > 0 ? gallery : [{ src, alt }];
  const activeSlide = slides[Math.min(lightboxIndex, slides.length - 1)] ?? { src, alt };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight" && slides.length > 1) {
        setLightboxIndex((i) => (i + 1) % slides.length);
      }
      if (e.key === "ArrowLeft" && slides.length > 1) {
        setLightboxIndex((i) => (i - 1 + slides.length) % slides.length);
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, slides.length]);

  const openLightbox = useCallback(() => {
    const idx = slides.findIndex((s) => s.src === src);
    setLightboxIndex(idx >= 0 ? idx : 0);
    setLightbox(true);
    setZooming(false);
  }, [slides, src]);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width < 1 || rect.height < 1) return;
    if (window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)").matches === false) {
      return;
    }
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`);
    setZooming(true);
  };

  const lightboxUi =
    lightbox && (
      <div
        role="dialog"
        aria-modal="true"
        aria-label={activeSlide.alt}
        className="fixed inset-0 z-[200] flex flex-col bg-charcoal"
      >
        {/* Close — always on top of everything */}
        <button
          type="button"
          onClick={() => setLightbox(false)}
          aria-label="Close fullscreen image"
          className="absolute right-3 top-3 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white text-charcoal shadow-lift md:right-6 md:top-6 md:h-14 md:w-14"
        >
          <Icon name="close" className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.4} />
        </button>

        {/* Main image + arrows */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 pt-16 md:px-24 md:pt-20">
          {slides.length > 1 && (
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => setLightboxIndex((i) => (i - 1 + slides.length) % slides.length)}
              className="absolute left-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-charcoal shadow-lift md:left-6 md:h-14 md:w-14"
            >
              <Icon name="arrow" className="h-6 w-6 rotate-180 md:h-7 md:w-7" strokeWidth={2.4} />
            </button>
          )}

          <div className="relative h-full w-full max-w-[min(98vw,1600px)]">
            <Image
              key={activeSlide.src}
              src={activeSlide.src}
              alt={activeSlide.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {slides.length > 1 && (
            <button
              type="button"
              aria-label="Next image"
              onClick={() => setLightboxIndex((i) => (i + 1) % slides.length)}
              className="absolute right-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white text-charcoal shadow-lift md:right-6 md:h-14 md:w-14"
            >
              <Icon name="arrow" className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.4} />
            </button>
          )}
        </div>

        {/* Colour / image thumbnails only */}
        {slides.length > 1 && (
          <div className="no-scrollbar flex shrink-0 justify-center gap-2.5 overflow-x-auto px-4 py-5 md:gap-3 md:py-6">
            {slides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={s.alt}
                aria-current={i === lightboxIndex ? "true" : undefined}
                className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl ring-2 transition md:h-20 md:w-20 ${
                  i === lightboxIndex ? "ring-white" : "ring-white/25 opacity-65 hover:opacity-100"
                }`}
              >
                <Image src={s.src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    );

  return (
    <>
      <button
        ref={frameRef}
        type="button"
        onClick={openLightbox}
        onMouseMove={onMove}
        onMouseLeave={() => setZooming(false)}
        aria-label={`View larger image: ${alt}`}
        className={`group relative block w-full cursor-zoom-in overflow-hidden bg-sand text-left ring-1 ring-charcoal/5 ${roundedClassName} ${className}`}
      >
        <span className="relative block aspect-[4/3] md:aspect-[5/4]">
          <Image
            key={src}
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={`animate-fade-in object-contain transition-transform duration-150 ease-out ${
              zooming ? "scale-[1.85]" : "scale-100"
            } ${imageClassName}`}
            style={{ transformOrigin: origin }}
          />
        </span>
        <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1.5 font-body text-[11px] font-medium text-charcoal opacity-100 shadow-soft backdrop-blur md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
          <Icon name="plus" className="h-3.5 w-3.5" />
          Expand
        </span>
      </button>

      {mounted && lightboxUi ? createPortal(lightboxUi, document.body) : null}
    </>
  );
}

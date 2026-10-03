"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { ProductColour, ProductImage } from "@/lib/types";
import SofaIllustration, { type IllustrationSpec } from "@/components/SofaIllustration";
import type { MediaPhoto } from "@/lib/productMedia";
import ProductImageViewer from "./ProductImageViewer";

type Props = {
  productName: string;
  images: ProductImage[];
  media?: MediaPhoto[];
  resetKey?: string;
  colour: ProductColour | null;
  fabric: string | null;
  spec: IllustrationSpec;
  sizeLabel: string | null;
};

export function swatchStyle(colour: { hex_code: string; swatch_url?: string | null }): React.CSSProperties {
  return colour.swatch_url
    ? { backgroundColor: colour.hex_code, backgroundImage: `url(${colour.swatch_url})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { backgroundColor: colour.hex_code };
}

export function fabricTexture(fabric: string | null, hex: string): React.CSSProperties {
  const base = { backgroundColor: hex };
  switch (fabric) {
    case "Plush Velvet":
      return {
        ...base,
        backgroundImage:
          "radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,0.28), transparent 55%), radial-gradient(90% 70% at 80% 90%, rgba(0,0,0,0.28), transparent 60%)",
      };
    case "Chenille":
      return {
        ...base,
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.09) 0 2px, transparent 2px 5px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.12) 0 2px, transparent 2px 5px)",
      };
    default:
      return {
        ...base,
        backgroundImage:
          "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.18), transparent 40%), radial-gradient(rgba(0,0,0,0.16) 1px, transparent 1.2px)",
        backgroundSize: "100% 100%, 6px 6px",
      };
  }
}

export default function ProductGallery({ productName, images, media, colour, fabric, spec, sizeLabel, resetKey }: Props) {
  const photos = useMemo<MediaPhoto[]>(() => {
    if (media && media.length > 0) return media;
    const matching = colour ? images.filter((img) => img.colour_id === colour.id || img.colour_id === null) : images;
    return (matching.length > 0 ? matching : images).map((img) => ({
      src: img.image_url,
      alt: img.alt_text ?? `${productName}${colour ? ` in ${colour.name}` : ""}`,
    }));
  }, [media, images, colour, productName]);

  const [active, setActive] = useState(0);
  useEffect(() => setActive(0), [colour?.id, resetKey]);

  const hex = colour?.hex_code ?? "#B0ADA8";

  if (photos.length > 0) {
    const current = photos[Math.min(active, photos.length - 1)];
    const colourMismatch = !!colour && !!current.colour && current.colour !== colour.name;
    const lightboxGallery = photos.map((p) => ({ src: p.src, alt: p.alt }));

    return (
      <div className="space-y-3">
        <div className="relative">
          <ProductImageViewer
            key={current.src}
            src={current.src}
            alt={current.alt}
            gallery={lightboxGallery}
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          {colourMismatch && colour && (
            <p className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-full bg-white/90 py-1.5 pl-2 pr-3 font-body text-xs text-charcoal shadow-soft backdrop-blur md:bottom-4 md:left-4">
              <span className="h-4 w-4 flex-shrink-0 rounded-full ring-1 ring-charcoal/15" style={swatchStyle(colour)} />
              <span>
                Shown in {current.colour}. <span className="font-semibold">Yours will be made in {colour.name}.</span>
              </span>
            </p>
          )}
        </div>
        <div className="no-scrollbar flex gap-2.5 overflow-x-auto p-1.5 md:gap-3">
          {photos.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setActive(i)}
              className={`relative aspect-[4/3] w-20 flex-shrink-0 overflow-hidden rounded-xl bg-sand ring-2 transition md:w-24 ${
                i === active ? "ring-charcoal" : "ring-transparent opacity-70 hover:opacity-100"
              }`}
              aria-label={img.alt}
            >
              <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Fallback colour preview when a product has no photos yet
  void fabric;
  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-b from-sand to-stone md:aspect-[5/4]">
        <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-b from-[#E4DBCD] to-[#DAD0BF]" />
        <div className="absolute inset-x-[7%] bottom-[16%] top-[22%] flex items-end">
          <SofaIllustration spec={spec} colour={hex} minCanvas={560} className="h-full w-full" title={`${productName} preview`} />
        </div>

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {sizeLabel && (
            <span className="rounded-full bg-white/90 px-3 py-1.5 font-body text-xs font-medium text-charcoal backdrop-blur">{sizeLabel}</span>
          )}
          <span className="flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 font-body text-xs font-medium text-charcoal backdrop-blur">
            <span className="h-3 w-3 rounded-full ring-1 ring-charcoal/15" style={{ backgroundColor: hex }} />
            {colour?.name ?? "Colour"}
          </span>
        </div>
        <p className="absolute bottom-4 right-4 rounded-full bg-charcoal/70 px-3 py-1 font-body text-[11px] text-linen backdrop-blur">
          Colour preview · photos coming soon
        </p>
      </div>
    </div>
  );
}

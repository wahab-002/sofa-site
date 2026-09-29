export type BackStyle = {
  id: string;
  name: string;
  description: string;
};

export type MediaPhoto = {
  src: string;
  alt: string;
  style?: string;
  sizes?: string[];
  colour?: string;
  detail?: boolean;
};

export type ProductMedia = {
  styles?: BackStyle[];
  cardImage: string;
  photos: MediaPhoto[];
};

const verona = (file: string) => `/products/verona/${file}.webp`;

export const productMedia: Record<string, ProductMedia> = {
  "verona-sofa": {
    styles: [
      {
        id: "scatter-back",
        name: "Scatter Back",
        description: "Loose scatter cushions for a relaxed, layered look",
      },
      {
        id: "high-back",
        name: "High Back",
        description: "Tall fixed back cushions for extra head and neck support",
      },
    ],
    cardImage: verona("scatter-3seater-grey"),
    photos: [
      { src: verona("scatter-3seater-grey"), alt: "Verona Scatter Back 3 seater sofa in light grey", style: "scatter-back", sizes: ["3 Seater"], colour: "Light Grey" },
      { src: verona("scatter-32-grey"), alt: "Verona Scatter Back 3+2 sofa set in light grey", style: "scatter-back", sizes: ["3+2 Set", "3+2+1 Full Set"], colour: "Light Grey" },
      { src: verona("scatter-32-black"), alt: "Verona Scatter Back 3+2 sofa set in black", style: "scatter-back", sizes: ["3+2 Set", "3+2+1 Full Set"], colour: "Black" },
      { src: verona("scatter-32-beige"), alt: "Verona Scatter Back 3+2 sofa set in beige", style: "scatter-back", sizes: ["3+2 Set", "3+2+1 Full Set"], colour: "Beige" },
      { src: verona("scatter-corner-grey"), alt: "Verona Scatter Back corner sofa in light grey", style: "scatter-back", sizes: ["Corner"], colour: "Light Grey" },
      { src: verona("scatter-corner-black"), alt: "Verona Scatter Back corner sofa in black", style: "scatter-back", sizes: ["Corner"], colour: "Black" },
      { src: verona("scatter-2seater-grey"), alt: "Verona Scatter Back 2 seater sofa in light grey", style: "scatter-back", sizes: ["2 Seater"], colour: "Light Grey" },
      { src: verona("scatter-armchair-grey"), alt: "Verona Scatter Back armchair in light grey", style: "scatter-back", sizes: ["3+2+1 Full Set"], colour: "Light Grey" },

      { src: verona("high-32-black"), alt: "Verona High Back 3+2 sofa set in black", style: "high-back", sizes: ["3+2 Set", "3 Seater"], colour: "Black" },
      { src: verona("high-321-black"), alt: "Verona High Back 3+2+1 sofa set in black", style: "high-back", sizes: ["3+2+1 Full Set"], colour: "Black" },
      { src: verona("high-corner-grey"), alt: "Verona High Back corner sofa in light grey", style: "high-back", sizes: ["Corner"], colour: "Light Grey" },
      { src: verona("high-corner-black"), alt: "Verona High Back corner sofa in black", style: "high-back", sizes: ["Corner"], colour: "Black" },
      { src: verona("high-corner-beige"), alt: "Verona High Back corner sofa in beige", style: "high-back", sizes: ["Corner"], colour: "Beige" },
      { src: verona("high-2seater-grey"), alt: "Verona High Back 2 seater sofa in light grey", style: "high-back", sizes: ["2 Seater"], colour: "Light Grey" },
      { src: verona("high-armchair-grey"), alt: "Verona High Back armchair in light grey", style: "high-back", sizes: ["3+2+1 Full Set"], colour: "Light Grey" },

      { src: verona("detail-arm-grey"), alt: "Close-up of the Verona's button-tufted scroll arm", colour: "Light Grey", detail: true },
    ],
  },
};

export function getProductMedia(slug: string): ProductMedia | null {
  return productMedia[slug] ?? null;
}

/**
 * Orders photos for the current selection: exact size + colour first, then size,
 * then colour, then the rest. Photos for the other back style are dropped.
 */
export function rankPhotos(
  photos: MediaPhoto[],
  { style, size, colour }: { style?: string | null; size?: string | null; colour?: string | null },
) {
  const score = (p: MediaPhoto) => {
    if (p.detail) return 1;
    const sizeMatch = !!size && !!p.sizes?.includes(size);
    const primarySize = sizeMatch && p.sizes?.[0] === size;
    const colourMatch = !!colour && p.colour === colour;
    return (sizeMatch ? 20 : 0) + (primarySize ? 5 : 0) + (colourMatch ? 10 : 0) + 2;
  };
  return photos
    .filter((p) => !p.style || !style || p.style === style)
    .map((p, i) => ({ p, s: score(p), i }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map(({ p }) => p);
}

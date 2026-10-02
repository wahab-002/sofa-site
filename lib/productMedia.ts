import { ATALIAN_COLOURS, ATALIAN_CONFIGS, atalianPhoto } from "./atalian";

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

export type MediaColour = {
  name: string;
  hex: string;
  swatch?: string;
  closeUp?: string;
};

export type ProductMedia = {
  styles?: BackStyle[];
  /** Replaces the database colours when the real range differs from what's stored. */
  colours?: MediaColour[];
  cardImage: string;
  photos: MediaPhoto[];
};

const verona = (file: string) => `/products/verona/${file}.webp`;
const oakland = (file: string) => `/products/oakland/${file}.webp`;
const malibu = (file: string) => `/products/malibu/${file}.webp`;
const bishop = (file: string) => `/products/bishop/${file}.webp`;
const borrius = (file: string) => `/products/borrius/${file}.webp`;
const falcon = (file: string) => `/products/falcon/${file}.webp`;
const lily = (file: string) => `/products/lily/${file}.webp`;
const olympia = (file: string) => `/products/olympia/${file}.webp`;

function gallery(pathFn: (f: string) => string, files: string[], alt: (n: number) => string, colour?: string): MediaPhoto[] {
  return files.map((file, i) => ({
    src: pathFn(file),
    alt: alt(i + 1),
    colour,
  }));
}

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

  "oakland-sofa": {
    colours: [
      { name: "Tan", hex: "#9C5A32", swatch: oakland("swatch-tan"), closeUp: oakland("fabric-tan") },
      { name: "Black", hex: "#2B2927", swatch: oakland("swatch-black"), closeUp: oakland("fabric-black") },
    ],
    cardImage: oakland("room-corner-tan"),
    photos: [
      { src: oakland("room-corner-tan"), alt: "Oakland corner sofa in tan leather in a bright living room", sizes: ["Corner"], colour: "Tan" },
      { src: oakland("studio-32-tan"), alt: "Oakland 3+2 sofa set in tan leather", sizes: ["3+2 Set"], colour: "Tan" },
      { src: oakland("studio-3seater-tan"), alt: "Oakland 3 seater sofa in tan leather", sizes: ["3 Seater"], colour: "Tan" },
      { src: oakland("studio-2seater-tan"), alt: "Oakland 2 seater sofa in tan leather", sizes: ["2 Seater"], colour: "Tan" },
      { src: oakland("studio-321-tan"), alt: "Oakland 3+2+1 sofa set in tan leather", sizes: ["3+2+1 Full Set"], colour: "Tan" },
      { src: oakland("studio-corner-tan"), alt: "Oakland corner sofa in tan leather", sizes: ["Corner"], colour: "Tan" },
      { src: oakland("room-corner-tan-2"), alt: "Oakland corner sofa in tan leather by a fireplace", sizes: ["Corner"], colour: "Tan" },
      { src: oakland("studio-armchair-tan"), alt: "Oakland armchair in tan leather", sizes: ["3+2+1 Full Set"], colour: "Tan" },

      { src: oakland("room-2seater-black"), alt: "Oakland 2 seater sofa in black leather in a living room", sizes: ["2 Seater"], colour: "Black" },
      { src: oakland("studio-32-black"), alt: "Oakland 3+2 sofa set in black leather", sizes: ["3+2 Set"], colour: "Black" },
      { src: oakland("studio-3seater-black"), alt: "Oakland 3 seater sofa in black leather", sizes: ["3 Seater"], colour: "Black" },
      { src: oakland("studio-2seater-black"), alt: "Oakland 2 seater sofa in black leather", sizes: ["2 Seater"], colour: "Black" },
      { src: oakland("studio-321-black"), alt: "Oakland 3+2+1 sofa set in black leather", sizes: ["3+2+1 Full Set"], colour: "Black" },
      { src: oakland("studio-corner-black"), alt: "Oakland corner sofa in black leather", sizes: ["Corner"], colour: "Black" },
      { src: oakland("room-2seater-black-2"), alt: "Oakland 2 seater sofa in black leather, front view", sizes: ["2 Seater"], colour: "Black" },
      { src: oakland("studio-armchair-black"), alt: "Oakland armchair in black leather", sizes: ["3+2+1 Full Set"], colour: "Black" },

      { src: oakland("detail-studs-tan"), alt: "Close-up of the Oakland's studded scroll arm", colour: "Tan", detail: true },
      { src: oakland("detail-seat-tan"), alt: "Close-up of the Oakland's seat cushions and button-tufted front", colour: "Tan", detail: true },
      { src: oakland("detail-arm-tan"), alt: "Close-up of the Oakland armchair's arm and turned feet", colour: "Tan", detail: true },
    ],
  },

  "malibu-sofa": {
    cardImage: malibu("room-32-caramel"),
    photos: [
      { src: malibu("room-32-caramel"), alt: "Malibu 3+2 sofa set in dapple caramel in a living room", sizes: ["3+2 Set", "3 Seater", "3+2+1 Full Set"], colour: "Beige" },
      { src: malibu("showroom-2seater-caramel"), alt: "Malibu 2 seater sofa in dapple caramel with gold feet", sizes: ["2 Seater"], colour: "Beige" },
      { src: malibu("showroom-32-caramel"), alt: "Malibu 3 seater and 2 seater sofas in dapple caramel", sizes: ["3+2 Set", "3 Seater", "3+2+1 Full Set"], colour: "Beige" },
      { src: malibu("room-corner-caramel"), alt: "Malibu corner sofa and button-tufted footstool in dapple caramel", sizes: ["Corner"], colour: "Beige" },

      { src: malibu("showroom-2seater-silver"), alt: "Malibu 2 seater sofa in silver", sizes: ["2 Seater"], colour: "Light Grey" },
      { src: malibu("showroom-32-silver"), alt: "Malibu 3 seater and 2 seater sofas in silver", sizes: ["3+2 Set", "3 Seater", "3+2+1 Full Set"], colour: "Light Grey" },
      { src: malibu("showroom-corner-silver"), alt: "Malibu corner sofa in silver with matching footstool", sizes: ["Corner"], colour: "Light Grey" },
      { src: malibu("showroom-corner-silver-2"), alt: "Malibu corner sofa in silver, side view with footstool", sizes: ["Corner"], colour: "Light Grey" },

      { src: malibu("showroom-corner-grey"), alt: "Malibu corner sofa in grey", sizes: ["Corner"], colour: "Dark Grey" },
    ],
  },

  "atalian-sofa": {
    cardImage: atalianPhoto("corner", "cream"),
    photos: ATALIAN_CONFIGS.flatMap((cfg) =>
      ATALIAN_COLOURS.map((c) => ({
        src: atalianPhoto(cfg.id, c.file),
        alt: `Atalian Chesterfield ${cfg.label} in ${c.name}`,
        sizes: [cfg.variantLabel],
        colour: c.name,
      })),
    ),
  },

  "bishop-sofa": {
    cardImage: bishop("photo-01"),
    photos: gallery(
      bishop,
      ["photo-01", "photo-02", "photo-03", "photo-04", "photo-05", "photo-06"],
      (n) => `Bishop U-Shape sofa — photo ${n}`,
      "Olive",
    ).map((p, i) =>
      i === 0
        ? { ...p, sizes: ["U-Shape"], alt: "Bishop U-Shape sofa in emerald green corduroy" }
        : p,
    ),
  },

  "borrius-sofa": {
    cardImage: borrius("photo-01"),
    photos: gallery(
      borrius,
      ["photo-01", "photo-02", "photo-03", "photo-04", "photo-05"],
      (n) => `Borrius sofa — photo ${n}`,
      "Cream",
    ).map((p, i) =>
      i === 0
        ? { ...p, sizes: ["Corner"], alt: "Borrius low-profile corner sofa in soft cream" }
        : p,
    ),
  },

  "falcon-sofa": {
    cardImage: falcon("photo-01"),
    photos: gallery(
      falcon,
      ["photo-01", "photo-02", "photo-03", "photo-04", "photo-05", "photo-06"],
      (n) => `Falcon sofa — photo ${n}`,
      "Dark Grey",
    ).map((p, i) =>
      i === 0
        ? { ...p, sizes: ["3+2 Set", "3 Seater"], alt: "Falcon tufted sofa set in grey velvet with matching ottoman" }
        : p,
    ),
  },

  "lily-sofa": {
    cardImage: lily("photo-01"),
    photos: gallery(
      lily,
      ["photo-01", "photo-02", "photo-03", "photo-04", "photo-05"],
      (n) => `Lily sofa — photo ${n}`,
      "Dark Grey",
    ).map((p, i) =>
      i === 0
        ? { ...p, sizes: ["3+2 Set", "3 Seater"], alt: "Lily channel-tufted 3+2 sofa set in charcoal grey" }
        : p,
    ),
  },

  "olympia-sofa": {
    cardImage: olympia("photo-01"),
    photos: gallery(
      olympia,
      ["photo-01", "photo-02", "photo-03", "photo-04", "photo-05"],
      (n) => `Olympia Chesterfield — photo ${n}`,
      "Cream",
    ).map((p, i) =>
      i === 0
        ? {
            ...p,
            sizes: ["3+2+1 Full Set", "3+2 Set", "3 Seater"],
            alt: "Olympia Chesterfield 3+2+1 set in cream with jewel-tone cushions",
          }
        : p,
    ),
  },
};

export function getProductMedia(slug: string): ProductMedia | null {
  return productMedia[slug] ?? null;
}

export function mediaColours<T>(slug: string, fallback: T[], map: (c: MediaColour, i: number) => T): T[] {
  const colours = productMedia[slug]?.colours;
  return colours ? colours.map(map) : fallback;
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

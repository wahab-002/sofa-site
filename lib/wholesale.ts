/** Wholesale trade catalogue — unlisted /wholesale only. */

import { ATALIAN_COLOURS, atalianPhoto, type AtalianConfigId } from "./atalian";
import { DINO_COLOURS, dinoPhoto, type DinoConfigId } from "./dino";
import {
  VERONA_COLOURS,
  VERONA_STYLES,
  veronaPhoto,
  type VeronaConfigId,
  type VeronaStyleId,
} from "./verona";

export type WholesaleSizeId =
  | "armchair"
  | "2-seater"
  | "3-seater"
  | "3-2-set"
  | "corner"
  | "gold-legs";

export type WholesaleProductId = "dino" | "atalian" | "verona";

export type WholesaleSize = {
  id: WholesaleSizeId;
  label: string;
  priceGbp: number;
  /** Optional fixed photo (extras like gold legs). */
  photo?: string;
  /** When set, only show for these products. */
  onlyFor?: WholesaleProductId[];
};

/** Trade unit prices (GBP). No full-set. Gold legs = Atalian extra. */
export const WHOLESALE_SIZES: WholesaleSize[] = [
  { id: "armchair", label: "Armchair", priceGbp: 100 },
  { id: "2-seater", label: "2 Seater", priceGbp: 150 },
  { id: "3-seater", label: "3 Seater", priceGbp: 250 },
  { id: "3-2-set", label: "3+2 Set", priceGbp: 400 },
  { id: "corner", label: "Corner", priceGbp: 400 },
  {
    id: "gold-legs",
    label: "Gold Legs",
    priceGbp: 50,
    photo: "/products/atalian/extras/gold-legs.jpg",
    onlyFor: ["atalian"],
  },
];

export type WholesaleColour = { file: string; name: string; hex: string };

export type WholesaleProduct = {
  id: WholesaleProductId;
  /** Shown to trade buyers */
  name: string;
  slug: string;
  colours: WholesaleColour[];
  /** Verona only */
  styles?: { id: VeronaStyleId; label: string }[];
};

export const WHOLESALE_PRODUCTS: WholesaleProduct[] = [
  {
    id: "atalian",
    name: "Atalian Chesterfield",
    slug: "atalian-sofa",
    colours: ATALIAN_COLOURS.map((c) => ({ file: c.file, name: c.name, hex: c.hex })),
  },
  {
    id: "dino",
    name: "Dino Sofa",
    slug: "dino-sofa",
    colours: DINO_COLOURS.map((c) => ({ file: c.file, name: c.name, hex: c.hex })),
  },
  {
    id: "verona",
    name: "Verona Sofa",
    slug: "verona-sofa",
    colours: VERONA_COLOURS.map((c) => ({ file: c.file, name: c.name, hex: c.hex })),
    styles: VERONA_STYLES.map((s) => ({ id: s.id, label: s.label })),
  },
];

export type WholesaleLineInput = {
  productId: WholesaleProductId;
  colourFile: string;
  styleId?: VeronaStyleId;
  sizeId: WholesaleSizeId;
  quantity: number;
};

export function getWholesaleProduct(id: string): WholesaleProduct | undefined {
  return WHOLESALE_PRODUCTS.find((p) => p.id === id);
}

export function getWholesaleSize(id: string): WholesaleSize | undefined {
  return WHOLESALE_SIZES.find((s) => s.id === id);
}

/** Sizes/extras available for a given product (gold legs only on Atalian). */
export function wholesaleOptionsForProduct(productId: WholesaleProductId): WholesaleSize[] {
  return WHOLESALE_SIZES.filter((s) => !s.onlyFor || s.onlyFor.includes(productId));
}

export function wholesalePhoto(
  productId: WholesaleProductId,
  sizeId: WholesaleSizeId,
  colourFile: string,
  styleId: VeronaStyleId = "scatter-back",
): string {
  const size = getWholesaleSize(sizeId);
  if (size?.photo) return size.photo;

  if (productId === "dino") {
    return dinoPhoto(sizeId as DinoConfigId, colourFile);
  }
  if (productId === "atalian") {
    return atalianPhoto(sizeId as AtalianConfigId, colourFile);
  }
  return veronaPhoto(styleId, sizeId as VeronaConfigId, colourFile);
}

export function lineKey(line: Omit<WholesaleLineInput, "quantity">): string {
  return [line.productId, line.colourFile, line.styleId ?? "-", line.sizeId].join("|");
}

export function formatGbp(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const EMPTY_QTYS: Record<WholesaleSizeId, number> = {
  armchair: 0,
  "2-seater": 0,
  "3-seater": 0,
  "3-2-set": 0,
  corner: 0,
  "gold-legs": 0,
};

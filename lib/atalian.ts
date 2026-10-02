export type AtalianConfigId =
  | "armchair"
  | "2-seater"
  | "3-seater"
  | "3-2-set"
  | "full-set"
  | "corner";

export type AtalianConfig = {
  id: AtalianConfigId;
  label: string;
  shortLabel: string;
  /** Matches ProductVariant.label */
  variantLabel: string;
  /** Mode: single = colour+price only; set = full combination options */
  mode: "single" | "set";
  seats: number | null;
};

export const ATALIAN_CONFIGS: AtalianConfig[] = [
  { id: "armchair", label: "1 Seater", shortLabel: "1 Seater", variantLabel: "Armchair", mode: "single", seats: 1 },
  { id: "2-seater", label: "2 Seater", shortLabel: "2 Seater", variantLabel: "2 Seater", mode: "single", seats: 2 },
  { id: "3-seater", label: "3 Seater", shortLabel: "3 Seater", variantLabel: "3 Seater", mode: "single", seats: 3 },
  { id: "3-2-set", label: "3+2 Set", shortLabel: "3+2", variantLabel: "3+2 Set", mode: "set", seats: 5 },
  { id: "full-set", label: "Full Set", shortLabel: "Full Set", variantLabel: "3+2+1 Full Set", mode: "set", seats: 6 },
  { id: "corner", label: "Corner", shortLabel: "Corner", variantLabel: "Corner", mode: "single", seats: 5 },
];

export const ATALIAN_DEFAULT_CONFIG: AtalianConfigId = "corner";

export function getAtalianConfig(id: string): AtalianConfig | null {
  return ATALIAN_CONFIGS.find((c) => c.id === id) ?? null;
}

export const ATALIAN_COLOURS = [
  { file: "cream", name: "Cream", hex: "#F5F0E8" },
  { file: "grey", name: "Grey", hex: "#8A8680" },
  { file: "black", name: "Black", hex: "#1A1A1A" },
  { file: "navy", name: "Navy", hex: "#1E3A5F" },
  { file: "brown", name: "Brown", hex: "#6B3A2A" },
  { file: "burgundy", name: "Burgundy", hex: "#6B2D3C" },
  { file: "green", name: "Green", hex: "#4A5240" },
  { file: "pink", name: "Pink", hex: "#C9A0A8" },
] as const;

export function atalianPhoto(configId: AtalianConfigId, colourFile: string) {
  return `/products/atalian/${configId}/${colourFile}.webp`;
}

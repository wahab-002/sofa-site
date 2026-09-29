export const SITE_URL = "https://thesofahub.co.uk";
export const SITE_NAME = "The Sofa Hub";

export const WHATSAPP_NUMBER = "447784123321";
export const WHATSAPP_DISPLAY = "+44 7784 123321";

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function formatPrice(value: number) {
  return `£${value.toLocaleString("en-GB")}`;
}

export type DesignSlug =
  | "corner-sofas"
  | "chesterfield-sofas"
  | "u-shape-sofas"
  | "3-2-sofa-sets"
  | "3-2-1-full-sets"
  | "modular-sofas";

export const designCategories: {
  slug: DesignSlug;
  label: string;
  desc: string;
  illustration: { design: "sofa" | "chesterfield" | "corner" | "u-shape" | "modular"; pieces?: number[] };
  colour: string;
}[] = [
  { slug: "corner-sofas", label: "Corner Sofas", desc: "L-shape & corner designs", illustration: { design: "corner" }, colour: "#B0ADA8" },
  { slug: "3-2-sofa-sets", label: "3+2 Sofa Sets", desc: "Matching sets, great value", illustration: { design: "sofa", pieces: [3, 2] }, colour: "#1E3A5F" },
  { slug: "chesterfield-sofas", label: "Chesterfield Sofas", desc: "Classic tufted style", illustration: { design: "chesterfield" }, colour: "#6B3A2A" },
  { slug: "u-shape-sofas", label: "U-Shape Sofas", desc: "Maximum family seating", illustration: { design: "u-shape" }, colour: "#3D3D3D" },
  { slug: "3-2-1-full-sets", label: "3+2+1 Full Sets", desc: "The complete room package", illustration: { design: "sofa", pieces: [3, 2, 1] }, colour: "#C9B99A" },
  { slug: "modular-sofas", label: "Modular Sofas", desc: "Build your perfect layout", illustration: { design: "modular" }, colour: "#4A5240" },
];

export const sizeCategories = [
  { slug: "2-seater", label: "2 Seater", seats: 2, desc: "Compact spaces" },
  { slug: "3-seater", label: "3 Seater", seats: 3, desc: "The everyday classic" },
  { slug: "4-seater", label: "4 Seater", seats: 4, desc: "Room to stretch" },
  { slug: "5-seater", label: "5 Seater", seats: 5, desc: "Busy family homes" },
  { slug: "6-seater", label: "6 Seater", seats: 6, desc: "Space for everyone" },
];

export const colourCategories = [
  { slug: "grey-sofas", label: "Grey", hex: "#B0ADA8", hexes: ["#3D3D3D", "#B0ADA8"] },
  { slug: "cream-sofas", label: "Cream", hex: "#F5F0E8", hexes: ["#F5F0E8", "#C9B99A"] },
  { slug: "navy-sofas", label: "Navy", hex: "#1E3A5F", hexes: ["#1E3A5F"] },
  { slug: "black-sofas", label: "Black", hex: "#1A1A1A", hexes: ["#1A1A1A"] },
  { slug: "brown-sofas", label: "Brown", hex: "#6B3A2A", hexes: ["#6B3A2A", "#3D1C02"] },
];

export const fabricInfo: Record<string, string> = {
  "Plush Velvet": "Soft, rich sheen",
  Chenille: "Textured & hard-wearing",
  Leather: "Wipe-clean & durable",
  "Tech Leather": "Leather look, fabric feel",
};

export const trustPoints = [
  { icon: "truck", title: "Free UK Delivery", desc: "On every single order" },
  { icon: "cash", title: "Cash on Delivery", desc: "Pay when it arrives" },
  { icon: "chat", title: "Order on WhatsApp", desc: "Talk to a real person" },
  { icon: "tag", title: "Unbeatable Prices", desc: "No showroom mark-ups" },
] as const;

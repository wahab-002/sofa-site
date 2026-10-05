import {
  getWholesaleProduct,
  getWholesaleSize,
  type WholesaleLineInput,
  type WholesaleProductId,
  type WholesaleSizeId,
} from "@/lib/wholesale";
import type { VeronaStyleId } from "@/lib/verona";

export const WHOLESALE_CART_KEY = "sofahub_wholesale_cart";

export type WholesaleCartLine = WholesaleLineInput;

export type WholesaleSummaryLine = {
  productId: WholesaleProductId;
  productName: string;
  colourFile: string;
  colourName: string;
  styleId?: VeronaStyleId;
  styleLabel?: string;
  sizeId: WholesaleSizeId;
  sizeLabel: string;
  unitPriceGbp: number;
  quantity: number;
  lineTotalGbp: number;
};

export type ValidatedWholesaleCart = {
  lines: WholesaleSummaryLine[];
  totalGbp: number;
  totalPence: number;
  itemCount: number;
};

function isSizeId(v: string): v is WholesaleSizeId {
  return ["armchair", "2-seater", "3-seater", "3-2-set", "corner", "gold-legs"].includes(v);
}

function isProductId(v: string): v is WholesaleProductId {
  return ["dino", "atalian", "verona"].includes(v);
}

export function validateWholesaleCart(raw: unknown): { ok: true; cart: ValidatedWholesaleCart } | { ok: false; error: string } {
  if (!Array.isArray(raw) || raw.length === 0) {
    return { ok: false, error: "Cart is empty." };
  }

  const lines: WholesaleSummaryLine[] = [];

  for (const item of raw) {
    if (!item || typeof item !== "object") {
      return { ok: false, error: "Invalid cart line." };
    }
    const line = item as WholesaleLineInput;
    if (typeof line.quantity !== "number" || line.quantity < 1 || line.quantity > 99) {
      return { ok: false, error: "Invalid quantity." };
    }
    if (!isProductId(line.productId) || !isSizeId(line.sizeId)) {
      return { ok: false, error: "Invalid product or size." };
    }
    const product = getWholesaleProduct(line.productId);
    const size = getWholesaleSize(line.sizeId);
    if (!product || !size) {
      return { ok: false, error: "Unknown catalogue item." };
    }
    if (size.onlyFor && !size.onlyFor.includes(line.productId)) {
      return { ok: false, error: "Extra not available for this product." };
    }
    const colour = product.colours.find((c) => c.file === line.colourFile);
    if (!colour) {
      return { ok: false, error: "Invalid colour for product." };
    }
    if (product.id === "verona") {
      const style = line.styleId as VeronaStyleId | undefined;
      if (style !== "scatter-back" && style !== "high-back") {
        return { ok: false, error: "Verona requires a back style." };
      }
    }

    const styleLabel =
      product.id === "verona"
        ? line.styleId === "high-back"
          ? "High Back"
          : "Scatter Back"
        : undefined;

    lines.push({
      productId: product.id,
      productName: product.name,
      colourFile: colour.file,
      colourName: colour.name,
      styleId: line.styleId,
      styleLabel,
      sizeId: size.id,
      sizeLabel: size.label,
      unitPriceGbp: size.priceGbp,
      quantity: line.quantity,
      lineTotalGbp: size.priceGbp * line.quantity,
    });
  }

  const totalGbp = lines.reduce((s, l) => s + l.lineTotalGbp, 0);
  const itemCount = lines.reduce((s, l) => s + l.quantity, 0);

  return {
    ok: true,
    cart: {
      lines,
      totalGbp,
      totalPence: totalGbp * 100,
      itemCount,
    },
  };
}

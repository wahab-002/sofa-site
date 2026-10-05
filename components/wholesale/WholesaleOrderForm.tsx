"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  WHOLESALE_PRODUCTS,
  formatGbp,
  getWholesaleProduct,
  getWholesaleSize,
  lineKey,
  wholesaleOptionsForProduct,
  wholesalePhoto,
  EMPTY_QTYS,
  type WholesaleLineInput,
  type WholesaleProductId,
  type WholesaleSizeId,
} from "@/lib/wholesale";
import { WHOLESALE_CART_KEY } from "@/lib/wholesaleCart";
import type { VeronaStyleId } from "@/lib/verona";
import CardBrandBadges from "./CardBrandBadges";

type CartLine = WholesaleLineInput & { key: string };

function upsertLine(cart: CartLine[], next: WholesaleLineInput): CartLine[] {
  const key = lineKey(next);
  if (next.quantity <= 0) return cart.filter((l) => l.key !== key);
  const existing = cart.find((l) => l.key === key);
  if (existing) {
    return cart.map((l) => (l.key === key ? { ...next, key } : l));
  }
  return [...cart, { ...next, key }];
}

export default function WholesaleOrderForm() {
  const router = useRouter();
  const [productId, setProductId] = useState<WholesaleProductId>("atalian");
  const product = getWholesaleProduct(productId)!;
  const [colourFile, setColourFile] = useState(product.colours[0].file);
  const [styleId, setStyleId] = useState<VeronaStyleId>("scatter-back");
  const [qtys, setQtys] = useState<Record<WholesaleSizeId, number>>({ ...EMPTY_QTYS });
  const [cart, setCart] = useState<CartLine[]>([]);
  const [error, setError] = useState<string | null>(null);

  const colour = product.colours.find((c) => c.file === colourFile) ?? product.colours[0];
  const options = wholesaleOptionsForProduct(productId);

  function qtysForSelection(
    lines: CartLine[],
    pid: WholesaleProductId,
    colour: string,
    style: VeronaStyleId,
  ): Record<WholesaleSizeId, number> {
    const next: Record<WholesaleSizeId, number> = { ...EMPTY_QTYS };
    for (const line of lines) {
      if (line.productId !== pid || line.colourFile !== colour) continue;
      if (pid === "verona" && line.styleId !== style) continue;
      next[line.sizeId] = line.quantity;
    }
    return next;
  }

  function switchProduct(id: WholesaleProductId) {
    const p = getWholesaleProduct(id)!;
    const nextColour = p.colours[0].file;
    const nextStyle: VeronaStyleId = "scatter-back";
    setProductId(id);
    setColourFile(nextColour);
    setStyleId(nextStyle);
    setQtys(qtysForSelection(cart, id, nextColour, nextStyle));
  }

  function setQty(sizeId: WholesaleSizeId, quantity: number) {
    const q = Math.max(0, Math.min(99, quantity));
    setQtys((prev) => ({ ...prev, [sizeId]: q }));
    setCart((prev) =>
      upsertLine(prev, {
        productId,
        colourFile: colour.file,
        styleId: productId === "verona" ? styleId : undefined,
        sizeId,
        quantity: q,
      }),
    );
  }

  const total = useMemo(
    () =>
      cart.reduce((sum, line) => {
        const size = getWholesaleSize(line.sizeId);
        return sum + (size?.priceGbp ?? 0) * line.quantity;
      }, 0),
    [cart],
  );

  const itemCount = cart.reduce((n, l) => n + l.quantity, 0);

  function checkout() {
    setError(null);
    if (cart.length === 0) {
      setError("Add at least one size quantity before checkout.");
      return;
    }
    const payload = cart.map(({ productId, colourFile, styleId, sizeId, quantity }) => ({
      productId,
      colourFile,
      styleId,
      sizeId,
      quantity,
    }));
    sessionStorage.setItem(WHOLESALE_CART_KEY, JSON.stringify(payload));
    router.push("/wholesale/checkout");
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-8">
        <section>
          <h2 className="font-display text-lg font-semibold text-charcoal">1. Sofa</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {WHOLESALE_PRODUCTS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => switchProduct(p.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  productId === p.id
                    ? "border-forest bg-forest text-linen"
                    : "border-stone/40 bg-white text-charcoal hover:border-forest/40"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-charcoal">2. Colour</h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {product.colours.map((c) => (
              <button
                key={c.file}
                type="button"
                onClick={() => {
                  setColourFile(c.file);
                  setQtys(qtysForSelection(cart, productId, c.file, styleId));
                }}
                className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${
                  colour.file === c.file
                    ? "border-forest ring-2 ring-forest/20"
                    : "border-stone/30"
                }`}
              >
                <span
                  className="h-5 w-5 rounded-full border border-black/10"
                  style={{ backgroundColor: c.hex }}
                  aria-hidden
                />
                {c.name}
              </button>
            ))}
          </div>
        </section>

        {product.styles && (
          <section>
            <h2 className="font-display text-lg font-semibold text-charcoal">3. Back style</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.styles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setStyleId(s.id);
                    setQtys(qtysForSelection(cart, productId, colour.file, s.id));
                  }}
                  className={`rounded-full border px-4 py-2 text-sm font-medium ${
                    styleId === s.id
                      ? "border-forest bg-forest text-linen"
                      : "border-stone/40 bg-white"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="font-display text-lg font-semibold text-charcoal">
            {product.styles ? "4" : "3"}. Sizes & quantities
          </h2>
          <p className="mt-1 text-sm text-charcoal/60">
            Set quantity for each size. Bill updates instantly. Change sofa or colour to add more
            lines to the same order.
          </p>
          <ul className="mt-4 space-y-4">
            {options.map((size) => {
              const src = wholesalePhoto(
                productId,
                size.id,
                colour.file,
                productId === "verona" ? styleId : "scatter-back",
              );
              const qty = qtys[size.id];
              return (
                <li
                  key={size.id}
                  className="flex flex-col gap-3 rounded-2xl border border-stone/25 bg-white p-3 sm:flex-row sm:items-center"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone/10 sm:h-28 sm:w-40 sm:flex-shrink-0 sm:aspect-auto">
                    <Image
                      src={src}
                      alt={`${product.name} ${size.label}${size.id === "gold-legs" ? "" : ` in ${colour.name}`}`}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-semibold text-charcoal">{size.label}</p>
                    <p className="text-sm text-charcoal/55">
                      {product.name}
                      {size.id === "gold-legs"
                        ? " · accessory"
                        : ` · ${colour.name}${
                            productId === "verona"
                              ? ` · ${styleId === "high-back" ? "High Back" : "Scatter Back"}`
                              : ""
                          }`}
                    </p>
                    <p className="mt-1 text-sm font-medium text-forest">
                      {formatGbp(size.priceGbp)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:flex-shrink-0">
                    <button
                      type="button"
                      aria-label={`Decrease ${size.label} quantity`}
                      className="h-10 w-10 rounded-full border border-stone/40 text-lg leading-none"
                      onClick={() => setQty(size.id, qty - 1)}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={0}
                      max={99}
                      value={qty}
                      onChange={(e) => setQty(size.id, Number(e.target.value) || 0)}
                      className="h-10 w-14 rounded-lg border border-stone/40 text-center text-sm"
                      aria-label={`${size.label} quantity`}
                    />
                    <button
                      type="button"
                      aria-label={`Increase ${size.label} quantity`}
                      className="h-10 w-10 rounded-full border border-stone/40 text-lg leading-none"
                      onClick={() => setQty(size.id, qty + 1)}
                    >
                      +
                    </button>
                    <p className="ml-2 w-16 text-right text-sm font-semibold tabular-nums">
                      {formatGbp(size.priceGbp * qty)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-stone/25 bg-white p-5 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-charcoal">Order summary</h2>
          {cart.length === 0 ? (
            <p className="mt-3 text-sm text-charcoal/55">No items yet — set a quantity above.</p>
          ) : (
            <ul className="mt-3 max-h-72 space-y-3 overflow-y-auto text-sm">
              {cart.map((line) => {
                const p = getWholesaleProduct(line.productId)!;
                const s = getWholesaleSize(line.sizeId)!;
                const col = p.colours.find((c) => c.file === line.colourFile)?.name ?? line.colourFile;
                return (
                  <li key={line.key} className="flex justify-between gap-3 border-b border-stone/15 pb-2">
                    <span className="text-charcoal/80">
                      {p.name} · {col}
                      {line.styleId ? ` · ${line.styleId === "high-back" ? "High Back" : "Scatter"}` : ""}
                      <br />
                      <span className="text-charcoal/55">
                        {s.label} × {line.quantity}
                      </span>
                    </span>
                    <span className="font-semibold tabular-nums">
                      {formatGbp(s.priceGbp * line.quantity)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-4 flex items-end justify-between border-t border-stone/20 pt-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-charcoal/50">Total</p>
              <p className="font-display text-3xl font-bold tabular-nums text-charcoal">
                {formatGbp(total)}
              </p>
              <p className="text-xs text-charcoal/50">
                {itemCount === 1 ? "1 unit" : `${itemCount} units`} · trade prices · card payment
              </p>
            </div>
          </div>

          <div className="mt-4">
            <CardBrandBadges />
          </div>

          {error && (
            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={checkout}
            disabled={cart.length === 0}
            className="btn btn-primary mt-5 w-full disabled:cursor-not-allowed disabled:opacity-50"
          >
            Checkout — pay by card
          </button>
          <p className="mt-3 text-xs leading-relaxed text-charcoal/50">
            Trade checkout only. Next step: enter card details securely. No WhatsApp on this page.
          </p>
        </div>
      </aside>
    </div>
  );
}

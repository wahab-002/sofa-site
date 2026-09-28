"use client";

import { useState, useMemo } from "react";
import type { ProductVariant, ProductColour, ProductFabric, ProductExtra } from "@/lib/types";
import WhatsAppButton from "./WhatsAppButton";

type Props = {
  productName: string;
  variants: ProductVariant[];
  colours: ProductColour[];
  fabrics: ProductFabric[];
  extras: ProductExtra[];
  basePrice: number;
};

export default function ProductConfigurator({
  productName,
  variants,
  colours,
  fabrics,
  extras,
  basePrice,
}: Props) {
  const defaultVariant = variants.find((v) => v.label === "3+2 Set") ?? variants[0] ?? null;
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(defaultVariant);
  const [selectedColour, setSelectedColour] = useState<ProductColour | null>(colours[0] ?? null);
  const [selectedFabric, setSelectedFabric] = useState<ProductFabric | null>(fabrics[0] ?? null);
  const [selectedExtras, setSelectedExtras] = useState<ProductExtra[]>([]);

  const totalPrice = useMemo(() => {
    let total = selectedVariant?.price_gbp ?? basePrice;
    selectedExtras.forEach((e) => (total += e.price_gbp));
    return total;
  }, [selectedVariant, selectedExtras, basePrice]);

  const toggleExtra = (extra: ProductExtra) => {
    setSelectedExtras((prev) =>
      prev.find((e) => e.id === extra.id)
        ? prev.filter((e) => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const whatsappMessage = useMemo(() => {
    return [
      `Hi, I'd like to order the ${productName}.`,
      selectedVariant ? `Size: ${selectedVariant.label}` : "",
      selectedColour ? `Colour: ${selectedColour.name}` : "",
      selectedFabric ? `Fabric: ${selectedFabric.name}` : "",
      selectedExtras.length > 0
        ? `Extras: ${selectedExtras.map((e) => `${e.name} (+£${e.price_gbp})`).join(", ")}`
        : "",
      `Total: £${totalPrice.toLocaleString()}`,
      "Please confirm availability and delivery.",
    ]
      .filter(Boolean)
      .join("\n");
  }, [productName, selectedVariant, selectedColour, selectedFabric, selectedExtras, totalPrice]);

  return (
    <div className="space-y-7">

      {/* Variant / Size selector */}
      {variants.length > 0 && (
        <div>
          <p className="font-body text-xs uppercase tracking-widest text-charcoal/50 mb-3">
            Choose Size
          </p>
          <div className="grid grid-cols-2 gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                disabled={!v.in_stock}
                className={`p-3 rounded-xl border text-left transition-all font-body text-sm ${
                  selectedVariant?.id === v.id
                    ? "border-forest bg-forest/5 text-forest"
                    : "border-charcoal/15 hover:border-charcoal/40 text-charcoal"
                } ${!v.in_stock ? "opacity-40 cursor-not-allowed line-through" : "cursor-pointer"}`}
              >
                <p className="font-medium leading-snug">{v.label}</p>
                <p className="text-xs mt-0.5 opacity-60">£{v.price_gbp.toLocaleString()}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Colour selector */}
      {colours.length > 0 && (
        <div>
          <p className="font-body text-xs uppercase tracking-widest text-charcoal/50 mb-3">
            Colour —{" "}
            <span className="text-charcoal normal-case tracking-normal font-medium">
              {selectedColour?.name}
            </span>
          </p>
          <div className="flex flex-wrap gap-3">
            {colours.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedColour(c)}
                title={c.name}
                className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                  selectedColour?.id === c.id
                    ? "border-forest scale-110 shadow-lg"
                    : "border-white hover:border-charcoal/30 shadow-sm"
                }`}
                style={{ backgroundColor: c.hex_code }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fabric selector */}
      {fabrics.length > 0 && (
        <div>
          <p className="font-body text-xs uppercase tracking-widest text-charcoal/50 mb-3">
            Fabric —{" "}
            <span className="text-charcoal normal-case tracking-normal font-medium">
              {selectedFabric?.name}
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {fabrics.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFabric(f)}
                className={`px-4 py-2 rounded-full border font-body text-sm transition-all ${
                  selectedFabric?.id === f.id
                    ? "border-forest bg-forest text-linen"
                    : "border-charcoal/20 text-charcoal hover:border-charcoal/50"
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Extras */}
      {extras.length > 0 && (
        <div>
          <p className="font-body text-xs uppercase tracking-widest text-charcoal/50 mb-3">
            Add Extras{" "}
            <span className="normal-case tracking-normal text-charcoal/40">(optional)</span>
          </p>
          <div className="space-y-2">
            {extras.map((e) => {
              const isSelected = !!selectedExtras.find((s) => s.id === e.id);
              return (
                <label
                  key={e.id}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-forest bg-forest/5"
                      : "border-charcoal/12 hover:border-charcoal/25"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleExtra(e)}
                      className="w-4 h-4 accent-forest cursor-pointer"
                    />
                    <span className="font-body text-sm text-charcoal">{e.name}</span>
                  </div>
                  <span className="font-body text-sm font-semibold text-charcoal">
                    +£{e.price_gbp.toLocaleString()}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Total + CTA */}
      <div className="border-t border-charcoal/10 pt-6 space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-body text-xs text-charcoal/50 uppercase tracking-widest mb-1">Total</p>
            <p className="font-display text-4xl text-charcoal leading-none">
              £{totalPrice.toLocaleString()}
            </p>
            {selectedExtras.length > 0 && (
              <p className="font-body text-xs text-charcoal/50 mt-1">
                incl. {selectedExtras.map((e) => e.name).join(" + ")}
              </p>
            )}
          </div>
        </div>

        <WhatsAppButton message={whatsappMessage} />

        <div className="grid grid-cols-3 gap-1 text-center">
          {["Free UK delivery", "Cash on delivery", "No deposit needed"].map((t) => (
            <p key={t} className="font-body text-xs text-charcoal/50">
              ✓ {t}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

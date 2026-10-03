"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ProductWithDetails, ProductExtra } from "@/lib/types";
import type { LilyConfig, LilyConfigId } from "@/lib/lily";
import { LILY_COLOURS, LILY_CONFIGS, lilyPhoto } from "@/lib/lily";
import { formatPrice, whatsappLink } from "@/lib/site";
import WhatsAppButton from "@/components/WhatsAppButton";
import Icon, { WhatsAppIcon } from "@/components/Icon";
import ProductImageViewer from "@/components/product/ProductImageViewer";

type Props = {
  product: ProductWithDetails;
  config: LilyConfig;
  children?: React.ReactNode;
};

function isLight(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

function configIdForVariant(label: string, fallback: LilyConfigId): LilyConfigId {
  return LILY_CONFIGS.find((c) => c.variantLabel === label)?.id ?? fallback;
}

export default function LilyConfigurator({ product, config, children }: Props) {
  const variant =
    product.variants.find((v) => v.label === config.variantLabel) ?? product.variants[0] ?? null;

  const colourOptions = useMemo(
    () =>
      LILY_COLOURS.map((c) => {
        const match = product.colours.find((pc) => pc.name === c.name);
        return {
          id: match?.id ?? `lily-${c.file}`,
          name: c.name,
          hex_code: c.hex,
          file: c.file,
        };
      }),
    [product.colours],
  );

  const [colour, setColour] = useState(colourOptions.find((c) => c.name === "Beige") ?? colourOptions[0]);
  const [comboVariant, setComboVariant] = useState(variant);
  const [selectedExtras, setSelectedExtras] = useState<ProductExtra[]>([]);

  const activeVariant = config.mode === "set" ? comboVariant : variant;
  const basePrice = activeVariant?.price_gbp ?? product.base_price;
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price_gbp, 0);
  const price = basePrice + extrasTotal;
  const photoConfigId =
    config.mode === "set" && activeVariant
      ? configIdForVariant(activeVariant.label, config.id)
      : config.id;
  const photo = lilyPhoto(photoConfigId, colour.file);
  const gallery = useMemo(
    () =>
      colourOptions.map((c) => ({
        src: lilyPhoto(photoConfigId, c.file),
        alt: `Lily Sofa ${activeVariant?.label ?? config.label} in ${c.name}`,
      })),
    [colourOptions, photoConfigId, activeVariant?.label, config.label],
  );

  const setVariants = product.variants.filter((v) =>
    LILY_CONFIGS.some((c) => c.variantLabel === v.label),
  );

  const toggleExtra = (extra: ProductExtra) => {
    setSelectedExtras((prev) =>
      prev.find((e) => e.id === extra.id) ? prev.filter((e) => e.id !== extra.id) : [...prev, extra],
    );
  };

  const whatsappMessage = [
    `Hi, I'd like to order the ${product.name}.`,
    `Configuration: ${activeVariant?.label ?? config.label}`,
    `Colour: ${colour.name}`,
    selectedExtras.length > 0
      ? `Extras: ${selectedExtras.map((e) => `${e.name} (+£${e.price_gbp})`).join(", ")}`
      : "",
    `Total: £${price.toLocaleString("en-GB")}`,
    "Please confirm availability and delivery.",
  ]
    .filter(Boolean)
    .join("\n");

  let step = 0;

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <ProductImageViewer
            key={photo}
            src={photo}
            alt={`Lily Sofa ${activeVariant?.label ?? config.label} in ${colour.name}`}
            gallery={gallery}
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            roundedClassName="rounded-[1.75rem]"
          />
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto p-1.5">
            {colourOptions.map((c) => (
              <button
                key={c.file}
                onClick={() => setColour(c)}
                aria-label={`Show ${c.name}`}
                className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl ring-2 transition ${
                  colour.file === c.file ? "ring-charcoal" : "ring-transparent opacity-80 hover:opacity-100"
                }`}
              >
                <Image src={lilyPhoto(photoConfigId, c.file)} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="min-w-0">
          <p className="eyebrow">Lily Collection</p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-charcoal md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-2 font-body text-lg text-charcoal/60">
            {config.label} · {product.tagline}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="font-display text-3xl font-semibold text-charcoal">{formatPrice(price)}</span>
            <span className="rounded-full bg-forest/10 px-3 py-1 font-body text-xs font-semibold text-forest">
              Free UK delivery
            </span>
            <span className="rounded-full bg-gold/20 px-3 py-1 font-body text-xs font-semibold text-clay">£0 deposit</span>
          </div>

          <div className="mt-8 space-y-8">
            {config.mode === "set" && (
              <Section step={++step} title="Choose your combination" value={activeVariant?.label}>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {setVariants.map((v) => {
                    const active = activeVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setComboVariant(v)}
                        className={`rounded-2xl border p-3.5 text-left transition-all ${
                          active
                            ? "border-charcoal bg-white shadow-soft ring-1 ring-charcoal"
                            : "border-charcoal/12 bg-white/60 hover:border-charcoal/40"
                        }`}
                      >
                        <span className="block font-body text-sm font-semibold text-charcoal">{v.label}</span>
                        <span className="mt-0.5 block font-body text-sm text-charcoal/60">{formatPrice(v.price_gbp)}</span>
                      </button>
                    );
                  })}
                </div>
              </Section>
            )}

            <Section step={++step} title="Choose your colour" value={colour.name}>
              <div className="flex flex-wrap gap-2">
                {colourOptions.map((c) => {
                  const active = colour.file === c.file;
                  return (
                    <button
                      key={c.file}
                      onClick={() => setColour(c)}
                      title={c.name}
                      aria-label={c.name}
                      className={`group relative h-10 w-10 rounded-full transition-transform ${
                        active ? "ring-2 ring-charcoal ring-offset-2 ring-offset-linen" : "hover:scale-110"
                      }`}
                    >
                      <span
                        className="absolute inset-0 rounded-full ring-1 ring-inset ring-charcoal/15"
                        style={{ backgroundColor: c.hex_code }}
                      />
                      {active && (
                        <Icon
                          name="check"
                          strokeWidth={2.6}
                          className={`absolute inset-0 m-auto h-5 w-5 ${isLight(c.hex_code) ? "text-charcoal" : "text-white"}`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 font-body text-sm text-charcoal/55">Selected: {colour.name}</p>
            </Section>

            {product.extras.length > 0 && (
              <Section step={++step} title="Complete the look" value="Optional">
                <div className="space-y-2">
                  {product.extras.map((e) => {
                    const isSelected = !!selectedExtras.find((s) => s.id === e.id);
                    return (
                      <button
                        key={e.id}
                        onClick={() => toggleExtra(e)}
                        aria-pressed={isSelected}
                        className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                          isSelected
                            ? "border-forest bg-forest/5 ring-1 ring-forest"
                            : "border-charcoal/12 bg-white/60 hover:border-charcoal/40"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-md border transition-colors ${
                              isSelected ? "border-forest bg-forest text-linen" : "border-charcoal/25 bg-white"
                            }`}
                          >
                            {isSelected && <Icon name="check" className="h-4 w-4" strokeWidth={2.6} />}
                          </span>
                          <span className="font-body text-sm font-medium text-charcoal">{e.name}</span>
                        </span>
                        <span className="font-body text-sm font-semibold text-charcoal">+{formatPrice(e.price_gbp)}</span>
                      </button>
                    );
                  })}
                </div>
              </Section>
            )}
          </div>

          <div id="order" className="mt-8 rounded-3xl bg-white p-5 ring-1 ring-charcoal/10 md:p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/45">Your total</p>
                <p className="mt-1 font-display text-4xl font-semibold leading-none text-charcoal">{formatPrice(price)}</p>
              </div>
              <p className="text-right font-body text-sm text-charcoal/55">
                Pay today <span className="block font-semibold text-forest">£0</span>
              </p>
            </div>
            <ul className="mt-4 space-y-1 border-t border-charcoal/10 pt-4 font-body text-sm text-charcoal/65">
              <li className="flex justify-between gap-3">
                <span>
                  {activeVariant?.label ?? config.label}
                  {` · ${colour.name}`}
                </span>
                <span className="flex-shrink-0">{formatPrice(basePrice)}</span>
              </li>
              {selectedExtras.map((e) => (
                <li key={e.id} className="flex justify-between">
                  <span>{e.name}</span>
                  <span>+{formatPrice(e.price_gbp)}</span>
                </li>
              ))}
              <li className="flex justify-between">
                <span>Delivery</span>
                <span className="font-medium text-forest">Free</span>
              </li>
            </ul>

            <WhatsAppButton message={whatsappMessage} className="mt-5" />

            <div className="mt-4 grid grid-cols-3 gap-2 text-center font-body text-xs text-charcoal/60">
              {[
                { icon: "truck" as const, label: "Free UK delivery" },
                { icon: "cash" as const, label: "Cash on delivery" },
                { icon: "shield" as const, label: "No deposit" },
              ].map((t) => (
                <span key={t.label} className="flex flex-col items-center gap-1.5 rounded-xl bg-sand/70 px-2 py-2.5">
                  <Icon name={t.icon} className="h-5 w-5 text-forest" />
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          {children}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-charcoal/10 bg-linen/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-body text-xs text-charcoal/55">
              {activeVariant?.label ?? config.label} · {colour.name}
            </p>
            <p className="font-display text-xl font-semibold text-charcoal">{formatPrice(price)}</p>
          </div>
          <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-primary px-5 py-3 text-sm">
            <WhatsAppIcon className="h-4 w-4" />
            Order now
          </a>
        </div>
      </div>
    </>
  );
}

function Section({
  step,
  title,
  value,
  children,
}: {
  step: number;
  title: string;
  value?: string | null;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <p className="flex items-center gap-2.5 font-display text-lg font-semibold text-charcoal">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-charcoal font-body text-xs font-semibold text-linen">
            {step}
          </span>
          {title}
        </p>
        {value && <span className="font-body text-sm text-charcoal/55">{value}</span>}
      </div>
      {children}
    </div>
  );
}

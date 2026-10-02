"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ProductWithDetails } from "@/lib/types";
import type { AtalianConfig, AtalianConfigId } from "@/lib/atalian";
import { ATALIAN_COLOURS, ATALIAN_CONFIGS, atalianPhoto } from "@/lib/atalian";
import { fabricInfo, formatPrice } from "@/lib/site";
import WhatsAppButton from "@/components/WhatsAppButton";
import Icon from "@/components/Icon";
import { fabricTexture } from "@/components/product/ProductGallery";

type Props = {
  product: ProductWithDetails;
  config: AtalianConfig;
};

function isLight(hex: string) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

function configIdForVariant(label: string, fallback: AtalianConfigId): AtalianConfigId {
  return ATALIAN_CONFIGS.find((c) => c.variantLabel === label)?.id ?? fallback;
}

export default function AtalianConfigurator({ product, config }: Props) {
  const variant =
    product.variants.find((v) => v.label === config.variantLabel) ?? product.variants[0] ?? null;

  const colourOptions = useMemo(
    () =>
      ATALIAN_COLOURS.map((c) => {
        const match = product.colours.find((pc) => pc.name === c.name);
        return {
          id: match?.id ?? `atalian-${c.file}`,
          name: c.name,
          hex_code: c.hex,
          file: c.file,
        };
      }),
    [product.colours],
  );

  const [colour, setColour] = useState(colourOptions.find((c) => c.name === "Cream") ?? colourOptions[0]);
  const [fabric, setFabric] = useState(product.fabrics[0] ?? null);
  const [comboVariant, setComboVariant] = useState(variant);

  const activeVariant = config.mode === "set" ? comboVariant : variant;
  const price = activeVariant?.price_gbp ?? product.base_price;
  const photoConfigId =
    config.mode === "set" && activeVariant
      ? configIdForVariant(activeVariant.label, config.id)
      : config.id;
  const photo = atalianPhoto(photoConfigId, colour.file);

  const setVariants = product.variants.filter((v) =>
    ATALIAN_CONFIGS.some((c) => c.variantLabel === v.label),
  );

  const whatsappMessage = [
    `Hi, I'd like to order the ${product.name}.`,
    `Configuration: ${activeVariant?.label ?? config.label}`,
    `Colour: ${colour.name}`,
    config.mode === "set" && fabric ? `Fabric: ${fabric.name}` : "",
    `Total: £${price.toLocaleString("en-GB")}`,
    "Please confirm availability and delivery.",
  ]
    .filter(Boolean)
    .join("\n");

  let step = 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
      <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
        <div className="overflow-hidden rounded-[1.75rem] bg-sand ring-1 ring-charcoal/5">
          <div className="relative aspect-[4/5] md:aspect-[5/4]">
            <Image
              key={photo}
              src={photo}
              alt={`Atalian Chesterfield ${activeVariant?.label ?? config.label} in ${colour.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {colourOptions.map((c) => (
            <button
              key={c.file}
              onClick={() => setColour(c)}
              aria-label={`Show ${c.name}`}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl ring-2 transition ${
                colour.file === c.file ? "ring-charcoal" : "ring-transparent opacity-80 hover:opacity-100"
              }`}
            >
              <Image src={atalianPhoto(photoConfigId, c.file)} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="min-w-0">
        <p className="eyebrow">Chesterfield Collection</p>
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

          {config.mode === "set" && product.fabrics.length > 0 && (
            <Section step={++step} title="Choose your fabric" value={fabric?.name}>
              <div className="grid gap-2 sm:grid-cols-3">
                {product.fabrics.map((f) => {
                  const active = fabric?.id === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setFabric(f)}
                      className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-all ${
                        active
                          ? "border-charcoal bg-white shadow-soft ring-1 ring-charcoal"
                          : "border-charcoal/12 bg-white/60 hover:border-charcoal/40"
                      }`}
                    >
                      <span
                        className="h-9 w-9 flex-shrink-0 rounded-lg ring-1 ring-charcoal/10"
                        style={fabricTexture(f.name, colour.hex_code)}
                      />
                      <span>
                        <span className="block font-body text-sm font-semibold text-charcoal">{f.name}</span>
                        {fabricInfo[f.name] && (
                          <span className="block font-body text-xs text-charcoal/50">{fabricInfo[f.name]}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </Section>
          )}

          <div className="rounded-[1.75rem] bg-charcoal p-5 text-linen md:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="font-body text-xs uppercase tracking-[0.14em] text-linen/55">Your total</p>
                <p className="mt-1 font-display text-3xl font-semibold">{formatPrice(price)}</p>
                <p className="mt-1 font-body text-sm text-linen/65">Pay today £0 · Cash on delivery</p>
              </div>
              <ul className="font-body text-sm text-linen/75">
                <li>
                  {activeVariant?.label ?? config.label} · {colour.name}
                  {config.mode === "set" && fabric ? ` · ${fabric.name}` : ""}
                </li>
                <li>Delivery Free</li>
              </ul>
            </div>
            <div className="mt-5">
              <WhatsAppButton message={whatsappMessage} label="Order on WhatsApp" />
            </div>
          </div>
        </div>
      </div>
    </div>
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
    <section>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="font-body text-sm font-semibold text-charcoal">
          <span className="mr-2 text-charcoal/35">{step}</span>
          {title}
        </h2>
        {value && <span className="font-body text-xs font-medium text-forest">{value}</span>}
      </div>
      {children}
    </section>
  );
}

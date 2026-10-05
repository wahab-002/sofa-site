"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { getProductMedia, rankPhotos, type BackStyle } from "@/lib/productMedia";
import type { ProductWithDetails, ProductExtra } from "@/lib/types";
import WhatsAppButton from "./WhatsAppButton";
import ProductGallery, { swatchStyle } from "./product/ProductGallery";
import Icon, { WhatsAppIcon } from "./Icon";
import { variantIllustration } from "@/lib/illustration";
import { formatPrice, whatsappLink } from "@/lib/site";
import ProductCraftsmanship from "./product/ProductCraftsmanship";

type Props = {
  product: ProductWithDetails;
  badge: string;
  fromPrice: number;
  children?: React.ReactNode;
};

export default function ProductConfigurator({ product, badge, fromPrice, children }: Props) {
  const { name: productName, variants, colours, extras, base_price: basePrice } = product;

  const defaultVariant = variants.find((v) => v.label === "3+2 Set") ?? variants[0] ?? null;
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const media = getProductMedia(product.slug);
  const photographedColour = colours.find((c) => c.name === media?.photos[0]?.colour);
  const [selectedColour, setSelectedColour] = useState(photographedColour ?? colours[0] ?? null);
  const [selectedExtras, setSelectedExtras] = useState<ProductExtra[]>([]);

  const styles = media?.styles ?? [];
  const [selectedStyle, setSelectedStyle] = useState<BackStyle | null>(styles[0] ?? null);

  const galleryPhotos = useMemo(
    () =>
      media
        ? rankPhotos(media.photos, {
            style: selectedStyle?.id,
            size: selectedVariant?.label,
            colour: selectedColour?.name,
          })
        : undefined,
    [media, selectedStyle, selectedVariant, selectedColour],
  );

  const totalPrice = useMemo(() => {
    let total = selectedVariant?.price_gbp ?? basePrice;
    selectedExtras.forEach((e) => (total += e.price_gbp));
    return total;
  }, [selectedVariant, selectedExtras, basePrice]);

  const toggleExtra = (extra: ProductExtra) => {
    setSelectedExtras((prev) =>
      prev.find((e) => e.id === extra.id) ? prev.filter((e) => e.id !== extra.id) : [...prev, extra],
    );
  };

  const whatsappMessage = useMemo(() => {
    return [
      `Hi The Sofa Hub, I'd like to order:`,
      `🛋️ Sofa: ${productName}`,
      selectedVariant ? `• Size: ${selectedVariant.label}` : "",
      selectedStyle ? `• Back Style: ${selectedStyle.name}` : "",
      selectedColour ? `• Colour: ${selectedColour.name}` : "",
      selectedExtras.length > 0
        ? `• Extras: ${selectedExtras.map((e) => `${e.name} (+£${e.price_gbp})`).join(", ")}`
        : "",
      `💰 Total: £${totalPrice.toLocaleString()} (Cash on Delivery - £0 Deposit)`,
      `📍 My Delivery Postcode is: `,
      "",
      `Please confirm my delivery slot.`,
    ]
      .filter(Boolean)
      .join("\n");
  }, [productName, selectedVariant, selectedStyle, selectedColour, selectedExtras, totalPrice]);

  const spec = variantIllustration(product, selectedVariant);
  let step = 0;

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        {/* Gallery */}
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <ProductGallery
            productName={productName}
            images={product.images}
            media={galleryPhotos}
            resetKey={`${selectedStyle?.id}-${selectedVariant?.id}`}
            colour={selectedColour}
            fabric={null}
            spec={spec}
            sizeLabel={selectedVariant?.label ?? null}
          />
        </div>

        {/* Details */}
        <div className="min-w-0">
          <p className="eyebrow">{badge}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold leading-tight text-charcoal md:text-5xl">{productName}</h1>
          <p className="mt-2 font-body text-lg text-charcoal/60">{product.tagline}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="font-body text-sm text-charcoal/55">
              From <span className="font-display text-2xl font-semibold text-charcoal">{formatPrice(fromPrice)}</span>
            </span>
            <span className="rounded-full bg-forest/10 px-3 py-1 font-body text-xs font-semibold text-forest">Free UK delivery</span>
            <span className="rounded-full bg-gold/20 px-3 py-1 font-body text-xs font-semibold text-clay">£0 deposit</span>
          </div>

          <div className="mt-8 space-y-8">
            {variants.length > 0 && (
              <Section step={++step} title="Choose your size" value={selectedVariant?.label}>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {variants.map((v) => {
                    const active = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        disabled={!v.in_stock}
                        className={`relative rounded-2xl border p-3.5 text-left transition-all ${
                          active ? "border-charcoal bg-white shadow-soft ring-1 ring-charcoal" : "border-charcoal/12 bg-white/60 hover:border-charcoal/40"
                        } ${!v.in_stock ? "cursor-not-allowed opacity-40" : ""}`}
                      >
                        {v.label === "3+2 Set" && (
                          <span className="absolute -top-2.5 right-3 rounded-full bg-clay px-2 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wider text-linen">
                            Popular
                          </span>
                        )}
                        <span className="block font-body text-sm font-semibold text-charcoal">{v.label}</span>
                        <span className="mt-0.5 block font-body text-sm text-charcoal/60">{formatPrice(v.price_gbp)}</span>
                      </button>
                    );
                  })}
                </div>
              </Section>
            )}

            {media && styles.length > 1 && (
              <Section step={++step} title="Choose your back style" value={selectedStyle?.name}>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {styles.map((s) => {
                    const active = selectedStyle?.id === s.id;
                    const preview =
                      rankPhotos(media.photos, { style: s.id, size: selectedVariant?.label, colour: selectedColour?.name }).find(
                        (p) => p.style === s.id,
                      ) ?? null;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setSelectedStyle(s)}
                        aria-pressed={active}
                        className={`overflow-hidden rounded-2xl border text-left transition-all ${
                          active ? "border-charcoal bg-white shadow-soft ring-1 ring-charcoal" : "border-charcoal/12 bg-white/60 hover:border-charcoal/40"
                        }`}
                      >
                        {preview && (
                          <span className="relative block aspect-[16/9] bg-sand">
                            <Image src={preview.src} alt="" fill sizes="(max-width: 1024px) 45vw, 20vw" className="object-cover" />
                            {active && (
                              <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal text-linen">
                                <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.8} />
                              </span>
                            )}
                          </span>
                        )}
                        <span className="block p-3">
                          <span className="block font-body text-sm font-semibold text-charcoal">{s.name}</span>
                          <span className="mt-0.5 block font-body text-xs leading-snug text-charcoal/55">{s.description}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Section>
            )}

            {colours.length > 0 && (
              <Section step={++step} title="Choose your colour" value={selectedColour?.name}>
                <div className="flex flex-wrap gap-2">
                  {colours.map((c) => {
                    const active = selectedColour?.id === c.id;
                    if (c.swatch_url) {
                      return (
                        <button
                          key={c.id}
                          onClick={() => setSelectedColour(c)}
                          aria-pressed={active}
                          className={`flex items-center gap-3 rounded-2xl border py-2 pl-2 pr-4 text-left transition-all ${
                            active ? "border-charcoal bg-white shadow-soft ring-1 ring-charcoal" : "border-charcoal/12 bg-white/60 hover:border-charcoal/40"
                          }`}
                        >
                          <span className="relative h-11 w-11 flex-shrink-0 rounded-xl ring-1 ring-inset ring-charcoal/15" style={swatchStyle(c)}>
                            {active && <Icon name="check" strokeWidth={2.6} className="absolute inset-0 m-auto h-5 w-5 text-white drop-shadow" />}
                          </span>
                          <span className="font-body text-sm font-semibold text-charcoal">{c.name}</span>
                        </button>
                      );
                    }
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedColour(c)}
                        title={c.name}
                        aria-label={c.name}
                        className={`group relative h-10 w-10 rounded-full transition-transform ${
                          active ? "ring-2 ring-charcoal ring-offset-2 ring-offset-linen" : "hover:scale-110"
                        }`}
                      >
                        <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-charcoal/15" style={{ backgroundColor: c.hex_code }} />
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
              </Section>
            )}

            {extras.length > 0 && (
              <Section step={++step} title="Complete the look" value="Optional">
                <div className="space-y-2">
                  {extras.map((e) => {
                    const isSelected = !!selectedExtras.find((s) => s.id === e.id);
                    return (
                      <button
                        key={e.id}
                        onClick={() => toggleExtra(e)}
                        aria-pressed={isSelected}
                        className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                          isSelected ? "border-forest bg-forest/5 ring-1 ring-forest" : "border-charcoal/12 bg-white/60 hover:border-charcoal/40"
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

          {/* Summary */}
          <div id="order" className="mt-8 rounded-3xl bg-white p-5 ring-1 ring-charcoal/10 md:p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-charcoal/45">Your total</p>
                <p className="mt-1 font-display text-4xl font-semibold leading-none text-charcoal">{formatPrice(totalPrice)}</p>
              </div>
              <p className="text-right font-body text-sm text-charcoal/55">
                Pay today <span className="block font-semibold text-forest">£0</span>
              </p>
            </div>
            <ul className="mt-4 space-y-1 border-t border-charcoal/10 pt-4 font-body text-sm text-charcoal/65">
              <li className="flex justify-between">
                <span>
                  {selectedVariant?.label ?? productName}
                  {selectedStyle && ` · ${selectedStyle.name}`}
                  {selectedColour && ` · ${selectedColour.name}`}
                </span>
                <span>{formatPrice(selectedVariant?.price_gbp ?? basePrice)}</span>
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
                { icon: "truck", label: "Free UK delivery" },
                { icon: "cash", label: "Cash on delivery" },
                { icon: "shield", label: "No deposit" },
              ].map((t) => (
                <span key={t.label} className="flex flex-col items-center gap-1.5 rounded-xl bg-sand/70 px-2 py-2.5">
                  <Icon name={t.icon} className="h-5 w-5 text-forest" />
                  {t.label}
                </span>
              ))}
            </div>
          </div>

          <ProductCraftsmanship productName={productName} />

          {children}
        </div>
      </div>

      {/* Mobile sticky order bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-charcoal/10 bg-linen/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-body text-xs text-charcoal/55">
              {selectedVariant?.label}
              {selectedStyle && ` · ${selectedStyle.name}`} · {selectedColour?.name}
            </p>
            <p className="font-display text-xl font-semibold text-charcoal">{formatPrice(totalPrice)}</p>
          </div>
          <a href={whatsappLink(whatsappMessage)} target="_blank" rel="nofollow noopener noreferrer" className="btn btn-primary px-5 py-3 text-sm">
            <WhatsAppIcon className="h-4 w-4" />
            Order now
          </a>
        </div>
      </div>
    </>
  );
}

function Section({ step, title, value, children }: { step: number; title: string; value?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <p className="flex items-center gap-2.5 font-display text-lg font-semibold text-charcoal">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-charcoal font-body text-xs font-semibold text-linen">{step}</span>
          {title}
        </p>
        {value && <span className="font-body text-sm text-charcoal/55">{value}</span>}
      </div>
      {children}
    </div>
  );
}

function isLight(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b > 170;
}

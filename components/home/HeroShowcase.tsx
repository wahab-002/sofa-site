"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { formatPrice } from "@/lib/site";

const featured = [
  {
    slug: "atalian-sofa/corner",
    name: "Atalian Chesterfield",
    image: "/products/atalian/corner/cream.webp",
    colour: "Cream",
    price: 1249,
    label: "Corner",
  },
  {
    slug: "falcon-sofa",
    name: "Falcon Sofa",
    image: "/products/falcon/photo-01.webp",
    colour: "Dark Grey",
    price: 1049,
    label: "3+2 Set",
  },
  {
    slug: "bishop-sofa",
    name: "Bishop U-Shape",
    image: "/products/bishop/photo-01.webp",
    colour: "Olive",
    price: 1299,
    label: "U-Shape",
  },
  {
    slug: "lily-sofa",
    name: "Lily Sofa",
    image: "/products/lily/photo-01.webp",
    colour: "Dark Grey",
    price: 949,
    label: "3+2 Set",
  },
  {
    slug: "olympia-sofa",
    name: "Olympia Chesterfield",
    image: "/products/olympia/photo-01.webp",
    colour: "Cream",
    price: 1299,
    label: "Full Set",
  },
  {
    slug: "malibu-sofa",
    name: "Malibu Sofa",
    image: "/products/malibu/room-32-caramel.webp",
    colour: "Beige",
    price: 879,
    label: "3+2 Set",
  },
];

export default function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % featured.length), 3200);
    return () => clearInterval(id);
  }, [paused]);

  const item = featured[active];

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-sand via-stone/60 to-sand"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/5] min-h-[320px] md:aspect-[5/4] md:min-h-[380px]">
        {featured.map((f, i) => (
          <Image
            key={f.slug}
            src={f.image}
            alt={`${f.name} in ${f.colour}`}
            fill
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className={`object-cover transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent" />
      </div>

      <Link
        href={`/products/${item.slug}`}
        className="group absolute left-5 top-5 z-20 rounded-2xl bg-white/95 p-4 shadow-soft backdrop-blur transition-transform hover:-translate-y-0.5 md:left-8 md:top-8"
      >
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-clay">Best seller</p>
        <p className="mt-0.5 font-display text-lg font-semibold text-charcoal">{item.name}</p>
        <p className="font-body text-sm text-charcoal/60">
          {item.label} · <span className="font-medium text-charcoal">{item.colour}</span> ·{" "}
          <span className="font-semibold text-forest">{formatPrice(item.price)}</span>
        </p>
        <span className="mt-2 inline-flex items-center gap-1 font-body text-xs font-medium text-forest">
          View sofa <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>

      <div className="absolute bottom-5 right-5 z-20 flex items-center gap-1.5 rounded-full bg-white/95 p-1.5 shadow-soft backdrop-blur md:bottom-8 md:right-8">
        {featured.map((f, i) => (
          <button
            key={f.slug}
            onClick={() => setActive(i)}
            aria-label={`Show ${f.name}`}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === active ? "w-6 bg-forest" : "bg-charcoal/25 hover:bg-charcoal/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

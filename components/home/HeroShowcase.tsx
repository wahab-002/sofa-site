"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SofaIllustration from "@/components/SofaIllustration";
import Icon from "@/components/Icon";

const colours = [
  { name: "Navy", hex: "#1E3A5F" },
  { name: "Light Grey", hex: "#B0ADA8" },
  { name: "Olive", hex: "#4A5240" },
  { name: "Beige", hex: "#C9B99A" },
  { name: "Orange", hex: "#D4774A" },
  { name: "Dark Grey", hex: "#3D3D3D" },
];

export default function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % colours.length), 2600);
    return () => clearInterval(id);
  }, [paused]);

  const colour = colours[active];

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-sand via-stone/60 to-sand p-6 md:p-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Wall + floor */}
      <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-b from-[#E4DBCD] to-[#DCD1C0]" />
      <div className="absolute right-[16%] top-[12%] h-[30%] w-[18%] rounded-lg border-[6px] border-white/80 bg-gradient-to-br from-[#D9CBB6] to-[#BFAE93] shadow-soft" />
      <div className="absolute right-[40%] top-[16%] h-[22%] w-[12%] rounded-lg border-[6px] border-white/80 bg-gradient-to-br from-[#C9B99A] to-[#8C5A3C]/60 shadow-soft" />
      <div className="absolute left-[8%] top-[40%] h-28 w-28 rounded-full bg-gold/20 blur-3xl" />

      <div className="relative flex min-h-[300px] items-end md:min-h-[380px]">
        <SofaIllustration
          spec={{ design: "corner", arms: "slim" }}
          colour={colour.hex}
          className="relative z-10 w-full drop-shadow-sm"
          title={`Verona corner sofa in ${colour.name}`}
        />
      </div>

      <Link
        href="/products/verona-sofa"
        className="group absolute left-5 top-5 z-20 rounded-2xl bg-white/95 p-4 shadow-soft backdrop-blur transition-transform hover:-translate-y-0.5 md:left-8 md:top-8"
      >
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-clay">Best seller</p>
        <p className="mt-0.5 font-display text-lg font-semibold text-charcoal">Verona Corner Sofa</p>
        <p className="font-body text-sm text-charcoal/60">
          In <span className="font-medium text-charcoal">{colour.name}</span> · <span className="font-semibold text-forest">£949</span>
        </p>
        <span className="mt-2 inline-flex items-center gap-1 font-body text-xs font-medium text-forest">
          View sofa <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>

      <div className="absolute bottom-5 right-5 z-20 flex items-center gap-1.5 rounded-full bg-white/95 p-1.5 shadow-soft backdrop-blur md:bottom-8 md:right-8">
        {colours.map((c, i) => (
          <button
            key={c.name}
            onClick={() => setActive(i)}
            aria-label={`Show in ${c.name}`}
            className={`h-6 w-6 rounded-full ring-1 ring-charcoal/10 transition-transform ${
              i === active ? "scale-110 ring-2 ring-charcoal ring-offset-2" : "hover:scale-110"
            }`}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </div>
  );
}

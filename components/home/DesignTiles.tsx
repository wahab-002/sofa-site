import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import { designCategories } from "@/lib/site";

export default function DesignTiles() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
      {designCategories.map((d, i) => (
        <Link
          key={d.slug}
          href={`/shop/${d.slug}`}
          className="group flex flex-col overflow-hidden rounded-[1.25rem] bg-white shadow-[0_18px_40px_-28px_rgba(28,27,26,0.45)] ring-1 ring-charcoal/[0.06] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_32px_56px_-30px_rgba(28,27,26,0.5)]"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-sand">
            <Image
              src={`${d.image}?v=12`}
              alt={d.label}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              priority={i < 3}
            />
            <div
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20"
              aria-hidden="true"
            />
          </div>

          <div className="flex flex-1 items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5">
            <div className="min-w-0">
              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-clay">
                Collection
              </p>
              <h3 className="mt-1 font-display text-[1.35rem] font-semibold tracking-tight text-charcoal md:text-[1.55rem]">
                {d.label}
              </h3>
              <p className="mt-1 font-body text-sm text-charcoal/50">{d.desc}</p>
            </div>
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-forest text-linen transition-all duration-300 group-hover:translate-x-1 group-hover:bg-forest-dark">
              <Icon name="arrow" className="h-4 w-4" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

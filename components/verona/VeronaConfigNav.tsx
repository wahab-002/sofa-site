import Link from "next/link";
import { VERONA_CONFIGS, type VeronaConfigId, type VeronaStyleId } from "@/lib/verona";

type Props = {
  style: VeronaStyleId;
  config: VeronaConfigId;
};

export default function VeronaConfigNav({ style, config }: Props) {
  return (
    <nav
      aria-label="Verona size options"
      className="no-scrollbar -mx-5 mt-6 flex gap-2 overflow-x-auto px-5 py-1.5 md:mx-0 md:flex-wrap md:p-1.5"
    >
      {VERONA_CONFIGS.map((c) => {
        const isActive = c.id === config;
        return (
          <Link
            key={c.id}
            href={`/products/verona-sofa/${style}/${c.id}`}
            aria-current={isActive ? "page" : undefined}
            className={`flex-shrink-0 rounded-full px-4 py-2 font-body text-sm ring-1 transition-colors ${
              isActive
                ? "bg-charcoal text-linen ring-charcoal"
                : "bg-white text-charcoal/75 ring-charcoal/10 hover:ring-charcoal/30"
            }`}
          >
            {c.shortLabel}
          </Link>
        );
      })}
    </nav>
  );
}

import Link from "next/link";
import { LILY_CONFIGS, type LilyConfigId } from "@/lib/lily";

type Props = {
  active: LilyConfigId;
};

export default function LilyConfigNav({ active }: Props) {
  return (
    <nav
      aria-label="Lily size options"
      className="no-scrollbar -mx-5 mt-6 flex gap-2 overflow-x-auto px-5 py-1.5 md:mx-0 md:flex-wrap md:p-1.5"
    >
      {LILY_CONFIGS.map((c) => {
        const isActive = c.id === active;
        return (
          <Link
            key={c.id}
            href={`/products/lily-sofa/${c.id}`}
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

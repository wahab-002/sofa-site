import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex flex-shrink-0 items-center gap-2.5" aria-label="The Sofa Hub home">
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${light ? "bg-linen text-forest" : "bg-forest text-linen"}`}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M6 7.5A2.5 2.5 0 0 1 8.5 5h7A2.5 2.5 0 0 1 18 7.5V11H6z" opacity="0.55" />
          <path d="M3 11.5a2 2 0 0 1 4 0V13h10v-1.5a2 2 0 0 1 4 0V17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
          <rect x="5" y="18" width="2" height="2" rx="0.5" />
          <rect x="17" y="18" width="2" height="2" rx="0.5" />
        </svg>
      </span>
      <span className={`font-display text-xl font-semibold tracking-tight ${light ? "text-linen" : "text-charcoal"}`}>
        The Sofa Hub
      </span>
    </Link>
  );
}

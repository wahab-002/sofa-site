import Link from "next/link";

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-body text-sm text-charcoal/50">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <span className="text-charcoal/25">/</span>}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-charcoal">
                {item.label}
              </Link>
            ) : (
              <span className="text-charcoal/80">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

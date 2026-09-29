import Link from "next/link";
import Image from "next/image";

type Props = {
  /** Use the white logo on dark backgrounds. */
  light?: boolean;
  /** Stacked layout (icon above the name) instead of side by side. */
  stacked?: boolean;
  className?: string;
  priority?: boolean;
};

export default function Logo({ light = false, stacked = false, className, priority = false }: Props) {
  const colour = light ? "white" : "dark";
  const src = stacked ? `/brand/logo-stacked-${colour}.png` : `/brand/logo-horizontal-${colour}.png`;
  const [width, height] = stacked ? [370, 304] : [488, 100];

  return (
    <Link href="/" className="flex flex-shrink-0 items-center" aria-label="The Sofa Hub home">
      <Image
        src={src}
        alt="The Sofa Hub — Furniture Store"
        width={width}
        height={height}
        priority={priority}
        className={className ?? (stacked ? "h-auto w-40" : "h-10 w-auto md:h-12")}
      />
    </Link>
  );
}

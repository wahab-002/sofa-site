import Link from "next/link";
import Image from "next/image";

type Props = {
  /** Use the white logo on dark backgrounds. */
  light?: boolean;
  /** Stacked layout (icon above the name) instead of side by side. */
  stacked?: boolean;
  /** When false, render brand mark with no home link (e.g. wholesale shell). */
  linked?: boolean;
  className?: string;
  priority?: boolean;
};

export default function Logo({
  light = false,
  stacked = false,
  linked = true,
  className,
  priority = false,
}: Props) {
  const colour = light ? "white" : "dark";
  const src = stacked ? `/brand/logo-stacked-${colour}.svg` : `/brand/logo-horizontal-${colour}.svg`;
  const [width, height] = stacked ? [370, 304] : [490, 100];

  const image = (
    <Image
      src={src}
      alt="The Sofa Hub — Furniture Store"
      width={width}
      height={height}
      priority={priority}
      unoptimized
      className={className ?? (stacked ? "h-auto w-40" : "h-10 w-auto md:h-12")}
    />
  );

  if (!linked) {
    return <div className="flex flex-shrink-0 items-center">{image}</div>;
  }

  return (
    <Link href="/" className="flex flex-shrink-0 items-center" aria-label="The Sofa Hub home">
      {image}
    </Link>
  );
}

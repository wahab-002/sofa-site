/**
 * Bold iconic sofa silhouettes for "Shop by design" tiles.
 * Flat, cartoon, readable at small size — not photoreal.
 */
import type { DesignSlug } from "@/lib/site";

type Props = {
  design: DesignSlug;
  colour: string;
  className?: string;
  title?: string;
};

function shade(hex: string, amount: number) {
  const n = hex.replace("#", "");
  const r = Math.max(0, Math.min(255, parseInt(n.slice(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(n.slice(2, 4), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(n.slice(4, 6), 16) + amount));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

const OUT = "rgba(28,27,26,0.22)";
const LEG = "#2A211B";

function Soft({ d, fill, light = false }: { d: string; fill: string; light?: boolean }) {
  return (
    <>
      <path d={d} fill={fill} stroke={OUT} strokeWidth={2.5} strokeLinejoin="round" />
      {light && <path d={d} fill="#fff" opacity={0.12} />}
    </>
  );
}

function Feet(xs: number[], y: number) {
  return xs.map((x) => <rect key={x} x={x} y={y} width={8} height={12} rx={3} fill={LEG} />);
}

function CornerArt({ c }: { c: string }) {
  const mid = shade(c, 18);
  const dark = shade(c, -22);
  return (
    <g>
      <ellipse cx="110" cy="148" rx="88" ry="10" fill="#000" opacity={0.1} />
      {/* L back */}
      <Soft d="M28 48h92c10 0 16 8 16 18v52H44c-10 0-16-8-16-18V48z" fill={dark} />
      <Soft d="M28 48h40c8 0 12 6 12 14v40H40c-8 0-12-6-12-14V48z" fill={mid} light />
      <Soft d="M76 48h44c8 0 12 6 12 14v40H88c-8 0-12-6-12-14V48z" fill={mid} light />
      {/* Seat + chaise */}
      <Soft d="M24 108h120c8 0 12 6 12 12v28c0 8-6 14-14 14H38c-8 0-14-6-14-14v-28c0-6 4-12 12-12z" fill={c} />
      <Soft d="M132 108h52c10 0 16 8 16 18v34c0 8-6 14-14 14h-42c-8 0-12-6-12-14v-52z" fill={c} />
      <Soft d="M136 100h44c8 0 12 5 12 12v20H148c-8 0-12-5-12-12v-20z" fill={mid} light />
      <Soft d="M32 100h104c6 0 10 4 10 10v14H42c-6 0-10-4-10-10v-14z" fill={mid} light />
      {/* Arm */}
      <Soft d="M18 78h28c14 0 22 10 22 24v44H28c-10 0-16-8-16-18V90c0-8 4-12 14-12z" fill={c} />
      {Feet([36, 118, 168], 156)}
    </g>
  );
}

function SetArt({ c, pieces }: { c: string; pieces: number[] }) {
  const mid = shade(c, 16);
  const dark = shade(c, -20);
  const gap = 14;
  const pieceW = (seats: number) => 36 + seats * 28;
  const total = pieces.reduce((s, n) => s + pieceW(n), 0) + gap * (pieces.length - 1);
  let x = (220 - total) / 2;

  return (
    <g>
      <ellipse cx="110" cy="148" rx={total / 2 + 8} ry="9" fill="#000" opacity={0.1} />
      {pieces.map((seats, pi) => {
        const w = pieceW(seats);
        const start = x;
        x += w + gap;
        return (
          <g key={pi} transform={`translate(${start},0)`}>
            <Soft d={`M10 52h${w - 20}c10 0 16 8 16 18v48H10c-8 0-14-6-14-14V66c0-8 6-14 14-14z`} fill={dark} />
            {Array.from({ length: seats }, (_, i) => {
              const cx = 18 + i * ((w - 36) / seats);
              const cw = (w - 36) / seats - 4;
              return <Soft key={i} d={`M${cx} 56h${cw}c6 0 10 5 10 11v36H${cx - 4}c-6 0-10-5-10-11V66c0-6 4-10 10-10z`} fill={mid} light />;
            })}
            <Soft d={`M6 108h${w - 12}c8 0 12 6 12 12v26c0 8-6 14-14 14H20c-8 0-14-6-14-14v-26c0-6 4-12 12-12z`} fill={c} />
            <Soft d={`M14 100h${w - 28}c6 0 10 4 10 10v16H24c-6 0-10-4-10-10v-16z`} fill={mid} light />
            <Soft d="M0 82h22c12 0 18 8 18 20v42H10c-8 0-14-6-14-14V94c0-8 4-12 14-12z" fill={c} />
            <Soft d={`M${w - 22} 82h22c10 0 14 4 14 12v36c0 8-6 14-14 14h-28V102c0-12 6-20 18-20z`} fill={c} />
            {Feet([12, w - 20], 156)}
          </g>
        );
      })}
    </g>
  );
}

function ChesterfieldArt({ c }: { c: string }) {
  const mid = shade(c, 14);
  const dark = shade(c, -24);
  const dots = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 7; col++) {
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={52 + col * 18 + (row % 2) * 9}
          cy={62 + row * 16}
          r={2.4}
          fill="#000"
          opacity={0.28}
        />,
      );
    }
  }
  return (
    <g>
      <ellipse cx="110" cy="150" rx="92" ry="10" fill="#000" opacity={0.1} />
      <Soft d="M36 44h148c12 0 20 10 20 22v58H36c-12 0-20-10-20-22V66c0-12 8-22 20-22z" fill={dark} />
      {dots}
      <Soft d="M28 112h164c10 0 16 8 16 16v28c0 10-8 18-18 18H46c-10 0-18-8-18-18v-28c0-8 6-16 16-16z" fill={c} />
      <Soft d="M40 104h140c8 0 12 5 12 12v18H52c-8 0-12-5-12-12v-18z" fill={mid} light />
      {/* Rolled arms */}
      <ellipse cx="30" cy="100" rx="22" ry="28" fill={c} stroke={OUT} strokeWidth={2.5} />
      <ellipse cx="30" cy="92" rx="12" ry="10" fill="#fff" opacity={0.15} />
      <ellipse cx="190" cy="100" rx="22" ry="28" fill={c} stroke={OUT} strokeWidth={2.5} />
      <ellipse cx="190" cy="92" rx="12" ry="10" fill="#fff" opacity={0.15} />
      {[78, 100, 122].map((y) => (
        <g key={y}>
          <circle cx="30" cy={y} r={2} fill="#000" opacity={0.25} />
          <circle cx="190" cy={y} r={2} fill="#000" opacity={0.25} />
        </g>
      ))}
      <circle cx="34" cy="160" r="7" fill={LEG} />
      <circle cx="186" cy="160" r="7" fill={LEG} />
    </g>
  );
}

function UShapeArt({ c }: { c: string }) {
  const mid = shade(c, 16);
  const dark = shade(c, -20);
  return (
    <g>
      <ellipse cx="110" cy="152" rx="96" ry="10" fill="#000" opacity={0.1} />
      <Soft d="M40 46h140c10 0 16 8 16 18v50H40c-10 0-16-8-16-18V64c0-10 6-18 16-18z" fill={dark} />
      <Soft d="M48 52h40c6 0 10 5 10 11v36H56c-6 0-10-5-10-11V62c0-6 4-10 10-10z" fill={mid} light />
      <Soft d="M96 52h40c6 0 10 5 10 11v36H104c-6 0-10-5-10-11V62c0-6 4-10 10-10z" fill={mid} light />
      <Soft d="M144 52h36c6 0 10 5 10 11v36H152c-6 0-10-5-10-11V62c0-6 4-10 10-10z" fill={mid} light />
      {/* Seat U */}
      <Soft d="M24 106h52c8 0 12 6 12 14v42c0 8-6 14-14 14H38c-8 0-14-6-14-14v-42c0-8 4-14 12-14z" fill={c} />
      <Soft d="M76 106h68c8 0 12 6 12 12v28c0 8-6 14-14 14H90c-8 0-14-6-14-14v-28c0-6 4-12 12-12z" fill={c} />
      <Soft d="M144 106h52c8 0 12 6 12 14v42c0 8-6 14-14 14h-36c-8 0-14-6-14-14v-42c0-8 4-14 12-14z" fill={c} />
      <Soft d="M32 98h36c6 0 10 4 10 10v16H42c-6 0-10-4-10-10V98z" fill={mid} light />
      <Soft d="M84 98h52c6 0 10 4 10 10v16H94c-6 0-10-4-10-10V98z" fill={mid} light />
      <Soft d="M152 98h36c6 0 10 4 10 10v16H162c-6 0-10-4-10-10V98z" fill={mid} light />
      <Soft d="M14 78h26c12 0 18 8 18 20v52H24c-10 0-16-8-16-18V90c0-8 4-12 14-12z" fill={c} />
      <Soft d="M180 78h26c10 0 14 4 14 12v42c0 10-6 18-16 18h-30V98c0-12 6-20 18-20z" fill={c} />
      {Feet([28, 100, 184], 160)}
    </g>
  );
}

function ModularArt({ c }: { c: string }) {
  const mid = shade(c, 16);
  const dark = shade(c, -18);
  const blocks = [
    { x: 18, y: 48 },
    { x: 78, y: 48 },
    { x: 138, y: 48 },
    { x: 48, y: 108 },
    { x: 108, y: 108 },
  ];
  return (
    <g>
      <ellipse cx="110" cy="168" rx="90" ry="9" fill="#000" opacity={0.1} />
      {blocks.map((b, i) => (
        <g key={i} transform={`translate(${b.x},${b.y})`}>
          <Soft d="M4 8h48c8 0 12 6 12 12v36H8c-8 0-12-6-12-12V20c0-8 4-12 12-12z" fill={dark} />
          <Soft d="M10 14h36c6 0 8 4 8 8v24H14c-6 0-8-4-8-8V22c0-4 2-8 8-8z" fill={mid} light />
          <Soft d="M0 48h56c6 0 10 4 10 10v18c0 6-4 10-10 10H10c-6 0-10-4-10-10V58c0-6 4-10 10-10z" fill={c} />
          <Soft d="M6 42h44c4 0 8 3 8 8v12H14c-4 0-8-3-8-8V50c0-5 4-8 8-8z" fill={mid} light />
          <rect x={10} y={82} width={36} height={6} rx={2} fill={LEG} opacity={0.9} />
        </g>
      ))}
    </g>
  );
}

export default function DesignSofaIcon({ design, colour, className = "", title }: Props) {
  let art;
  switch (design) {
    case "corner-sofas":
      art = <CornerArt c={colour} />;
      break;
    case "3-2-sofa-sets":
      art = <SetArt c={colour} pieces={[3, 2]} />;
      break;
    case "chesterfield-sofas":
      art = <ChesterfieldArt c={colour} />;
      break;
    case "u-shape-sofas":
      art = <UShapeArt c={colour} />;
      break;
    case "3-2-1-full-sets":
      art = <SetArt c={colour} pieces={[3, 2, 1]} />;
      break;
    case "modular-sofas":
      art = <ModularArt c={colour} />;
      break;
    default:
      art = <SetArt c={colour} pieces={[3]} />;
  }

  return (
    <svg
      viewBox="0 0 220 175"
      className={className}
      role="img"
      aria-label={title ?? "Sofa design"}
      preserveAspectRatio="xMidYMax meet"
    >
      {art}
    </svg>
  );
}

import type { ReactNode } from "react";

export type ArmStyle = "square" | "round" | "slim";
export type SofaDesign = "sofa" | "chesterfield" | "corner" | "u-shape" | "modular";

export type IllustrationSpec = {
  design: SofaDesign;
  /** Seat counts of each piece shown side by side, e.g. [3, 2] for a 3+2 set. */
  pieces?: number[];
  modules?: number;
  arms?: ArmStyle;
};

const LEG = "#2A211B";
const OUTLINE = "rgba(28,27,26,0.14)";
const SEAT_W = 92;
const PIECE_GAP = 36;

const ARM: Record<ArmStyle, { w: number; r: number; cushion: number }> = {
  square: { w: 40, r: 6, cushion: 8 },
  round: { w: 48, r: 22, cushion: 16 },
  slim: { w: 26, r: 10, cushion: 12 },
};

type Rect = { x: number; y: number; w: number; h: number; r?: number };

function Block({ x, y, w, h, r = 0, colour, shade = 0, light = 0 }: Rect & { colour: string; shade?: number; light?: number }) {
  return (
    <>
      <rect data-fill x={x} y={y} width={w} height={h} rx={r} fill={colour} stroke={OUTLINE} strokeWidth={1} />
      {shade > 0 && <rect x={x} y={y} width={w} height={h} rx={r} fill="#000" opacity={shade} />}
      {light > 0 && <rect x={x} y={y} width={w} height={Math.min(h, h * 0.45)} rx={r} fill="#fff" opacity={light} />}
    </>
  );
}

function Leg({ x, y, h = 14 }: { x: number; y: number; h?: number }) {
  return <rect x={x} y={y} width={7} height={h} rx={2} fill={LEG} />;
}

function Shadow({ w, y = 188 }: { w: number; y?: number }) {
  return <ellipse cx={w / 2} cy={y} rx={w / 2 + 6} ry={7} fill="#000" opacity={0.1} />;
}

function backCushions(start: number, widths: number[], colour: string, r: number) {
  let x = start;
  return widths.map((width, i) => {
    const node = <Block key={`bc${i}`} x={x + 4} y={46} w={width - 8} h={76} r={r} colour={colour} light={0.1} />;
    x += width;
    return node;
  });
}

function seatCushions(start: number, count: number, colour: string, r: number, y = 116) {
  return Array.from({ length: count }, (_, i) => (
    <Block key={`sc${i}`} x={start + i * SEAT_W + 3} y={y} w={SEAT_W - 6} h={30} r={r * 0.8} colour={colour} light={0.08} />
  ));
}

type Piece = { width: number; render: (colour: string) => ReactNode };

function sofaPiece(seats: number, arms: ArmStyle): Piece {
  const a = ARM[arms];
  const inner = a.w;
  const span = seats * SEAT_W;
  const width = a.w * 2 + span;
  return {
    width,
    render: (c) => (
      <>
        <Shadow w={width} />
        <Block x={inner - 8} y={38} w={span + 16} h={110} r={a.cushion + 4} colour={c} shade={0.18} />
        {backCushions(inner, Array(seats).fill(SEAT_W), c, a.cushion)}
        <Block x={inner - 2} y={132} w={span + 4} h={42} r={4} colour={c} shade={0.22} />
        {seatCushions(inner, seats, c, a.cushion)}
        <Block x={0} y={84} w={a.w} h={92} r={a.r} colour={c} shade={0.05} light={0.12} />
        <Block x={inner + span} y={84} w={a.w} h={92} r={a.r} colour={c} shade={0.05} light={0.12} />
        <Leg x={a.w * 0.4} y={174} />
        <Leg x={width - a.w * 0.4 - 7} y={174} />
      </>
    ),
  };
}

function chesterfieldPiece(seats: number): Piece {
  const armW = 46;
  const span = seats * SEAT_W;
  const width = armW * 2 + span;
  const dots: ReactNode[] = [];
  [64, 82, 100].forEach((y, row) => {
    for (let x = armW + 10 + (row % 2) * 11; x < width - armW - 6; x += 22) {
      dots.push(<circle key={`d${x}-${y}`} cx={x} cy={y} r={2.2} fill="#000" opacity={0.3} />);
    }
  });
  const arm = (x: number, c: string, key: string) => (
    <g key={key}>
      <Block x={x} y={70} w={armW} h={104} r={6} colour={c} shade={0.04} />
      <ellipse data-fill cx={x + armW / 2} cy={72} rx={armW / 2 + 5} ry={15} fill={c} stroke={OUTLINE} />
      <ellipse cx={x + armW / 2} cy={68} rx={armW / 2 - 4} ry={7} fill="#fff" opacity={0.14} />
      {[102, 124, 146].map((y) => (
        <circle key={y} cx={x + armW / 2} cy={y} r={2} fill="#000" opacity={0.28} />
      ))}
    </g>
  );
  return {
    width,
    render: (c) => (
      <>
        <Shadow w={width} />
        <Block x={6} y={52} w={width - 12} h={100} r={8} colour={c} shade={0.1} />
        {dots}
        <Block x={armW - 4} y={138} w={span + 8} h={36} r={3} colour={c} shade={0.22} />
        {seatCushions(armW, seats, c, 6, 118)}
        {arm(0, c, "l")}
        {arm(width - armW, c, "r")}
        <circle cx={armW * 0.5} cy={181} r={6} fill={LEG} />
        <circle cx={width - armW * 0.5} cy={181} r={6} fill={LEG} />
      </>
    ),
  };
}

function cornerPiece(arms: ArmStyle, doubleEnded: boolean): Piece {
  const a = ARM[arms];
  const endArm = Math.min(a.w, 30);
  const chaise = 128;
  const span = 3 * SEAT_W;
  const leftW = doubleEnded ? endArm + chaise : a.w;
  const width = leftW + span + chaise + endArm;
  const seatStart = leftW;
  const seatEnd = seatStart + span;

  const chaiseBlock = (x: number, c: string, key: string) => (
    <g key={key}>
      <Block x={x} y={128} w={chaise} h={58} r={4} colour={c} shade={0.26} />
      <Block x={x + 2} y={110} w={chaise - 4} h={30} r={a.cushion} colour={c} light={0.08} />
    </g>
  );

  return {
    width,
    render: (c) => (
      <>
        <Shadow w={width} y={193} />
        <Block
          x={(doubleEnded ? endArm : a.w) - 8}
          y={38}
          w={width - (doubleEnded ? endArm * 2 : a.w + endArm) + 16}
          h={110}
          r={a.cushion + 4}
          colour={c}
          shade={0.18}
        />
        {backCushions(
          doubleEnded ? endArm : seatStart,
          doubleEnded ? [chaise, ...Array(3).fill(SEAT_W), chaise] : [...Array(3).fill(SEAT_W), chaise],
          c,
          a.cushion,
        )}
        <Block x={seatStart - 2} y={132} w={span + 4} h={42} r={4} colour={c} shade={0.22} />
        {seatCushions(seatStart, 3, c, a.cushion)}
        {doubleEnded && chaiseBlock(endArm, c, "cl")}
        {chaiseBlock(seatEnd, c, "cr")}
        {doubleEnded ? (
          <>
            <Block x={0} y={84} w={endArm} h={102} r={a.r} colour={c} shade={0.05} light={0.12} />
            <Leg x={endArm * 0.5 - 3} y={186} h={10} />
          </>
        ) : (
          <>
            <Block x={0} y={84} w={a.w} h={92} r={a.r} colour={c} shade={0.05} light={0.12} />
            <Leg x={a.w * 0.4} y={174} />
          </>
        )}
        <Block x={seatEnd + chaise} y={84} w={endArm} h={102} r={a.r} colour={c} shade={0.05} light={0.12} />
        <Leg x={width - endArm * 0.5 - 3} y={186} h={10} />
      </>
    ),
  };
}

function modularPiece(modules: number): Piece {
  const mw = 100;
  const gap = 5;
  const width = modules * mw + (modules - 1) * gap;
  return {
    width,
    render: (c) => (
      <>
        <Shadow w={width} y={186} />
        {Array.from({ length: modules }, (_, i) => {
          const x = i * (mw + gap);
          return (
            <g key={i}>
              <Block x={x} y={44} w={mw} h={98} r={12} colour={c} shade={0.16} />
              <Block x={x + 5} y={50} w={mw - 10} h={70} r={12} colour={c} light={0.1} />
              <Block x={x} y={130} w={mw} h={46} r={6} colour={c} shade={0.22} />
              <Block x={x + 3} y={114} w={mw - 6} h={30} r={10} colour={c} light={0.08} />
              <rect x={x + 6} y={176} width={mw - 12} height={6} rx={2} fill={LEG} opacity={0.85} />
            </g>
          );
        })}
      </>
    ),
  };
}

function buildPieces(spec: IllustrationSpec): Piece[] {
  const arms = spec.arms ?? "square";
  switch (spec.design) {
    case "corner":
      return [cornerPiece(arms, false)];
    case "u-shape":
      return [cornerPiece(arms, true)];
    case "modular":
      return [modularPiece(spec.modules ?? 4)];
    case "chesterfield":
      return (spec.pieces ?? [3]).map((s) => chesterfieldPiece(s));
    default:
      return (spec.pieces ?? [3]).map((s) => sofaPiece(s, arms));
  }
}

export default function SofaIllustration({
  spec,
  colour,
  className = "",
  title,
  minCanvas = 0,
}: {
  spec: IllustrationSpec;
  colour: string;
  className?: string;
  title?: string;
  /** Minimum drawing width, so smaller sofas render at a true relative scale. */
  minCanvas?: number;
}) {
  const pieces = buildPieces(spec);
  const totalWidth = pieces.reduce((sum, p) => sum + p.width, 0) + PIECE_GAP * (pieces.length - 1);
  const canvasWidth = Math.max(totalWidth, minCanvas);
  const offset = (canvasWidth - totalWidth) / 2;

  let x = offset;
  return (
    <svg
      viewBox={`-10 20 ${canvasWidth + 20} 185`}
      className={`sofa-art ${className}`}
      role="img"
      aria-label={title ?? "Sofa illustration"}
      preserveAspectRatio="xMidYMax meet"
    >
      {pieces.map((piece, i) => {
        const node = (
          <g key={i} transform={`translate(${x},0)`}>
            {piece.render(colour)}
          </g>
        );
        x += piece.width + PIECE_GAP;
        return node;
      })}
    </svg>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const COLS = 16;
const ROWS = 9;
const VW = 1440;
const VH = 810;
const DX = VW / (COLS - 1);
const DY = VH / (ROWS - 1);

interface GridNode {
  x: number;
  y: number;
  bright: boolean;
  id: string;
  delay: number;
}

interface GridLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

const nodes: GridNode[] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    nodes.push({
      x: c * DX,
      y: r * DY,
      bright: (c * 3 + r * 7 + c * r) % 11 === 0,
      id: `${c}-${r}`,
      delay: ((c * 0.3 + r * 0.5) % 3),
    });
  }
}

const lines: GridLine[] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const x = c * DX;
    const y = r * DY;
    if (c < COLS - 1) lines.push({ x1: x, y1: y, x2: (c + 1) * DX, y2: y });
    if (r < ROWS - 1) lines.push({ x1: x, y1: y, x2: x, y2: (r + 1) * DY });
  }
}

export default function NodeGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, -135]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 select-none overflow-hidden">
      <motion.div style={{ y }} className="h-full w-full">
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="fadeOut" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="gridFade">
              <rect width={VW} height={VH} fill="url(#fadeOut)" />
            </mask>
          </defs>
          <g mask="url(#gridFade)">
            {lines.map((l, i) => (
              <line
                key={i}
                x1={l.x1}
                y1={l.y1}
                x2={l.x2}
                y2={l.y2}
                stroke="#1F2D45"
                strokeWidth="0.6"
              />
            ))}
            {nodes.map((n) =>
              n.bright ? (
                <motion.circle
                  key={n.id}
                  cx={n.x}
                  cy={n.y}
                  r="3.5"
                  fill="#00C9B1"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: n.delay,
                    ease: "easeInOut",
                  }}
                />
              ) : (
                <circle key={n.id} cx={n.x} cy={n.y} r="2" fill="#1F2D45" />
              )
            )}
          </g>
        </svg>
      </motion.div>
    </div>
  );
}

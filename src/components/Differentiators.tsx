"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";

const FRAMES = [
  {
    tag: "/01",
    claim: "Weniger Komplexität.\nMehr Wirkung.",
    stat: "73%",
    statLabel: "unserer Projekte werden ahead of schedule geliefert",
    body: "Wir lösen, was andere dokumentieren. ITCON bringt IT-Projekte zum Ziel — nicht durch Bürokratie, sondern durch technische Exzellenz und direkte Verantwortung.",
  },
  {
    tag: "/02",
    claim: "Technologie ist Mittel.\nErgebnis ist Ziel.",
    stat: "140+",
    statLabel: "erfolgreich abgeschlossene Transformationsprojekte",
    body: "Jede Entscheidung wird am messbaren Geschäftsergebnis gemessen. Kein Feature ohne klaren Mehrwert. Keine Investition ohne Return.",
  },
  {
    tag: "/03",
    claim: "Kein Projekt.\nKein Problem.",
    stat: "98%",
    statLabel: "Kundenzufriedenheit über alle abgeschlossenen Projekte",
    body: "Unsere Kunden bleiben — weil wir liefern. ITCON ist kein Anbieter. Wir sind Partner auf Zeit, der erst dann geht, wenn das Ergebnis steht.",
  },
];

const TOTAL = FRAMES.length;
// Crossfade half-window as a fraction of total scroll progress.
// Each frame transition takes CROSS * 2 of the 0–1 range.
const CROSS = 0.04;

function getInputRange(index: number): number[] {
  const seg = 1 / TOTAL;
  if (index === 0) {
    return [0, seg - CROSS, seg + CROSS];
  } else if (index === TOTAL - 1) {
    const boundary = index * seg;
    return [boundary - CROSS, boundary + CROSS, 1];
  } else {
    const inBoundary = index * seg;
    const outBoundary = (index + 1) * seg;
    return [inBoundary - CROSS, inBoundary + CROSS, outBoundary - CROSS, outBoundary + CROSS];
  }
}

function getOpacityOutput(index: number): number[] {
  if (index === 0) return [1, 1, 0];
  if (index === TOTAL - 1) return [0, 1, 1];
  return [0, 1, 1, 0];
}

function getYOutput(index: number): number[] {
  if (index === 0) return [0, 0, -12];
  if (index === TOTAL - 1) return [12, 0, 0];
  return [12, 0, 0, -12];
}

function ProgressDot({
  scrollYProgress,
  index,
}: {
  scrollYProgress: MotionValue<number>;
  index: number;
}) {
  const seg = 1 / TOTAL;
  const center = index * seg + seg / 2;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, center - seg / 2), center, Math.min(1, center + seg / 2)],
    [0.3, 1, 0.3]
  );
  return <motion.div style={{ opacity }} className="h-1.5 w-1.5 rounded-full bg-teal" />;
}

function Frame({
  frame,
  scrollYProgress,
  index,
}: {
  frame: (typeof FRAMES)[0];
  scrollYProgress: MotionValue<number>;
  index: number;
}) {
  const inputRange = getInputRange(index);
  const opacity = useTransform(scrollYProgress, inputRange, getOpacityOutput(index));
  const y = useTransform(scrollYProgress, inputRange, getYOutput(index));

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center px-12 lg:px-24"
    >
      <div className="max-w-4xl">
        <span className="font-mono text-sm tracking-widest text-teal">{frame.tag}</span>
        <h2
          className="mt-6 font-display font-bold leading-none tracking-tight text-chalk whitespace-pre-line"
          style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)" }}
        >
          {frame.claim}
        </h2>
        <div className="mt-10 flex flex-wrap items-end gap-5">
          <span
            className="font-mono font-medium text-primary leading-none"
            style={{ fontSize: "clamp(3rem, 7vw, 7rem)" }}
          >
            {frame.stat}
          </span>
          <span className="mb-3 max-w-xs font-body text-sm text-muted leading-snug">
            {frame.statLabel}
          </span>
        </div>
        <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-muted">
          {frame.body}
        </p>
      </div>
    </motion.div>
  );
}

export default function Differentiators() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (reduce) {
    return (
      <section className="bg-stage py-28 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-center gap-3">
            <span className="h-px w-10 bg-teal" />
            <span className="font-mono text-xs tracking-widest text-teal">/WARUM ITCON</span>
          </div>
          <div className="grid gap-16 lg:grid-cols-3">
            {FRAMES.map((frame) => (
              <div key={frame.tag}>
                <span className="font-mono text-sm text-teal">{frame.tag}</span>
                <h2
                  className="mt-4 font-display font-bold text-chalk leading-tight whitespace-pre-line"
                  style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
                >
                  {frame.claim}
                </h2>
                <p className="mt-4 font-body text-muted leading-relaxed text-sm">{frame.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    // h-[300vh] gives the pin its scroll travel: 300vh container − 100vh sticky = 200vh of pinned scrolling
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-stage">
        {/* Section label */}
        <div className="absolute top-8 left-8 z-10 flex items-center gap-3">
          <span className="h-px w-8 bg-teal" />
          <span className="font-mono text-xs tracking-widest text-teal">/WARUM ITCON</span>
        </div>

        {/* Progress dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
          {FRAMES.map((_, i) => (
            <ProgressDot key={i} scrollYProgress={scrollYProgress} index={i} />
          ))}
        </div>

        {/* Frames cross-fade in place — no horizontal translation */}
        <div className="relative h-full">
          {FRAMES.map((frame, i) => (
            <Frame key={i} frame={frame} scrollYProgress={scrollYProgress} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

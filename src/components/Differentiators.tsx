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

function ProgressDot({
  scrollYProgress,
  index,
  total,
}: {
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    scrollYProgress,
    [start, (start + end) / 2, end],
    [0.3, 1, 0.3]
  );
  return <motion.div style={{ opacity }} className="h-1.5 w-1.5 rounded-full bg-teal" />;
}

export default function Differentiators() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Container flex track is 300vw wide → -66.667% translates -200vw
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.667%"]);

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
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-stage">
        {/* Section label */}
        <div className="absolute top-8 left-8 z-10 flex items-center gap-3">
          <span className="h-px w-8 bg-teal" />
          <span className="font-mono text-xs tracking-widest text-teal">/WARUM ITCON</span>
        </div>

        {/* Progress indicators */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
          {FRAMES.map((_, i) => (
            <ProgressDot
              key={i}
              scrollYProgress={scrollYProgress}
              index={i}
              total={FRAMES.length}
            />
          ))}
        </div>

        {/* Horizontal scroll track — must be exactly 300vw for the % math to work */}
        <motion.div
          style={{ x, width: "300vw" }}
          className="flex h-full"
        >
          {FRAMES.map((frame, i) => (
            <div
              key={i}
              className="flex h-full w-screen flex-shrink-0 items-center px-12 lg:px-24"
            >
              <div className="max-w-4xl">
                <span className="font-mono text-sm tracking-widest text-teal">{frame.tag}</span>
                <h2
                  className="mt-6 font-display font-bold leading-none tracking-tight text-chalk whitespace-pre-line"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 6.5rem)" }}
                >
                  {frame.claim}
                </h2>
                <div className="mt-10 flex items-end gap-5">
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
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

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

// Differentiators — normal document flow, NO pinned/scrubbed scroll. Each frame
// reveals once with a soft fade + rise when it enters the viewport, then holds
// fully readable. (The previous pinned 300vh version left a large empty scroll
// area and translated the reading copy mid-scroll — both fixed here.)
export default function Differentiators() {
  return (
    <section className="bg-stage py-28 px-6 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-center gap-3">
          <span className="h-px w-10 bg-teal" />
          <span className="font-mono text-xs tracking-widest text-teal">/WARUM ITCON</span>
        </div>

        <div className="space-y-24 lg:space-y-32">
          {FRAMES.map((frame) => (
            <motion.div
              key={frame.tag}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"
            >
              <div className="max-w-3xl">
                <span className="font-mono text-sm tracking-widest text-teal">{frame.tag}</span>
                <h2
                  className="mt-5 font-display font-bold leading-none tracking-tight text-chalk whitespace-pre-line"
                  style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
                >
                  {frame.claim}
                </h2>
                <p className="mt-7 max-w-2xl font-body text-lg leading-relaxed text-muted">
                  {frame.body}
                </p>
              </div>
              <div className="flex items-end gap-4 lg:flex-col lg:items-end lg:text-right">
                <span
                  className="font-mono font-medium text-primary leading-none"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
                >
                  {frame.stat}
                </span>
                <span className="mb-2 max-w-[14rem] font-body text-sm text-muted leading-snug">
                  {frame.statLabel}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

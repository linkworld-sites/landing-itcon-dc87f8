"use client";

import { motion, useReducedMotion } from "framer-motion";

const SERVICES = [
  {
    tag: "/01 Strategie",
    title: "IT-Strategie & Beratung",
    body: "Klare Technologiestrategie, die Ihre Geschäftsziele direkt adressiert. Kein Strategiepapier ohne Umsetzungsplan.",
    highlight: "Roadmapping, Architecture Review, Make-or-Buy",
  },
  {
    tag: "/02 Transformation",
    title: "Digitale Transformation",
    body: "End-to-End-Transformation komplexer IT-Landschaften — von der Legacy-Migration bis zur Cloud-native Architektur.",
    highlight: "Cloud Migration, Modernisierung, Integration",
  },
  {
    tag: "/03 Implementierung",
    title: "Technische Umsetzung",
    body: "Wir liefern. Nicht nur Empfehlungen. Unsere Ingenieure setzen gemeinsam mit Ihren Teams um und transferieren Wissen.",
    highlight: "Agile Delivery, Nearshore-Teams, Code-Reviews",
  },
  {
    tag: "/04 Management",
    title: "IT-Programm & Governance",
    body: "Komplexe Multi-Stakeholder-Programme brauchen Präzision. Wir bringen Struktur in Chaos ohne Bürokratie zu erzeugen.",
    highlight: "PMO, Stakeholder-Management, Risk Mitigation",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="leistungen" className="bg-stage py-28 px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-teal" />
              <span className="font-mono text-xs tracking-widest text-teal">/LEISTUNGEN</span>
            </div>
            <h2
              className="font-display font-bold leading-tight tracking-tight text-chalk"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Was wir liefern.
            </h2>
          </div>
          <p className="max-w-sm font-body text-muted leading-relaxed">
            Vier Schwerpunkte. Eine Maxime: Technologie ist das Mittel. Ergebnis ist das Ziel.
          </p>
        </div>

        {/* Service grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.tag}
              custom={i}
              initial={reduce ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={cardVariants}
              whileHover="hover"
              className="group relative overflow-hidden rounded-xl border border-rim bg-card p-6 transition-colors"
            >
              {/* Left rule */}
              <motion.div
                className="absolute left-0 top-0 h-full w-0.5 bg-teal origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 + 0.3, duration: 0.6, ease: "easeOut" }}
              />

              {/* Hover glow */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse at 20% 50%, rgba(0,201,177,0.08) 0%, transparent 70%)",
                }}
              />

              <span className="font-mono text-xs tracking-wider text-teal">{svc.tag}</span>
              <h3 className="mt-3 font-display text-lg font-bold leading-snug text-chalk">
                {svc.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted">{svc.body}</p>
              <p className="mt-5 font-mono text-xs text-muted/60 border-t border-rim pt-4">
                {svc.highlight}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

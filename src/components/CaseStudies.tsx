"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const CASES = [
  {
    industry: "Finanzdienstleistungen",
    title: "Core-Banking\nModernisierung",
    outcome: "-40%",
    outcomeLabel: "Betriebskosten",
    description:
      "Migration eines 25 Jahre alten Kernbankensystems auf eine cloud-native Microservice-Architektur bei laufendem Betrieb — ohne Produktionsausfall.",
    image: "/images/detail.png",
  },
  {
    industry: "Logistik & Automotive",
    title: "Supply-Chain\nDigitalisierung",
    outcome: "3×",
    outcomeLabel: "Durchsatzsteigerung",
    description:
      "End-to-End-Digitalisierung der Lieferkette für einen Tier-1-Automobilzulieferer: IoT-Integration, Echtzeit-Tracking, prädiktive Analytics.",
    image: "/images/material.png",
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function CaseStudies() {
  const reduce = useReducedMotion();

  return (
    <section id="referenzen" className="bg-stage py-28 px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="font-mono text-xs tracking-widest text-primary">/REFERENZEN</span>
            </div>
            <h2
              className="font-display font-bold leading-tight tracking-tight text-chalk"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Projekte, die zählen.
            </h2>
          </div>
          <p className="max-w-sm font-body text-muted leading-relaxed">
            Nicht Testimonials — messbare Ergebnisse. Zahlen, die sich in Bilanzen niederschlagen.
          </p>
        </div>

        {/* Cases */}
        <div className="grid gap-6 lg:grid-cols-2">
          {CASES.map((c, i) => (
            <motion.div
              key={c.title}
              custom={i}
              initial={reduce ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group relative overflow-hidden rounded-2xl border border-rim bg-card"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                {/* Blue rim glow on hover */}
                <motion.div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: "inset 0 0 40px rgba(0,201,177,0.15)",
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-8">
                <span className="font-mono text-xs tracking-widest text-teal">{c.industry}</span>
                <h3
                  className="mt-3 font-display font-bold leading-tight text-chalk whitespace-pre-line"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
                >
                  {c.title}
                </h3>
                <p className="mt-4 font-body text-sm leading-relaxed text-muted">
                  {c.description}
                </p>

                {/* Outcome metric */}
                <div className="mt-8 flex items-center gap-4 border-t border-rim pt-6">
                  <span className="font-mono text-4xl font-medium text-primary">{c.outcome}</span>
                  <span className="font-body text-sm text-muted">{c.outcomeLabel}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

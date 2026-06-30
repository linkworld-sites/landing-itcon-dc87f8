"use client";

import Image from "next/image";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Discovery & Assessment",
    desc: "Wir analysieren Ihre IT-Landschaft, Ihre Ziele und Ihre Constraints. Ehrlich, direkt, ohne Annahmen.",
    duration: "1–2 Wochen",
  },
  {
    num: "02",
    title: "Strategie & Roadmap",
    desc: "Aus dem Assessment wird ein konkreter Plan — priorisiert, bewertet, mit klaren KPIs versehen.",
    duration: "2–3 Wochen",
  },
  {
    num: "03",
    title: "Umsetzung & Delivery",
    desc: "Unsere Ingenieure arbeiten direkt in Ihrem Team. Agil, transparent, mit wöchentlichen Meilensteinen.",
    duration: "4–24 Wochen",
  },
  {
    num: "04",
    title: "Stabilisierung & Transfer",
    desc: "Wir stabilisieren das System und transferieren Wissen aktiv — damit Ihr Team unabhängig wird.",
    duration: "2–4 Wochen",
  },
  {
    num: "05",
    title: "Hypercare & Review",
    desc: "Nach dem Go-Live bleiben wir präsent. Retrospektive, Feintuning, Optimierungspotenziale.",
    duration: "4 Wochen",
  },
];

function ProcessStep({
  step,
  index,
}: {
  step: (typeof STEPS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduce ? {} : { opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex gap-6"
    >
      {/* Left column: number + line */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={inView ? { borderColor: "#00C9B1", color: "#00C9B1" } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-rim font-mono text-sm text-muted transition-all"
        >
          {step.num}
        </motion.div>
        {index < STEPS.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-2 h-full w-px origin-top bg-rim"
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-12">
        <div className="flex items-center gap-3">
          <h3 className="font-display font-bold text-chalk text-lg">{step.title}</h3>
          <span className="font-mono text-xs text-muted/60 border border-rim rounded-full px-2 py-0.5">
            {step.duration}
          </span>
        </div>
        <p className="mt-2 font-body text-sm leading-relaxed text-muted">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  return (
    <section id="prozess" className="bg-stage py-28 px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-start">
          {/* Left: steps */}
          <div>
            <div className="mb-12 flex items-center gap-3">
              <span className="h-px w-10 bg-teal" />
              <span className="font-mono text-xs tracking-widest text-teal">/PROZESS</span>
            </div>
            <h2
              className="mb-12 font-display font-bold leading-tight tracking-tight text-chalk"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Wie wir arbeiten.
            </h2>
            <div>
              {STEPS.map((step, i) => (
                <ProcessStep key={step.num} step={step} index={i} />
              ))}
            </div>
          </div>

          {/* Right: image + callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-24 flex flex-col gap-6"
          >
            <div className="relative overflow-hidden rounded-2xl border border-rim">
              <Image
                src="/images/process.png"
                alt="ITCON Prozess"
                width={600}
                height={400}
                className="h-72 w-full object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 580px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
            </div>

            {/* Quote card */}
            <div className="rounded-xl border border-teal/20 bg-card p-6">
              <p className="font-body text-base leading-relaxed text-chalk/90 italic">
                &ldquo;Kein Projekt zu groß, kein Problem zu komplex — solange wir es gemeinsam
                angehen.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-navy flex items-center justify-center">
                  <span className="font-mono text-xs text-teal font-bold">MK</span>
                </div>
                <div>
                  <p className="font-body text-sm font-medium text-chalk">Michael Krause</p>
                  <p className="font-mono text-xs text-muted">Managing Partner, ITCON</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

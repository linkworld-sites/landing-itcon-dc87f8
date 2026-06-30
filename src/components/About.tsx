"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const FACTS = [
  { value: "2012", label: "Gegründet" },
  { value: "60+", label: "Berater" },
  { value: "DACH", label: "Markt" },
];

const TEAM = [
  { initials: "MK", role: "Managing Partner" },
  { initials: "SR", role: "Head of Architecture" },
  { initials: "LB", role: "Head of Delivery" },
  { initials: "AN", role: "Lead Consultant" },
  { initials: "TW", role: "CTO Advisory" },
  { initials: "PF", role: "Practice Lead" },
];

export default function About() {
  const reduce = useReducedMotion();

  return (
    <section id="ueber-uns" className="bg-card/30 py-28 px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left: image + facts */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            <div className="relative aspect-square max-w-md overflow-hidden rounded-2xl border border-rim">
              <Image
                src="/images/material.png"
                alt="ITCON Team"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stage/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="font-mono text-xs tracking-widest text-teal">ITCON Team</span>
              </div>
            </div>

            {/* Facts strip */}
            <div className="grid grid-cols-3 gap-4">
              {FACTS.map((f) => (
                <div key={f.label} className="rounded-xl border border-rim bg-card p-4">
                  <p className="font-display text-2xl font-bold text-chalk">{f.value}</p>
                  <p className="mt-1 font-mono text-xs text-muted">{f.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: manifesto + team */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-teal" />
              <span className="font-mono text-xs tracking-widest text-teal">/ÜBER UNS</span>
            </div>

            <h2
              className="font-display font-bold leading-tight tracking-tight text-chalk"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Wir sind kein Anbieter.
              <br />
              Wir sind Partner.
            </h2>

            <div className="mt-8 space-y-5 font-body leading-relaxed text-muted">
              <p>
                ITCON wurde 2012 gegründet, weil wir einen fundamentalen Fehler im deutschen
                IT-Beratungsmarkt erkannten: Zu viele Anbieter liefern Strategiepapiere.
                Zu wenige liefern Ergebnisse.
              </p>
              <p>
                Unser Modell ist anders. Wir binden unsere Vergütung an messbare Outcomes —
                nicht an Stundensätze. Das hält uns scharf, ehrlich und ergebnisorientiert.
              </p>
              <p className="text-chalk/90 font-medium">
                Wir lösen, was andere dokumentieren.
              </p>
            </div>

            {/* Team grid */}
            <div className="mt-10">
              <p className="mb-4 font-mono text-xs tracking-widest text-muted">/TEAM</p>
              <div className="grid grid-cols-3 gap-3">
                {TEAM.map((member) => (
                  <motion.div
                    key={member.initials}
                    whileHover={{ y: -2 }}
                    className="flex flex-col items-center gap-2 rounded-xl border border-rim bg-card p-4 text-center"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-bold text-teal font-mono">
                      {member.initials}
                    </div>
                    <span className="font-body text-xs text-muted leading-tight">{member.role}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

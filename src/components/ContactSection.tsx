"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { track } from "@/lib/funnel";

export default function ContactSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-stage py-36 px-6 lg:px-10">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="font-mono text-xs tracking-widest text-primary">/KONTAKT</span>
            <span className="h-px w-10 bg-primary" />
          </div>

          <h2
            className="font-display font-bold leading-none tracking-tight text-chalk"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            Bereit für den
            <br />
            nächsten Schritt?
          </h2>

          <p className="mx-auto mt-8 max-w-xl font-body text-lg leading-relaxed text-muted">
            Kein Projekt zu groß, kein Problem zu komplex. Sprechen Sie mit uns —
            kostenlos und unverbindlich.
          </p>

          <motion.div
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial={reduce ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/book"
                onClick={() => track("intent")}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-body text-base font-medium text-white shadow-xl shadow-primary/25"
              >
                Projekt anfragen
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>

            <motion.a
              href="mailto:hello@itcon.de"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-2 font-body text-base text-muted transition-colors hover:text-chalk"
            >
              hello@itcon.de
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 4l5 4 5-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Blink cursor decoration */}
        <div className="mt-16 flex justify-center">
          <span className="font-mono text-2xl text-teal animate-blink">_</span>
        </div>
      </div>
    </section>
  );
}

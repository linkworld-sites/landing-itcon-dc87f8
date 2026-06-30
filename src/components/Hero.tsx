"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import NodeGrid from "@/components/NodeGrid";
import CountUp from "@/components/CountUp";
import { track } from "@/lib/funnel";

const HEADLINE_LINE1 = ["IT-Beratung.", "Die wirkt."];

const wordVariants = {
  hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.3 + i * 0.12,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.7 + i * 0.1,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-stage">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-60">
        <NodeGrid />
      </div>

      {/* Gradient overlay — left clear, right fades into dark */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-stage via-stage/70 to-stage/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stage/80 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 pt-24 pb-20 lg:grid-cols-2 lg:px-10 lg:pt-32">
        {/* Left: text */}
        <div className="flex flex-col justify-center">
          {/* Label */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-3"
          >
            <span className="h-px w-10 bg-teal" />
            <span className="font-mono text-xs tracking-widest text-teal">
              IT-TRANSFORMATION / DACH
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display font-bold leading-none tracking-tight text-chalk">
            {HEADLINE_LINE1.map((word, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)" }}
                  custom={i}
                  initial={reduce ? "visible" : "hidden"}
                  animate="visible"
                  variants={wordVariants}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Sub headline */}
          <motion.p
            custom={0}
            initial={reduce ? "visible" : "hidden"}
            animate="visible"
            variants={fadeUp}
            className="mt-8 max-w-md font-body text-lg leading-relaxed text-muted"
          >
            Wir lösen, was andere dokumentieren — von der IT-Strategie bis zur
            vollständigen Implementierung.
          </motion.p>

          {/* Stats row */}
          <motion.div
            custom={1}
            initial={reduce ? "visible" : "hidden"}
            animate="visible"
            variants={fadeUp}
            className="mt-10 flex items-center gap-8 border-t border-rim pt-8"
          >
            <div>
              <div className="font-mono text-3xl font-medium text-primary">
                <CountUp to={147} suffix="+" />
              </div>
              <p className="mt-1 font-body text-xs uppercase tracking-widest text-muted">
                Projekte
              </p>
            </div>
            <div className="h-8 w-px bg-rim" />
            <div>
              <div className="font-mono text-3xl font-medium text-teal">
                <CountUp to={98} suffix="%" />
              </div>
              <p className="mt-1 font-body text-xs uppercase tracking-widest text-muted">
                Zufriedenheit
              </p>
            </div>
            <div className="h-8 w-px bg-rim" />
            <div>
              <div className="font-mono text-3xl font-medium text-chalk">
                <CountUp to={12} suffix="+" />
              </div>
              <p className="mt-1 font-body text-xs uppercase tracking-widest text-muted">
                Jahre Erfahrung
              </p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            custom={2}
            initial={reduce ? "visible" : "hidden"}
            animate="visible"
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/book"
                onClick={() => track("intent")}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-body text-sm font-medium text-white shadow-lg shadow-primary/20"
              >
                Projekt anfragen
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
              <Link
                href="/#leistungen"
                className="inline-flex items-center gap-2 font-body text-sm text-muted hover:text-chalk transition-colors"
              >
                Unsere Leistungen
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: hero image */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:flex items-center justify-center"
        >
          <div className="relative h-[520px] w-full max-w-xl overflow-hidden rounded-2xl border border-rim/50">
            <Image
              src="/images/hero.png"
              alt="IT-Transformation Visualisierung"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 0px, 580px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stage/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-stage/20" />
            {/* Rim glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(0,201,177,0.08)]" />
          </div>
          {/* Floating accent badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-4 -left-4 rounded-xl border border-rim bg-card px-4 py-3 shadow-xl"
          >
            <p className="font-mono text-xs text-muted">Aktive Projekte</p>
            <p className="font-display text-2xl font-bold text-teal">24</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-widest text-muted/60">SCROLL</span>
          <div className="h-8 w-px bg-gradient-to-b from-teal/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

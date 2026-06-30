"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { track } from "@/lib/funnel";

const NAV_LINKS = [
  { label: "Leistungen", href: "/#leistungen" },
  { label: "Referenzen", href: "/#referenzen" },
  { label: "Über uns", href: "/#ueber-uns" },
  { label: "Prozess", href: "/#prozess" },
  { label: "Blog", href: "/blog" },
];

export default function Navigation() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 40);
  });

  return (
    <motion.header
      className="fixed left-0 top-0 z-50 w-full"
      animate={{
        backgroundColor: scrolled ? "rgba(10,15,30,0.85)" : "rgba(10,15,30,0)",
        backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
        borderBottom: scrolled ? "1px solid #1F2D45" : "1px solid transparent",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-chalk"
        >
          <motion.span
            whileHover={{ color: "#00C9B1" }}
            transition={{ duration: 0.15 }}
            className="inline-block"
          >
            ITCON
          </motion.span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <motion.div key={link.label} whileHover={{ y: -1 }} transition={{ duration: 0.15 }}>
              <Link
                href={link.href}
                className="font-body text-sm text-muted transition-colors hover:text-chalk"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* CTA */}
        <motion.div
          className="hidden md:block"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            href="/book"
            onClick={() => track("intent")}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-body text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Projekt anfragen
          </Link>
        </motion.div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Menü"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
            className="block h-0.5 w-6 origin-center bg-chalk transition-all"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            className="block h-0.5 w-6 bg-chalk"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
            className="block h-0.5 w-6 origin-center bg-chalk transition-all"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        className="overflow-hidden border-t border-rim bg-stage/95 backdrop-blur md:hidden"
      >
        <div className="px-6 py-4 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block font-body text-muted hover:text-chalk transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/book"
            onClick={() => { setMenuOpen(false); track("intent"); }}
            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 font-body text-sm font-medium text-white"
          >
            Projekt anfragen
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
}

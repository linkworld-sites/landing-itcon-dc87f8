"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { track } from "@/lib/funnel";
import { FUNNEL_COMPANY_ID, FUNNEL_API } from "@/funnel-config";

const FIELDS = [
  { name: "name", label: "Vollständiger Name", type: "text", required: true },
  { name: "company", label: "Unternehmen", type: "text", required: true },
  { name: "email", label: "Geschäftliche E-Mail", type: "email", required: true },
  { name: "phone", label: "Telefon (optional)", type: "tel", required: false },
];

export default function BookingForm() {
  const started = useRef(false);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    track("booking_start");
  }, []);

  const onStart = () => {
    if (started.current) return;
    started.current = true;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries());
    track("booking_confirmed");
    track("convert");
    try {
      if (FUNNEL_COMPANY_ID) {
        await fetch(`${FUNNEL_API}/api/companies/${FUNNEL_COMPANY_ID}/leads`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kind: "booking", fields: payload }),
        }).catch(() => undefined);
      }
    } finally {
      setBusy(false);
      setSent(true);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-teal/30 bg-card p-10 text-center"
      >
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-teal bg-teal/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L19 7" stroke="#00C9B1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold text-chalk">Anfrage erhalten.</h3>
        <p className="mt-3 font-body text-muted">
          Wir melden uns innerhalb von 24 Stunden bei Ihnen.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={onStart}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.name} className={f.name === "message" ? "sm:col-span-2" : ""}>
            <label className="block">
              <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">
                {f.label}
              </span>
              <input
                name={f.name}
                type={f.type}
                required={f.required}
                className="w-full rounded-lg border border-rim bg-card/50 px-4 py-3 font-body text-sm text-chalk placeholder-muted/40 outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal/30"
              />
            </label>
          </div>
        ))}
      </div>

      <div>
        <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">
          Ihr Anliegen
        </span>
        <textarea
          name="message"
          rows={5}
          className="w-full rounded-lg border border-rim bg-card/50 px-4 py-3 font-body text-sm text-chalk placeholder-muted/40 outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal/30 resize-none"
          placeholder="Beschreiben Sie kurz Ihr Projekt oder Ihre Herausforderung..."
        />
      </div>

      <motion.button
        type="submit"
        disabled={busy}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-body text-sm font-medium text-white shadow-lg shadow-primary/20 transition-opacity disabled:opacity-50 sm:w-auto"
      >
        {busy ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Wird gesendet…
          </>
        ) : (
          <>
            Anfrage senden
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </>
        )}
      </motion.button>

      <p className="font-body text-xs text-muted/60">
        Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten gemäß unserer{" "}
        <a href="/legal/datenschutz" className="underline hover:text-muted transition-colors">
          Datenschutzerklärung
        </a>{" "}
        zu.
      </p>
    </form>
  );
}

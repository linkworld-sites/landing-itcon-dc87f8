"use client";

import { useState } from "react";

const ITEMS = [
  "Finanzdienstleistungen",
  "Versicherungswesen",
  "Logistik & Supply Chain",
  "Gesundheitswesen",
  "Fertigungsindustrie",
  "Öffentlicher Sektor",
  "Energieversorgung",
  "Handel & E-Commerce",
  "Telekommunikation",
  "Automotive",
  "Pharmaindustrie",
  "Finanzdienstleistungen",
  "Versicherungswesen",
  "Logistik & Supply Chain",
  "Gesundheitswesen",
  "Fertigungsindustrie",
  "Öffentlicher Sektor",
  "Energieversorgung",
  "Handel & E-Commerce",
  "Telekommunikation",
  "Automotive",
  "Pharmaindustrie",
];

export default function MarqueeRail() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="overflow-hidden border-y border-rim bg-card/40 py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-hidden="true"
    >
      <div
        className={`flex gap-10 whitespace-nowrap ${paused ? "" : "animate-marquee"}`}
        style={{ willChange: "transform" }}
      >
        {ITEMS.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted/60"
          >
            <span className="h-1 w-1 rounded-full bg-teal/50 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

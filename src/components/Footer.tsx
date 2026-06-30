import Link from "next/link";

const LINKS = {
  Leistungen: [
    { label: "IT-Strategie", href: "/#leistungen" },
    { label: "Transformation", href: "/#leistungen" },
    { label: "Implementierung", href: "/#leistungen" },
    { label: "Governance", href: "/#leistungen" },
  ],
  Unternehmen: [
    { label: "Über uns", href: "/#ueber-uns" },
    { label: "Prozess", href: "/#prozess" },
    { label: "Referenzen", href: "/#referenzen" },
    { label: "Blog", href: "/blog" },
  ],
  Kontakt: [
    { label: "Projekt anfragen", href: "/book" },
    { label: "hello@itcon.de", href: "mailto:hello@itcon.de" },
    { label: "+49 89 123 456 00", href: "tel:+498912345600" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-rim bg-card/40 px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="font-display text-xl font-bold text-chalk">ITCON</p>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted max-w-xs">
              IT-Beratung. Die wirkt. Weniger Komplexität. Mehr Wirkung.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-teal" />
              <span className="font-mono text-xs text-teal">Verfügbar für neue Projekte</span>
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted/60">
                {section}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="font-body text-sm text-muted transition-colors hover:text-chalk"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-rim pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs text-muted/60">
            © {new Date().getFullYear()} ITCON GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/legal/impressum"
              className="font-body text-xs text-muted/60 hover:text-muted transition-colors"
            >
              Impressum
            </Link>
            <Link
              href="/legal/datenschutz"
              className="font-body text-xs text-muted/60 hover:text-muted transition-colors"
            >
              Datenschutz
            </Link>
            <Link
              href="/legal/cookies"
              className="font-body text-xs text-muted/60 hover:text-muted transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Navigation from "@/components/Navigation";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Projekt anfragen — ITCON",
  description: "Starten Sie Ihr IT-Transformationsprojekt mit ITCON. Kostenlose Erstberatung.",
};

export default function BookPage() {
  return (
    <main className="bg-stage font-body text-chalk min-h-screen overflow-x-hidden">
      <Navigation />

      <section className="mx-auto max-w-7xl px-6 pt-36 pb-24 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left: copy */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" />
              <span className="font-mono text-xs tracking-widest text-primary">/KONTAKT</span>
            </div>
            <h1
              className="font-display font-bold leading-none tracking-tight text-chalk"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Ihr Projekt
              <br />
              beginnt hier.
            </h1>
            <p className="mt-6 max-w-md font-body text-lg leading-relaxed text-muted">
              Beschreiben Sie uns Ihre Herausforderung — wir antworten innerhalb von 24 Stunden
              mit einem ersten Einschätzungsgespräch.
            </p>

            {/* What to expect */}
            <div className="mt-12 space-y-5">
              {[
                { icon: "01", label: "Kostenlose Erstberatung", desc: "30 Minuten mit einem erfahrenen Berater — keine Strings attached." },
                { icon: "02", label: "Ehrliche Einschätzung", desc: "Wir sagen Ihnen, ob und wie wir helfen können. Immer." },
                { icon: "03", label: "Klares Angebot", desc: "Wenn es passt: ein konkretes, nachvollziehbares Angebot innerhalb einer Woche." },
              ].map((item) => (
                <div key={item.icon} className="flex gap-4">
                  <span className="font-mono text-sm text-teal shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-display font-semibold text-chalk">{item.label}</p>
                    <p className="mt-1 font-body text-sm text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-rim">
              <p className="font-mono text-xs text-muted/60">ITCON GmbH · München · hello@itcon.de</p>
              <Link
                href="/"
                className="mt-3 inline-flex items-center gap-2 font-body text-sm text-muted hover:text-chalk transition-colors"
              >
                ← Zurück zur Startseite
              </Link>
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-2xl border border-rim bg-card p-8 lg:p-10">
            <h2 className="font-display text-xl font-bold text-chalk mb-2">Anfrage stellen</h2>
            <p className="font-body text-sm text-muted mb-8">
              Alle Felder mit * sind Pflichtfelder.
            </p>
            <BookingForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

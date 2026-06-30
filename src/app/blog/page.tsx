import Link from "next/link";
import { getPosts } from "@/lib/posts";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blog — ITCON",
  description: "Einblicke in IT-Transformation, Strategie und Technologie vom ITCON-Team.",
};

export default function BlogIndex() {
  const posts = getPosts();

  return (
    <main className="bg-stage font-body text-chalk min-h-screen overflow-x-hidden">
      <Navigation />

      <section className="mx-auto max-w-4xl px-6 pt-36 pb-24 lg:px-10">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-10 bg-teal" />
          <span className="font-mono text-xs tracking-widest text-teal">/BLOG</span>
        </div>
        <h1
          className="font-display font-bold leading-tight tracking-tight text-chalk"
          style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
        >
          Einblicke &amp; Perspektiven.
        </h1>
        <p className="mt-4 font-body text-muted">
          Praxisnah. Meinungsstark. Ohne Bullshit.
        </p>

        {posts.length === 0 ? (
          <p className="mt-16 font-body text-muted">
            Neue Beiträge folgen in Kürze.
          </p>
        ) : (
          <ul className="mt-16 space-y-8">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <article className="rounded-xl border border-rim bg-card p-8 transition-colors hover:border-teal/40">
                    {p.date && (
                      <p className="font-mono text-xs text-muted/60">{p.date}</p>
                    )}
                    <h2 className="mt-2 font-display text-xl font-bold text-chalk group-hover:text-teal transition-colors">
                      {p.title}
                    </h2>
                    {p.description && (
                      <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                        {p.description}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-teal">
                      Lesen
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-16 pt-8 border-t border-rim">
          <Link href="/" className="font-body text-sm text-muted hover:text-chalk transition-colors">
            ← Zurück zur Startseite
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

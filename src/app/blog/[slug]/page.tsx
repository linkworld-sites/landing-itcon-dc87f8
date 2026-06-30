import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: `${post.title} — ITCON Blog`, description: post.description };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="bg-stage font-body text-chalk min-h-screen overflow-x-hidden">
      <Navigation />

      <article className="mx-auto max-w-3xl px-6 pt-36 pb-24 lg:px-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-chalk transition-colors mb-10"
        >
          ← Alle Beiträge
        </Link>

        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-teal" />
          <span className="font-mono text-xs tracking-widest text-teal">/BLOG</span>
        </div>

        <h1
          className="font-display font-bold leading-tight tracking-tight text-chalk"
          style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
        >
          {post.title}
        </h1>

        {post.date && (
          <p className="mt-4 font-mono text-sm text-muted/60">{post.date}</p>
        )}

        {post.description && (
          <p className="mt-4 font-body text-lg leading-relaxed text-muted border-l-2 border-teal pl-4">
            {post.description}
          </p>
        )}

        <div
          className="post-body mt-12"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <div className="mt-16 pt-8 border-t border-rim">
          <Link
            href="/blog"
            className="font-body text-sm text-muted hover:text-chalk transition-colors"
          >
            ← Alle Beiträge
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}

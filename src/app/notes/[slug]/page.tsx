import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { Band, Kicker } from "@/components/primitives";
import { noteBodies } from "@/content/notes";
import { formatPublished, postAt, posts, type Post } from "@/content/posts";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  const written = slug in noteBodies;

  return {
    title: post.title,
    /*
     * Without this every note inherited the homepage's description, so the six
     * pages most likely to be found in a search all described the same thing.
     */
    description: post.excerpt,
    ...pageMetadata(`/notes/${post.slug}`),
    /**
     * Unwritten shells stay out of the index: each renders about fifty words,
     * most of it chrome, and thin pages drag on how the whole domain is
     * assessed. A post with a body indexes normally — no edit needed here,
     * it follows from having a body.
     */
    robots: written ? undefined : { index: false, follow: true },
  };
}

/** Built from the same fields the page renders, so the two can't disagree. */
function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published,
    url: `${site.url}/notes/${post.slug}`,
    mainEntityOfPage: `${site.url}/notes/${post.slug}`,
    articleSection: post.cat,
    inLanguage: "en",
    author: { "@type": "Person", name: site.owner },
    publisher: { "@type": "Organization", name: site.legalName, url: site.url },
  };
}

/** Where to go next. A note that ends in a dead end is a note you leave on. */
function ReadNext({ previous, next }: { previous?: Post; next?: Post }) {
  return (
    <div className="mt-10 grid border-t-2 border-[var(--color-divider)] sm:grid-cols-2">
      {[
        { post: previous, label: "Previous" },
        { post: next, label: "Next" },
      ].map(({ post, label }, i) =>
        post ? (
          <Link
            key={label}
            href={`/notes/${post.slug}`}
            className="group border-b-2 border-[var(--color-divider)] py-5 no-underline sm:border-b-0 sm:py-6"
          >
            <span className="text-brand block text-[11px] tracking-[0.16em] uppercase">
              {label}
            </span>
            <span className="text-ink group-hover:text-brand font-heading mt-2 block max-w-[26ch] text-[19px] font-extrabold transition-colors md:text-[22px]">
              {post.title}
            </span>
          </Link>
        ) : (
          <div key={label} aria-hidden="true" className={i === 0 ? "hidden sm:block" : undefined} />
        ),
      )}
    </div>
  );
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const found = postAt(slug);

  if (!found) notFound();
  const { post, previous, next } = found;

  const loadBody = noteBodies[slug];
  const Body = loadBody ? (await loadBody()).default : null;

  return (
    <>
      {Body && <JsonLd data={articleSchema(post)} />}

      <Band reveal={false}>
        <Kicker>
          {post.cat} · {post.read}
        </Kicker>
        <h1 className="m-0 mb-4 max-w-[24ch] text-[34px] leading-none tracking-[-0.03em] md:text-[56px]">
          {post.title}
        </h1>
        <p className="text-muted m-0 text-sm">
          {site.owner} · <time dateTime={post.published}>{formatPublished(post.published)}</time>
        </p>
      </Band>

      <Band rule={false}>
        {Body ? (
          <div className="prose">
            <Body />
          </div>
        ) : (
          <p className="m-0 max-w-[62ch] text-base leading-[1.6]">
            This note hasn&rsquo;t been written yet.
          </p>
        )}

        <ReadNext previous={previous} next={next} />

        <Link href="/notes" className="text-brand mt-8 inline-block">
          ← All notes
        </Link>
      </Band>
    </>
  );
}

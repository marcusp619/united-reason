import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Band, Kicker } from "@/components/primitives";
import { noteBodies } from "@/content/notes";
import { posts } from "@/content/posts";

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
    alternates: { canonical: `/notes/${post.slug}` },
    /**
     * Unwritten shells stay out of the index: each renders about fifty words,
     * most of it chrome, and thin pages drag on how the whole domain is
     * assessed. A post with a body indexes normally — no edit needed here,
     * it follows from having a body.
     */
    robots: written ? undefined : { index: false, follow: true },
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  const loadBody = noteBodies[slug];
  const Body = loadBody ? (await loadBody()).default : null;

  return (
    <>
      <Band reveal={false}>
        <Kicker>
          {post.cat} · {post.read}
        </Kicker>
        <h1 className="m-0 max-w-[24ch] text-[34px] leading-none tracking-[-0.03em] md:text-[56px]">
          {post.title}
        </h1>
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
        <Link href="/notes" className="text-brand mt-10 inline-block">
          ← Back to all notes
        </Link>
      </Band>
    </>
  );
}

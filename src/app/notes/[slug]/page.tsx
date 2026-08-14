import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Band, Kicker } from "@/components/primitives";
import { posts } from "@/content/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return post ? { title: post.title } : {};
}

/**
 * Post shell. Body copy isn't written yet — when it is, the natural move is
 * MDX or a content collection; the route and metadata stay as they are.
 */
export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

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
        <p className="m-0 max-w-[62ch] text-base leading-[1.6]">
          This note hasn&rsquo;t been written yet.
        </p>
        <Link href="/notes" className="text-brand">
          ← Back to all notes
        </Link>
      </Band>
    </>
  );
}

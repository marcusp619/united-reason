/**
 * Renders a JSON-LD block.
 *
 * `<` is escaped to its unicode equivalent per Next's guidance: JSON.stringify
 * does not sanitise, so a stray tag in content could otherwise close the script
 * element early. All payloads here come from `src/content`, but the escape
 * costs nothing and keeps that true if the source ever changes.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

import type { JsonLdObject } from "@/lib/jsonld";

/** Server-rendered JSON-LD. `<` is escaped so content can't close the script tag. */
export function JsonLd({ data }: { data: JsonLdObject }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

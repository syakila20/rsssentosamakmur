import DOMPurify from "isomorphic-dompurify";

export function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });
}

export function wrapImages(html: string) {
  return html.replace(
    /<img([^>]*)alt="([^"]*)"([^>]*)>/g,
    `
    <figure class="health-figure">
      <div class="health-image-wrapper">
        <img $1 alt="$2" $3 loading="lazy" decoding="async" />
      </div>
      <figcaption class="health-caption">
        $2
      </figcaption>
    </figure>
    `,
  );
}

export function injectHeadingIds(html: string) {
  let index = 0;

  return html.replace(/<h2>/gi, () => {
    return `<h2 id="section-${index++}" class="scroll-mt-32">`;
  });
}

export function extractToc(html: string) {
  const matches = [
    ...html.matchAll(/<h2 id="(section-\d+)"[^>]*>(.*?)<\/h2>/gi),
  ];

  return matches.map((match) => ({
    id: match[1],
    title: match[2],
  }));
}

export function getReadingTimeFromHtml(html: string) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const WORDS_PER_MINUTE = 200;
  const wordCount = text.split(" ").length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

import DOMPurify from "isomorphic-dompurify";
import { optimizeImageDefault } from "./claudnary/Optimize";
export function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: {
      html: true,
    },

    ADD_ATTR: ["data-caption", "data-align", "data-width", "data-height"],
  });
}

export function wrapImages(html: string) {
  return html.replace(/<img([^>]*)>/g, (match, attrs) => {
    const captionMatch = attrs.match(/data-caption="([^"]*)"/);

    const alignMatch = attrs.match(/data-align="([^"]*)"/);

    const widthMatch = attrs.match(/data-width="([^"]*)"/);

    const caption = captionMatch?.[1] ?? "";

    const align = alignMatch?.[1] ?? "center";

    const width = widthMatch?.[1];
    const srcMatch = attrs.match(/src="([^"]*)"/);

    const src = srcMatch?.[1] ?? "";

    const optimizedSrc = optimizeImageDefault(src);

    const imageAttrs = attrs.replace(src, optimizedSrc);
    const style = [
      width ? `width:${width}px` : "",

      align === "center" ? "margin-left:auto;margin-right:auto" : "",

      align === "right" ? "margin-left:auto" : "",
      "border-radius:20px",
      "box-shadow:6px 21px 25px -14px rgba(92, 87, 87, 0.16)",
    ]
      .filter(Boolean)
      .join(";");

    return `
        <figure
          class="health-figure"
          style="text-align:${align}"
        >

          <div
            class="health-image-wrapper"
          >

            <img
              ${imageAttrs}

              style="${style}"

              loading="lazy"

              decoding="async"
            />

          </div>


          ${
            caption
              ? `
              <figcaption
                class="health-caption"
              >
                ${caption}
              </figcaption>
              `
              : ""
          }


        </figure>
      `;
  });
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

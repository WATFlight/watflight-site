import { MediaFrame } from "@/components/ui/media-frame";
import {
  articleBodyClass,
  articleHeadingClass,
  articleImageSizes,
  articleMeasureClass,
} from "@/components/sections/news/styles";
import type { NewsBlock } from "@/content/news";
import { cn } from "@/lib/cn";

/**
 * Renders an article body from its blocks, in order, and only the blocks that are present: paragraph, `h2`,
 * simple list (unordered with a grey dash, or ordered), figure with caption and a neutral callout. The block
 * container takes the full width of the article shell; only paragraph text (and callout text) is held to a
 * 44em measure, so headings, lists, figures and callout boxes stay aligned to the shell. Spacing
 * depends on the neighbours: a generous gap before every `h2`, a tighter one after it, and a list sits close to
 * the sentence that introduces it. Nothing here is specific to a story, so real articles can reuse it.
 */
export function NewsArticleBody({ blocks }: { blocks: NewsBlock[] }) {
  return (
    <div>
      {blocks.map((block, index) => {
        const previous = blocks[index - 1];
        const first = index === 0;

        switch (block.type) {
          case "h2":
            return (
              <h2 key={index} className={cn(articleHeadingClass, !first && "mt-14 md:mt-16")}>
                {block.text}
              </h2>
            );
          case "p":
            return (
              <p
                key={index}
                className={cn(articleBodyClass, articleMeasureClass, !first && (previous?.type === "h2" ? "mt-5" : "mt-6"))}
              >
                {block.text}
              </p>
            );
          case "list": {
            const List = block.ordered ? "ol" : "ul";
            return (
              <List
                key={index}
                role="list"
                className={cn(
                  articleBodyClass,
                  "space-y-2",
                  !first && (previous?.type === "p" ? "mt-4" : "mt-6"),
                  block.ordered && "list-decimal pl-6 marker:text-ink-2",
                )}
              >
                {block.items.map((item) => (
                  <li
                    key={item}
                    className={
                      block.ordered
                        ? undefined
                        : "relative pl-6 before:absolute before:top-[0.85em] before:left-0 before:h-px before:w-3 before:bg-ink-2 before:content-['']"
                    }
                  >
                    {item}
                  </li>
                ))}
              </List>
            );
          }
          case "figure":
            return (
              <figure key={index} className={cn(!first && "mt-10 md:mt-12")}>
                <MediaFrame
                  slot={block.image.slot}
                  alt={block.image.alt}
                  sizes={articleImageSizes}
                  fluid
                  bordered
                  className="aspect-video w-full"
                />
                <figcaption className="type-body-sm mt-3 text-ink-2">{block.caption}</figcaption>
              </figure>
            );
          case "callout":
            return (
              <div
                key={index}
                role="note"
                className={cn("border border-rule-strong border-l-2 bg-surface px-5 py-5 md:px-6", !first && "mt-8 md:mt-10")}
              >
                {block.title ? <p className="type-eyebrow text-ink">{block.title}</p> : null}
                <p className={cn(articleBodyClass, articleMeasureClass, block.title && "mt-2")}>{block.text}</p>
              </div>
            );
        }
      })}
    </div>
  );
}

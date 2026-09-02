import { PageHeader, TextBlock } from "@/components/sections";
import type { Locale } from "@/lib/i18n";
import { imageAlt, placeholderBody, placeholderTitle, posts } from "@/content/news";

/**
 * A single news post.
 *
 * Both posts on the original are unedited Squarespace template content, so this renders
 * the real photograph with a placeholder body — see `src/content/news.ts`.
 */
export function PostPage({ locale, index }: { locale: Locale; index: 0 | 1 }) {
  const post = posts[index];

  return (
    <>
      <PageHeader
        title={placeholderTitle[locale]}
        image={{ ...post.image, alt: imageAlt[locale] }}
      />
      <TextBlock paragraphs={[placeholderBody[locale]]} />
    </>
  );
}

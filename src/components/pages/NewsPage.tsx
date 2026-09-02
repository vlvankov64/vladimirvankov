import { JournalList, PageHeader } from "@/components/sections";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";
import { heading, imageAlt, placeholderTitle, posts } from "@/content/news";

/** The news list, shared by both locales. */
export function NewsPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHeader title={heading[locale]} />
      <JournalList
        posts={posts.map((post) => ({
          title: placeholderTitle[locale],
          href: localizePath(post.href, locale),
          image: { ...post.image, alt: imageAlt[locale] },
        }))}
      />
    </>
  );
}

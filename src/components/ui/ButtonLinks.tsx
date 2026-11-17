import Link from "next/link";

export type ButtonLink = { label: string; href: string };

/**
 * A centred row of outlined buttons pointing to other pages. Plain links styled as
 * buttons; no client JS.
 */
export function ButtonLinks({
  links,
  className = "",
}: {
  links: ButtonLink[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap justify-center gap-3 sm:gap-4 ${className}`}>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="inline-flex min-w-40 items-center justify-center rounded-md border border-accent/40 bg-paper px-6 py-3 font-display text-base tracking-wide text-accent uppercase transition-colors duration-300 hover:bg-accent hover:text-paper"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

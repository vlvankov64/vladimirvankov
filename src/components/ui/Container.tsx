import type { ReactNode } from "react";

/**
 * The page gutter. The original centres its content in a wide, generously padded
 * column; this is that, once.
 */
export function Container({
  children,
  className = "",
  width = "wide",
}: {
  children: ReactNode;
  className?: string;
  /** `wide` for galleries and grids, `text` for reading measure. */
  width?: "wide" | "text";
}) {
  const max = width === "text" ? "max-w-3xl" : "max-w-[1400px]";
  return (
    <div className={`mx-auto w-full ${max} px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
  );
}

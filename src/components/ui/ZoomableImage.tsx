"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type ZoomableImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Accessible verb for the trigger, e.g. "enlarge" — supplied per locale. */
  zoomLabel: string;
};

/**
 * A gallery image that opens full-screen when clicked — the original's "View
 * fullsize" lightbox.
 *
 * Client component because it holds open/closed state, and deliberately the smallest
 * possible one: the surrounding gallery, its captions and its layout are all server
 * rendered. The full-size view reuses the same `next/image` source, so opening it
 * costs one larger transform of a file already in cache, not a new download of an
 * unoptimised original.
 */
export function ZoomableImage({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className = "",
  zoomLabel,
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group block w-full cursor-zoom-in overflow-hidden bg-mist/40"
        aria-label={`${alt} — ${zoomLabel}`}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className={`h-auto w-full transition-transform duration-700 ease-gentle group-hover:scale-[1.02] ${className}`}
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-100 flex cursor-zoom-out items-center justify-center bg-ink/95 p-4 sm:p-8"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="100vw"
            className="max-h-full w-auto max-w-full object-contain"
          />
          <span className="absolute top-5 right-6 caption-label text-paper/60">ESC</span>
        </div>
      )}
    </>
  );
}

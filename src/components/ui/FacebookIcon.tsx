/** Facebook glyph, inline so the header ships no icon font or image request. */
export function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.87.24-1.46 1.48-1.46H17V4.45c-.29-.04-1.24-.12-2.35-.12-2.33 0-3.92 1.42-3.92 4.03v2.14H8.1v3h2.63V21h2.77Z" />
    </svg>
  );
}

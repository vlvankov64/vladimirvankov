/**
 * Re-export of the two helpers pages need together, so a page component imports one
 * module instead of reaching into both `nav` and `i18n`.
 */
export { labelFor } from "@/lib/nav";
export { localizePath } from "@/lib/i18n";

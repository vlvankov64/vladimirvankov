/**
 * Barrel for page-level section components. Each exports its prop type alongside it,
 * so `content.ts` files can annotate their exports and let the type checker catch
 * content drift.
 */
export {
  ArtworkGallery,
  type ArtworkGalleryProps,
  type Artwork,
  type ArtworkGroup,
  type GalleryImage,
} from "./ArtworkGallery";
export { BioProfile, type BioProfileProps } from "./BioProfile";
export { GalleryPagination, type GalleryPaginationProps } from "./GalleryPagination";
export { HomeHero, type HomeHeroProps } from "./HomeHero";
export { JournalList, type JournalListProps } from "./JournalList";
export { LinkButtons, type LinkButtonsProps } from "./LinkButtons";
export { PageHeader, type PageHeaderProps } from "./PageHeader";
export { PortfolioGrid, type PortfolioGridProps } from "./PortfolioGrid";
export { Reviews, type ReviewsProps } from "./Reviews";
export { TextBlock, type TextBlockProps } from "./TextBlock";
export { VideoGrid, type VideoGridProps } from "./VideoGrid";

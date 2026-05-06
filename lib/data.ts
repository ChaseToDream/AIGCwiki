export {
  getAllArtworks,
  getArtworkById,
  getRelatedArtworks,
  searchArtworks,
  getArtworksByCategory,
  getAllStyles,
  getAllSubjects,
  getAllModels,
  getAllTags,
  getNextId,
  buildArtwork,
  addArtwork,
  removeArtwork,
  updateArtwork,
  saveArtworks,
  getImagePath,
  slugify,
} from './artworkService';

export type { ArtworkInput, ArtworkUpdate } from './artworkService';

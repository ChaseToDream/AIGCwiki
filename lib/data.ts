import artworksData from '@/data/artworks.json';
import { Artwork } from '@/types';

export function getAllArtworks(): Artwork[] {
  return artworksData.artworks;
}

export function getArtworkById(id: string): Artwork | undefined {
  return artworksData.artworks.find((artwork) => artwork.id === id);
}

export function getRelatedArtworks(
  currentId: string,
  limit: number = 4
): Artwork[] {
  const current = getArtworkById(currentId);
  if (!current) return [];

  return artworksData.artworks
    .filter(
      (artwork) =>
        artwork.id !== currentId &&
        (artwork.style.some((s) => current.style.includes(s)) ||
          artwork.subject.some((s) => current.subject.includes(s)))
    )
    .slice(0, limit);
}

export function getArtworksByCategory(
  type: string,
  value: string
): Artwork[] {
  return artworksData.artworks.filter((artwork) => {
    if (type === 'style') return artwork.style.includes(value);
    if (type === 'subject') return artwork.subject.includes(value);
    if (type === 'model') return artwork.parameters.model === value;
    return false;
  });
}

export function searchArtworks(query: string): Artwork[] {
  const lowercaseQuery = query.toLowerCase();
  return artworksData.artworks.filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(lowercaseQuery) ||
      artwork.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
  );
}

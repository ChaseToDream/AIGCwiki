import { Artwork } from '@/types';
import { ArtworkCard } from './ArtworkCard';

interface RelatedArtworksProps {
  artworks: Artwork[];
}

export function RelatedArtworks({ artworks }: RelatedArtworksProps) {
  if (artworks.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-6">相关推荐</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {artworks.map((artwork, index) => (
          <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
        ))}
      </div>
    </div>
  );
}

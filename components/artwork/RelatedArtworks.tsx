import { Artwork } from '@/types';
import { ArtworkCard } from './ArtworkCard';

interface RelatedArtworksProps {
  artworks: Artwork[];
}

export function RelatedArtworks({ artworks }: RelatedArtworksProps) {
  if (artworks.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-zinc-800/0 via-zinc-700/50 to-zinc-800/0" />
        <h2 className="font-heading text-xl font-semibold text-white">
          相关推荐
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-zinc-800/0 via-zinc-700/50 to-zinc-800/0" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {artworks.map((artwork, index) => (
          <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
        ))}
      </div>
    </div>
  );
}

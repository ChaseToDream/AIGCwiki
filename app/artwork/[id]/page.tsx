import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ImageIcon } from 'lucide-react';
import { ParameterPanel } from '@/components/artwork/ParameterPanel';
import { RelatedArtworks } from '@/components/artwork/RelatedArtworks';
import { getArtworkById, getRelatedArtworks, getAllArtworks } from '@/lib/data';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  const artworks = getAllArtworks();
  return artworks.map((artwork) => ({ id: artwork.id }));
}

interface ArtworkPageProps {
  params: { id: string };
}

export default function ArtworkPage({ params }: ArtworkPageProps) {
  const artwork = getArtworkById(params.id);

  if (!artwork) {
    notFound();
  }

  const relatedArtworks = getRelatedArtworks(artwork.id, 4);

  return (
    <main className="min-h-screen bg-zinc-950">
      <div className="sticky top-0 z-50 glass border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-400 hover:text-cyan-300 rounded-lg hover:bg-zinc-800/50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回</span>
          </Link>
          <div className="h-4 w-px bg-zinc-800" />
          <h1 className="text-white font-heading font-semibold truncate text-sm sm:text-base">
            {artwork.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/60 group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-amber-500/5 pointer-events-none" />
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                width={artwork.parameters.width}
                height={artwork.parameters.height}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
                priority
              />
            </div>

            {artwork.description && (
              <div className="glass rounded-2xl p-6">
                <h2 className="font-heading text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  作品描述
                </h2>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  {artwork.description}
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <ParameterPanel
                parameters={artwork.parameters}
                tags={artwork.tags}
              />
            </div>
          </div>
        </div>

        <RelatedArtworks artworks={relatedArtworks} />
      </div>
    </main>
  );
}

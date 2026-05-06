'use client';

import { Artwork } from '@/types';
import { ArtworkCard } from './ArtworkCard';
import { useState, useEffect, useCallback } from 'react';
import { Loader2, ChevronDown } from 'lucide-react';

interface ArtworkGridProps {
  artworks: Artwork[];
  initialCount?: number;
  loadMoreCount?: number;
}

export function ArtworkGrid({
  artworks,
  initialCount = 12,
  loadMoreCount = 8,
}: ArtworkGridProps) {
  const [displayCount, setDisplayCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);

  const displayedArtworks = artworks.slice(0, displayCount);
  const hasMore = displayCount < artworks.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setTimeout(() => {
      setDisplayCount((prev) =>
        Math.min(prev + loadMoreCount, artworks.length)
      );
      setIsLoading(false);
    }, 400);
  }, [isLoading, hasMore, loadMoreCount, artworks.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 800
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore]);

  if (artworks.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 mb-4">
          <Loader2 className="w-8 h-8 text-zinc-500" />
        </div>
        <p className="text-zinc-500 text-lg">暂无作品</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {displayedArtworks.map((artwork, index) => (
          <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
        ))}
      </div>

      {isLoading && (
        <div className="flex justify-center py-10">
          <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800/50">
            <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
            <span className="text-zinc-400 text-sm">加载中...</span>
          </div>
        </div>
      )}

      {hasMore && !isLoading && (
        <div className="flex justify-center py-8">
          <button
            onClick={loadMore}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800/50 text-zinc-400 hover:text-cyan-300 hover:border-cyan-500/30 hover:bg-zinc-800/80 transition-all duration-300"
          >
            <span className="text-sm font-medium">加载更多</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>
      )}
    </div>
  );
}

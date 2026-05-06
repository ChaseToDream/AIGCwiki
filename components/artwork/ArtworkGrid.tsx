'use client';

import { Artwork } from '@/types';
import { ArtworkCard } from './ArtworkCard';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

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

  // 无限滚动
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1000
      ) {
        if (hasMore && !isLoading) {
          loadMore();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoading, displayCount]);

  const loadMore = () => {
    setIsLoading(true);
    // 模拟加载延迟
    setTimeout(() => {
      setDisplayCount((prev) =>
        Math.min(prev + loadMoreCount, artworks.length)
      );
      setIsLoading(false);
    }, 300);
  };

  if (artworks.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-zinc-400 text-lg">暂无作品</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayedArtworks.map((artwork, index) => (
          <ArtworkCard key={artwork.id} artwork={artwork} index={index % 4} />
        ))}
      </div>

      {/* 加载状态 */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      )}

      {/* 加载更多按钮（备用） */}
      {hasMore && !isLoading && (
        <div className="flex justify-center py-8">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            加载更多
          </button>
        </div>
      )}
    </div>
  );
}

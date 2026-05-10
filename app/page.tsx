'use client';

import { ArtworkGrid } from '@/components/artwork/ArtworkGrid';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useFilter } from '@/components/providers/FilterProvider';
import { getAllArtworks, searchArtworks, getAllStyles, getAllSubjects, getAllModels } from '@/lib/data';
import { useMemo } from 'react';
import { ArrowUpDown, Image as ImageIcon, Palette, Cpu, X } from 'lucide-react';

export default function HomePage() {
  const allArtworks = getAllArtworks();
  const { searchQuery, sortBy, setSortBy, style, setStyle, subject, setSubject, model, setModel, setSearchQuery, resetFilters, hasActiveFilters } = useFilter();

  const styles = getAllStyles();
  const subjects = getAllSubjects();
  const models = getAllModels();

  const filteredArtworks = useMemo(() => {
    let result = allArtworks;

    if (searchQuery) {
      result = searchArtworks(searchQuery);
    }

    if (style) {
      result = result.filter((a) => a.style.includes(style));
    }
    if (subject) {
      result = result.filter((a) => a.subject.includes(subject));
    }
    if (model) {
      result = result.filter((a) => a.parameters.model === model);
    }

    result = [...result].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [allArtworks, searchQuery, sortBy, style, subject, model]);

  return (
    <main className="min-h-screen bg-zinc-950">
      <Header />

      <section className="relative py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
            探索 AI 艺术的无限可能
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-balance">
            <span className="text-gradient">AI 绘画</span>
            <br />
            <span className="text-white">作品展示</span>
          </h1>

          <p className="mt-6 text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed text-balance">
            探索精选 AI 艺术作品，获取完整生成参数与灵感
          </p>

          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <ImageIcon className="w-4 h-4 text-cyan-400/60" />
              <span>{allArtworks.length} 件作品</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <Palette className="w-4 h-4 text-amber-400/60" />
              <span>{styles.length} 种风格</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <Cpu className="w-4 h-4 text-cyan-400/60" />
              <span>{models.length} 个模型</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <h2 className="font-heading text-lg font-semibold text-white">
                {hasActiveFilters ? `筛选结果 (${filteredArtworks.length})` : '全部作品'}
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-700/50 to-transparent min-w-[40px]" />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortBy(sortBy === 'newest' ? 'oldest' : 'newest')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-all duration-300"
              >
                <ArrowUpDown className="w-3 h-3" />
                {sortBy === 'newest' ? '最新' : '最早'}
              </button>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-red-300 hover:border-red-500/30 transition-all duration-300"
                >
                  <X className="w-3 h-3" />
                  清除筛选
                </button>
              )}
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/30 text-cyan-300 border border-cyan-800/50">
                  搜索: {searchQuery}
                  <button onClick={() => setSearchQuery('')} className="hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {style && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-950/30 text-amber-300 border border-amber-800/50">
                  风格: {style}
                  <button onClick={() => setStyle(null)} className="hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {subject && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-950/30 text-amber-300 border border-amber-800/50">
                  题材: {subject}
                  <button onClick={() => setSubject(null)} className="hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {model && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/30 text-cyan-300 border border-cyan-800/50">
                  模型: {model}
                  <button onClick={() => setModel(null)} className="hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          <ArtworkGrid artworks={filteredArtworks} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

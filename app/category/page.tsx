'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ArtworkGrid } from '@/components/artwork/ArtworkGrid';
import { useFilter } from '@/components/providers/FilterProvider';
import { getAllArtworks, getAllStyles, getAllSubjects, getAllModels } from '@/lib/data';
import { useMemo } from 'react';
import { X, Palette, Cpu, Tag } from 'lucide-react';

export default function CategoryPage() {
  const allArtworks = getAllArtworks();
  const styles = getAllStyles();
  const subjects = getAllSubjects();
  const models = getAllModels();
  const { style, setStyle, subject, setSubject, model, setModel, resetFilters, hasActiveFilters } = useFilter();

  const filteredArtworks = useMemo(() => {
    let result = allArtworks;
    if (style) result = result.filter((a) => a.style.includes(style));
    if (subject) result = result.filter((a) => a.subject.includes(subject));
    if (model) result = result.filter((a) => a.parameters.model === model);
    return result;
  }, [allArtworks, style, subject, model]);

  function countByStyle(s: string) {
    return allArtworks.filter((a) => a.style.includes(s)).length;
  }
  function countBySubject(s: string) {
    return allArtworks.filter((a) => a.subject.includes(s)).length;
  }
  function countByModel(m: string) {
    return allArtworks.filter((a) => a.parameters.model === m).length;
  }

  return (
    <main className="min-h-screen bg-zinc-950">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="mb-10">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-2">
            分类浏览
          </h1>
          <p className="text-zinc-400 text-sm">按风格、题材或模型筛选作品</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 space-y-6">
            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-sm font-semibold text-white flex items-center gap-2">
                  <Palette className="w-4 h-4 text-amber-400" />
                  风格
                </h3>
                {style && (
                  <button onClick={() => setStyle(null)} className="text-zinc-500 hover:text-zinc-300">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {styles.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(style === s ? null : s)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300 ${
                      style === s
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-zinc-800/50 text-zinc-400 border-zinc-700/50 hover:border-amber-500/30 hover:text-amber-300'
                    }`}
                  >
                    {s}
                    <span className="text-zinc-600">{countByStyle(s)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-sm font-semibold text-white flex items-center gap-2">
                  <Tag className="w-4 h-4 text-cyan-400" />
                  题材
                </h3>
                {subject && (
                  <button onClick={() => setSubject(null)} className="text-zinc-500 hover:text-zinc-300">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSubject(subject === s ? null : s)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300 ${
                      subject === s
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-zinc-800/50 text-zinc-400 border-zinc-700/50 hover:border-cyan-500/30 hover:text-cyan-300'
                    }`}
                  >
                    {s}
                    <span className="text-zinc-600">{countBySubject(s)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading text-sm font-semibold text-white flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  模型
                </h3>
                {model && (
                  <button onClick={() => setModel(null)} className="text-zinc-500 hover:text-zinc-300">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {models.map((m) => (
                  <button
                    key={m}
                    onClick={() => setModel(model === m ? null : m)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-300 ${
                      model === m
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-zinc-800/50 text-zinc-400 border-zinc-700/50 hover:border-cyan-500/30 hover:text-cyan-300'
                    }`}
                  >
                    {m}
                    <span className="text-zinc-600">{countByModel(m)}</span>
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="w-full py-2.5 rounded-xl text-sm font-medium bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-red-300 hover:border-red-500/30 transition-all duration-300"
              >
                清除所有筛选
              </button>
            )}
          </aside>

          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-heading text-lg font-semibold text-white">
                {hasActiveFilters ? `筛选结果 (${filteredArtworks.length})` : `全部作品 (${filteredArtworks.length})`}
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-zinc-700/50 to-transparent" />
            </div>
            <ArtworkGrid artworks={filteredArtworks} />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

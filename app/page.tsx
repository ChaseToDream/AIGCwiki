import { ArtworkGrid } from '@/components/artwork/ArtworkGrid';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getAllArtworks } from '@/lib/data';

export default function HomePage() {
  const artworks = getAllArtworks();

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

          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-gradient-to-br from-zinc-700 to-zinc-600"
                />
              ))}
            </div>
            <span className="text-zinc-500 text-sm">
              <span className="text-zinc-300 font-semibold">{artworks.length}</span> 件作品收录
            </span>
          </div>
        </div>
      </section>

      <section className="relative px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="font-heading text-lg font-semibold text-white">
              全部作品
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-zinc-700/50 to-transparent" />
          </div>
          <ArtworkGrid artworks={artworks} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

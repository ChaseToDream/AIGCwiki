import { ArtworkGrid } from '@/components/artwork/ArtworkGrid';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getAllArtworks } from '@/lib/data';

export default function HomePage() {
  const artworks = getAllArtworks();

  return (
    <main className="min-h-screen bg-zinc-950">
      <Header />

      {/* Hero区域 */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            AI 绘画作品展示
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            探索精选AI艺术作品，获取生成参数与灵感
          </p>
        </div>
      </section>

      {/* 图片网格 */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <ArtworkGrid artworks={artworks} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

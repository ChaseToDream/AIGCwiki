import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ParameterPanel } from '@/components/artwork/ParameterPanel';
import { RelatedArtworks } from '@/components/artwork/RelatedArtworks';
import { getArtworkById, getRelatedArtworks } from '@/lib/data';
import { notFound } from 'next/navigation';

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
      {/* 顶部导航 */}
      <div className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </Link>
          <h1 className="ml-4 text-white font-semibold truncate">
            {artwork.title}
          </h1>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 图片展示区 */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden bg-zinc-900">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                width={artwork.parameters.width}
                height={artwork.parameters.height}
                className="w-full h-auto"
                priority
              />
            </div>

            {artwork.description && (
              <div className="mt-6">
                <h2 className="text-white font-semibold mb-2">作品描述</h2>
                <p className="text-zinc-400">{artwork.description}</p>
              </div>
            )}
          </div>

          {/* 参数面板 */}
          <div className="lg:col-span-1">
            <ParameterPanel
              parameters={artwork.parameters}
              tags={artwork.tags}
            />
          </div>
        </div>

        {/* 相关推荐 */}
        <RelatedArtworks artworks={relatedArtworks} />
      </div>
    </main>
  );
}

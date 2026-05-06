'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Artwork } from '@/types';
import { motion } from 'framer-motion';

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
}

export function ArtworkCard({ artwork, index = 0 }: ArtworkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <Link href={`/artwork/${artwork.id}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800/60 transition-all duration-500 hover:border-cyan-500/30 hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.15)]">
          <div className="relative aspect-[3/4]">
            <Image
              src={artwork.imageUrl}
              alt={artwork.title}
              fill
              className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-[0.5deg]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-amber-500/0 group-hover:from-cyan-500/10 group-hover:to-amber-500/10 transition-all duration-700" />

            <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <h3 className="font-heading text-white font-semibold text-lg tracking-tight truncate drop-shadow-sm">
                {artwork.title}
              </h3>
              <div className="flex items-center gap-2 mt-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/20">
                  {artwork.parameters.model}
                </span>
                <span className="text-zinc-500 text-xs font-mono">
                  #{artwork.id}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

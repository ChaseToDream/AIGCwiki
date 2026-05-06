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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/artwork/${artwork.id}`} className="group block">
        <div className="relative overflow-hidden rounded-lg bg-zinc-800 aspect-[3/4]">
          <Image
            src={artwork.thumbnailUrl}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* 悬停遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-semibold truncate">
                {artwork.title}
              </h3>
              <p className="text-zinc-300 text-sm mt-1">
                {artwork.parameters.model}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

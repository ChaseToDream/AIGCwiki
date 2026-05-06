'use client';

import { useState } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function LazyImage({
  src,
  alt,
  className = '',
  fill = false,
  width,
  height,
  priority = false,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${fill ? 'w-full h-full' : ''}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-800/80 to-zinc-900 animate-shimmer rounded-[inherit]" />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        className={`${className} transition-all duration-700 ${
          isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm'
        }`}
        onLoad={() => setIsLoaded(true)}
        priority={priority}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  );
}

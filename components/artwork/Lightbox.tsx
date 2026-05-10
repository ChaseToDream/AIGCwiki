'use client';

import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function Lightbox({ src, alt, width, height }: LightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setScale(1);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
      if (e.key === '+' || e.key === '=') setScale((s) => Math.min(s + 0.5, 4));
      if (e.key === '-') setScale((s) => Math.max(s - 0.5, 1));
      if (e.key === '0') setScale(1);
    }

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, close]);

  function handleWheel(e: React.WheelEvent) {
    if (!isOpen) return;
    e.preventDefault();
    setScale((s) => Math.max(1, Math.min(4, s - e.deltaY * 0.002)));
  }

  return (
    <>
      <div
        className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/60 group cursor-zoom-in"
        onClick={open}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-amber-500/5 pointer-events-none" />
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
          priority
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 px-4 py-2 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10">
            <ZoomIn className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">点击放大</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center"
            onClick={close}
            onWheel={handleWheel}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 p-3 rounded-xl bg-zinc-800/80 border border-zinc-700/50 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-800/80 border border-zinc-700/50 text-zinc-400 text-xs font-mono">
              <span>{Math.round(scale * 100)}%</span>
              <div className="flex gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); setScale((s) => Math.max(1, s - 0.5)); }}
                  className="px-2 py-0.5 rounded bg-zinc-700/50 hover:bg-zinc-600/50 transition-colors"
                >
                  −
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setScale(1); }}
                  className="px-2 py-0.5 rounded bg-zinc-700/50 hover:bg-zinc-600/50 transition-colors"
                >
                  重置
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setScale((s) => Math.min(4, s + 0.5)); }}
                  className="px-2 py-0.5 rounded bg-zinc-700/50 hover:bg-zinc-600/50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
              className="transition-transform duration-200 ease-out max-h-[90vh] max-w-[90vw]"
            >
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

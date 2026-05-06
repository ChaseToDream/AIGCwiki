'use client';

import Link from 'next/link';
import { Sparkles, Search } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 glass border-b border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative">
            <Sparkles className="w-6 h-6 text-cyan-400 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
            <div className="absolute inset-0 w-6 h-6 bg-cyan-400/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <span className="font-heading text-lg font-bold tracking-tight">
            <span className="text-gradient">AIGCwiki</span>
          </span>
        </Link>

        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors duration-300" />
            <input
              type="text"
              placeholder="搜索作品..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300"
            />
            <div className="absolute inset-0 rounded-xl bg-cyan-400/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </div>

        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="px-4 py-2 text-sm text-zinc-400 hover:text-cyan-300 rounded-lg hover:bg-zinc-800/50 transition-all duration-300"
          >
            首页
          </Link>
          <Link
            href="/"
            className="px-4 py-2 text-sm text-zinc-400 hover:text-amber-300 rounded-lg hover:bg-zinc-800/50 transition-all duration-300"
          >
            分类
          </Link>
        </nav>
      </div>
    </header>
  );
}

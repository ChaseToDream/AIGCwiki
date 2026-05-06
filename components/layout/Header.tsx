'use client';

import Link from 'next/link';
import { Search, Palette } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Palette className="w-8 h-8 text-indigo-500" />
          <span className="text-xl font-bold text-white">AI Gallery</span>
        </Link>

        {/* 搜索框 */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="搜索作品..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* 导航链接 */}
        <nav className="hidden sm:flex items-center gap-6">
          <Link
            href="/"
            className="text-zinc-300 hover:text-white transition-colors"
          >
            首页
          </Link>
          <Link
            href="/category/style/赛博朋克"
            className="text-zinc-300 hover:text-white transition-colors"
          >
            分类
          </Link>
        </nav>
      </div>
    </header>
  );
}

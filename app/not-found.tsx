import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-zinc-800/50 border border-zinc-700/50 mb-6">
          <Sparkles className="w-10 h-10 text-cyan-400/40" />
        </div>

        <h1 className="font-heading text-6xl sm:text-8xl font-bold text-gradient mb-4">
          404
        </h1>

        <p className="text-zinc-400 text-lg mb-2">
          页面未找到
        </p>
        <p className="text-zinc-600 text-sm mb-8 max-w-md mx-auto">
          你访问的页面不存在，可能已被移除或地址有误
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium hover:bg-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>
      </div>
    </main>
  );
}

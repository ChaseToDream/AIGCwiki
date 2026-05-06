export function Footer() {
  return (
    <footer className="relative border-t border-zinc-800/50 mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/30 to-zinc-900/50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
            <p className="text-zinc-500 text-sm">
              AIGCwiki — 探索 AI 艺术的无限可能
            </p>
          </div>
          <p className="text-zinc-600 text-xs font-mono">
            &copy; {new Date().getFullYear()} AIGCwiki
          </p>
        </div>
      </div>
    </footer>
  );
}

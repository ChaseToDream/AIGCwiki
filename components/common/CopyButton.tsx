'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="relative p-2 rounded-lg bg-zinc-800/80 border border-zinc-700/50 hover:border-cyan-500/50 hover:bg-zinc-700/80 transition-all duration-300 group"
      title="复制"
    >
      {copied ? (
        <Check className="w-4 h-4 text-cyan-400 transition-transform duration-300 scale-110" />
      ) : (
        <Copy className="w-4 h-4 text-zinc-400 group-hover:text-cyan-300 transition-colors duration-300" />
      )}
    </button>
  );
}

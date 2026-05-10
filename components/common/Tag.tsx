'use client';

import Link from 'next/link';
import { useFilter } from '@/components/providers/FilterProvider';

interface TagProps {
  label: string;
  variant?: 'default' | 'cyan' | 'amber';
  filterType?: 'style' | 'subject' | 'model';
}

export function Tag({ label, variant = 'default', filterType }: TagProps) {
  const variants = {
    default:
      'bg-zinc-800/80 text-zinc-300 border-zinc-700/50 hover:border-zinc-500/50',
    cyan: 'bg-cyan-950/30 text-cyan-300 border-cyan-800/50 hover:border-cyan-500/50',
    amber:
      'bg-amber-950/30 text-amber-300 border-amber-800/50 hover:border-amber-500/50',
  };

  if (filterType) {
    return (
      <Link
        href="/category"
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 cursor-pointer select-none hover:scale-105 ${variants[variant]}`}
      >
        {label}
      </Link>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 cursor-default select-none ${variants[variant]}`}
    >
      {label}
    </span>
  );
}

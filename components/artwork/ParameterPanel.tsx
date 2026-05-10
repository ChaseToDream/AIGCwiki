'use client';

import { ArtworkParameters } from '@/types';
import { CopyButton } from '@/components/common/CopyButton';
import { Tag } from '@/components/common/Tag';

interface ParameterPanelProps {
  parameters: ArtworkParameters;
  tags: string[];
  style: string[];
  subject: string[];
}

export function ParameterPanel({ parameters, tags, style, subject }: ParameterPanelProps) {
  const paramItems = [
    { label: '模型', value: parameters.model },
    { label: '采样器', value: parameters.sampler || '-' },
    { label: '步数', value: parameters.steps.toString() },
    { label: 'CFG', value: parameters.cfgScale.toString() },
    { label: '种子', value: parameters.seed.toString() },
    { label: '尺寸', value: `${parameters.width} × ${parameters.height}` },
  ];

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <h3 className="font-heading text-base font-semibold text-white mb-5 flex items-center gap-2">
          <span className="w-1 h-4 rounded-full bg-cyan-400" />
          生成参数
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {paramItems.map((item) => (
            <div
              key={item.label}
              className="bg-zinc-800/50 border border-zinc-800/50 rounded-xl p-3 transition-colors duration-300 hover:border-zinc-700/50"
            >
              <span className="text-zinc-500 text-xs tracking-wide uppercase">
                {item.label}
              </span>
              <p className="text-white text-sm font-mono font-medium mt-1 truncate">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 space-y-5">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-white text-sm font-medium flex items-center gap-2">
              <span className="w-1 h-3 rounded-full bg-cyan-400/60" />
              正向提示词
            </h4>
            <CopyButton text={parameters.positivePrompt} />
          </div>
          <div className="bg-zinc-900/80 border border-zinc-800/50 rounded-xl p-4 max-h-40 overflow-y-auto custom-scroll">
            <p className="text-zinc-300 text-sm leading-relaxed">
              {parameters.positivePrompt}
            </p>
          </div>
        </div>

        {parameters.negativePrompt && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white text-sm font-medium flex items-center gap-2">
                <span className="w-1 h-3 rounded-full bg-amber-400/60" />
                反向提示词
              </h4>
              <CopyButton text={parameters.negativePrompt} />
            </div>
            <div className="bg-zinc-900/80 border border-zinc-800/50 rounded-xl p-4 max-h-32 overflow-y-auto">
              <p className="text-zinc-400 text-sm leading-relaxed">
                {parameters.negativePrompt}
              </p>
            </div>
          </div>
        )}
      </div>

      {style.length > 0 && (
        <div className="glass rounded-2xl p-6">
          <h4 className="text-white text-sm font-medium mb-4 flex items-center gap-2">
            <span className="w-1 h-3 rounded-full bg-amber-400/60" />
            风格
          </h4>
          <div className="flex flex-wrap gap-2">
            {style.map((s) => (
              <Tag key={s} label={s} variant="amber" filterType="style" />
            ))}
          </div>
        </div>
      )}

      {subject.length > 0 && (
        <div className="glass rounded-2xl p-6">
          <h4 className="text-white text-sm font-medium mb-4 flex items-center gap-2">
            <span className="w-1 h-3 rounded-full bg-cyan-400/60" />
            题材
          </h4>
          <div className="flex flex-wrap gap-2">
            {subject.map((s) => (
              <Tag key={s} label={s} variant="cyan" filterType="subject" />
            ))}
          </div>
        </div>
      )}

      {tags.length > 0 && (
        <div className="glass rounded-2xl p-6">
          <h4 className="text-white text-sm font-medium mb-4 flex items-center gap-2">
            <span className="w-1 h-3 rounded-full bg-amber-400/60" />
            标签
          </h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

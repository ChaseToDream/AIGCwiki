'use client';

import { ArtworkParameters } from '@/types';
import { CopyButton } from '@/components/common/CopyButton';
import { Tag } from '@/components/common/Tag';

interface ParameterPanelProps {
  parameters: ArtworkParameters;
  tags: string[];
}

export function ParameterPanel({ parameters, tags }: ParameterPanelProps) {
  const paramItems = [
    { label: '模型', value: parameters.model },
    { label: '采样器', value: parameters.sampler || '-' },
    { label: '步数', value: parameters.steps.toString() },
    { label: 'CFG Scale', value: parameters.cfgScale.toString() },
    { label: '种子', value: parameters.seed.toString() },
    { label: '尺寸', value: `${parameters.width} x ${parameters.height}` },
  ];

  return (
    <div className="bg-zinc-800 rounded-lg p-6 space-y-6">
      {/* 参数列表 */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">生成参数</h3>
        <div className="grid grid-cols-2 gap-3">
          {paramItems.map((item) => (
            <div key={item.label} className="bg-zinc-700/50 rounded-lg p-3">
              <span className="text-zinc-400 text-sm">{item.label}</span>
              <p className="text-white font-medium mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 正向提示词 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-white font-medium">正向提示词</h4>
          <CopyButton text={parameters.positivePrompt} />
        </div>
        <div className="bg-zinc-900 rounded-lg p-3 max-h-40 overflow-y-auto">
          <p className="text-zinc-300 text-sm leading-relaxed">
            {parameters.positivePrompt}
          </p>
        </div>
      </div>

      {/* 反向提示词 */}
      {parameters.negativePrompt && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white font-medium">反向提示词</h4>
            <CopyButton text={parameters.negativePrompt} />
          </div>
          <div className="bg-zinc-900 rounded-lg p-3 max-h-32 overflow-y-auto">
            <p className="text-zinc-400 text-sm leading-relaxed">
              {parameters.negativePrompt}
            </p>
          </div>
        </div>
      )}

      {/* 标签 */}
      <div>
        <h4 className="text-white font-medium mb-3">标签</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface TagProps {
  label: string;
}

export function Tag({ label }: TagProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-zinc-700 text-zinc-300 hover:bg-zinc-600 transition-colors cursor-pointer">
      #{label}
    </span>
  );
}

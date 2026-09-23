import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';

interface Keyword {
  id: number;
  name: string;
}

export default function KeywordPills({
  keywords,
  mediaType = 'movie',
}: {
  keywords: Keyword[];
  mediaType?: 'movie' | 'tv';
}) {
  if (!keywords.length) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 pb-6">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-white">
        <Tag size={18} className="text-amber-400" />
        Keywords
      </h2>
      <div className="flex flex-wrap gap-2">
        {keywords.map((k) => (
          <Link
            key={k.id}
            to={`/advanced?keyword=${k.id}&keywordName=${encodeURIComponent(k.name)}&type=${mediaType}`}
            className="group flex items-center gap-1.5 rounded-full bg-gray-800 px-3.5 py-1.5 text-xs font-medium text-gray-300 transition hover:bg-amber-500 hover:text-black"
          >
            <span className="text-[10px] opacity-60 group-hover:opacity-100">#</span>
            {k.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

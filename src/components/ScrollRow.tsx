import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

interface ScrollRowProps {
  title: string;
  items: Array<{
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
    media_type?: string;
  }>;
  mediaType: 'movie' | 'tv';
}

export default function ScrollRow({ title, items, mediaType }: ScrollRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  if (items.length === 0) return null;

  return (
    <section className="relative py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
        <h2 className="text-lg font-bold text-white md:text-xl">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="rounded-full bg-white/10 p-1.5 text-gray-300 transition hover:bg-white/20 hover:text-white"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="rounded-full bg-white/10 p-1.5 text-gray-300 transition hover:bg-white/20 hover:text-white"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="scrollbar-hide mx-auto flex max-w-7xl gap-4 overflow-x-auto px-4 md:px-6 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item) => (
          <div key={item.id} className="w-[150px] flex-shrink-0 sm:w-[160px] md:w-[170px]">
            <MovieCard
              id={item.id}
              title={item.title ?? item.name ?? ''}
              posterPath={item.poster_path}
              voteAverage={item.vote_average}
              releaseDate={item.release_date ?? item.first_air_date ?? ''}
              mediaType={mediaType}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

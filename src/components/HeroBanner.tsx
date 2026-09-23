import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTrending } from '../hooks/useTMDB';
import { backdropUrl } from '../services/tmdb';
import type { MediaItem } from '../types/tmdb';

interface HeroBannerProps {
  onPlayTrailer: (id: number, type: 'movie' | 'tv') => void;
}

export default function HeroBanner({ onPlayTrailer }: HeroBannerProps) {
  const [window, setWindow] = useState<'day' | 'week'>('week');
  const { data } = useTrending('movie', window);
  const [current, setCurrent] = useState(0);
  const items: MediaItem[] = (data?.results.filter((r) => r.backdrop_path) as MediaItem[]) ?? [];

  useEffect(() => setCurrent(0), [window]);

  const next = useCallback(() => setCurrent((c) => (c + 1) % Math.max(items.length, 1)), [items.length]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + items.length) % Math.max(items.length, 1)), [items.length]);

  useEffect(() => {
    if (items.length === 0) return;
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [items.length, next]);

  if (items.length === 0) return <div className="h-[70vh] bg-gray-900" />;

  const item = items[current];
  const title = 'title' in item ? item.title : 'name' in item ? item.name : '';
  const date = 'release_date' in item ? item.release_date : 'first_air_date' in item ? (item as any).first_air_date : '';
  const mediaType = (item.media_type ?? 'movie') as 'movie' | 'tv';

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Backdrop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={backdropUrl(item.backdrop_path)}
            alt={title}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-transparent to-transparent" />

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="rounded-md bg-amber-500 px-2 py-0.5 text-xs font-bold text-black uppercase">
                {mediaType}
              </span>
              <span className="text-sm text-gray-300">{date?.slice(0, 4)}</span>
              <span className="flex items-center gap-1 text-sm text-amber-400 font-semibold">
                ★ {Math.round(item.vote_average * 10)}%
              </span>
            </div>
            <h1 className="mb-3 max-w-2xl text-4xl font-extrabold text-white md:text-5xl lg:text-6xl leading-tight">
              {title}
            </h1>
            <p className="mb-6 max-w-xl text-sm text-gray-300 line-clamp-3 md:text-base">
              {item.overview}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onPlayTrailer(item.id, mediaType)}
                className="flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold text-black transition hover:bg-amber-400"
              >
                <Play size={20} fill="currentColor" /> Watch Trailer
              </button>
              <Link
                to={`/${mediaType}/${item.id}`}
                className="flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                <Info size={20} /> More Info
              </Link>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Trending Time Window Toggle */}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-2 md:right-8 md:top-8">
        <span className="hidden text-xs font-semibold uppercase tracking-wider text-white/80 md:inline">
          Trending
        </span>
        <div className="flex rounded-full border border-white/20 bg-black/50 p-1 backdrop-blur">
          <button
            onClick={() => setWindow('day')}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              window === 'day' ? 'bg-amber-500 text-black' : 'text-white hover:text-amber-400'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setWindow('week')}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              window === 'week' ? 'bg-amber-500 text-black' : 'text-white hover:text-amber-400'
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      {/* Nav Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {items.slice(0, 8).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-amber-400' : 'w-2 bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}

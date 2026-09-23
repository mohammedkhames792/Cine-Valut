import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Layers } from 'lucide-react';
import { useCollection } from '../hooks/useTMDB';
import MovieCard from './MovieCard';
import { backdropUrl } from '../services/tmdb';

export default function CollectionBanner({ collectionId }: { collectionId: number }) {
  const [open, setOpen] = useState(true);
  const { data } = useCollection(collectionId);

  if (!data || !data.parts?.length) return null;

  const parts = [...data.parts].sort(
    (a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
  );

  return (
    <div className="relative mt-8 overflow-hidden rounded-2xl">
      {/* Backdrop */}
      {data.backdrop_path && (
        <>
          <img
            src={backdropUrl(data.backdrop_path)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/95 to-gray-950/80" />
        </>
      )}

      <div className="relative p-5 md:p-6">
        {/* Header */}
        <button
          onClick={() => setOpen(!open)}
          className="mb-4 flex w-full items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <Layers size={20} className="text-amber-400" />
            <div className="text-left">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
                Part of a collection
              </p>
              <h2 className="text-xl font-extrabold text-white md:text-2xl">{data.name}</h2>
            </div>
          </div>
          <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-gray-400">
            <ChevronDown size={22} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {data.overview && (
                <p className="mb-4 max-w-2xl text-sm leading-relaxed text-gray-300 line-clamp-3">
                  {data.overview}
                </p>
              )}
              <p className="mb-3 text-xs text-gray-400">
                {parts.length} film{parts.length > 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {parts.map((p) => (
                  <MovieCard
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    posterPath={p.poster_path}
                    voteAverage={p.vote_average}
                    releaseDate={p.release_date}
                    mediaType="movie"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

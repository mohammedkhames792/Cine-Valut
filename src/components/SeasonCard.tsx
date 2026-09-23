import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Tv } from 'lucide-react';
import { posterUrl } from '../services/tmdb';

export interface Season {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
  overview: string;
  poster_path: string | null;
  air_date: string | null;
}

export default function SeasonCard({ season }: { season: Season }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-gray-900">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-4 p-3 text-left transition hover:bg-white/5"
      >
        <div className="h-[90px] w-[60px] flex-shrink-0 overflow-hidden rounded-lg bg-gray-800">
          {season.poster_path ? (
            <img
              src={posterUrl(season.poster_path, 'w185')}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-600">
              <Tv size={20} />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white">{season.name}</h3>
          <p className="text-xs text-gray-400">
            {season.season_number === 0 ? 'Specials' : `${season.episode_count} Episodes`}
            {season.air_date ? ` • ${season.air_date.slice(0, 4)}` : ''}
          </p>
        </div>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-gray-400">
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="border-t border-white/10 p-4 text-sm leading-relaxed text-gray-300">
              {season.overview || 'No overview available for this season.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

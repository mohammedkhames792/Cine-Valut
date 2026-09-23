import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, BookmarkPlus, Star } from 'lucide-react';
import { posterUrl } from '../services/tmdb';
import { useLibraryStore } from '../stores/useStore';
import { useToast } from './Toast';

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string | null;
  voteAverage: number;
  releaseDate: string;
  mediaType: 'movie' | 'tv';
  overview?: string;
}

export default function MovieCard({
  id,
  title,
  posterPath,
  voteAverage,
  releaseDate,
  mediaType,
}: MovieCardProps) {
  const { addFavorite, removeFavorite, isFavorite, addWatchlist, removeWatchlist, isWatchlist } =
    useLibraryStore();
  const { toast } = useToast();

  const fav = isFavorite(id);
  const watch = isWatchlist(id);

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (fav) {
      removeFavorite(id);
      toast('Removed from favorites', 'info');
    } else {
      addFavorite({ id, media_type: mediaType, title, poster_path: posterPath, vote_average: voteAverage, release_date: releaseDate, addedAt: Date.now() });
      toast('Added to favorites ❤️', 'success');
    }
  };

  const toggleWatch = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (watch) {
      removeWatchlist(id);
      toast('Removed from watchlist', 'info');
    } else {
      addWatchlist({ id, media_type: mediaType, title, poster_path: posterPath, vote_average: voteAverage, release_date: releaseDate, addedAt: Date.now() });
      toast('Added to watchlist 🔖', 'success');
    }
  };

  const ratingColor =
    voteAverage >= 7 ? 'text-green-400' : voteAverage >= 5 ? 'text-amber-400' : 'text-red-400';

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group relative"
    >
      <Link to={`/${mediaType}/${id}`} className="block">
        <div className="relative overflow-hidden rounded-xl bg-gray-800 shadow-lg">
          {/* Poster */}
          <div className="aspect-[2/3] overflow-hidden">
            <img
              src={posterUrl(posterPath)}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1">
            <Star size={12} className={ratingColor} fill="currentColor" />
            <span className={`text-xs font-bold ${ratingColor}`}>
              {voteAverage.toFixed(1)}
            </span>
          </div>

          {/* Action Buttons (hover) */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={toggleFav}
              className={`rounded-full p-1.5 transition ${fav ? 'bg-red-500 text-white' : 'bg-black/60 text-white hover:bg-red-500'}`}
            >
              <Heart size={16} fill={fav ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={toggleWatch}
              className={`rounded-full p-1.5 transition ${watch ? 'bg-amber-500 text-black' : 'bg-black/60 text-white hover:bg-amber-500'}`}
            >
              <BookmarkPlus size={16} fill={watch ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Info */}
          <div className="p-3">
            <h3 className="mb-1 truncate text-sm font-semibold text-white">{title}</h3>
            <p className="text-xs text-gray-400">{releaseDate?.slice(0, 4) || '—'}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

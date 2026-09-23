import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Film, Tv, Loader2 } from 'lucide-react';
import { useMovieGenres, useTVGenres, useDiscoverMovies, useDiscoverTV } from '../hooks/useTMDB';
import MovieCard from '../components/MovieCard';
import EmptyState from '../components/EmptyState';
import { SkeletonRow } from '../components/SkeletonCard';

export default function GenresPage() {
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
  const [genreId, setGenreId] = useState<number | null>(28);
  const [page, setPage] = useState(1);

  const { data: movieGenres } = useMovieGenres();
  const { data: tvGenres } = useTVGenres();

  const genres = mediaType === 'movie' ? (movieGenres?.genres ?? []) : (tvGenres?.genres ?? []);
  const activeGenre = genres.find((g) => g.id === genreId);

  const filters = {
    with_genres: genreId ? String(genreId) : undefined,
    sort_by: 'popularity.desc',
    page,
  };

  const movieQuery = useDiscoverMovies(filters);
  const tvQuery = useDiscoverTV(filters);
  const query = mediaType === 'movie' ? movieQuery : tvQuery;

  const results: any[] = (query.data?.results as any[]) ?? [];
  const totalPages = Math.min(query.data?.total_pages ?? 1, 500);

  const switchType = (t: 'movie' | 'tv') => {
    setMediaType(t);
    setGenreId(null);
    setPage(1);
  };

  const selectGenre = (id: number) => {
    setGenreId(id);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 pt-8 md:px-6">
        {/* Header */}
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="text-amber-400" size={24} />
          <h1 className="text-3xl font-extrabold text-white">Browse by Genre</h1>
        </div>
        <p className="mb-6 text-gray-400">Explore thousands of titles across every genre</p>

        {/* Media Type Toggle */}
        <div className="mb-6 inline-flex rounded-full border border-white/10 bg-gray-900 p-1">
          <button
            onClick={() => switchType('movie')}
            className={`flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold transition ${
              mediaType === 'movie' ? 'bg-amber-500 text-black' : 'text-gray-300 hover:text-white'
            }`}
          >
            <Film size={16} /> Movies
          </button>
          <button
            onClick={() => switchType('tv')}
            className={`flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold transition ${
              mediaType === 'tv' ? 'bg-amber-500 text-black' : 'text-gray-300 hover:text-white'
            }`}
          >
            <Tv size={16} /> TV Shows
          </button>
        </div>

        {/* Genre Chips */}
        <div className="mb-8 flex flex-wrap gap-2">
          {genres.map((g) => (
            <motion.button
              key={g.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => selectGenre(g.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                genreId === g.id
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {g.name}
            </motion.button>
          ))}
        </div>

        {/* Results Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            {activeGenre ? activeGenre.name : 'All Genres'}{' '}
            <span className="text-sm font-normal text-gray-400">
              ({mediaType === 'movie' ? 'Movies' : 'TV Shows'})
            </span>
            {query.isFetching && <Loader2 size={16} className="ml-2 inline animate-spin text-amber-400" />}
          </h2>
          <span className="text-sm text-gray-400">
            Page {page} / {totalPages}
          </span>
        </div>

        {/* Grid */}
        {query.isLoading ? (
          <SkeletonRow count={12} />
        ) : results.length === 0 ? (
          <EmptyState title="No titles found" description="Try selecting a different genre" />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            {results.map((item: any) => (
              <MovieCard
                key={item.id}
                id={item.id}
                title={item.title ?? item.name ?? ''}
                posterPath={item.poster_path}
                voteAverage={item.vote_average}
                releaseDate={item.release_date ?? item.first_air_date ?? ''}
                mediaType={mediaType}
              />
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {results.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-3 pb-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="px-3 text-sm text-gray-400">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

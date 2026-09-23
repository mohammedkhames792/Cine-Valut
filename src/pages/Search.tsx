import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, Filter, X, Loader2, SlidersHorizontal } from 'lucide-react';
import { useSearchMulti, useDiscoverMovies, useMovieGenres } from '../hooks/useTMDB';
import MovieCard from '../components/MovieCard';
import EmptyState from '../components/EmptyState';
import { SkeletonRow } from '../components/SkeletonCard';
import type { Genre } from '../types/tmdb';

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'popularity.asc', label: 'Least Popular' },
  { value: 'vote_average.desc', label: 'Highest Rated' },
  { value: 'vote_average.asc', label: 'Lowest Rated' },
  { value: 'primary_release_date.desc', label: 'Newest' },
  { value: 'primary_release_date.asc', label: 'Oldest' },
];

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [page, setPage] = useState(1);

  const { data: genresData } = useMovieGenres();
  const genres: Genre[] = genresData?.genres ?? [];

  // Search mode
  const isSearch = query.length >= 2;
  const { data: searchResults, isLoading: searchLoading, isFetching: searchFetching } = useSearchMulti(query, page);

  // Discover mode
  const discoverFilters = {
    with_genres: selectedGenres.length > 0 ? selectedGenres.join(',') : undefined,
    primary_release_year: year ? Number(year) : undefined,
    vote_average_gte: rating ? Number(rating) : undefined,
    sort_by: sortBy,
    page,
  };
  const { data: discoverResults, isLoading: discoverLoading, isFetching: discoverFetching } = useDiscoverMovies(discoverFilters);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setQuery(q);
  }, [searchParams]);

  const handleSearch = () => {
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
      setPage(1);
    }
  };

  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
    setPage(1);
  };

  const results = isSearch
    ? searchResults?.results.filter((r) => r.media_type !== 'person') ?? []
    : discoverResults?.results ?? [];

  const totalPages = isSearch ? (searchResults?.total_pages ?? 1) : (discoverResults?.total_pages ?? 1);
  const isLoading = isSearch ? searchLoading : discoverLoading;
  const isFetching = isSearch ? searchFetching : discoverFetching;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Search Header */}
      <div className="mx-auto max-w-7xl px-4 pt-8 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-gray-800 px-5 py-3 md:flex-none">
              <SearchIcon size={20} className="text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search movies, TV shows..."
                className="w-full bg-transparent text-white placeholder-gray-500 outline-none md:w-80"
              />
              {query && (
                <button onClick={() => { setQuery(''); setSearchParams({}); }} className="text-gray-400 hover:text-white">
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/advanced"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 px-5 py-3 font-medium text-black transition hover:from-amber-400 hover:to-amber-300"
            >
              <SlidersHorizontal size={18} /> Advanced Search
            </Link>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-full px-5 py-3 font-medium transition ${showFilters ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
          >
            <Filter size={18} /> Filters
            {selectedGenres.length > 0 && (
              <span className="rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-black">
                {selectedGenres.length}
              </span>
            )}
          </button>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-2xl border border-white/10 bg-gray-900 p-6">
                {/* Genres */}
                <h3 className="mb-3 text-sm font-semibold text-gray-300">Genres</h3>
                <div className="mb-6 flex flex-wrap gap-2">
                  {genres.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => toggleGenre(g.id)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${selectedGenres.includes(g.id) ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                    >
                      {g.name}
                    </button>
                  ))}
                </div>

                {/* Year, Rating, Sort */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">Year</label>
                    <input
                      type="number"
                      value={year}
                      onChange={(e) => { setYear(e.target.value); setPage(1); }}
                      placeholder="e.g. 2024"
                      min={1900}
                      max={2030}
                      className="w-full rounded-lg border border-white/10 bg-gray-800 px-4 py-2 text-white outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">Min Rating</label>
                    <input
                      type="number"
                      value={rating}
                      onChange={(e) => { setRating(e.target.value); setPage(1); }}
                      placeholder="e.g. 7"
                      min={0}
                      max={10}
                      className="w-full rounded-lg border border-white/10 bg-gray-800 px-4 py-2 text-white outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                      className="w-full rounded-lg border border-white/10 bg-gray-800 px-4 py-2 text-white outline-none focus:border-amber-500"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            {isSearch ? `Results for "${query}"` : 'Discover Movies'}
            {isFetching && <Loader2 size={18} className="ml-2 inline animate-spin text-amber-400" />}
          </h2>
          <span className="text-sm text-gray-400">
            Page {page} of {Math.min(totalPages, 500)}
          </span>
        </div>

        {isLoading ? (
          <SkeletonRow count={12} />
        ) : results.length === 0 ? (
          <EmptyState
            title={isSearch ? 'No results found' : 'No movies match your filters'}
            description={isSearch ? 'Try a different search term' : 'Adjust your filters and try again'}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          >
            {results.map((item) => {
              const title = 'title' in item ? item.title : 'name' in item ? item.name : '';
              const date = 'release_date' in item ? item.release_date : 'first_air_date' in item ? (item as any).first_air_date : '';
              const mt = (item.media_type ?? 'movie') as 'movie' | 'tv';
              return (
                <MovieCard
                  key={`${mt}-${item.id}`}
                  id={item.id}
                  title={title}
                  posterPath={item.poster_path}
                  voteAverage={item.vote_average}
                  releaseDate={date}
                  mediaType={mt}
                />
              );
            })}
          </motion.div>
        )}

        {/* Pagination */}
        {results.length > 0 && (
          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-gray-400">
              {page} / {Math.min(totalPages, 500)}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(Math.min(totalPages, 500), p + 1))}
              disabled={page >= Math.min(totalPages, 500)}
              className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

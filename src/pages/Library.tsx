import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, BookmarkPlus, Trash2, Search, Film, Tv, BarChart3, Star } from 'lucide-react';
import { useLibraryStore } from '../stores/useStore';
import { useToast } from '../components/Toast';
import MovieCard from '../components/MovieCard';
import EmptyState from '../components/EmptyState';
import type { SavedItem } from '../types/tmdb';

type Tab = 'favorites' | 'watchlist';
type Filter = 'all' | 'movie' | 'tv';
type Sort = 'recent' | 'rating' | 'title' | 'year';

export default function LibraryPage() {
  const [tab, setTab] = useState<Tab>('favorites');
  const [filter, setFilter] = useState<Filter>('all');
  const [sort, setSort] = useState<Sort>('recent');
  const [search, setSearch] = useState('');

  const { favorites, watchlist, removeFavorite, removeWatchlist } = useLibraryStore();
  const { toast } = useToast();

  const allItems: SavedItem[] = tab === 'favorites' ? favorites : watchlist;
  const remove = tab === 'favorites' ? removeFavorite : removeWatchlist;

  const items = useMemo(() => {
    let list = [...allItems];
    if (filter !== 'all') list = list.filter((i) => i.media_type === filter);
    if (search.trim()) {
      list = list.filter((i) => i.title.toLowerCase().includes(search.trim().toLowerCase()));
    }
    switch (sort) {
      case 'rating':
        list.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case 'title':
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'year':
        list.sort((a, b) => (b.release_date ?? '').localeCompare(a.release_date ?? ''));
        break;
      default:
        list.sort((a, b) => b.addedAt - a.addedAt);
    }
    return list;
  }, [allItems, filter, sort, search]);

  const clearAll = () => {
    allItems.forEach((i) => remove(i.id));
    toast(`Cleared all from ${tab}`, 'info');
  };

  // Stats
  const avgRating = allItems.length
    ? (allItems.reduce((s, i) => s + i.vote_average, 0) / allItems.length).toFixed(1)
    : '0.0';
  const movieCount = allItems.filter((i) => i.media_type === 'movie').length;
  const tvCount = allItems.filter((i) => i.media_type === 'tv').length;

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 pt-8 md:px-6">
        <h1 className="mb-2 text-3xl font-extrabold text-white">My Library</h1>
        <p className="mb-6 text-gray-400">Your saved movies and TV shows</p>

        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setTab('favorites')}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold transition ${
              tab === 'favorites'
                ? 'border border-red-500/50 bg-red-500/20 text-red-400'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Heart size={18} fill={tab === 'favorites' ? 'currentColor' : 'none'} />
            Favorites ({favorites.length})
          </button>
          <button
            onClick={() => setTab('watchlist')}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold transition ${
              tab === 'watchlist'
                ? 'border border-amber-500/50 bg-amber-500/20 text-amber-400'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <BookmarkPlus size={18} fill={tab === 'watchlist' ? 'currentColor' : 'none'} />
            Watchlist ({watchlist.length})
          </button>
        </div>

        {/* Stats Cards */}
        {allItems.length > 0 && (
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-gray-900 p-4">
              <BarChart3 size={18} className="mb-2 text-amber-400" />
              <p className="text-2xl font-bold text-white">{allItems.length}</p>
              <p className="text-xs text-gray-400">Total Saved</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-gray-900 p-4">
              <Star size={18} className="mb-2 text-green-400" />
              <p className="text-2xl font-bold text-white">{avgRating}</p>
              <p className="text-xs text-gray-400">Avg Rating</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-gray-900 p-4">
              <Film size={18} className="mb-2 text-blue-400" />
              <p className="text-2xl font-bold text-white">{movieCount}</p>
              <p className="text-xs text-gray-400">Movies</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-gray-900 p-4">
              <Tv size={18} className="mb-2 text-purple-400" />
              <p className="text-2xl font-bold text-white">{tvCount}</p>
              <p className="text-xs text-gray-400">TV Shows</p>
            </div>
          </div>
        )}

        {/* Toolbar */}
        {allItems.length > 0 && (
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {/* Type filter */}
              <div className="inline-flex rounded-full border border-white/10 bg-gray-900 p-1">
                {(['all', 'movie', 'tv'] as Filter[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition ${
                      filter === f ? 'bg-amber-500 text-black' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {f === 'all' ? 'All' : f === 'movie' ? 'Movies' : 'TV'}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2">
                <Search size={16} className="text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by title..."
                  className="w-32 bg-transparent text-sm text-white placeholder-gray-500 outline-none md:w-40"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-full border border-white/10 bg-gray-800 px-4 py-2 text-sm text-white outline-none focus:border-amber-500"
              >
                <option value="recent">Recently Added</option>
                <option value="rating">Highest Rated</option>
                <option value="title">Title A-Z</option>
                <option value="year">Newest Release</option>
              </select>

              {/* Clear */}
              <button
                onClick={clearAll}
                className="flex items-center gap-2 rounded-full bg-red-500/15 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/25"
              >
                <Trash2 size={16} /> Clear All
              </button>
            </div>
          </div>
        )}

        {/* Items */}
        <AnimatePresence mode="wait">
          {allItems.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <EmptyState
                title={tab === 'favorites' ? 'No favorites yet' : 'Your watchlist is empty'}
                description="Start adding movies and TV shows by clicking the heart or bookmark icon on any poster"
              />
            </motion.div>
          ) : items.length === 0 ? (
            <motion.div key="nofilter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <EmptyState title="No matches" description="No saved items match your current filter or search" />
            </motion.div>
          ) : (
            <motion.div
              key={`${tab}-${filter}-${sort}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-2 gap-4 pb-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
            >
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="group relative"
                >
                  <MovieCard
                    id={item.id}
                    title={item.title}
                    posterPath={item.poster_path}
                    voteAverage={item.vote_average}
                    releaseDate={item.release_date}
                    mediaType={item.media_type}
                  />
                  <button
                    onClick={() => {
                      remove(item.id);
                      toast('Item removed', 'info');
                    }}
                    className="absolute right-2 top-2 z-10 rounded-full bg-red-500/90 p-1.5 text-white opacity-0 transition hover:bg-red-500 group-hover:opacity-100"
                    aria-label="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                  <p className="mt-1 truncate text-[10px] text-gray-500">
                    Added {new Date(item.addedAt).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

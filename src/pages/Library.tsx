import { useMemo, useState } from 'react';
import { Search, Trash2, Heart, Bookmark } from 'lucide-react';

import MovieCard from '../components/MovieCard';
import EmptyState from '../components/EmptyState';

import { useLibraryStore } from '../stores/useStore';

type LibraryTab = 'all' | 'favorites' | 'watchlist';

type SortOption = 'recent' | 'rating' | 'title';

export default function Library() {
  const [activeTab, setActiveTab] =
    useState<LibraryTab>('all');

  const [searchQuery, setSearchQuery] = useState('');

  const [sortBy, setSortBy] =
    useState<SortOption>('recent');

  const {
    favorites,
    watchlist,
    removeFavorite,
    removeWatchlist,
  } = useLibraryStore();

  const items = useMemo(() => {
    if (activeTab === 'favorites') {
      return favorites;
    }

    if (activeTab === 'watchlist') {
      return watchlist;
    }

    const combined = [...favorites, ...watchlist];

    const uniqueItems = combined.filter(
      (item, index, array) =>
        array.findIndex(
          (currentItem) =>
            currentItem.id === item.id &&
            currentItem.media_type === item.media_type
        ) === index
    );

    return uniqueItems;
  }, [activeTab, favorites, watchlist]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = searchQuery
      .trim()
      .toLowerCase();

    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(normalizedQuery)
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === 'rating') {
        return b.vote_average - a.vote_average;
      }

      return b.addedAt - a.addedAt;
    });
  }, [items, searchQuery, sortBy]);

  const handleRemove = (
    id: number,
    mediaType: 'movie' | 'tv'
  ) => {
    if (activeTab === 'favorites') {
      removeFavorite(id, mediaType);
      return;
    }

    if (activeTab === 'watchlist') {
      removeWatchlist(id, mediaType);
      return;
    }

    removeFavorite(id, mediaType);
    removeWatchlist(id, mediaType);
  };

  return (
    <main className="min-h-screen bg-gray-950 px-4 pb-12 pt-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-extrabold text-white md:text-4xl">
            My Library
          </h1>

          <p className="text-gray-400">
            Manage your favorite movies and watchlist.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === 'all'
                ? 'bg-amber-500 text-black'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            All
            <span className="rounded-full bg-black/20 px-2 py-0.5 text-xs">
              {favorites.length + watchlist.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === 'favorites'
                ? 'bg-amber-500 text-black'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Heart size={16} />
            Favorites
            <span className="rounded-full bg-black/20 px-2 py-0.5 text-xs">
              {favorites.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('watchlist')}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === 'watchlist'
                ? 'bg-amber-500 text-black'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <Bookmark size={16} />
            Watchlist
            <span className="rounded-full bg-black/20 px-2 py-0.5 text-xs">
              {watchlist.length}
            </span>
          </button>
        </div>

        {/* Search and Sort */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search your library..."
              className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white outline-none transition placeholder:text-gray-500 focus:border-amber-500"
            />
          </div>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as SortOption)
            }
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-gray-300 outline-none focus:border-amber-500"
          >
            <option value="recent" className="bg-gray-900">
              Recently Added
            </option>

            <option value="rating" className="bg-gray-900">
              Highest Rating
            </option>

            <option value="title" className="bg-gray-900">
              Title A-Z
            </option>
          </select>
        </div>

        {/* Content */}
        {filteredItems.length === 0 ? (
          <EmptyState
            title={
              searchQuery
                ? 'No results found'
                : activeTab === 'favorites'
                  ? 'No favorite movies yet'
                  : activeTab === 'watchlist'
                    ? 'Your watchlist is empty'
                    : 'Your library is empty'
            }
            description={
              searchQuery
                ? 'Try searching with a different title.'
                : 'Start exploring movies and add them to your library.'
            }
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredItems.map((item) => (
              <div
                key={`${item.media_type}-${item.id}`}
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
                  type="button"
                  onClick={() =>
                    handleRemove(item.id, item.media_type)
                  }
                  aria-label={`Remove ${item.title}`}
                  className="absolute right-2 top-2 z-10 rounded-full bg-red-500/90 p-2 text-white opacity-0 shadow-lg transition hover:bg-red-600 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SavedItem } from '../types/tmdb';

// ─── Library Store ─────────────────────────────────────

interface LibraryState {
  favorites: SavedItem[];
  watchlist: SavedItem[];

  addFavorite: (item: SavedItem) => void;
  removeFavorite: (id: number, mediaType: 'movie' | 'tv') => void;
  isFavorite: (id: number, mediaType: 'movie' | 'tv') => boolean;

  addWatchlist: (item: SavedItem) => void;
  removeWatchlist: (id: number, mediaType: 'movie' | 'tv') => void;
  isWatchlist: (id: number, mediaType: 'movie' | 'tv') => boolean;
}

const isSameMedia = (
  item: SavedItem,
  id: number,
  mediaType: 'movie' | 'tv'
) => {
  return item.id === id && item.media_type === mediaType;
};

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set, get) => ({
      favorites: [],
      watchlist: [],

      addFavorite: (item) =>
        set((state) => {
          const alreadyExists = state.favorites.some((favorite) =>
            isSameMedia(favorite, item.id, item.media_type)
          );

          if (alreadyExists) {
            return state;
          }

          return {
            favorites: [...state.favorites, item],
          };
        }),

      removeFavorite: (id, mediaType) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (favorite) => !isSameMedia(favorite, id, mediaType)
          ),
        })),

      isFavorite: (id, mediaType) =>
        get().favorites.some((favorite) =>
          isSameMedia(favorite, id, mediaType)
        ),

      addWatchlist: (item) =>
        set((state) => {
          const alreadyExists = state.watchlist.some((watchItem) =>
            isSameMedia(watchItem, item.id, item.media_type)
          );

          if (alreadyExists) {
            return state;
          }

          return {
            watchlist: [...state.watchlist, item],
          };
        }),

      removeWatchlist: (id, mediaType) =>
        set((state) => ({
          watchlist: state.watchlist.filter(
            (watchItem) => !isSameMedia(watchItem, id, mediaType)
          ),
        })),

      isWatchlist: (id, mediaType) =>
        get().watchlist.some((watchItem) =>
          isSameMedia(watchItem, id, mediaType)
        ),
    }),
    {
      name: 'tmdb-library',
    }
  )
);

// ─── UI Store ──────────────────────────────────────────

interface UIState {
  darkMode: boolean;
  sidebarOpen: boolean;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      darkMode: true,
      sidebarOpen: false,

      toggleDarkMode: () =>
        set((state) => ({
          darkMode: !state.darkMode,
        })),

      toggleSidebar: () =>
        set((state) => ({
          sidebarOpen: !state.sidebarOpen,
        })),

      closeSidebar: () =>
        set({
          sidebarOpen: false,
        }),
    }),
    {
      name: 'tmdb-ui',
      partialize: (state) => ({
        darkMode: state.darkMode,
      }),
    }
  )
);
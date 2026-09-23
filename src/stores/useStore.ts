import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SavedItem } from '../types/tmdb';

// ─── Library Store (Favorites + Watchlist) ─────────────
interface LibraryState {
  favorites: SavedItem[];
  watchlist: SavedItem[];
  addFavorite: (item: SavedItem) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  addWatchlist: (item: SavedItem) => void;
  removeWatchlist: (id: number) => void;
  isWatchlist: (id: number) => boolean;
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set, get) => ({
      favorites: [],
      watchlist: [],

      addFavorite: (item) =>
        set((s) => ({
          favorites: s.favorites.some((f) => f.id === item.id)
            ? s.favorites
            : [...s.favorites, item],
        })),
      removeFavorite: (id) =>
        set((s) => ({ favorites: s.favorites.filter((f) => f.id !== id) })),
      isFavorite: (id) => get().favorites.some((f) => f.id === id),

      addWatchlist: (item) =>
        set((s) => ({
          watchlist: s.watchlist.some((w) => w.id === item.id)
            ? s.watchlist
            : [...s.watchlist, item],
        })),
      removeWatchlist: (id) =>
        set((s) => ({ watchlist: s.watchlist.filter((w) => w.id !== id) })),
      isWatchlist: (id) => get().watchlist.some((w) => w.id === id),
    }),
    { name: 'tmdb-library' }
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
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      closeSidebar: () => set({ sidebarOpen: false }),
    }),
    { name: 'tmdb-ui', partialize: (state) => ({ darkMode: state.darkMode }) }
  )
);

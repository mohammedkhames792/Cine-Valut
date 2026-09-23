import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AdvancedFilterState } from '../utils/constants';

export interface SavedSearch {
  id: string;
  mediaType: 'movie' | 'tv';
  filters: AdvancedFilterState;
  createdAt: number;
  label?: string;
}

interface SavedSearchesState {
  saved: SavedSearch[];
  recentKeywords: Array<{ id: number; name: string }>;
  addSearch: (s: Omit<SavedSearch, 'id' | 'createdAt'> & { label?: string }) => void;
  removeSearch: (id: string) => void;
  clearSearches: () => void;
  pushKeyword: (k: { id: number; name: string }) => void;
}

export const useSavedSearches = create<SavedSearchesState>()(
  persist(
    (set) => ({
      saved: [],
      recentKeywords: [],

      addSearch: (s) =>
        set((state) => {
          // avoid duplicates: same mediaType + same filter signature
          const sig = JSON.stringify({ m: s.mediaType, f: s.filters });
          const exists = state.saved.some(
            (x) => JSON.stringify({ m: x.mediaType, f: x.filters }) === sig
          );
          if (exists || state.saved.length >= 20) return state;
          return {
            saved: [
              { ...s, id: Date.now().toString(), createdAt: Date.now() },
              ...state.saved,
            ].slice(0, 20),
          };
        }),

      removeSearch: (id) => set((s) => ({ saved: s.saved.filter((x) => x.id !== id) })),

      clearSearches: () => set({ saved: [] }),

      pushKeyword: (k) =>
        set((s) => ({
          recentKeywords: [k, ...s.recentKeywords.filter((x) => x.id !== k.id)].slice(0, 10),
        })),
    }),
    { name: 'cinevault-saved-searches' }
  )
);

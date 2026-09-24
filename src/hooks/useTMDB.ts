import { useQuery, keepPreviousData } from '@tanstack/react-query';
import * as tmdb from '../services/tmdb';
import type { DiscoverFilters } from '../types/tmdb';

// ─── Helpers ───────────────────────────────────────────

const isValidId = (id: number) => {
  return Number.isFinite(id) && id > 0;
};

const normalizeQuery = (query: string) => {
  return query.trim();
};

// ─── Trending ──────────────────────────────────────────

export const useTrending = (
  mediaType: 'all' | 'movie' | 'tv' = 'all',
  timeWindow: 'day' | 'week' = 'week'
) =>
  useQuery({
    queryKey: ['trending', mediaType, timeWindow],
    queryFn: () => tmdb.getTrending(mediaType, timeWindow),
  });

// ─── Movies ────────────────────────────────────────────

export const usePopularMovies = (page = 1) =>
  useQuery({
    queryKey: ['popularMovies', page],
    queryFn: () => tmdb.getPopularMovies(page),
  });

export const useTopRatedMovies = (page = 1) =>
  useQuery({
    queryKey: ['topRatedMovies', page],
    queryFn: () => tmdb.getTopRatedMovies(page),
  });

export const useUpcomingMovies = (page = 1) =>
  useQuery({
    queryKey: ['upcomingMovies', page],
    queryFn: () => tmdb.getUpcomingMovies(page),
  });

export const useNowPlayingMovies = (page = 1) =>
  useQuery({
    queryKey: ['nowPlayingMovies', page],
    queryFn: () => tmdb.getNowPlayingMovies(page),
  });

export const useMovieDetails = (id: number, enabled = true) =>
  useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => tmdb.getMovieDetails(id),
    enabled: enabled && isValidId(id),
  });

// ─── TV ────────────────────────────────────────────────

export const usePopularTV = (page = 1) =>
  useQuery({
    queryKey: ['popularTV', page],
    queryFn: () => tmdb.getPopularTV(page),
  });

export const useTopRatedTV = (page = 1) =>
  useQuery({
    queryKey: ['topRatedTV', page],
    queryFn: () => tmdb.getTopRatedTV(page),
  });

export const useTVDetails = (id: number, enabled = true) =>
  useQuery({
    queryKey: ['tvDetails', id],
    queryFn: () => tmdb.getTVDetails(id),
    enabled: enabled && isValidId(id),
  });

// ─── Search ────────────────────────────────────────────

export const useSearchMulti = (query: string, page = 1) => {
  const normalizedQuery = normalizeQuery(query);

  return useQuery({
    queryKey: ['searchMulti', normalizedQuery, page],
    queryFn: () => tmdb.searchMulti(normalizedQuery, page),
    enabled: normalizedQuery.length >= 2,
  });
};

// ─── Genres ────────────────────────────────────────────

export const useMovieGenres = () =>
  useQuery({
    queryKey: ['movieGenres'],
    queryFn: tmdb.getMovieGenres,
    staleTime: 1000 * 60 * 60,
  });

export const useTVGenres = () =>
  useQuery({
    queryKey: ['tvGenres'],
    queryFn: tmdb.getTVGenres,
    staleTime: 1000 * 60 * 60,
  });

// ─── Discover ──────────────────────────────────────────

export const useDiscoverMovies = (filters: DiscoverFilters) =>
  useQuery({
    queryKey: ['discoverMovies', filters],
    queryFn: () => tmdb.discoverMovies(filters),
  });

export const useDiscoverTV = (filters: DiscoverFilters) =>
  useQuery({
    queryKey: ['discoverTV', filters],
    queryFn: () => tmdb.discoverTV(filters),
  });

// ─── Reviews ───────────────────────────────────────────

export const useReviews = (
  mediaType: 'movie' | 'tv',
  id: number,
  enabled = true
) =>
  useQuery({
    queryKey: ['reviews', mediaType, id],
    queryFn: () =>
      mediaType === 'movie'
        ? tmdb.getMovieReviews(id)
        : tmdb.getTVReviews(id),
    enabled: enabled && isValidId(id),
    staleTime: 1000 * 60 * 10,
  });

// ─── People ────────────────────────────────────────────

export const usePersonDetails = (id: number) =>
  useQuery({
    queryKey: ['person', id],
    queryFn: () => tmdb.getPersonDetails(id),
    enabled: isValidId(id),
  });

// ─── Images / Logos ────────────────────────────────────

export const useImages = (
  mediaType: 'movie' | 'tv',
  id: number,
  enabled = true
) =>
  useQuery({
    queryKey: ['images', mediaType, id],
    queryFn: () => tmdb.getImages(mediaType, id),
    enabled: enabled && isValidId(id),
    staleTime: 1000 * 60 * 30,
  });

// ─── Advanced Search ───────────────────────────────────

export const useAdvancedSearch = (
  mediaType: 'movie' | 'tv',
  filters: ReturnType<typeof tmdb.buildDiscoverParams> & {
    page?: number;
  },
  enabled = true
) =>
  useQuery({
    queryKey: ['advancedSearch', mediaType, filters],
    queryFn: () => tmdb.advancedDiscover(mediaType, filters),
    enabled,
    placeholderData: keepPreviousData,
  });

// ─── Keyword Search ───────────────────────────────────

export const useKeywordSearch = (query: string) => {
  const normalizedQuery = normalizeQuery(query);

  return useQuery({
    queryKey: ['keywords', normalizedQuery],
    queryFn: () => tmdb.searchKeywords(normalizedQuery),
    enabled: normalizedQuery.length >= 2,
    staleTime: 1000 * 60 * 30,
  });
};

// ─── Company Search ────────────────────────────────────

export const useCompanySearch = (query: string) => {
  const normalizedQuery = normalizeQuery(query);

  return useQuery({
    queryKey: ['companies', normalizedQuery],
    queryFn: () => tmdb.searchCompanies(normalizedQuery),
    enabled: normalizedQuery.length >= 2,
    staleTime: 1000 * 60 * 30,
  });
};

// ─── Person Search ─────────────────────────────────────

export const usePersonSearch = (query: string) => {
  const normalizedQuery = normalizeQuery(query);

  return useQuery({
    queryKey: ['personSearch', normalizedQuery],
    queryFn: () => tmdb.searchPerson(normalizedQuery),
    enabled: normalizedQuery.length >= 2,
    staleTime: 1000 * 60 * 30,
  });
};

// ─── Movie Keywords ────────────────────────────────────

export const useMovieKeywords = (id: number, enabled = true) =>
  useQuery({
    queryKey: ['movieKeywords', id],
    queryFn: () => tmdb.getMovieKeywords(id),
    enabled: enabled && isValidId(id),
    staleTime: 1000 * 60 * 60,
  });

// ─── TV Keywords ───────────────────────────────────────

export const useTVKeywords = (id: number, enabled = true) =>
  useQuery({
    queryKey: ['tvKeywords', id],
    queryFn: () => tmdb.getTVKeywords(id),
    enabled: enabled && isValidId(id),
    staleTime: 1000 * 60 * 60,
  });

// ─── Movies By Keyword ─────────────────────────────────

export const useMoviesByKeyword = (keywordId: number, page = 1) =>
  useQuery({
    queryKey: ['keywordMovies', keywordId, page],
    queryFn: () => tmdb.getMoviesByKeyword(keywordId, page),
    enabled: isValidId(keywordId),
  });

// ─── Collection ────────────────────────────────────────

export const useCollection = (id: number, enabled = true) =>
  useQuery({
    queryKey: ['collection', id],
    queryFn: () => tmdb.getCollection(id),
    enabled: enabled && isValidId(id),
    staleTime: 1000 * 60 * 60,
  });
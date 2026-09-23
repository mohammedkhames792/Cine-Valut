import { useQuery, keepPreviousData } from '@tanstack/react-query';
import * as tmdb from '../services/tmdb';
import type { DiscoverFilters } from '../types/tmdb';

// ─── Trending ──────────────────────────────────────────
export const useTrending = (mediaType: 'all' | 'movie' | 'tv' = 'all', timeWindow: 'day' | 'week' = 'week') =>
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

export const useMovieDetails = (id: number) =>
  useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => tmdb.getMovieDetails(id),
    enabled: !!id,
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

export const useTVDetails = (id: number) =>
  useQuery({
    queryKey: ['tvDetails', id],
    queryFn: () => tmdb.getTVDetails(id),
    enabled: !!id,
  });

// ─── Search ────────────────────────────────────────────
export const useSearchMulti = (query: string, page = 1) =>
  useQuery({
    queryKey: ['searchMulti', query, page],
    queryFn: () => tmdb.searchMulti(query, page),
    enabled: query.length >= 2,
  });

// ─── Genres ────────────────────────────────────────────
export const useMovieGenres = () =>
  useQuery({
    queryKey: ['movieGenres'],
    queryFn: tmdb.getMovieGenres,
    staleTime: 1000 * 60 * 60, // genres rarely change
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
export const useReviews = (mediaType: 'movie' | 'tv', id: number) =>
  useQuery({
    queryKey: ['reviews', mediaType, id],
    queryFn: () => (mediaType === 'movie' ? tmdb.getMovieReviews(id) : tmdb.getTVReviews(id)),
    enabled: !!id,
    staleTime: 1000 * 60 * 10,
  });

// ─── People ────────────────────────────────────────────
export const usePersonDetails = (id: number) =>
  useQuery({
    queryKey: ['person', id],
    queryFn: () => tmdb.getPersonDetails(id),
    enabled: !!id,
  });

// ─── Images / Logos ────────────────────────────────────
export const useImages = (mediaType: 'movie' | 'tv', id: number) =>
  useQuery({
    queryKey: ['images', mediaType, id],
    queryFn: () => tmdb.getImages(mediaType, id),
    enabled: !!id,
    staleTime: 1000 * 60 * 30,
  });

/* ══════════════════════════════════════════════════════
   ADVANCED SEARCH HOOKS
   ══════════════════════════════════════════════════════ */

export const useAdvancedSearch = (
  mediaType: 'movie' | 'tv',
  filters: ReturnType<typeof tmdb.buildDiscoverParams> & { page?: number },
  enabled = true
) =>
  useQuery({
    queryKey: ['advancedSearch', mediaType, filters],
    queryFn: () => tmdb.advancedDiscover(mediaType, filters),
    enabled,
    placeholderData: keepPreviousData,
  });

export const useKeywordSearch = (query: string) =>
  useQuery({
    queryKey: ['keywords', query],
    queryFn: () => tmdb.searchKeywords(query),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 30,
  });

export const useCompanySearch = (query: string) =>
  useQuery({
    queryKey: ['companies', query],
    queryFn: () => tmdb.searchCompanies(query),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 30,
  });

export const usePersonSearch = (query: string) =>
  useQuery({
    queryKey: ['personSearch', query],
    queryFn: () => tmdb.searchPerson(query),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 30,
  });

export const useMovieKeywords = (id: number) =>
  useQuery({
    queryKey: ['movieKeywords', id],
    queryFn: () => tmdb.getMovieKeywords(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });

export const useTVKeywords = (id: number) =>
  useQuery({
    queryKey: ['tvKeywords', id],
    queryFn: () => tmdb.getTVKeywords(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });

export const useMoviesByKeyword = (keywordId: number, page = 1) =>
  useQuery({
    queryKey: ['keywordMovies', keywordId, page],
    queryFn: () => tmdb.getMoviesByKeyword(keywordId, page),
    enabled: !!keywordId,
  });

export const useCollection = (id: number, enabled = true) =>
  useQuery({
    queryKey: ['collection', id],
    queryFn: () => tmdb.getCollection(id),
    enabled: !!id && enabled,
    staleTime: 1000 * 60 * 60,
  });

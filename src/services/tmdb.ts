import api from './api';
import type {
  Movie,
  TVShow,
  MovieDetails,
  TVDetails,
  PaginatedResponse,
  Credits,
  VideoResponse,
  Genre,
  DiscoverFilters,
  MediaItem,
} from '../types/tmdb';

// ─── Image Helpers ─────────────────────────────────────
export const IMAGE_BASE = 'https://image.tmdb.org/t/p';
export const posterUrl = (path: string | null, size = 'w500') =>
  path ? `${IMAGE_BASE}/${size}${path}` : '/placeholder-poster.svg';
export const backdropUrl = (path: string | null) =>
  path ? `${IMAGE_BASE}/original${path}` : '';
export const profileUrl = (path: string | null) =>
  path ? `${IMAGE_BASE}/w185${path}` : '/placeholder-profile.svg';

// ─── Trending ──────────────────────────────────────────
export const getTrending = async (
  mediaType: 'all' | 'movie' | 'tv' = 'all',
  timeWindow: 'day' | 'week' = 'week',
  page = 1
): Promise<PaginatedResponse<MediaItem>> => {
  const { data } = await api.get(`/trending/${mediaType}/${timeWindow}`, { params: { page } });
  return data;
};

// ─── Movies ────────────────────────────────────────────
export const getPopularMovies = async (page = 1): Promise<PaginatedResponse<Movie>> => {
  const { data } = await api.get('/movie/popular', { params: { page } });
  return data;
};

export const getTopRatedMovies = async (page = 1): Promise<PaginatedResponse<Movie>> => {
  const { data } = await api.get('/movie/top_rated', { params: { page } });
  return data;
};

export const getUpcomingMovies = async (page = 1): Promise<PaginatedResponse<Movie>> => {
  const { data } = await api.get('/movie/upcoming', { params: { page } });
  return data;
};

export const getNowPlayingMovies = async (page = 1): Promise<PaginatedResponse<Movie>> => {
  const { data } = await api.get('/movie/now_playing', { params: { page } });
  return data;
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const { data } = await api.get(`/movie/${id}`, {
    params: { append_to_response: 'credits,videos,similar,recommendations' },
  });
  return data;
};

// ─── TV Shows ──────────────────────────────────────────
export const getPopularTV = async (page = 1): Promise<PaginatedResponse<TVShow>> => {
  const { data } = await api.get('/tv/popular', { params: { page } });
  return data;
};

export const getTopRatedTV = async (page = 1): Promise<PaginatedResponse<TVShow>> => {
  const { data } = await api.get('/tv/top_rated', { params: { page } });
  return data;
};

export const getTVDetails = async (id: number): Promise<TVDetails> => {
  const { data } = await api.get(`/tv/${id}`, {
    params: { append_to_response: 'credits,videos,similar,recommendations' },
  });
  return data;
};

// ─── Credits ───────────────────────────────────────────
export const getMovieCredits = async (id: number): Promise<Credits> => {
  const { data } = await api.get(`/movie/${id}/credits`);
  return data;
};

export const getTVCredits = async (id: number): Promise<Credits> => {
  const { data } = await api.get(`/tv/${id}/credits`);
  return data;
};

// ─── Videos ────────────────────────────────────────────
export const getMovieVideos = async (id: number): Promise<VideoResponse> => {
  const { data } = await api.get(`/movie/${id}/videos`);
  return data;
};

export const getTVVideos = async (id: number): Promise<VideoResponse> => {
  const { data } = await api.get(`/tv/${id}/videos`);
  return data;
};

// ─── Search ────────────────────────────────────────────
export const searchMulti = async (query: string, page = 1): Promise<PaginatedResponse<MediaItem>> => {
  const { data } = await api.get('/search/multi', { params: { query, page } });
  return data;
};

export const searchMovies = async (query: string, page = 1): Promise<PaginatedResponse<Movie>> => {
  const { data } = await api.get('/search/movie', { params: { query, page } });
  return data;
};

export const searchTV = async (query: string, page = 1): Promise<PaginatedResponse<TVShow>> => {
  const { data } = await api.get('/search/tv', { params: { query, page } });
  return data;
};

// ─── Genres ────────────────────────────────────────────
export const getMovieGenres = async (): Promise<{ genres: Genre[] }> => {
  const { data } = await api.get('/genre/movie/list');
  return data;
};

export const getTVGenres = async (): Promise<{ genres: Genre[] }> => {
  const { data } = await api.get('/genre/tv/list');
  return data;
};

// ─── Discover ──────────────────────────────────────────
export const discoverMovies = async (filters: DiscoverFilters): Promise<PaginatedResponse<Movie>> => {
  const { data } = await api.get('/discover/movie', {
    params: {
      ...filters,
      vote_average_gte: filters.vote_average_gte,
      vote_count_gte: filters.vote_count_gte ?? 200,
    },
  });
  return data;
};

export const discoverTV = async (filters: DiscoverFilters): Promise<PaginatedResponse<TVShow>> => {
  const { data } = await api.get('/discover/tv', {
    params: {
      ...filters,
      vote_count_gte: filters.vote_count_gte ?? 200,
    },
  });
  return data;
};

// ─── Similar / Recommendations ─────────────────────────
export const getSimilarMovies = async (id: number, page = 1): Promise<PaginatedResponse<Movie>> => {
  const { data } = await api.get(`/movie/${id}/similar`, { params: { page } });
  return data;
};

export const getRecommendedMovies = async (id: number, page = 1): Promise<PaginatedResponse<Movie>> => {
  const { data } = await api.get(`/movie/${id}/recommendations`, { params: { page } });
  return data;
};

// ─── Reviews ───────────────────────────────────────────
export const getMovieReviews = async (id: number): Promise<PaginatedResponse<any>> => {
  const { data } = await api.get(`/movie/${id}/reviews`);
  return data;
};

export const getTVReviews = async (id: number): Promise<PaginatedResponse<any>> => {
  const { data } = await api.get(`/tv/${id}/reviews`);
  return data;
};

// ─── Images / Logos ────────────────────────────────────
export const getImages = async (mediaType: 'movie' | 'tv', id: number) => {
  const { data } = await api.get(`/${mediaType}/${id}/images`, {
    params: { include_image_language: 'en,ar,null' },
  });
  return data;
};

// ─── People ────────────────────────────────────────────
export const getPersonDetails = async (id: number) => {
  const { data } = await api.get(`/person/${id}`, {
    params: { append_to_response: 'combined_credits,images' },
  });
  return data;
};

export const getPersonCredits = async (id: number) => {
  const { data } = await api.get(`/person/${id}/combined_credits`);
  return data;
};

export const searchPerson = async (query: string, page = 1) => {
  const { data } = await api.get('/search/person', { params: { query, page } });
  // only keep people who actually have acting/crew credits
  (data as any).results = (data as any).results.filter(
    (p: any) => p.known_for_department === 'Acting' || p.known_for_department === 'Directing'
  );
  return data as PaginatedResponse<{ id: number; name: string; profile_path: string | null; known_for_department: string }>;
};

// ─── Collections (Franchises) ──────────────────────────
export const getCollection = async (id: number) => {
  const { data } = await api.get(`/collection/${id}`);
  return data as {
    id: number;
    name: string;
    overview: string | null;
    poster_path: string | null;
    backdrop_path: string | null;
    parts: Array<Movie & { release_date: string }>;
  };
};

export const getImageUrl = (path: string, size = 'w500') =>
  path ? `${IMAGE_BASE}/${size}${path}` : '';

/* ══════════════════════════════════════════════════════
   ADVANCED SEARCH  (IMDb-style)
   ══════════════════════════════════════════════════════ */

export interface AdvancedDiscoverParams {
  sort_by?: string;
  with_genres?: string;
  without_genres?: string;
  with_keywords?: string;
  with_companies?: string;
  with_cast?: string;
  with_crew?: string;
  'release_date.gte'?: string;
  'release_date.lte'?: string;
  'first_air_date.gte'?: string;
  'first_air_date.lte'?: string;
  'vote_average.gte'?: number;
  'vote_average.lte'?: number;
  'vote_count.gte'?: number;
  'vote_count.lte'?: number;
  'with_runtime.gte'?: number;
  'with_runtime.lte'?: number;
  with_original_language?: string;
  with_origin_country?: string;
  certification?: string;
  certification_country?: string;
  include_adult?: boolean;
  page?: number;
}

/** Build a clean params object for /discover from the filter state */
export const buildDiscoverParams = (
  mediaType: 'movie' | 'tv',
  f: {
    sortBy?: string;
    genres?: number[];
    excludeGenres?: number[];
    keywords?: Array<{ id: number }>;
    companies?: Array<{ id: number }>;
    cast?: Array<{ id: number }>;
    crew?: Array<{ id: number }>;
    yearFrom?: string;
    yearTo?: string;
    ratingMin?: number;
    ratingMax?: number;
    voteCount?: number;
    runtimeMin?: number;
    runtimeMax?: number;
    language?: string;
    country?: string;
    certification?: string;
    adult?: boolean;
  }
): AdvancedDiscoverParams => {
  const p: AdvancedDiscoverParams = { sort_by: f.sortBy || 'popularity.desc' };

  if (f.genres?.length) p.with_genres = f.genres.join(',');
  if (f.excludeGenres?.length) p.without_genres = f.excludeGenres.join(',');
  if (f.keywords?.length) p.with_keywords = f.keywords.map((k) => k.id).join(',');
  if (f.companies?.length) p.with_companies = f.companies.map((c) => c.id).join(',');
  if (f.cast?.length) p.with_cast = f.cast.map((c) => c.id).join(',');
  if (f.crew?.length) p.with_crew = f.crew.map((c) => c.id).join(',');

  if (mediaType === 'movie') {
    if (f.yearFrom) p['release_date.gte'] = f.yearFrom;
    if (f.yearTo) p['release_date.lte'] = f.yearTo;
  } else {
    if (f.yearFrom) p['first_air_date.gte'] = f.yearFrom;
    if (f.yearTo) p['first_air_date.lte'] = f.yearTo;
  }

  if (f.ratingMin) p['vote_average.gte'] = f.ratingMin;
  if (f.ratingMax && f.ratingMax < 10) p['vote_average.lte'] = f.ratingMax;
  if (f.voteCount) p['vote_count.gte'] = f.voteCount;

  if (f.runtimeMin) p['with_runtime.gte'] = f.runtimeMin;
  if (f.runtimeMax) p['with_runtime.lte'] = f.runtimeMax;

  if (f.language) p.with_original_language = f.language;
  if (f.country) p.with_origin_country = f.country;

  if (f.certification) {
    p.certification = f.certification;
    p.certification_country = 'US';
  }
  if (f.adult) p.include_adult = true;

  return p;
};

const cleanParams = (p: AdvancedDiscoverParams) =>
  Object.fromEntries(
    Object.entries(p).filter(([, v]) => v !== undefined && v !== '' && v !== null && v !== false)
  );

export const advancedDiscover = async (
  mediaType: 'movie' | 'tv',
  params: AdvancedDiscoverParams
): Promise<PaginatedResponse<MediaItem>> => {
  const { data } = await api.get(`/discover/${mediaType}`, {
    params: { ...cleanParams(params), include_adult: params.include_adult ?? false },
  });
  data.results = data.results.map((r: any) => ({ ...r, media_type: mediaType }));
  return data;
};

// ─── Keyword Search ────────────────────────────────────
export const searchKeywords = async (query: string, page = 1) => {
  const { data } = await api.get('/search/keyword', { params: { query, page } });
  return data as PaginatedResponse<{ id: number; name: string }>;
};

export const getMovieKeywords = async (id: number) => {
  const { data } = await api.get(`/movie/${id}/keywords`);
  return data as { id: number; keywords: Array<{ id: number; name: string }> };
};

export const getTVKeywords = async (id: number) => {
  const { data } = await api.get(`/tv/${id}/keywords`);
  return data as { id: number; results: Array<{ id: number; name: string }> };
};

export const getMoviesByKeyword = async (keywordId: number, page = 1) => {
  const { data } = await api.get(`/keyword/${keywordId}/movies`, { params: { page } });
  return data as PaginatedResponse<MediaItem>;
};

// ─── Company Search ────────────────────────────────────
export const searchCompanies = async (query: string, page = 1) => {
  const { data } = await api.get('/search/company', { params: { query, page } });
  return data as PaginatedResponse<{ id: number; name: string; logo_path: string | null }>;
};

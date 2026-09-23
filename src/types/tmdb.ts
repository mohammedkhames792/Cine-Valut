// ─── Base ───────────────────────────────────────────────
export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

// ─── Media ─────────────────────────────────────────────
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  original_language: string;
  video: boolean;
  media_type?: string;
}

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  origin_country: string[];
  original_language: string;
  media_type?: string;
}

export type MediaItem = (Movie & { media_type: string }) | (TVShow & { media_type: string });

// ─── Detailed ──────────────────────────────────────────
export interface MovieDetails extends Movie {
  runtime: number;
  budget: number;
  revenue: number;
  status: string;
  tagline: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: { iso_639_1: string; name: string }[];
  belongs_to_collection: { id: number; name: string; poster_path: string; backdrop_path: string } | null;
  credits?: Credits;
  videos?: VideoResponse;
  similar?: PaginatedResponse<Movie>;
  recommendations?: PaginatedResponse<Movie>;
}

export interface TVSeason {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
  overview: string;
  poster_path: string | null;
  air_date: string | null;
}

export interface TVDetails extends TVShow {
  number_of_episodes: number;
  number_of_seasons: number;
  episode_run_time: number[];
  seasons: TVSeason[];
  status: string;
  tagline: string;
  genres: Genre[];
  production_companies: ProductionCompany[];
  created_by: { id: number; name: string; profile_path: string | null }[];
  credits?: Credits;
  videos?: VideoResponse;
  similar?: PaginatedResponse<TVShow>;
  recommendations?: PaginatedResponse<TVShow>;
}

// ─── Genre ─────────────────────────────────────────────
export interface Genre {
  id: number;
  name: string;
}

// ─── Credits ───────────────────────────────────────────
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  cast_id?: number;
  credit_id: string;
  known_for_department?: string;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
  id: number;
}

// ─── Videos ────────────────────────────────────────────
export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface VideoResponse {
  id: number;
  results: Video[];
}

// ─── Production ────────────────────────────────────────
export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

// ─── Search / Discover Filters ─────────────────────────
export interface DiscoverFilters {
  with_genres?: string;
  primary_release_year?: number;
  vote_average_gte?: number;
  vote_count_gte?: number;
  sort_by?: string;
  page?: number;
  with_original_language?: string;
}

// ─── Local Storage Items ───────────────────────────────
export interface SavedItem {
  id: number;
  media_type: 'movie' | 'tv';
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  addedAt: number;
}

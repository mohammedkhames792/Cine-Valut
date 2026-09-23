// ─── Sort Options (IMDb-style) ─────────────────────────
export const MOVIE_SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'popularity.asc', label: 'Least Popular' },
  { value: 'vote_average.desc', label: 'Highest User Rating' },
  { value: 'vote_average.asc', label: 'Lowest User Rating' },
  { value: 'vote_count.desc', label: 'Most Voted' },
  { value: 'primary_release_date.desc', label: 'Newest Release' },
  { value: 'primary_release_date.asc', label: 'Oldest Release' },
  { value: 'title.asc', label: 'Title A-Z' },
  { value: 'revenue.desc', label: 'Highest Box Office' },
  { value: 'budget.desc', label: 'Biggest Budget' },
  { value: 'original_title.asc', label: 'Original Title A-Z' },
];

export const TV_SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'popularity.asc', label: 'Least Popular' },
  { value: 'vote_average.desc', label: 'Highest User Rating' },
  { value: 'vote_average.asc', label: 'Lowest User Rating' },
  { value: 'vote_count.desc', label: 'Most Voted' },
  { value: 'first_air_date.desc', label: 'Newest Air Date' },
  { value: 'first_air_date.asc', label: 'Oldest Air Date' },
  { value: 'name.asc', label: 'Title A-Z' },
];

// ─── Rating Presets ────────────────────────────────────
export const RATING_PRESETS = [
  { label: 'Any', value: 0 },
  { label: '6+ ⭐', value: 6 },
  { label: '7+ ⭐', value: 7 },
  { label: '8+ ⭐', value: 8 },
  { label: '9+ 🏆', value: 9 },
];

export const VOTE_COUNT_PRESETS = [
  { label: 'Any', value: 0 },
  { label: '100+', value: 100 },
  { label: '500+', value: 500 },
  { label: '1,000+', value: 1000 },
  { label: '10,000+', value: 10000 },
];

// ─── Runtime Presets ───────────────────────────────────
export const RUNTIME_PRESETS = [
  { label: 'Any', min: 0, max: 0 },
  { label: 'Under 90m', min: 0, max: 90 },
  { label: '90 - 120m', min: 90, max: 120 },
  { label: '120 - 150m', min: 120, max: 150 },
  { label: 'Over 150m', min: 150, max: 0 },
];

// ─── Decades ───────────────────────────────────────────
export const DECADES = [
  { label: '2020s', from: '2020-01-01', to: '2029-12-31' },
  { label: '2010s', from: '2010-01-01', to: '2019-12-31' },
  { label: '2000s', from: '2000-01-01', to: '2009-12-31' },
  { label: '90s', from: '1990-01-01', to: '1999-12-31' },
  { label: '80s', from: '1980-01-01', to: '1989-12-31' },
  { label: '70s', from: '1970-01-01', to: '1979-12-31' },
  { label: 'Classic (pre-1970)', from: '1900-01-01', to: '1969-12-31' },
];

// ─── Languages ─────────────────────────────────────────
export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'Arabic' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'tr', name: 'Turkish' },
  { code: 'ru', name: 'Russian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'th', name: 'Thai' },
  { code: 'sv', name: 'Swedish' },
  { code: 'da', name: 'Danish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'pl', name: 'Polish' },
  { code: 'nl', name: 'Dutch' },
  { code: 'id', name: 'Indonesian' },
];

// ─── Countries ─────────────────────────────────────────
export const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'AE', name: 'UAE' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'CN', name: 'China' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'IN', name: 'India' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'BR', name: 'Brazil' },
  { code: 'MX', name: 'Mexico' },
  { code: 'TR', name: 'Turkey' },
  { code: 'RU', name: 'Russia' },
  { code: 'SE', name: 'Sweden' },
  { code: 'DK', name: 'Denmark' },
  { code: 'NO', name: 'Norway' },
  { code: 'PL', name: 'Poland' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'TH', name: 'Thailand' },
];

// ─── US Certifications ─────────────────────────────────
export const CERTIFICATIONS = [
  { code: '', name: 'Any Rating' },
  { code: 'G', name: 'G — General Audiences' },
  { code: 'PG', name: 'PG — Parental Guidance' },
  { code: 'PG-13', name: 'PG-13 — Teens 13+' },
  { code: 'R', name: 'R — Restricted' },
  { code: 'NC-17', name: 'NC-17 — Adults Only' },
];

// ─── Smart Presets (Quick Searches) ────────────────────
export interface SearchPreset {
  id: string;
  label: string;
  emoji: string;
  mediaType: 'movie' | 'tv';
  filters: Partial<AdvancedFilterState>;
}

export interface AdvancedFilterState {
  sortBy: string;
  genres: number[];
  excludeGenres: number[];
  keywords: Array<{ id: number; name: string }>;
  companies: Array<{ id: number; name: string }>;
  cast: Array<{ id: number; name: string }>;
  crew: Array<{ id: number; name: string }>;
  yearFrom: string;
  yearTo: string;
  ratingMin: number;
  ratingMax: number;
  voteCount: number;
  runtimeMin: number;
  runtimeMax: number;
  language: string;
  country: string;
  certification: string;
  adult: boolean;
}

export const DEFAULT_FILTERS: AdvancedFilterState = {
  sortBy: 'popularity.desc',
  genres: [],
  excludeGenres: [],
  keywords: [],
  companies: [],
  cast: [],
  crew: [],
  yearFrom: '',
  yearTo: '',
  ratingMin: 0,
  ratingMax: 10,
  voteCount: 0,
  runtimeMin: 0,
  runtimeMax: 0,
  language: '',
  country: '',
  certification: '',
  adult: false,
};

export const SEARCH_PRESETS: SearchPreset[] = [
  {
    id: 'masterpieces',
    label: 'Masterpieces',
    emoji: '🏆',
    mediaType: 'movie',
    filters: { ratingMin: 8, voteCount: 5000, sortBy: 'vote_average.desc' },
  },
  {
    id: 'hidden-gems',
    label: 'Hidden Gems',
    emoji: '💎',
    mediaType: 'movie',
    filters: { ratingMin: 7, voteCount: 100, sortBy: 'vote_average.desc' },
  },
  {
    id: 'blockbusters',
    label: 'Blockbusters',
    emoji: '💰',
    mediaType: 'movie',
    filters: { sortBy: 'revenue.desc', voteCount: 2000 },
  },
  {
    id: 'recent-hits',
    label: '2024 Hits',
    emoji: '🔥',
    mediaType: 'movie',
    filters: { yearFrom: '2024-01-01', yearTo: '2024-12-31', sortBy: 'revenue.desc' },
  },
  {
    id: 'family-night',
    label: 'Family Night',
    emoji: '👨‍👩‍👧',
    mediaType: 'movie',
    filters: { certification: 'G', sortBy: 'popularity.desc' },
  },
  {
    id: 'binge-tv',
    label: 'Binge-Worthy TV',
    emoji: '📺',
    mediaType: 'tv',
    filters: { ratingMin: 8, voteCount: 500, sortBy: 'vote_average.desc' },
  },
  {
    id: 'scary',
    label: 'Date Night Horror',
    emoji: '👻',
    mediaType: 'movie',
    filters: { genres: [27], sortBy: 'popularity.desc' },
  },
  {
    id: 'sci-fi-best',
    label: 'Best Sci-Fi',
    emoji: '🚀',
    mediaType: 'movie',
    filters: { genres: [878], ratingMin: 7.5, voteCount: 1000, sortBy: 'vote_average.desc' },
  },
  {
    id: 'quick-watch',
    label: 'Quick Watch',
    emoji: '⏱️',
    mediaType: 'movie',
    filters: { runtimeMax: 95, sortBy: 'popularity.desc' },
  },
  {
    id: 'classics',
    label: 'Golden Classics',
    emoji: '🎞️',
    mediaType: 'movie',
    filters: { yearFrom: '1950-01-01', yearTo: '1979-12-31', ratingMin: 7.5, sortBy: 'vote_average.desc' },
  },
];

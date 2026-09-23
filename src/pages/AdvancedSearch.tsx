import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Loader2,
  Sparkles,
  Film,
  Tv,
  ChevronLeft,
  ChevronRight,
  Bookmark,
} from 'lucide-react';
import {
  useMovieGenres,
  useTVGenres,
  useAdvancedSearch,
  useKeywordSearch,
  useCompanySearch,
  usePersonSearch,
} from '../hooks/useTMDB';
import { buildDiscoverParams } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import EmptyState from '../components/EmptyState';
import { useToast } from '../components/Toast';
import {
  FilterSection,
  TagInput,
  ChipGroup,
  RangeSlider,
  NumberField,
  SelectField,
  type Tag,
} from '../components/AdvancedSearchInputs';
import {
  MOVIE_SORT_OPTIONS,
  TV_SORT_OPTIONS,
  VOTE_COUNT_PRESETS,
  RUNTIME_PRESETS,
  DECADES,
  LANGUAGES,
  COUNTRIES,
  CERTIFICATIONS,
  SEARCH_PRESETS,
  DEFAULT_FILTERS,
  type AdvancedFilterState,
} from '../utils/constants';
import { useSavedSearches } from '../stores/useSavedSearches';

export default function AdvancedSearchPage() {
  const { toast } = useToast();
  const { saved, addSearch, removeSearch } = useSavedSearches();
  const [searchParams] = useSearchParams();

  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');
  const [filters, setFilters] = useState<AdvancedFilterState>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [keywordQuery, setKeywordQuery] = useState('');
  const [companyQuery, setCompanyQuery] = useState('');
  const [personQuery, setPersonQuery] = useState('');
  const [crewQuery, setCrewQuery] = useState('');
  const [castMode, setCastMode] = useState<'any' | 'all'>('any');
  const [showSaved, setShowSaved] = useState(false);

  const { data: movieGenres } = useMovieGenres();
  const { data: tvGenres } = useTVGenres();
  const genres = (mediaType === 'movie' ? movieGenres?.genres : tvGenres?.genres) ?? [];

  const { data: keywordResults, isLoading: kwLoading } = useKeywordSearch(keywordQuery);
  const { data: companyResults, isLoading: coLoading } = useCompanySearch(companyQuery);
  const { data: personResults, isLoading: personLoading } = usePersonSearch(personQuery || crewQuery);

  const params = useMemo(
    () => ({ ...buildDiscoverParams(mediaType, filters), page }),
    [mediaType, filters, page]
  );

  const { data, isLoading, isFetching } = useAdvancedSearch(mediaType, params);

  const results = data?.results ?? [];
  const totalResults = data?.total_results ?? 0;
  const totalPages = Math.min(data?.total_pages ?? 1, 500);

  // Reset page when filters change
  useEffect(() => setPage(1), [filters, mediaType]);

  // Hydrate from URL deep-links (e.g. /advanced?keyword=123&keywordName=heist&type=movie)
  useEffect(() => {
    const kwId = searchParams.get('keyword');
    const kwName = searchParams.get('keywordName');
    const type = searchParams.get('type');
    const genre = searchParams.get('genre');
    const rating = searchParams.get('rating');

    setFilters((f) => {
      const next = { ...f };
      if (kwId && kwName) {
        const id = Number(kwId);
        if (!next.keywords.some((k) => k.id === id)) {
          next.keywords = [...next.keywords, { id, name: kwName }];
        }
      }
      if (genre) {
        const id = Number(genre);
        if (!next.genres.includes(id)) next.genres = [...next.genres, id];
      }
      if (rating) next.ratingMin = Number(rating);
      return next;
    });

    if (type === 'tv' || type === 'movie') setMediaType(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const set = <K extends keyof AdvancedFilterState>(key: K, value: AdvancedFilterState[K]) =>
    setFilters((f) => ({ ...f, [key]: value }));

  const toggleGenre = useCallback(
    (id: number, field: 'genres' | 'excludeGenres') => {
      setFilters((f) => {
        const list = f[field];
        const other = field === 'genres' ? f.excludeGenres : f.genres;
        // remove from opposing list if present
        const cleanedOther = other.filter((x) => x !== id);
        return {
          ...f,
          [field]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
          [field === 'genres' ? 'excludeGenres' : 'genres']: cleanedOther,
        };
      });
    },
    []
  );

  const reset = () => {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
    toast('Filters reset', 'info');
  };

  const applyPreset = (preset: (typeof SEARCH_PRESETS)[number]) => {
    setMediaType(preset.mediaType);
    setFilters({ ...DEFAULT_FILTERS, ...preset.filters });
    setPage(1);
    toast(`Applied "${preset.label}"`, 'success');
  };

  const saveCurrentSearch = () => {
    addSearch({ mediaType, filters });
    toast('Search saved 💾', 'success');
  };

  const loadSaved = (item: { mediaType: 'movie' | 'tv'; filters: AdvancedFilterState }) => {
    setMediaType(item.mediaType);
    setFilters(item.filters);
    setPage(1);
  };

  // Count active filters
  const activeCount =
    filters.genres.length +
    filters.excludeGenres.length +
    filters.keywords.length +
    filters.companies.length +
    filters.cast.length +
    filters.crew.length +
    (filters.yearFrom ? 1 : 0) +
    (filters.yearTo ? 1 : 0) +
    (filters.ratingMin > 0 ? 1 : 0) +
    (filters.ratingMax < 10 ? 1 : 0) +
    (filters.voteCount ? 1 : 0) +
    (filters.runtimeMin || filters.runtimeMax ? 1 : 0) +
    (filters.language ? 1 : 0) +
    (filters.country ? 1 : 0) +
    (filters.certification ? 1 : 0);

  // Active filter chips for quick removal
  const activeChips: Array<{ label: string; onRemove: () => void }> = [
    ...filters.genres.map((id) => ({
      label: `+ ${genres.find((g) => g.id === id)?.name ?? id}`,
      onRemove: () => toggleGenre(id, 'genres'),
    })),
    ...filters.excludeGenres.map((id) => ({
      label: `− ${genres.find((g) => g.id === id)?.name ?? id}`,
      onRemove: () => toggleGenre(id, 'excludeGenres'),
    })),
    ...filters.keywords.map((k) => ({
      label: `🏷 ${k.name}`,
      onRemove: () => set('keywords', filters.keywords.filter((x) => x.id !== k.id)),
    })),
    ...filters.companies.map((c) => ({
      label: `🏢 ${c.name}`,
      onRemove: () => set('companies', filters.companies.filter((x) => x.id !== c.id)),
    })),
    ...filters.cast.map((c) => ({
      label: `🎭 ${c.name}`,
      onRemove: () => set('cast', filters.cast.filter((x) => x.id !== c.id)),
    })),
    ...filters.crew.map((c) => ({
      label: `🎬 ${c.name}`,
      onRemove: () => set('crew', filters.crew.filter((x) => x.id !== c.id)),
    })),
    ...(filters.yearFrom || filters.yearTo
      ? [{ label: `📅 ${filters.yearFrom || '...'} → ${filters.yearTo || '...'}`, onRemove: () => { set('yearFrom', ''); set('yearTo', ''); } }]
      : []),
    ...(filters.ratingMin > 0 || filters.ratingMax < 10
      ? [{ label: `⭐ ${filters.ratingMin}–${filters.ratingMax}`, onRemove: () => { set('ratingMin', 0); set('ratingMax', 10); } }]
      : []),
    ...(filters.voteCount ? [{ label: `🗳 ${filters.voteCount}+ votes`, onRemove: () => set('voteCount', 0) }] : []),
    ...(filters.runtimeMin || filters.runtimeMax
      ? [{ label: `⏱ ${filters.runtimeMin}–${filters.runtimeMax || '∞'}m`, onRemove: () => { set('runtimeMin', 0); set('runtimeMax', 0); } }]
      : []),
    ...(filters.language
      ? [{ label: `🗣 ${LANGUAGES.find((l) => l.code === filters.language)?.name}`, onRemove: () => set('language', '') }]
      : []),
    ...(filters.country
      ? [{ label: `🌍 ${COUNTRIES.find((c) => c.code === filters.country)?.name}`, onRemove: () => set('country', '') }]
      : []),
    ...(filters.certification
      ? [{ label: `🔞 ${filters.certification}`, onRemove: () => set('certification', '') }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* ══ HEADER ══ */}
      <div className="border-b border-white/10 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="mx-auto max-w-[1600px] px-4 pt-8 pb-6 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="flex items-center gap-3 text-3xl font-extrabold text-white">
                <SlidersHorizontal className="text-amber-400" size={30} />
                Advanced Search
              </h1>
              <p className="mt-1 text-gray-400">
                Narrow down {totalResults > 0 ? `${totalResults.toLocaleString()}+` : 'thousands of'} titles with
                precision filters
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSaved(!showSaved)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  showSaved ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Bookmark size={16} /> Saved ({saved.length})
              </button>
              <button
                onClick={saveCurrentSearch}
                className="rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-700"
              >
                Save This Search
              </button>
              <button
                onClick={reset}
                className="flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-700"
              >
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </div>

          {/* Saved searches dropdown */}
          <AnimatePresence>
            {showSaved && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-xl border border-white/10 bg-gray-900 p-4">
                  {saved.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No saved searches yet. Set your filters and hit "Save This Search".
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {saved.map((s) => (
                        <span
                          key={s.id}
                          className="flex items-center gap-2 rounded-full bg-gray-800 px-3 py-1.5 text-xs text-gray-300"
                        >
                          <button onClick={() => loadSaved(s)} className="hover:text-amber-400">
                            {s.mediaType === 'tv' ? '📺' : '🎬'}{' '}
                            {s.filters.genres.length ? `${s.filters.genres.length} genres` : 'Custom'}
                            {s.filters.ratingMin ? ` • ${s.filters.ratingMin}+⭐` : ''}
                          </button>
                          <button onClick={() => removeSearch(s.id)} className="text-gray-500 hover:text-red-400">
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ══ QUICK PRESETS ══ */}
      <div className="mx-auto max-w-[1600px] px-4 pt-6 md:px-6">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles size={16} className="text-amber-400" />
          <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">Quick Presets</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SEARCH_PRESETS.map((p) => (
            <motion.button
              key={p.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => applyPreset(p)}
              className="flex items-center gap-1.5 rounded-full bg-gray-800 px-4 py-2 text-xs font-medium text-gray-300 transition hover:bg-amber-500 hover:text-black"
            >
              <span>{p.emoji}</span>
              {p.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* ══ MAIN LAYOUT ══ */}
      <div className="mx-auto max-w-[1600px] px-4 py-6 md:px-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* ── SIDEBAR FILTERS ── */}
          <aside className="w-full lg:w-80 xl:w-96 lg:shrink-0">
            <div className="rounded-2xl border border-white/10 bg-gray-900 p-5 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
              {/* Media Type */}
              <div className="mb-5 flex items-center gap-1 rounded-full border border-white/10 bg-gray-800 p-1">
                <button
                  onClick={() => setMediaType('movie')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2 text-sm font-semibold transition ${
                    mediaType === 'movie' ? 'bg-amber-500 text-black' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Film size={15} /> Movies
                </button>
                <button
                  onClick={() => setMediaType('tv')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2 text-sm font-semibold transition ${
                    mediaType === 'tv' ? 'bg-amber-500 text-black' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Tv size={15} /> TV Shows
                </button>
              </div>

              {/* Active Filter Chips */}
              {activeCount > 0 && (
                <div className="mb-4 flex flex-wrap gap-1.5 border-b border-white/10 pb-4">
                  {activeChips.map((c, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1 rounded-full bg-amber-500/20 px-2.5 py-1 text-[11px] font-medium text-amber-300"
                    >
                      {c.label}
                      <button onClick={c.onRemove} className="hover:text-white">
                        <X size={10} />
                      </button>
                    </motion.span>
                  ))}
                </div>
              )}

              {/* ── Sort ── */}
              <FilterSection title="Sort Results By" defaultOpen>
                <SelectField
                  label="Order"
                  value={filters.sortBy}
                  onChange={(v) => set('sortBy', v)}
                  options={mediaType === 'movie' ? MOVIE_SORT_OPTIONS : TV_SORT_OPTIONS}
                />
              </FilterSection>

              {/* ── Genres ── */}
              <FilterSection title="Genres" badge={filters.genres.length + filters.excludeGenres.length} defaultOpen>
                <p className="mb-2 text-[11px] text-gray-500">Click to include · Shift+Click to exclude</p>
                <div className="flex flex-wrap gap-1.5">
                  {genres.map((g) => {
                    const inc = filters.genres.includes(g.id);
                    const exc = filters.excludeGenres.includes(g.id);
                    return (
                      <button
                        key={g.id}
                        onClick={(e) => toggleGenre(g.id, e.shiftKey ? 'excludeGenres' : 'genres')}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                          inc
                            ? 'bg-amber-500 text-black'
                            : exc
                            ? 'bg-red-500/80 text-white line-through'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        {exc && '− '}
                        {g.name}
                      </button>
                    );
                  })}
                </div>
              </FilterSection>

              {/* ── Keywords / Tags ── */}
              <FilterSection title="Keywords & Tags" badge={filters.keywords.length}>
                <TagInput
                  placeholder="Search plot keywords (e.g. revenge, heist)..."
                  selected={filters.keywords}
                  onAdd={(t: Tag) => set('keywords', [...filters.keywords, t])}
                  onRemove={(id) => set('keywords', filters.keywords.filter((k) => k.id !== id))}
                  suggestions={(keywordResults?.results ?? []).map((k) => ({ id: k.id, name: k.name }))}
                  isLoading={kwLoading}
                  query={keywordQuery}
                  onQueryChange={setKeywordQuery}
                />
              </FilterSection>

              {/* ── Release Date ── */}
              <FilterSection title="Release Date" badge={filters.yearFrom || filters.yearTo ? 1 : 0}>
                <div className="mb-3 flex flex-wrap gap-2">
                  {DECADES.map((d) => (
                    <button
                      key={d.label}
                      onClick={() => {
                        set('yearFrom', d.from);
                        set('yearTo', d.to);
                      }}
                      className="rounded-full bg-gray-800 px-3 py-1.5 text-xs text-gray-300 transition hover:bg-gray-700 hover:text-white"
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <NumberField
                    label="Year From"
                    placeholder="1990"
                    value={filters.yearFrom ? filters.yearFrom.slice(0, 4) : ''}
                    onChange={(v) => set('yearFrom', v ? `${v}-01-01` : '')}
                    min={1870}
                    max={2035}
                  />
                  <NumberField
                    label="Year To"
                    placeholder="2025"
                    value={filters.yearTo ? filters.yearTo.slice(0, 4) : ''}
                    onChange={(v) => set('yearTo', v ? `${v}-12-31` : '')}
                    min={1870}
                    max={2035}
                  />
                </div>
              </FilterSection>

              {/* ── Rating ── */}
              <FilterSection title="User Rating" badge={filters.ratingMin > 0 || filters.ratingMax < 10 ? 1 : 0}>
                <RangeSlider
                  label="IMDb-style score"
                  min={0}
                  max={10}
                  step={0.5}
                  value={[filters.ratingMin, filters.ratingMax]}
                  onChange={([a, b]) => {
                    set('ratingMin', a);
                    set('ratingMax', b);
                  }}
                />
                <div className="mt-4">
                  <p className="mb-2 text-xs font-medium text-gray-400">Minimum Votes</p>
                  <ChipGroup
                    options={VOTE_COUNT_PRESETS.map((v) => ({ label: v.label, value: v.value }))}
                    selected={filters.voteCount}
                    onToggle={(v) => set('voteCount', v)}
                  />
                </div>
              </FilterSection>

              {/* ── Runtime ── */}
              {mediaType === 'movie' && (
                <FilterSection title="Runtime" badge={filters.runtimeMin || filters.runtimeMax ? 1 : 0}>
                  <ChipGroup
                    options={RUNTIME_PRESETS.map((r, i) => ({ label: r.label, value: i }))}
                    selected={
                      RUNTIME_PRESETS.findIndex(
                        (r) => r.min === filters.runtimeMin && r.max === filters.runtimeMax
                      )
                    }
                    onToggle={(i) => {
                      set('runtimeMin', RUNTIME_PRESETS[i].min);
                      set('runtimeMax', RUNTIME_PRESETS[i].max);
                    }}
                  />
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <NumberField
                      label="Min (min)"
                      value={filters.runtimeMin || ''}
                      onChange={(v) => set('runtimeMin', Number(v))}
                    />
                    <NumberField
                      label="Max (min)"
                      value={filters.runtimeMax || ''}
                      onChange={(v) => set('runtimeMax', Number(v))}
                    />
                  </div>
                </FilterSection>
              )}

              {/* ── Production Companies ── */}
              <FilterSection title="Production Companies" badge={filters.companies.length}>
                <TagInput
                  placeholder="Search studios (e.g. Marvel, A24)..."
                  selected={filters.companies}
                  onAdd={(t: Tag) => set('companies', [...filters.companies, t])}
                  onRemove={(id) => set('companies', filters.companies.filter((c) => c.id !== id))}
                  suggestions={(companyResults?.results ?? []).map((c) => ({ id: c.id, name: c.name }))}
                  isLoading={coLoading}
                  query={companyQuery}
                  onQueryChange={setCompanyQuery}
                />
              </FilterSection>

              {/* ── Cast ── */}
              <FilterSection title="With Cast" badge={filters.cast.length}>
                <TagInput
                  placeholder="Search actors (e.g. Tom Hanks)..."
                  selected={filters.cast}
                  onAdd={(t: Tag) => set('cast', [...filters.cast, t])}
                  onRemove={(id) => set('cast', filters.cast.filter((c) => c.id !== id))}
                  suggestions={(personResults?.results ?? []).map((p) => ({ id: p.id, name: p.name }))}
                  isLoading={personLoading}
                  query={personQuery}
                  onQueryChange={setPersonQuery}
                  matchMode={castMode}
                  onModeChange={setCastMode}
                />
              </FilterSection>

              {/* ── Crew / Directors ── */}
              <FilterSection title="With Director / Crew" badge={filters.crew.length}>
                <p className="mb-2 text-[11px] text-gray-500">
                  Filter by director, writer, or producer
                </p>
                <TagInput
                  placeholder="Search directors (e.g. Nolan)..."
                  selected={filters.crew}
                  onAdd={(t: Tag) => set('crew', [...filters.crew, t])}
                  onRemove={(id) => set('crew', filters.crew.filter((c) => c.id !== id))}
                  suggestions={(personResults?.results ?? []).map((p) => ({
                    id: p.id,
                    name: `${p.name}${p.known_for_department === 'Directing' ? ' 🎬' : ''}`,
                  }))}
                  isLoading={personLoading}
                  query={crewQuery}
                  onQueryChange={setCrewQuery}
                />
              </FilterSection>

              {/* ── Language ── */}
              <FilterSection title="Original Language" badge={filters.language ? 1 : 0}>
                <SelectField
                  label="Language"
                  value={filters.language}
                  onChange={(v) => set('language', v)}
                  options={[{ label: 'Any Language', value: '' }, ...LANGUAGES.map((l) => ({ label: l.name, value: l.code }))]}
                />
              </FilterSection>

              {/* ── Country ── */}
              <FilterSection title="Country of Origin" badge={filters.country ? 1 : 0}>
                <SelectField
                  label="Country"
                  value={filters.country}
                  onChange={(v) => set('country', v)}
                  options={[{ label: 'Any Country', value: '' }, ...COUNTRIES.map((c) => ({ label: c.name, value: c.code }))]}
                />
              </FilterSection>

              {/* ── Certification ── */}
              <FilterSection title="Age Certification" badge={filters.certification ? 1 : 0}>
                <SelectField
                  label="US Rating"
                  value={filters.certification}
                  onChange={(v) => set('certification', v)}
                  options={CERTIFICATIONS.map((c) => ({ label: c.name, value: c.code }))}
                />
              </FilterSection>
            </div>
          </aside>

          {/* ── RESULTS ── */}
          <div className="min-w-0 flex-1">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                  {isFetching && <Loader2 size={16} className="animate-spin text-amber-400" />}
                  {isFetching ? 'Searching...' : `${totalResults.toLocaleString()} titles found`}
                </h2>
                <p className="text-xs text-gray-500">
                  {mediaType === 'movie' ? 'Movies' : 'TV Shows'} ·{' '}
                  {MOVIE_SORT_OPTIONS.concat(TV_SORT_OPTIONS).find((s) => s.value === filters.sortBy)?.label}
                </p>
              </div>
              <span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400">
                Page {page} / {totalPages}
              </span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="animate-pulse rounded-xl bg-gray-800">
                    <div className="aspect-[2/3] rounded-t-xl bg-gray-700" />
                    <div className="space-y-2 p-3">
                      <div className="h-4 w-3/4 rounded bg-gray-700" />
                      <div className="h-3 w-1/2 rounded bg-gray-700" />
                    </div>
                  </div>
                ))}
              </div>
            ) : results.length === 0 ? (
              <EmptyState
                title="No titles match your filters"
                description="Try loosening some criteria — remove a genre or lower the rating minimum."
              />
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
                >
                  {results.map((item: any) => (
                    <MovieCard
                      key={item.id}
                      id={item.id}
                      title={item.title ?? item.name ?? ''}
                      posterPath={item.poster_path}
                      voteAverage={item.vote_average}
                      releaseDate={item.release_date ?? item.first_air_date ?? ''}
                      mediaType={mediaType}
                    />
                  ))}
                </motion.div>

                {/* Pagination */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2 pb-12">
                  <button
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                    className="rounded-lg bg-gray-800 px-3 py-2 text-sm text-white transition hover:bg-gray-700 disabled:opacity-30"
                  >
                    « First
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex items-center gap-1 rounded-lg bg-gray-800 px-4 py-2 text-sm text-white transition hover:bg-gray-700 disabled:opacity-30"
                  >
                    <ChevronLeft size={16} /> Prev
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                      const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                      const p = start + i;
                      if (p > totalPages) return null;
                      return (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                            p === page ? 'bg-amber-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="flex items-center gap-1 rounded-lg bg-gray-800 px-4 py-2 text-sm text-white transition hover:bg-gray-700 disabled:opacity-30"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                  <button
                    onClick={() => setPage(totalPages)}
                    disabled={page >= totalPages}
                    className="rounded-lg bg-gray-800 px-3 py-2 text-sm text-white transition hover:bg-gray-700 disabled:opacity-30"
                  >
                    Last »
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

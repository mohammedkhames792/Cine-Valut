import { useState } from 'react';
import { SkeletonRow, SkeletonHero } from '../components/SkeletonCard';
import HeroBannerComp from '../components/HeroBanner';
import ScrollRowComp from '../components/ScrollRow';
import VideoModal from '../components/VideoModal';
import { useToast } from '../components/Toast';
import {
  useTrending,
  usePopularMovies,
  useTopRatedMovies,
  useUpcomingMovies,
  useNowPlayingMovies,
  usePopularTV,
  useTopRatedTV,
} from '../hooks/useTMDB';
import { getMovieVideos, getTVVideos } from '../services/tmdb';

type Library = 'movies' | 'tv';

export default function Home() {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [library, setLibrary] = useState<Library>('movies');
  const { toast } = useToast();

  const { isLoading: tLoading } = useTrending('movie', 'week');
  const { data: popular, isLoading: pLoading } = usePopularMovies();
  const { data: topRated, isLoading: trLoading } = useTopRatedMovies();
  const { data: upcoming, isLoading: uLoading } = useUpcomingMovies();
  const { data: nowPlaying, isLoading: npLoading } = useNowPlayingMovies();
  const { data: popularTV, isLoading: ptvLoading } = usePopularTV();
  const { data: topRatedTV, isLoading: trtvLoading } = useTopRatedTV();

  const handlePlayTrailer = async (id: number, type: 'movie' | 'tv') => {
    try {
      const res = type === 'movie' ? await getMovieVideos(id) : await getTVVideos(id);
      const trailer =
        res.results.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ??
        res.results.find((v) => v.site === 'YouTube');
      if (trailer) setTrailerKey(trailer.key);
      else toast('Trailer not available', 'info');
    } catch {
      toast('Failed to load trailer', 'error');
    }
  };

  const Row = ({
    title,
    items,
    mediaType,
    loading,
  }: {
    title: string;
    items?: any[];
    mediaType: 'movie' | 'tv';
    loading: boolean;
  }) =>
    loading ? (
      <div className="px-4 py-8 md:px-6">
        <SkeletonRow />
      </div>
    ) : (
      <ScrollRowComp title={title} items={items ?? []} mediaType={mediaType} />
    );

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      {tLoading ? <SkeletonHero /> : <HeroBannerComp onPlayTrailer={handlePlayTrailer} />}

      {/* Library Switcher */}
      <div className="mx-auto max-w-7xl px-4 pt-8 md:px-6">
        <div className="mb-2 inline-flex rounded-full border border-white/10 bg-gray-900 p-1">
          <button
            onClick={() => setLibrary('movies')}
            className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
              library === 'movies' ? 'bg-amber-500 text-black' : 'text-gray-300 hover:text-white'
            }`}
          >
            🎬 Movies
          </button>
          <button
            onClick={() => setLibrary('tv')}
            className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
              library === 'tv' ? 'bg-amber-500 text-black' : 'text-gray-300 hover:text-white'
            }`}
          >
            📺 TV Shows
          </button>
        </div>
      </div>

      {/* Content Rows */}
      <div className="space-y-2 pb-12">
        {library === 'movies' ? (
          <>
            <Row title="🔥 Popular Movies" items={popular?.results} mediaType="movie" loading={pLoading} />
            <Row title="🎬 Now Playing" items={nowPlaying?.results} mediaType="movie" loading={npLoading} />
            <Row title="⭐ Top Rated Movies" items={topRated?.results} mediaType="movie" loading={trLoading} />
            <Row title="📅 Upcoming" items={upcoming?.results} mediaType="movie" loading={uLoading} />
          </>
        ) : (
          <>
            <Row title="📺 Popular TV Shows" items={popularTV?.results} mediaType="tv" loading={ptvLoading} />
            <Row title="🏆 Top Rated TV" items={topRatedTV?.results} mediaType="tv" loading={trtvLoading} />
            <Row title="📅 Upcoming Movies" items={upcoming?.results} mediaType="movie" loading={uLoading} />
          </>
        )}
      </div>

      <VideoModal videoKey={trailerKey} onClose={() => setTrailerKey(null)} />
    </div>
  );
}

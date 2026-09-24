import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play,
  Heart,
  BookmarkPlus,
  Calendar,
  Clock,
  Star,
  ArrowLeft,
  Film,
} from 'lucide-react';

import {
  useMovieDetails,
  useTVDetails,
  useReviews,
  useImages,
  useMovieKeywords,
  useTVKeywords,
} from '../hooks/useTMDB';

import {
  backdropUrl,
  posterUrl,
  getMovieVideos,
  getTVVideos,
  getImageUrl,
} from '../services/tmdb';

import { useLibraryStore } from '../stores/useStore';
import { useToast } from '../components/Toast';
import RatingGauge from '../components/RatingGauge';
import CastCard from '../components/CastCard';
import MovieCard from '../components/MovieCard';
import VideoModal from '../components/VideoModal';
import SeasonCard, { type Season } from '../components/SeasonCard';
import KeywordPills from '../components/KeywordPills';
import CollectionBanner from '../components/CollectionBanner';
import ReviewCard from '../components/ReviewCard';
import { SkeletonDetails } from '../components/SkeletonCard';

import type {
  MovieDetails,
  TVDetails,
  Movie,
  TVShow,
} from '../types/tmdb';

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const numericId = Number(id);
  const isValidId = Number.isFinite(numericId) && numericId > 0;

  const mediaType: 'movie' | 'tv' = pathname.startsWith('/tv')
    ? 'tv'
    : 'movie';

  const isMovie = mediaType === 'movie';
  const isTV = mediaType === 'tv';

  const movieQuery = useMovieDetails(numericId, isMovie);
  const tvQuery = useTVDetails(numericId, isTV);

  const reviewsQuery = useReviews(
    mediaType,
    numericId,
    isValidId
  );

  const imagesQuery = useImages(
    mediaType,
    numericId,
    isValidId
  );

  const movieKwQuery = useMovieKeywords(numericId, isMovie);
  const tvKwQuery = useTVKeywords(numericId, isTV);

  const [trailerKey, setTrailerKey] = useState<string | null>(
    null
  );

  const { toast } = useToast();

  const {
    addFavorite,
    removeFavorite,
    isFavorite,
    addWatchlist,
    removeWatchlist,
    isWatchlist,
  } = useLibraryStore();

  const movie = isMovie
    ? (movieQuery.data as MovieDetails | undefined)
    : undefined;

  const tv = isTV
    ? (tvQuery.data as TVDetails | undefined)
    : undefined;

  const detail = movie ?? tv;

  const activeQuery = isMovie ? movieQuery : tvQuery;

  if (!isValidId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
        <div className="text-center">
          <h1 className="mb-3 text-2xl font-bold text-white">
            Invalid ID
          </h1>

          <p className="mb-6 text-gray-400">
            The requested content ID is invalid.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-full bg-amber-500 px-5 py-2.5 font-semibold text-black transition hover:bg-amber-400"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (activeQuery.isLoading || !detail) {
    return <SkeletonDetails />;
  }

  if (activeQuery.isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
        <div className="text-center">
          <h1 className="mb-3 text-2xl font-bold text-white">
            Something went wrong
          </h1>

          <p className="mb-6 text-gray-400">
            We could not load this content.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-full bg-amber-500 px-5 py-2.5 font-semibold text-black transition hover:bg-amber-400"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const title = 'title' in detail ? detail.title : detail.name;

  const date =
    'release_date' in detail
      ? detail.release_date
      : detail.first_air_date;

  const runtime = 'runtime' in detail ? detail.runtime : 0;

  const seasons =
    'number_of_seasons' in detail
      ? detail.number_of_seasons
      : 0;

  const episodes =
    'number_of_episodes' in detail
      ? detail.number_of_episodes
      : 0;

  const genres = detail.genres;
  const overview = detail.overview;
  const tagline = detail.tagline;
  const credits = detail.credits;
  const videos = detail.videos;
  const similar = detail.similar;
  const recommendations = detail.recommendations;

  const fav = isFavorite(numericId, mediaType);
  const watch = isWatchlist(numericId, mediaType);

  const toggleFav = () => {
    if (fav) {
      removeFavorite(numericId, mediaType);

      toast('Removed from favorites', 'info');
    } else {
      addFavorite({
        id: numericId,
        media_type: mediaType,
        title: title ?? '',
        poster_path: detail.poster_path,
        vote_average: detail.vote_average,
        release_date: date ?? '',
        addedAt: Date.now(),
      });

      toast('Added to favorites ❤️', 'success');
    }
  };

  const toggleWatch = () => {
    if (watch) {
      removeWatchlist(numericId, mediaType);

      toast('Removed from watchlist', 'info');
    } else {
      addWatchlist({
        id: numericId,
        media_type: mediaType,
        title: title ?? '',
        poster_path: detail.poster_path,
        vote_average: detail.vote_average,
        release_date: date ?? '',
        addedAt: Date.now(),
      });

      toast('Added to watchlist 🔖', 'success');
    }
  };

  const handlePlayTrailer = async () => {
    try {
      if (videos?.results.length) {
        const trailer =
          videos.results.find(
            (video) =>
              video.site === 'YouTube' &&
              video.type === 'Trailer'
          ) ??
          videos.results.find(
            (video) => video.site === 'YouTube'
          );

        if (trailer) {
          setTrailerKey(trailer.key);
          return;
        }
      }

      const response = isMovie
        ? await getMovieVideos(numericId)
        : await getTVVideos(numericId);

      const trailer =
        response.results.find(
          (video) =>
            video.site === 'YouTube' &&
            video.type === 'Trailer'
        ) ??
        response.results.find(
          (video) => video.site === 'YouTube'
        );

      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        toast('Trailer not available', 'info');
      }
    } catch {
      toast('Could not load trailer', 'error');
    }
  };

  const cast = credits?.cast.slice(0, 12) ?? [];

  const similarItems = (similar?.results ?? []) as (
    | Movie
    | TVShow
  )[];

  const recommendationItems = (
    recommendations?.results ?? []
  ) as (Movie | TVShow)[];

  const mediaKeywords: Array<{
    id: number;
    name: string;
  }> = isMovie
    ? ((movieKwQuery.data as any)?.keywords ?? [])
    : ((tvKwQuery.data as any)?.results ?? []);

  const logos = imagesQuery.data?.logos ?? [];

  const logo =
    logos.find((item: any) => item.iso_639_1 === 'en')
      ?.file_path ??
    logos[0]?.file_path ??
    null;

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Header */}
      <div className="relative">
        {detail.backdrop_path && (
          <>
            <img
              src={backdropUrl(detail.backdrop_path)}
              alt=""
              className="h-[50vh] w-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/60 to-gray-950/30" />
          </>
        )}

        <div className="absolute left-4 top-4 z-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-black/70"
          >
            <ArrowLeft size={18} />
            Back
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row">
            {/* Poster */}
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={posterUrl(detail.poster_path)}
              alt={title}
              className="hidden h-[300px] w-[200px] shrink-0 rounded-xl object-cover shadow-2xl md:block"
            />

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-1"
            >
              {tagline && (
                <p className="mb-1 text-sm italic text-amber-400">
                  "{tagline}"
                </p>
              )}

              {logo ? (
                <img
                  src={getImageUrl(logo, 'w300')}
                  alt={title}
                  className="mb-3 max-h-24 w-auto max-w-sm object-contain"
                />
              ) : (
                <h1 className="mb-3 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
                  {title}
                </h1>
              )}

              <div className="mb-4 flex flex-wrap items-center gap-3">
                <RatingGauge
                  rating={detail.vote_average}
                  size={50}
                />

                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gray-300"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {date || 'Unknown date'}
                </span>

                {runtime > 0 && (
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {Math.floor(runtime / 60)}h{' '}
                    {runtime % 60}m
                  </span>
                )}

                {seasons > 0 && (
                  <span className="flex items-center gap-1">
                    <Film size={16} />
                    {seasons} Season
                    {seasons > 1 ? 's' : ''},{' '}
                    {episodes} Episodes
                  </span>
                )}

                <span className="flex items-center gap-1">
                  <Star
                    size={16}
                    className="text-amber-400"
                  />

                  {detail.vote_average.toFixed(1)}/10 (
                  {detail.vote_count.toLocaleString()})
                </span>
              </div>

              {/* Action Buttons */}
              <div className="mb-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handlePlayTrailer}
                  className="flex items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 font-semibold text-black transition hover:bg-amber-400"
                >
                  <Play size={18} fill="currentColor" />
                  Trailer
                </button>

                <button
                  type="button"
                  onClick={toggleFav}
                  className={`flex items-center gap-2 rounded-full border px-5 py-2.5 font-semibold transition ${
                    fav
                      ? 'border-red-500 bg-red-500/20 text-red-400'
                      : 'border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  <Heart
                    size={18}
                    fill={fav ? 'currentColor' : 'none'}
                  />

                  Favorite
                </button>

                <button
                  type="button"
                  onClick={toggleWatch}
                  className={`flex items-center gap-2 rounded-full border px-5 py-2.5 font-semibold transition ${
                    watch
                      ? 'border-amber-500 bg-amber-500/20 text-amber-400'
                      : 'border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  <BookmarkPlus
                    size={18}
                    fill={watch ? 'currentColor' : 'none'}
                  />

                  Watchlist
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h2 className="mb-4 text-xl font-bold text-white">
          Overview
        </h2>

        <p className="max-w-3xl leading-relaxed text-gray-300">
          {overview || 'No overview available.'}
        </p>
      </div>

      {/* Cast */}
      {cast.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 pb-8 md:px-6">
          <h2 className="mb-6 text-xl font-bold text-white">
            Cast
          </h2>

          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
            {cast.map((person) => (
              <CastCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      )}

      {/* Similar */}
      {similarItems.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 pb-8 md:px-6">
          <h2 className="mb-4 text-xl font-bold text-white">
            Similar
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {similarItems.slice(0, 12).map((item) => (
              <MovieCard
                key={`${mediaType}-${item.id}`}
                id={item.id}
                title={
                  'title' in item
                    ? item.title
                    : item.name ?? ''
                }
                posterPath={item.poster_path}
                voteAverage={item.vote_average}
                releaseDate={
                  'release_date' in item
                    ? item.release_date
                    : item.first_air_date ?? ''
                }
                mediaType={mediaType}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendationItems.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 pb-12 md:px-6">
          <h2 className="mb-4 text-xl font-bold text-white">
            Recommended
          </h2>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {recommendationItems.slice(0, 12).map((item) => (
              <MovieCard
                key={`${mediaType}-${item.id}`}
                id={item.id}
                title={
                  'title' in item
                    ? item.title
                    : item.name ?? ''
                }
                posterPath={item.poster_path}
                voteAverage={item.vote_average}
                releaseDate={
                  'release_date' in item
                    ? item.release_date
                    : item.first_air_date ?? ''
                }
                mediaType={mediaType}
              />
            ))}
          </div>
        </div>
      )}

      {/* Collection */}
      {movie?.belongs_to_collection?.id && (
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <CollectionBanner
            collectionId={movie.belongs_to_collection.id}
          />
        </div>
      )}

      {/* Keywords */}
      <KeywordPills
        keywords={mediaKeywords}
        mediaType={mediaType}
      />

      {/* TV Seasons */}
      {tv?.seasons && tv.seasons.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 pb-8 md:px-6">
          <h2 className="mb-4 text-xl font-bold text-white">
            Seasons{' '}
            <span className="text-sm font-normal text-gray-400">
              ({tv.seasons.length})
            </span>
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tv.seasons
              .filter((season) => season.season_number >= 0)
              .map((season) => (
                <SeasonCard
                  key={season.id}
                  season={season as Season}
                />
              ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      {reviewsQuery.data?.results &&
        reviewsQuery.data.results.length > 0 && (
          <div className="mx-auto max-w-4xl px-4 pb-12 md:px-6">
            <h2 className="mb-4 text-xl font-bold text-white">
              Reviews{' '}
              <span className="text-sm font-normal text-gray-400">
                ({reviewsQuery.data.results.length})
              </span>
            </h2>

            <div className="space-y-4">
              {reviewsQuery.data.results
                .slice(0, 5)
                .map((review: any) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                  />
                ))}
            </div>
          </div>
        )}

      {/* Video Modal */}
      <VideoModal
        videoKey={trailerKey}
        onClose={() => setTrailerKey(null)}
      />
    </div>
  );
}
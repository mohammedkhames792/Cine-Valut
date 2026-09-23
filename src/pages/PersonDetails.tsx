import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Cake, MapPin, Star, User, Film, Tv } from 'lucide-react';
import { usePersonDetails } from '../hooks/useTMDB';
import { profileUrl } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { SkeletonRow } from '../components/SkeletonCard';

export default function PersonDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const personId = Number(id);
  const navigate = useNavigate();
  const { data: person, isLoading } = usePersonDetails(personId);

  if (isLoading || !person) {
    return (
      <div className="min-h-screen bg-gray-950 pt-24">
        <div className="mx-auto max-w-7xl px-4">
          <SkeletonRow count={6} />
        </div>
      </div>
    );
  }

  const credits: any[] = (person.combined_credits?.cast ?? [])
    .filter((c: any) => c.poster_path && (c.media_type === 'movie' || c.media_type === 'tv'))
    .sort((a: any, b: any) => (b.popularity ?? 0) - (a.popularity ?? 0));

  const actingCredits = credits.slice(0, 24);
  const knownForActing = person.known_for_department === 'Acting';
  const age = person.birthday
    ? Math.floor((Date.now() - new Date(person.birthday).getTime()) / 31557600000)
    : null;

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 pt-8 md:px-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-8 md:flex-row"
        >
          {/* Avatar */}
          <div className="mx-auto h-[280px] w-[220px] flex-shrink-0 overflow-hidden rounded-2xl bg-gray-800 shadow-2xl md:mx-0 md:h-[340px] md:w-[260px]">
            {person.profile_path ? (
              <img
                src={profileUrl(person.profile_path)}
                alt={person.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-600">
                <User size={80} />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-extrabold text-white md:text-4xl">{person.name}</h1>
            {person.known_for_department && (
              <p className="mb-4 text-amber-400">{person.known_for_department}</p>
            )}

            <div className="mb-6 flex flex-wrap gap-4 text-sm text-gray-300">
              {person.birthday && (
                <span className="flex items-center gap-1">
                  <Cake size={16} /> {person.birthday}
                  {!person.deathday && age !== null && ` (${age} years)`}
                </span>
              )}
              {person.place_of_birth && (
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {person.place_of_birth}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star size={16} className="text-amber-400" /> {person.popularity?.toFixed(1)} Popularity
              </span>
            </div>

            {person.biography && (
              <>
                <h2 className="mb-3 text-xl font-bold text-white">Biography</h2>
                <p className="max-h-64 overflow-y-auto pr-2 text-sm leading-relaxed text-gray-300">
                  {person.biography}
                </p>
              </>
            )}
          </div>
        </motion.div>

        {/* Filmography */}
        {actingCredits.length > 0 && (
          <div className="py-10">
            <h2 className="mb-2 text-xl font-bold text-white">
              {knownForActing ? 'Filmography' : 'Credits'}
            </h2>
            <p className="mb-6 text-sm text-gray-400">
              {credits.length} credits •{' '}
              <span className="inline-flex items-center gap-1">
                <Film size={12} />{' '}
                {credits.filter((c) => c.media_type === 'movie').length} movies
              </span>{' '}
              •{' '}
              <span className="inline-flex items-center gap-1">
                <Tv size={12} /> {credits.filter((c) => c.media_type === 'tv').length} TV
              </span>
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {actingCredits.map((c, i) => (
                <div key={`${c.media_type}-${c.id}-${i}`}>
                  <MovieCard
                    id={c.id}
                    title={c.title ?? c.name ?? ''}
                    posterPath={c.poster_path}
                    voteAverage={c.vote_average ?? 0}
                    releaseDate={c.release_date ?? c.first_air_date ?? ''}
                    mediaType={c.media_type}
                  />
                  {c.character && (
                    <p className="mt-1 truncate text-[11px] text-gray-500">as {c.character}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

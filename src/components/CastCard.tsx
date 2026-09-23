import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { profileUrl } from '../services/tmdb';
import type { Cast } from '../types/tmdb';

interface CastCardProps {
  person: Cast;
}

export default function CastCard({ person }: CastCardProps) {
  return (
    <Link to={`/person/${person.id}`} className="group flex flex-col items-center text-center">
      <div className="mb-2 h-20 w-20 overflow-hidden rounded-full bg-gray-700 ring-2 ring-transparent transition group-hover:ring-amber-400">
        {person.profile_path ? (
          <img
            src={profileUrl(person.profile_path)}
            alt={person.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-500">
            <User size={32} />
          </div>
        )}
      </div>
      <p className="w-full truncate text-xs font-semibold text-white transition group-hover:text-amber-400">
        {person.name}
      </p>
      <p className="w-full truncate text-[10px] text-gray-400">{person.character}</p>
    </Link>
  );
}

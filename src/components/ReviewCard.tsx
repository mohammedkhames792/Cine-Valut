import { useState } from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details?: { rating: number | null; avatar_path: string | null; username?: string };
}

export default function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.content.length > 400;
  const rating = review.author_details?.rating;
  const avatar = review.author_details?.avatar_path;
  const initials = review.author.slice(0, 2).toUpperCase();

  return (
    <div className="rounded-xl border border-white/10 bg-gray-900 p-5">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-700 text-xs font-bold text-white">
          {avatar ? (
            <img
              src={avatar.startsWith('/http') ? avatar.slice(1) : `https://image.tmdb.org/t/p/w45${avatar}`}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-white">{review.author}</p>
          <p className="text-xs text-gray-500">
            {new Date(review.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
        {rating != null && (
          <div className="flex items-center gap-1 rounded-full bg-amber-500/15 px-3 py-1">
            <Star size={13} className="text-amber-400" fill="currentColor" />
            <span className="text-sm font-bold text-amber-400">{rating}/10</span>
          </div>
        )}
      </div>

      <p className={`text-sm leading-relaxed text-gray-300 ${expanded ? '' : 'line-clamp-4'}`}>
        {review.content}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm font-medium text-amber-400 hover:underline"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}

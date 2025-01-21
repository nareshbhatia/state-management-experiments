import { Card, CardContent } from '@/components/ui/card';
import type { Movie } from '@/models/Movie';
import { Clock, Star } from 'lucide-react';

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

interface MoviewListProps {
  movies: Movie[];
}

export function MovieList({ movies }: MoviewListProps) {
  return (
    <>
      {movies.map((movie) => (
        <Card className="overflow-hidden" key={movie.id}>
          <div className="relative aspect-video overflow-hidden">
            <img
              alt={movie.name}
              className="size-full object-cover transition-transform duration-200 hover:scale-105"
              src={movie.image.url}
            />
            <div className="absolute right-2 top-2 rounded bg-black/70 px-2 py-1 text-sm text-white">
              {movie.certificate}
            </div>
          </div>
          <CardContent className="p-4">
            <h2
              className="mb-2 line-clamp-1 text-xl font-semibold"
              title={movie.name}
            >
              {movie.name} ({movie.releaseYear})
            </h2>

            <div className="mb-3 flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span>Rank: #{movie.rank}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="size-4 text-yellow-500" />
                <span>{movie.ratingsSummary.aggregateRating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="size-4" />
                <span>{formatDuration(movie.runtime)}</span>
              </div>
            </div>

            <p
              className="mb-3 line-clamp-2 text-sm text-gray-600"
              title={movie.description}
            >
              {movie.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <span
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
                  key={genre}
                >
                  {genre}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

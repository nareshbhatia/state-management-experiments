import { Card, CardContent } from '@/components/ui/card';
import { Clock, Star, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { switchMap, of, catchError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

interface Image {
  url: string;
  width: number;
  height: number;
}

type Certificate = 'G' | 'NR' | 'PG-13' | 'PG' | 'R';

interface RatingsSummary {
  aggregateRating: number;
  voteCount: number;
}

interface Movie {
  id: string;
  name: string;
  description: string;
  cast: string[];
  certificate: Certificate;
  genres: string[];
  image: Image;
  rank: number;
  ratingsSummary: RatingsSummary;
  releaseYear: number;
  runtime: number;
  tagline?: string;
  isFeatured: boolean;
}

export function MovieMagic() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const data$ = fromFetch(
      'https://movie-magic-rest-api-221d9114e329.herokuapp.com/movies',
    ).pipe(
      switchMap(async (response) => {
        if (response.ok) {
          return response.json() as Promise<Movie[]>;
        }
        return of({ error: true, message: `Error ${response.status}` });
      }),
      catchError((err: Error) => {
        console.error(err);
        return of({ error: true, message: err.message });
      }),
    );

    const subscription = data$.subscribe({
      next: (result) => {
        if ('error' in result) {
          setError(result.message);
        } else {
          setMovies(result as Movie[]);
        }
        setLoading(false);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error !== undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">Popular Movies</h1>
        <div className="text-sm text-gray-500">
          Showing {movies.length} movies, sorted by rating
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  <Star className="size-4 text-yellow-500" />
                  <span>{movie.ratingsSummary.aggregateRating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="size-4" />
                  <span>{movie.ratingsSummary.voteCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="size-4" />
                  <span>{formatRuntime(movie.runtime)}</span>
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
      </div>
    </div>
  );
}

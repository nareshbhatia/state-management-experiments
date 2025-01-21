import { MovieList } from '@/components/MovieList';
import type { Movie } from '@/models/Movie';
import { useEffect, useState } from 'react';
import { fromFetch } from 'rxjs/fetch';

export function MovieMagic() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    // Create an Observable that fetches top 10 movies
    const data$ = fromFetch(
      'https://movie-magic-rest-api-221d9114e329.herokuapp.com/movies?sort=RANK_ASC&page=1&perPage=10',
      {
        selector: async (response) => response.json(),
      },
    );

    // Subscribe to the observable
    const subscription = data$.subscribe({
      next: (response) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setMovies(response.movies as Movie[]);
        setLoading(false);
      },
      error: (error: Error) => {
        setError(error.message);
        setLoading(false);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
        <h1 className="mb-2 text-3xl font-bold">Top 10 Movies Of All Time</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

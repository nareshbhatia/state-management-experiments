import { MovieList } from '@/components/MovieList';
import type { Movie } from '@/models/Movie';
import { useEffect, useMemo, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

export function MovieMagicBehaviorSubject() {
  // React state is stored here
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();

  // RxJS state is stored here
  const movies$ = useMemo(() => new BehaviorSubject<Movie[]>([]), []);
  const loading$ = useMemo(() => new BehaviorSubject<boolean>(true), []);
  const error$ = useMemo(
    () => new BehaviorSubject<string | undefined>(undefined),
    [],
  );

  useEffect(() => {
    // Create an Observable that fetches top 10 movies
    const data$ = fromFetch(
      'https://movie-magic-rest-api-221d9114e329.herokuapp.com/movies?sort=RANK_ASC&page=1&perPage=10',
      {
        selector: async (response) => response.json(),
      },
    );

    // Subscribe to the data$ observable
    const data$Subscription = data$.subscribe({
      next: (response) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        movies$.next(response.movies as Movie[]);
        loading$.next(false);
      },
      error: (error: Error) => {
        error$.next(error.message);
        loading$.next(false);
      },
    });

    // Whenever RxJS state changes, update React state
    const moviesSubscription = movies$.subscribe((movies) => {
      setMovies(movies);
    });
    const loadingSubscription = loading$.subscribe((loading) => {
      setLoading(loading);
    });
    const errorSubscription = error$.subscribe((error) => {
      setError(error);
    });

    return () => {
      data$Subscription.unsubscribe();
      moviesSubscription.unsubscribe();
      loadingSubscription.unsubscribe();
      errorSubscription.unsubscribe();
    };
  }, [error$, loading$, movies$]);

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

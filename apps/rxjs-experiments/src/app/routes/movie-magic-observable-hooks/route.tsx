import { useQuery } from './packages/useQuery/useQuery';
import { MovieList } from '@/components/MovieList';
import type { MoviePagination } from '@/models';
import { MOVIE_REQUEST_URL } from '@/utils/constants';

export function MovieMagicObservableHooks() {
  const { data, isLoading, error } =
    useQuery<MoviePagination>(MOVIE_REQUEST_URL);

  if (isLoading) {
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
        <MovieList movies={data?.movies ?? []} />
      </div>
    </div>
  );
}

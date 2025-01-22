import { MovieList } from '@/components/MovieList';
import { useQuery } from '@/hooks/useQuery';
import type { MoviePagination } from '@/models';

export function MovieMagicObservableHooks() {
  const { data, isLoading, error } = useQuery<MoviePagination>(
    'https://movie-magic-rest-api-221d9114e329.herokuapp.com/movies?sort=RANK_ASC&page=1&perPage=10',
  );

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

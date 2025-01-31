import { MoviesController } from './MoviesController';
import { MoviesModel } from './MoviesModel';
import { useObservable } from './useObservable';
import { MovieList } from '../../../components/MovieList';
import { emptyMoviePagination } from '../../../models';
import * as React from 'react';

export function MovieMagicMvcPattern() {
  const model = React.useMemo(() => new MoviesModel(), []);
  const controller = React.useMemo(() => new MoviesController(model), [model]);

  React.useEffect(() => {
    controller.loadMovies();
  });

  const moviePagination = useObservable(
    controller.moviePagination$,
    emptyMoviePagination,
  );

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">Top 10 Movies Of All Time</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MovieList movies={moviePagination.movies} />
      </div>
    </div>
  );
}

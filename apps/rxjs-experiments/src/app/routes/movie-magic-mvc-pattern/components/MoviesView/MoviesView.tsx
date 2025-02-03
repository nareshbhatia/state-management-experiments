import { MovieList } from '../../../../../components/MovieList';
import { useMovieService, useMoviesModel } from '../../services/movie-service';
import { MOVIE_REQUEST_URL } from '@/utils/constants';
import { useEffect } from 'react';

export function MoviesView() {
  const movieService = useMovieService();
  const moviesModel = useMoviesModel(movieService);

  useEffect(() => {
    movieService.loadMovies(MOVIE_REQUEST_URL);
  }, [movieService]);

  switch (moviesModel.status) {
    case 'not-started':
    case 'loading':
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-b-2 border-gray-900" />
        </div>
      );

    case 'error':
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-red-500">{moviesModel.error.message}</div>
        </div>
      );

    case 'loaded':
      return (
        <div className="mx-auto max-w-6xl p-6">
          <div className="mb-6">
            <h1 className="mb-2 text-3xl font-bold">
              Top 10 Movies Of All Time
            </h1>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <MovieList movies={moviesModel.data.movies} />
          </div>
        </div>
      );
  }
}

import { MoviesView } from './components/MoviesView';
import { MovieService, MovieServiceContext } from './services/movie-service';
import { useMemo } from 'react';

export function MovieMagicMvcPattern() {
  const movieService = useMemo(() => new MovieService(), []);

  return (
    <MovieServiceContext.Provider value={movieService}>
      <MoviesView />
    </MovieServiceContext.Provider>
  );
}

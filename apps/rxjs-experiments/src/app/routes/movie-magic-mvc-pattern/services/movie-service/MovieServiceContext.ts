import type { IMovieService } from './IMovieService';
import { useObservable } from '../../packages/useObservable';
import { createContext, useContext } from 'react';

/*
 * ---------- MovieServiceContext ----------
 * contains IMovieService
 */
export const MovieServiceContext = createContext<IMovieService | undefined>(
  undefined,
);

// ---------- useMovieService ----------
export function useMovieService() {
  const movieService = useContext(MovieServiceContext);
  if (movieService === undefined) {
    throw new Error('MovieService is not provided');
  }

  return movieService;
}

export function useMoviesModel(movieService: IMovieService) {
  return useObservable(movieService.getMoviesModel$(), {
    status: 'not-started',
  });
}

import type { IMovieService } from './IMovieService';
import type { MoviePagination } from '../../../../models';
import type { AsyncModel } from '../packages/async-model';
import type { Observable } from 'rxjs';
import { from, switchMap, map, catchError, startWith } from 'rxjs';

function fetchMovies(url: string): Observable<AsyncModel<MoviePagination>> {
  return from(fetch(url)).pipe(
    switchMap(async (response) => {
      if (response.ok) {
        return response.json() as Promise<MoviePagination>;
      }
      throw new Error(`Error ${response.status}`);
    }),
    map((data) => ({ status: 'loaded', data }) as AsyncModel<MoviePagination>),
    catchError((error: unknown) =>
      from([{ status: 'error', error } as AsyncModel<MoviePagination>]),
    ),
    startWith({ status: 'loading' } as AsyncModel<MoviePagination>),
  );
}

export const MovieService: IMovieService = {
  fetchMovies,
};

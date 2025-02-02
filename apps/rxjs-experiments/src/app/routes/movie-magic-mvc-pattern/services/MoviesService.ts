import type { IMovieService } from './IMovieService';
import type { MoviePagination } from '../../../../models';
import type { AsyncModel } from '../packages/async-model';
import type { Observable } from 'rxjs';
import { from, map, catchError, startWith } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

function fetchMovies(url: string): Observable<AsyncModel<MoviePagination>> {
  return fromFetch(url, {
    selector: async (response) => response.json() as Promise<MoviePagination>,
  }).pipe(
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

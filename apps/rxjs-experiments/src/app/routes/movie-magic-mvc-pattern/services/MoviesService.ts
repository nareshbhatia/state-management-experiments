import type { IMovieService } from './IMovieService';
import type { MoviePagination } from '../../../../models';
import { asyncFromFetch } from '../packages/asyncFromFetch';
import type { AsyncModel } from '../packages/asyncFromFetch';
import type { Observable } from 'rxjs';

function fetchMovies(url: string): Observable<AsyncModel<MoviePagination>> {
  return asyncFromFetch(url);
}

export const MovieService: IMovieService = {
  fetchMovies,
};

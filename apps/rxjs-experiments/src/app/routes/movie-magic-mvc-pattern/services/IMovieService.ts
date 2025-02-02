import type { MoviePagination } from '../../../../models';
import type { AsyncModel } from '../packages/asyncFromFetch';
import type { Observable } from 'rxjs';

export interface IMovieService {
  fetchMovies: (url: string) => Observable<AsyncModel<MoviePagination>>;
}

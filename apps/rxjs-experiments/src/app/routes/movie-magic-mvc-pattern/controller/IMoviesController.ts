import type { MoviePagination } from '../../../../models';
import type { AsyncModel } from '../packages/asyncFromFetch';
import type { Observable } from 'rxjs';

export interface IMoviesController {
  // MODEL: moviesModel sits in the controller
  moviesModel$: Observable<AsyncModel<MoviePagination>>;

  loadMovies: (url: string) => void;
}

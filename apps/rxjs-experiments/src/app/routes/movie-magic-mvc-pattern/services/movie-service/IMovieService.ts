import type { MoviePagination } from '../../../../../models';
import type { AsyncModel } from '../../packages/asyncFromFetch';
import type { Observable } from 'rxjs';

export interface IMovieService {
  /*
   * ***** MODEL *****
   * moviesModel$ provides a list of movies + PaginationInfo
   */
  getMoviesModel$: () => Observable<AsyncModel<MoviePagination>>;

  /*
   * ***** CONTROLLER *****
   * provides actions to perform on the model
   */
  loadMovies: (url: string) => void;
}

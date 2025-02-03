import type { IMovieService } from './IMovieService';
import type { MoviePagination } from '../../../../../models';
import type { AsyncModel } from '../../packages/asyncFromFetch';
import { asyncFromFetch } from '../../packages/asyncFromFetch';
import { BehaviorSubject, Subscription } from 'rxjs';

export class MovieService implements IMovieService {
  /*
   * ***** MODEL *****
   * moviesModel$ provides a list of movies + PaginationInfo
   */
  private readonly moviesModel$ = new BehaviorSubject<
    AsyncModel<MoviePagination>
  >({
    status: 'not-started',
  });

  public getMoviesModel$() {
    return this.moviesModel$.asObservable();
  }

  // Create a subscription for fetching movies and initialize it with an empty subscription
  private moviesFetchSubscription = Subscription.EMPTY;

  /*
   * ***** CONTROLLER *****
   * provides actions to perform on the model
   */
  public loadMovies(url: string): void {
    /*
     * Unsubscribe from previous fetch subscriptions in case this function is
     * called multiple times in rapid succession
     */
    this.moviesFetchSubscription.unsubscribe();

    // Make the request
    this.moviesFetchSubscription = asyncFromFetch<MoviePagination>(
      url,
    ).subscribe(this.moviesModel$);
  }
}

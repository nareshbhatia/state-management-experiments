import type { IMoviesController } from './IMoviesController';
import type { MoviePagination } from '../../../../models';
import type { AsyncModel } from '../packages/asyncFromFetch';
import { MovieService } from '../services/MoviesService';
import { BehaviorSubject, Subscription } from 'rxjs';

export class MoviesController implements IMoviesController {
  // MODEL: moviesModel sits in the controller
  public moviesModel$ = new BehaviorSubject<AsyncModel<MoviePagination>>({
    status: 'not-started',
  });

  // Create a subscription for fetching movies and initialize it with an empty subscription
  private moviesFetchSubscription = Subscription.EMPTY;

  public loadMovies(url: string): void {
    /*
     * Unsubscribe from previous fetch subscriptions in case this function is
     * called multiple times in rapid succession
     */
    this.moviesFetchSubscription.unsubscribe();

    // Make the request
    this.moviesFetchSubscription = MovieService.fetchMovies(url).subscribe(
      this.moviesModel$,
    );
  }
}

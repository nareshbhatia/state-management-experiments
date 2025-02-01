import type { IMoviesController } from './IMoviesController';
import type { MoviePagination } from '../../../../models';
import type { AsyncModel } from '../packages/async-model';
import {
  BehaviorSubject,
  catchError,
  from,
  map,
  of,
  Subscription,
  switchMap,
} from 'rxjs';

export class MoviesController implements IMoviesController {
  // MODEL: moviesModel sits in the controller
  public moviesModel$: BehaviorSubject<AsyncModel<MoviePagination>> =
    new BehaviorSubject<AsyncModel<MoviePagination>>({ status: 'not-started' });

  // Create a subscription for fetching movies and initialize with an empty subscription
  private movieFetchSubscription = Subscription.EMPTY;

  public loadMovies(url: string): void {
    /*
     * Unsubscribe from previous fetch subscriptions in case this function is
     * called multiple times in rapid succession
     */
    this.movieFetchSubscription.unsubscribe();

    // Mark stream as "loading", when making new request
    this.moviesModel$.next({ status: 'loading' });

    // Make the request
    this.movieFetchSubscription = from(fetch(url))
      .pipe(
        switchMap(async (response) => {
          if (response.ok) {
            return response.json() as Promise<MoviePagination>;
          }
          throw new Error(`Error ${response.status}`);
        }),
        map(
          (data) => ({ status: 'loaded', data }) as AsyncModel<MoviePagination>,
        ),
        catchError((error: unknown) =>
          of({ status: 'error', error } as AsyncModel<MoviePagination>),
        ),
      )
      .subscribe((result) => {
        this.moviesModel$.next(result);
      });
  }
}

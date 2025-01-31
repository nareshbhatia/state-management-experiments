import { emptyMoviePagination } from '../../../models';
import type { MoviePagination } from '../../../models';
import type { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

export interface IMoviesModel {
  moviePagination$: Observable<MoviePagination>;
  loadMovies: (moviePagination: MoviePagination) => void;
}

export class MoviesModel implements IMoviesModel {
  private readonly moviePaginationSubject: BehaviorSubject<MoviePagination>;

  public constructor() {
    this.moviePaginationSubject = new BehaviorSubject<MoviePagination>(
      emptyMoviePagination,
    );
  }

  public get moviePagination$(): Observable<MoviePagination> {
    return this.moviePaginationSubject.asObservable();
  }

  public loadMovies(moviePagination: MoviePagination) {
    this.moviePaginationSubject.next(moviePagination);
  }
}

import { MovieList } from '../../../components/MovieList';
import { emptyMoviePagination, mockMoviePagination } from '../../../models';
import type { MoviePagination } from '../../../models';
import * as React from 'react';
import type { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

interface IMoviesModel {
  moviePagination$: Observable<MoviePagination>;
  loadMovies: (moviePagination: MoviePagination) => void;
}

interface IMoviesController {
  moviePagination$: Observable<MoviePagination>;
  loadMovies: () => void;
}

// Model Implementation
class MoviesModel implements IMoviesModel {
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

// Controller Implementation
class MoviesController implements IMoviesController {
  private readonly model: IMoviesModel;

  public constructor(model: IMoviesModel) {
    this.model = model;
  }

  public get moviePagination$(): Observable<MoviePagination> {
    return this.model.moviePagination$;
  }

  public loadMovies(): void {
    this.model.loadMovies(mockMoviePagination);
  }
}

// Custom Hook for RxJS subscription
function useObservable<T>(observable: Observable<T>, defaultValue: T): T {
  const [value, setValue] = React.useState<T>(defaultValue);

  React.useEffect(() => {
    const subscription = observable.subscribe(setValue);
    return () => {
      subscription.unsubscribe();
    };
  }, [observable]);

  return value;
}

export function MovieMagicMvcPattern() {
  const [controller] = React.useState(() => {
    const model = new MoviesModel();
    return new MoviesController(model);
  });

  React.useEffect(() => {
    controller.loadMovies();
  });

  const moviePagination = useObservable(
    controller.moviePagination$,
    emptyMoviePagination,
  );

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">Top 10 Movies Of All Time</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MovieList movies={moviePagination.movies} />
      </div>
    </div>
  );
}

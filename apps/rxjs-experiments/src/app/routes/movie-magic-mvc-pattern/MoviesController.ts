import type { IMoviesModel } from './MoviesModel';
import { mockMoviePagination } from '../../../models';
import type { MoviePagination } from '../../../models';
import type { Observable } from 'rxjs';

export interface IMoviesController {
  moviePagination$: Observable<MoviePagination>;
  loadMovies: () => void;
}

export class MoviesController implements IMoviesController {
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

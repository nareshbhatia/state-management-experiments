import type { Movie } from './Movie';
import { movies } from '../mocks/movies';

/**
 * Pagination information returned as the result of a list query
 */
export interface PaginationInfo {
  /** total number of pages */
  totalPages: number;

  /** total number of items */
  totalItems: number;

  /** current page number */
  page: number;

  /** number of items per page */
  perPage: number;

  /** when paginating forwards, are there more items? */
  hasNextPage: boolean;

  /** when paginating backwards, are there more items? */
  hasPreviousPage: boolean;
}

export interface MoviePagination {
  /** Array of movie objects */
  movies: Movie[];

  /** Information to aid in pagination */
  pageInfo: PaginationInfo;
}

export const emptyMoviePagination: MoviePagination = {
  movies: [],
  pageInfo: {
    totalPages: 0,
    totalItems: 0,
    page: 0,
    perPage: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

export const mockMoviePagination: MoviePagination = {
  movies,
  pageInfo: {
    totalPages: 1,
    totalItems: 13,
    page: 1,
    perPage: 20,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

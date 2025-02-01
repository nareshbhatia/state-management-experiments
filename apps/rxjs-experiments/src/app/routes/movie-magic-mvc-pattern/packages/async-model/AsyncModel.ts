export interface AsyncModelNotStarted {
  status: 'not-started';
}

export interface AsyncModelLoading {
  status: 'loading';
}

export interface AsyncModelError {
  status: 'error';
  error: unknown;
}

export interface AsyncModelLoaded<T> {
  status: 'loaded';
  data: T;
}

export type AsyncModel<T> =
  | AsyncModelError
  | AsyncModelLoaded<T>
  | AsyncModelLoading
  | AsyncModelNotStarted;

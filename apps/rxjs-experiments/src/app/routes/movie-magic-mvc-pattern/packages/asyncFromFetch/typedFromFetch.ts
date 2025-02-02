import type { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

class NetworkError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

class ApiError extends Error {
  public constructor(
    message: string,
    public statusCode: number,
    public body?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Fetches data from a given URL and returns an Observable that emits the fetched data.
 * The errors are handled and returned as type ApiError, NetworkError or Error.
 *
 * Note: This function is a wrapper around RxJS fromFetch().
 *
 * @param input - The URL to fetch data from or a Request object.
 * @param init - Optional RequestInit options for the fetch request.
 * @returns An Observable that emits the fetched data or Error.
 */
export function typedFromFetch<T>(
  input: Request | string,
  init?: RequestInit,
): Observable<T> {
  return fromFetch(input, {
    ...init,
    selector: async (response) => {
      if (!response.ok) throw response;
      return response.json();
    },
  }).pipe(
    catchError((error) => {
      if (error instanceof TypeError) {
        throw new NetworkError('Network request failed');
      }
      if (error instanceof Response) {
        throw new ApiError(`HTTP error: ${error.statusText}`, error.status);
      }
      throw new Error('Unexpected error during fetch');
    }),
  );
}

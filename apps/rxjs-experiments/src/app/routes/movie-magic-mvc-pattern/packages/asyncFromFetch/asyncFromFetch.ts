import type { AsyncModel } from './AsyncModel';
import { typedFromFetch } from './typedFromFetch';
import type { Observable } from 'rxjs';
import { from, map, catchError, startWith } from 'rxjs';

/**
 * Fetches data from a given URL and returns an Observable that emits the fetched data
 * as an AsyncModel. Also the errors are returned as an AsyncModel with the status 'error'
 * and an error of type Error.
 *
 * Note: This function is a wrapper around typedFromFetch().
 *
 * @param input - The URL to fetch data from or a Request object.
 * @param init - Optional RequestInit options for the fetch request.
 * @returns An Observable that emits an AsyncModel with the fetched data or Error.
 */
export function asyncFromFetch<T>(
  input: Request | string,
  init?: RequestInit,
): Observable<AsyncModel<T>> {
  return typedFromFetch(input, init).pipe(
    map((data) => ({ status: 'loaded', data }) as AsyncModel<T>),
    catchError((error: Error) =>
      from([{ status: 'error', error } as AsyncModel<T>]),
    ),
    startWith({ status: 'loading' }),
  );
}

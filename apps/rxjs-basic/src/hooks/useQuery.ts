import { useObservable, useObservableState } from 'observable-hooks';
import { switchMap, catchError, startWith, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

/**
 * useQuery is a custom hook that handles data fetching with built-in loading and error states,
 * similar to libraries like React Query, but implemented using RxJS.
 *
 * @link https://github.com/crimx/observable-hooks/discussions/134
 *
 * @param url - The URL to fetch data from.
 * @returns An object containing the fetched data, error, and loading state.
 */
export function useQuery<T>(url: string) {
  // Create an observable stream using useObservable
  const result$ = useObservable(
    (inputs$) =>
      inputs$.pipe(
        // switchMap auto-cancels the last sub-flow so you don't get stale responses.
        switchMap(([url]) =>
          fromFetch(url).pipe(
            switchMap(async (response) => {
              if (response.ok) {
                const data = (await response.json()) as T;
                return { data, isLoading: false };
              }
              return {
                error: `Error ${response.status}`,
                isLoading: false,
              };
            }),
            // catch error in sub-flow so that error won't kill the main flow
            catchError((err: Error) =>
              of({ error: err.message, isLoading: false }),
            ),
          ),
        ),
        // Immediately emits a loading state before the request begins
        startWith({ isLoading: true }),
      ),
    [url],
  );

  // return isLoading as true if result$ is undefined
  return (
    useObservableState<{
      data?: T;
      error?: string;
      isLoading: boolean;
    }>(result$) ?? { isLoading: true }
  );
}

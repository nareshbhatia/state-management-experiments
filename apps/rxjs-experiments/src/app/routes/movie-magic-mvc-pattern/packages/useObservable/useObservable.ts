import * as React from 'react';
import type { Observable } from 'rxjs';

/**
 * Custom hook to get the latest value from an observable. The returned value
 * changes whenever the observable emits a new value.
 *
 * @param observable$ the observable to observe
 * @param defaultValue initial value until the observable emits
 * @returns observable's latest value
 */
export function useObservable<T>(
  observable$: Observable<T>,
  defaultValue: T,
): T {
  // State to maintain the latest vaalue emitted by the observable
  const [value, setValue] = React.useState<T>(defaultValue);

  /*
   * Subscribe to the observable when the component mounts. Note that we are
   * passing in the setValue function as the observer (this is the short form
   * of an observer).
   *
   * Note: The dependency array contains observable$, which mean that the effect
   * is rerun whenever the observable reference changes. However this reference
   * is not expected to change normally. Changes to the returned value are
   * trigerred through setValue whenever the observable's value changes.
   */
  React.useEffect(() => {
    const subscription = observable$.subscribe(setValue);

    // Unsubscribe when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, [observable$]);

  return value;
}

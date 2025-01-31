import * as React from 'react';
import type { Observable } from 'rxjs';

export function useObservable<T>(
  observable: Observable<T>,
  defaultValue: T,
): T {
  const [value, setValue] = React.useState<T>(defaultValue);

  React.useEffect(() => {
    const subscription = observable.subscribe(setValue);
    return () => {
      subscription.unsubscribe();
    };
  }, [observable]);

  return value;
}

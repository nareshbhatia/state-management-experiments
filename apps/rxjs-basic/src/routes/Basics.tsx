import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export function Basics() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Create an Observable that generates 2 values whenever an Observer subscribes to it
    const observable$ = new Observable<string>((subscriber) => {
      subscriber.next('Alice');
      subscriber.next('Ben');
      subscriber.complete();
    });

    // Create an observer that appends observed values to the messages array
    const observer = {
      next: (value: string) => {
        setMessages((prev) => [...prev, value]);
      },
      error: (error: unknown) => {
        console.error(error);
      },
      complete: () => {
        console.log('Observable completed');
      },
    };

    /*
     * Connect the observer to the observable through a subscription.
     * This will start the observable emitting values.
     */
    const subscription = observable$.subscribe(observer);

    return () => {
      setMessages([]);
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="container relative mx-auto max-w-screen-xl px-8 py-4">
      <ul>
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

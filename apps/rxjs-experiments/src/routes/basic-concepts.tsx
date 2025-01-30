import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

export function BasicConcepts() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    /*
     * Create an Observable that generates 3 values whenever an Observer subscribes to it.
     * The callback expects a subscriber and sends notifications to it using subscriber.next() method.
     */
    const observable$ = new Observable<string>((subscriber) => {
      subscriber.next('Alice');
      subscriber.next('Ben');
      subscriber.next('Charlie');
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
     * Call the observale's subscribe method to create a subscription, pass the observer as an argument.
     * This starts executing the observable.
     */
    const subscription = observable$.subscribe(observer);

    // Teardown function to clean up the subscription.
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

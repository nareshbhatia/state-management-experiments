import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { fromEvent, map, tap } from 'rxjs';

interface ClickEvent {
  timestamp: number;
  x: number;
  y: number;
  button: number;
  type: string;
}

export function MouseClickTracker() {
  const [clicks, setClicks] = useState<ClickEvent[]>([]);

  useEffect(() => {
    // Create an observable from mouse click events
    const subscription = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        map((event) => ({
          timestamp: Date.now(),
          x: event.clientX,
          y: event.clientY,
          button: event.button,
          type: event.type,
        })),
        tap((clickEvent) => {
          setClicks((prevClicks) => [clickEvent, ...prevClicks].slice(0, 5));
        }),
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Mouse Click Stream</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-gray-500">
            Click anywhere to see event details (showing last 5 clicks)
          </div>
          {clicks.length === 0 ? (
            <div className="italic text-gray-400">No clicks recorded yet</div>
          ) : (
            <div className="space-y-2">
              {clicks.map((click) => (
                <div
                  className="rounded-lg bg-gray-100 p-3"
                  key={click.timestamp}
                >
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Timestamp:</div>
                    <div>{new Date(click.timestamp).toLocaleTimeString()}</div>
                    <div>Position:</div>
                    <div>
                      x: {click.x}, y: {click.y}
                    </div>
                    <div>Button:</div>
                    <div>
                      {click.button === 0
                        ? 'Left'
                        : click.button === 1
                          ? 'Middle'
                          : 'Right'}
                    </div>
                    <div>Event Type:</div>
                    <div>{click.type}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

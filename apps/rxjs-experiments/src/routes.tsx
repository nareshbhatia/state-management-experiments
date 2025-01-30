import { BasicConcepts } from './routes/basic-concepts';
import { HomePage } from './routes/home';
import { MouseClickTracker } from './routes/mouse-click-tracker';
import { MovieMagicObservableHooks } from './routes/movie-magic-observable-hooks';
import { MovieMagicReactState } from './routes/movie-magic-react-state';
import { RootLayout } from './routes/root';
import type { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/basic-concepts',
        element: <BasicConcepts />,
      },
      {
        path: '/mouse-click-tracker',
        element: <MouseClickTracker />,
      },
      {
        path: '/movie-magic-react-state',
        element: <MovieMagicReactState />,
      },
      {
        path: '/movie-magic-observable-hooks',
        element: <MovieMagicObservableHooks />,
      },
    ],
  },
];

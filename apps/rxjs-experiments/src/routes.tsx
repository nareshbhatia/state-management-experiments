import { RootLayout } from './app/root';
import { BasicConcepts } from './app/routes/basic-concepts/route';
import { HomePage } from './app/routes/home/route';
import { MouseClickTracker } from './app/routes/mouse-click-tracker/route';
import { MovieMagicMvcPattern } from './app/routes/movie-magic-mvc-pattern/route';
import { MovieMagicObservableHooks } from './app/routes/movie-magic-observable-hooks/route';
import { MovieMagicReactState } from './app/routes/movie-magic-react-state/route';
import { RoutePath } from './utils/RoutePath';
import type { RouteObject } from 'react-router';

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: RoutePath.Home,
        element: <HomePage />,
      },
      {
        path: RoutePath.BasicConcepts,
        element: <BasicConcepts />,
      },
      {
        path: RoutePath.MouseClickTracker,
        element: <MouseClickTracker />,
      },
      {
        path: RoutePath.MovieMagicReactState,
        element: <MovieMagicReactState />,
      },
      {
        path: RoutePath.MovieMagicObservableHooks,
        element: <MovieMagicObservableHooks />,
      },
      {
        path: RoutePath.MovieMagicMvcPattern,
        element: <MovieMagicMvcPattern />,
      },
    ],
  },
];

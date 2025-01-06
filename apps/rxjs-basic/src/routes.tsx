import { Basics } from './routes/Basics';
import { HomePage } from './routes/home';
import { MouseClickTracker } from './routes/mouse-click-tracker';
import { MovieMagic } from './routes/movie-magic';
import { RootLayout } from './routes/root';
import type { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/basics',
        element: <Basics />,
      },
      {
        path: '/mouse-click-tracker',
        element: <MouseClickTracker />,
      },
      {
        path: '/movie-magic',
        element: <MovieMagic />,
      },
    ],
  },
];

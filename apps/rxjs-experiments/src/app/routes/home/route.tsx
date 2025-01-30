import { RoutePath } from '@/utils/RoutePath';
import { Link } from 'react-router';

export function HomePage() {
  return (
    <div className="container relative mx-auto max-w-screen-xl px-8 py-4">
      <ul className="divide-y">
        <li className="flex flex-col py-5">
          <Link className="text-blue-600" to={RoutePath.BasicConcepts}>
            Basic Concepts
          </Link>
        </li>
        <li className="flex flex-col py-5">
          <Link className="text-blue-600" to={RoutePath.MouseClickTracker}>
            Mouse Click Tracker
          </Link>
        </li>
        <li className="flex flex-col py-5">
          <Link className="text-blue-600" to={RoutePath.MovieMagicReactState}>
            Movie Magic (http fetch + React state)
          </Link>
        </li>
        <li className="flex flex-col py-5">
          <Link
            className="text-blue-600"
            to={RoutePath.MovieMagicObservableHooks}
          >
            Movie Magic (http fetch + Observable Hooks)
          </Link>
        </li>
      </ul>
    </div>
  );
}

import { Link } from 'react-router';

export function HomePage() {
  return (
    <div className="container relative mx-auto max-w-screen-xl px-8 py-4">
      <ul className="divide-y">
        <li className="flex flex-col py-5">
          <Link className="text-blue-600" to="/basic-concepts">
            Basic Concepts
          </Link>
        </li>
        <li className="flex flex-col py-5">
          <Link className="text-blue-600" to="/mouse-click-tracker">
            Mouse Click Tracker
          </Link>
        </li>
        <li className="flex flex-col py-5">
          <Link className="text-blue-600" to="/movie-magic-react-state">
            Movie Magic (http fetch + React state)
          </Link>
        </li>
        <li className="flex flex-col py-5">
          <Link className="text-blue-600" to="/movie-magic-observable-hooks">
            Movie Magic (http fetch + Observable Hooks)
          </Link>
        </li>
      </ul>
    </div>
  );
}

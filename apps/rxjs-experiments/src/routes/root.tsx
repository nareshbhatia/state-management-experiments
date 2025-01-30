import { AppHeader } from '@/components/AppHeader';
import { Outlet } from 'react-router';

export function RootLayout() {
  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
}

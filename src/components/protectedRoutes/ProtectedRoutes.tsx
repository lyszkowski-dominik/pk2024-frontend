import { Outlet } from 'react-router-dom';
import RequireAuth from './RequireAuth';

/**
 * The `ProtectedRoutes` component renders its children within an `RequireAuth` component to enforce
 * authentication.
 * @returns The `ProtectedRoutes` component is being returned, which contains a `RequireAuth` component
 * wrapping an `Outlet` component.
 */
const ProtectedRoutes = () => {
  return (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  );
};

export default ProtectedRoutes;

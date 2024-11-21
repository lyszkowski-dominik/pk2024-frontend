import { useAppSelector } from '../../app/hooks';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import OwnerRequests from '../../components/requests/OwnerRequests';
import ManagerRequests from '../../components/requests/ManagerRequests';
import { UserRole } from '../../types/types';

/**
 *
 * @returns {React.FunctionComponent} The `Requests` component is a functional component that displays a list of requests.
 */
const Requests = () => {
  const userRole = useAppSelector(selectRoles);
  const isOwner = userRole === UserRole.Owner;

  if (isOwner) {
    return <OwnerRequests />;
  }
  return <ManagerRequests />;
};

export default Requests;

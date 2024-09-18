import { useAppSelector } from '../../app/hooks';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import OwnerRequests from '../../components/requests/OwnerRequests';
import ManagerRequests from '../../components/requests/ManagerRequests';

const Requests = () => {
  const userRole = useAppSelector(selectRoles);
  const isOwner = userRole === 'owner';

  if (isOwner) {
    return <OwnerRequests />;
  }
  return <ManagerRequests />;
};

export default Requests;

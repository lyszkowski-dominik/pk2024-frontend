import styles from './HomePage.module.scss';
import Spinner from '../components/ui/spinner/Spinner';
import { useGetUserDataQuery } from '../components/userProfile/userDataApiSlice';
import MainLayout from '../components/layout/mainLayout/MainLayout';

/**
 * The `HomePage` component in TypeScript React fetches user data and displays a welcome message or a
 * spinner based on the loading state.
 * @returns {JSX.Element} The HomePage component is being returned. Inside the component, it checks for userData and
 * displays a welcome message if userData is not available. It also displays a Spinner component when
 * the data is loading. The component is wrapped in a MainLayout component.
 */
const HomePage = () => {
  const {
    data: userData,
    isError,
    isLoading,
    isSuccess,
  } = useGetUserDataQuery();

  return (
    <MainLayout>
      {!userData && <h1>Witaj w aplikacji E-Wspólnota</h1>}
      {isLoading && <Spinner />}
    </MainLayout>
  );
};

export default HomePage;

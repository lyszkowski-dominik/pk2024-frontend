import styles from './HomePage.module.scss';
import Spinner from '../components/ui/spinner/Spinner';
import { useGetUserDataQuery } from '../components/userProfile/userDataApiSlice';
import MainLayout from '../components/layout/mainLayout/MainLayout';

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

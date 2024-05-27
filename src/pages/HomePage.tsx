import styles from './HomePage.module.scss';
import Spinner from '../components/ui/spinner/Spinner';
import { useGetUserDataQuery } from '../components/userProfile/userDataApiSlice';

const HomePage = () => {
  const {
    data: userData,
    isError,
    isLoading,
    isSuccess,
  } = useGetUserDataQuery();

  return (
    <div className={styles.container}>
      {!userData && <h1>Witaj w aplikacji E-Wspólnota</h1>}
      {isLoading && <Spinner />}
    </div>
  );
};

export default HomePage;

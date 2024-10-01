import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/ui/spinner/Spinner';
import styles from './CommunityPage.module.scss';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { useGetNotifications } from '../../features/notifications/useGetNotifications';
/**
 *
 * @returns {React.FunctionComponent} The `CommunityPage` component is a functional component that displays the details of a community.
 */
const CommunityPage = () => {
  const hoaID = useAppSelector(selectSelectedCommunity) || -1;

  const {
    isLoading,
    data,
    error,
    refetch: refreshPage,
  } = useGetNotifications({
    hoaID,
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    refreshPage();
  }, [data, hoaID, refreshPage]);

  if (isLoading) return <Spinner />;
  if (error) return <div>Błąd ładowania danych</div>;

  return (
    <div className={styles.propertiesContainer}>
      <h1>Aktualności</h1>
      {data?.results?.map((notification: any) => (
        <div key={notification.id} className={styles.notification}>
          <h2>{notification.message}</h2>
          <div className={styles.header}>
            <small>{new Date(notification.created_at).toLocaleString()}</small>
            {notification.link && (
              <p>
                <Link to={notification.link}>Więcej &gt;&gt;&gt;</Link>
              </p>
            )}
          </div>
          <hr />
          <p>{notification.description}</p>
        </div>
      ))}
      <div className={styles.more_info}>
        <Link to={'notifications'}>Więcej aktualności</Link>
      </div>
    </div>
  );
};

export default CommunityPage;

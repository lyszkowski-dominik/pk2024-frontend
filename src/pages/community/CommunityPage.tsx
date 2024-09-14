import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetCommunityByIdQuery } from '../../app/slices/communitiesDataApiSlice';
import Spinner from '../../components/ui/spinner/Spinner';
import { CommunityModule } from '../../types/communityTypes';
import useCommunitySidebar from './useCommunitySidebar';
import Properties from '../../components/property/Properties';
import styles from './CommunityPage.module.scss';
import Owners from '../../components/Owners/Owners';
import MainLayout from '../../components/layout/mainLayout/MainLayout';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../app/slices/sharedDataSlice';
import { useGetNotifications } from '../../hooks/useGetNotifications';

const CommunityPage = () => {
  // const { communityID } = useParams<{ communityID: string }>();
  const hoaID = useAppSelector(selectSelectedCommunity) || -1;
  // const {
  //   data: community,
  //   isLoading,
  //   isError,
  // } = useGetCommunityByIdQuery(communityID || -1);

  const {
    isLoading,
    data,
    error,
    refetch: refreshPage,
    isFetching,
  } = useGetNotifications({
    hoaID,
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    refreshPage();
  }, [data, hoaID, refreshPage]);

  // const [moduleLoaded, setModuleLoaded] = useState<CommunityModule>(
  //   CommunityModule.Owners
  // );

  // useCommunitySidebar(setModuleLoaded);

  if (isLoading) return <Spinner />;
  if (error) return <div>Błąd ładowania danych</div>;
  // if (isError) return <div>Błąd ładowania wspólnot mieszkaniowych</div>;
  // if (!community) return <div>Nie znaleziono wspólnot mieszkaniowych</div>;

  // const renderComponent = () => {
  //   switch (moduleLoaded) {
  //     case CommunityModule.Properties:
  //       return <Properties />;
  //     case CommunityModule.Owners:
  //       return <Owners key="owner" type={'owner'} />;
  //     case CommunityModule.Managers:
  //       return <Owners key="manager" type={'manager'} />;
  //     default:
  //       return (
  //         <div className={styles.info}>
  //           <h1>{community.name}</h1>
  //           {community.address && <div>{community.address}</div>}
  //           <div>{community.contact_info}</div>
  //         </div>
  //       );
  //   }
  // };
  console.log(data);
  return (
    <div className={styles.propertiesContainer}>
      <h1>Aktualności</h1>
      {/* <div className={styles.container}> */}
        {data?.results?.map((notification: any) => (
          <div className={styles.notification}>
              <h2>{notification.message}</h2>
              <div className={styles.header}>
              <small>{new Date(notification.created_at).toLocaleString()}</small>
            {notification.link && <p><Link to={notification.link}>Więcej &gt;&gt;&gt;</Link></p>}
                </div>
            <hr />
            <p>{notification.description}</p>
          </div>
        ))}
        <div className={styles.more_info}>
          <Link to={'notifications'}>Więcej aktualnosci</Link>
        </div>
      {/* </div> */}
    </div>
  );
};

export default CommunityPage;

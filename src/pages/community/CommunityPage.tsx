import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCommunityByIdQuery } from '../../app/slices/communitiesDataApiSlice';
import Spinner from '../../components/ui/spinner/Spinner';
import { CommunityModule } from '../../types/communityTypes';
import useCommunitySidebar from './useCommunitySidebar';
import Properties from '../../components/property/Properties';
import styles from './CommunityPage.module.scss';
import Owners from '../../components/Owners/Owners';

const CommunityPage = () => {
  const { communityID } = useParams<{ communityID: string }>();

  const {
    data: community,
    isLoading,
    isError
  } = useGetCommunityByIdQuery(parseInt(communityID || '', 10));

  const [moduleLoaded, setModuleLoaded] = useState<CommunityModule>(
    CommunityModule.Owners
  );

  useCommunitySidebar(setModuleLoaded);

  if (isLoading) return <Spinner />;
  if (isError) return <div>Błąd ładowania wspólnot mieszkaniowych</div>;
  if (!community) return <div>Nie znaleziono wspólnot mieszkaniowych</div>;

  const renderComponent = () => {
    switch (moduleLoaded) {
      case CommunityModule.Properties:
        return <Properties />;
      case CommunityModule.Owners:
        return <Owners key="owner" type={'owner'} />;
      case CommunityModule.Managers:
        return <Owners key="manager" type={'manager'} />;
      default:
        return (
          <div className={styles.info}>
            <h1>{community.name}</h1>
            {community.address && <div>{community.address}</div>}
            <div>{community.contact_info}</div>
          </div>
        );
    }
  };

  return <>{renderComponent()}</>;
};

export default CommunityPage;

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCommunityByIdQuery } from '../../app/slices/communitiesDataApiSlice';
import Spinner from '../../components/ui/spinner/Spinner';
import { CommunityModule } from '../../types/communityTypes';
import useCommunitySidebar from './useCommunitySidebar';
import Properties from '../../components/property/Properties';

const CommunityPage = () => {
  const { communityID } = useParams<{ communityID: string }>();

  const {
    data: community,
    isLoading,
    isError,
  } = useGetCommunityByIdQuery(parseInt(communityID || '', 10));

  const [moduleLoaded, setModuleLoaded] = useState<CommunityModule>(
    CommunityModule.Properties,
  );

  useCommunitySidebar(setModuleLoaded);

  if (isLoading) return <Spinner />;
  if (isError) return <div>Błąd ładowania wspólnot mieszkaniowych</div>;
  if (!community) return <div>Nie znaleziono wspólnot mieszkaniowych</div>;

  const renderComponent = () => {
    switch (moduleLoaded) {
      case CommunityModule.Properties:
        return <Properties />;
      default:
        return (
          <div>
            <h1>{community.name}</h1>
            <p>Adres: {community.address}</p>
            <p>E-mail: {community.contact_info}</p>
          </div>
        );
    }
  };

  return <>{renderComponent()}</>;
};

export default CommunityPage;

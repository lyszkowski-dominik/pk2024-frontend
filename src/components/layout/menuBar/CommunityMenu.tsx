import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useLocation, useNavigate } from 'react-router';
import { selectLogInStatus } from '../../loginForm/loginFormSlice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { setSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import { useGetCommunities } from '../../../features/communities/useGetCommunities';
import styles from './Menu.module.scss';
import type { Community } from '../../../features/communities/communityTypes';
import { Select, MenuItem } from '@mui/material';

/**
 *
 * @returns {JSX.Element} The `CommunityMenu` component returns a dropdown menu for selecting a community.
 */
const CommunityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useAppSelector(selectLogInStatus);
  const [selectedCommunity, setSelectedCommunityState] = useState<string>('');

  const {
    data: communitiesData,
    isLoading,
    isError
  } = useGetCommunities(isLoggedIn);

  useEffect(() => {
    if (
      isLoggedIn &&
      communitiesData &&
      selectedCommunity === '' &&
      location.pathname === '/'
    ) {
      const communityId = communitiesData.results[0].id.toString();
      setSelectedCommunityState(communityId);
      dispatch(setSelectedCommunity(parseInt(communityId)));
      navigate(`/hoa/${communityId}`);
    }else if (location.pathname.includes('user-profile')){
      const path = window.location.pathname;
      const pathParts = path.split('/');
      const communityId = pathParts[pathParts.indexOf('hoa') + 1];
      // const communityId = communitiesData.results[0].id.toString();
      setSelectedCommunityState(communityId);
      dispatch(setSelectedCommunity(parseInt(communityId)));
    }
    else if (location.pathname !== '/') {
      const path = window.location.pathname;
      const pathParts = path.split('/');
      const communityId = pathParts[pathParts.indexOf('hoa') + 1];
      setSelectedCommunityState(communityId);
      dispatch(setSelectedCommunity(parseInt(communityId)));
    }
  }, [
    communitiesData,
    dispatch,
    navigate,
    isLoggedIn,
    location.pathname,
    selectedCommunity
  ]);

  const handleCommunityChange = (selectedOption: any) => {
    const communityId = selectedOption?.value;
    setSelectedCommunityState(communityId);
    dispatch(setSelectedCommunity(parseInt(communityId)));
    navigate(`/hoa/${communityId}`);
  };

  const communityOptions = communitiesData?.results.map(
    (community: Community) => ({
      value: community.id,
      label: community.name
    })
  );

  const haveManyOptions = (communityOptions?.length || 0) > 1;

  return (
    <div style={{ position: 'relative' }}>
      {!haveManyOptions && (
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={styles['menu-button']}
        >
          {
            communityOptions?.find(
              (option: any) => option.value === parseInt(selectedCommunity)
            )?.label
          }
          {haveManyOptions && <ExpandMoreIcon />}
        </button>
      )}
      {haveManyOptions && (
        <Select
          sx={{ height: '50px' }}
          value={selectedCommunity}
          onChange={(event) => {
            const communityId = event.target.value as string;
            setSelectedCommunityState(communityId);
            dispatch(setSelectedCommunity(parseInt(communityId)));
            navigate(`/hoa/${communityId}`);
            setIsOpen(false);
          }}
          className={styles['menu-button']}
        >
          {communityOptions?.map((community: any) => (
            <MenuItem key={community.value} value={community.value}>
              {community.label}
            </MenuItem>
          ))}
        </Select>
      )}
    </div>
  );
};

export default CommunityMenu;

import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import styles from './Sidebar.module.scss';
import { useSidebar } from './SidebarProvider';
import { selectLogInStatus } from '../../loginForm/loginFormSlice';
import { useGetCommunitiesQuery } from '../../../app/slices/communitiesDataApiSlice';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { setSelectedCommunity } from '../../../app/slices/sharedDataSlice';
import Spinner from '../../ui/spinner/Spinner';
import Icon from '../../ui/icon/Icon';

export interface ISidebarElement {
  title: string;
  onClick?: () => void;
}

const Sidebar = () => {
  const { elements } = useSidebar();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectLogInStatus);
  const [selectedCommunity, setSelectedCommunityState] = useState<string>('');

  const {
    data: communitiesData,
    isLoading,
    isError,
  } = useGetCommunitiesQuery(undefined, {
    skip: !isLoggedIn,
  });

  useEffect(() => {
    if (
      isLoggedIn &&
      communitiesData &&
      communitiesData.results.length === 1 &&
      (location.pathname === '/' || location.pathname.startsWith('/hoa'))
    ) {
      const communityId = communitiesData.results[0].id.toString();
      setSelectedCommunityState(communityId);
      dispatch(setSelectedCommunity(parseInt(communityId)));
      navigate(`/hoa/${communityId}`);
    }
  }, [communitiesData, dispatch, navigate, isLoggedIn, location.pathname]);

  const handleCommunityChange = (selectedOption: any) => {
    const communityId = selectedOption?.value;
    setSelectedCommunityState(communityId);
    dispatch(setSelectedCommunity(parseInt(communityId)));
    navigate(`/hoa/${communityId}`);
  };

  const communityOptions = communitiesData?.results.map((community) => ({
    value: community.id,
    label: community.name,
  }));

  const handleItemClick = (
    event: React.MouseEvent,
    index: number,
    element: {
      onClick?: () => void;
    },
  ) => {
    if (element.onClick) element.onClick();
    setActiveIndex(index);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Icon name={'logo'} size={150} />
      </div>
      {isLoggedIn &&
        (location.pathname === '/' || location.pathname.startsWith('/hoa')) && (
          <div className={styles.communityDropdown}>
            {isLoading && <Spinner />}
            {isError && (
              <div>Błąd podczas ładowania wspólnot mieszkaniowych</div>
            )}
            {communitiesData && (
              <Select
                value={communityOptions?.find(
                  (option) => option.value === parseInt(selectedCommunity),
                )}
                onChange={handleCommunityChange}
                options={communityOptions}
                placeholder="Wybierz wspólnotę"
                aria-label="Wspólnota mieszkaniowa"
              />
            )}
          </div>
        )}
      <ul>
        {elements.map((e, index) => (
          <li
            key={index}
            onClick={(event) => handleItemClick(event, index, e)}
            className={index === activeIndex ? styles.activeItem : ''}
          >
            {e.title}
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <p>Footer</p>
      </div>
    </div>
  );
};

export default Sidebar;

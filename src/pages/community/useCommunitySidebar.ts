import { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useSidebar } from '../../components/layout/sidebar/SidebarProvider';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import { CommunityModule } from '../../types/communityTypes';
import { UserRole } from '../../types/types';

const useCommunitySidebar = (
  setCurrentComponent: React.Dispatch<React.SetStateAction<CommunityModule>>,
) => {
  const { setElements } = useSidebar();
  const userRoles = useAppSelector(selectRoles);

  useEffect(() => {
    const elements = [
      {
        title: 'Lokale',
        onClick: () => setCurrentComponent(CommunityModule.Properties),
      },
      {
        title: 'Właściciele',
        onClick: () => setCurrentComponent(CommunityModule.Owners),
      },
      {
        title: 'Uchwały',
        onClick: () => setCurrentComponent(CommunityModule.Resolutions),
      },
      {
        title: 'Powiadomienia',
        onClick: () => setCurrentComponent(CommunityModule.Notifications),
      },
      {
        title: 'Kalendarz',
        onClick: () => setCurrentComponent(CommunityModule.Calendar),
      },
      {
        title: 'Zarządcy',
        onClick: () => setCurrentComponent(CommunityModule.Managers),
      },
    ];

    if (userRoles?.includes(UserRole.Owner)) {
      elements.push({
        title: 'Rachunki',
        onClick: () => setCurrentComponent(CommunityModule.Bills),
      });
    }
    setElements(elements);

    return () => setElements([]);
  }, [setCurrentComponent, setElements, userRoles]);
};

export default useCommunitySidebar;

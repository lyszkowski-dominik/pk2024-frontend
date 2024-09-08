import { useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useSidebar } from '../../components/layout/sidebar/SidebarProvider';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import { CommunityModule } from '../../types/communityTypes';
import { UserRole } from '../../types/types';

const useCommunitySidebar = (
  setCurrentComponent: React.Dispatch<React.SetStateAction<CommunityModule>>
) => {
  const { setElements, setActiveItem } = useSidebar();
  const userRoles = useAppSelector(selectRoles);

  useEffect(() => {
    const elements = [
      {
        title: 'Lokale',
        onClick: () => {
          setCurrentComponent(CommunityModule.Properties);
          setActiveItem('Lokale');
        }
      },
      {
        title: 'Właściciele',
        onClick: () => {
          setCurrentComponent(CommunityModule.Owners);
          setActiveItem('Właściciele');
        }
      },
      {
        title: 'Uchwały',
        onClick: () => {
          setCurrentComponent(CommunityModule.Resolutions);
          setActiveItem('Uchwały');
        }
      },
      {
        title: 'Powiadomienia',
        onClick: () => {
          setCurrentComponent(CommunityModule.Notifications);
          setActiveItem('Powiadomienia');
        }
      },
      {
        title: 'Kalendarz',
        onClick: () => {
          setCurrentComponent(CommunityModule.Calendar);
          setActiveItem('Kalendarz');
        }
      },
      {
        title: 'Zarządcy',
        onClick: () => {
          setCurrentComponent(CommunityModule.Managers);
          setActiveItem('Zarządcy');
        }
      }
    ];

    if (userRoles?.includes(UserRole.Owner)) {
      elements.push({
        title: 'Rachunki',
        onClick: () => {
          setCurrentComponent(CommunityModule.Bills);
          setActiveItem('Rachunki');
        }
      });
    }
    setElements(elements);

    return () => setElements([]);
  }, [setCurrentComponent, setElements, userRoles, setActiveItem]);
};

export default useCommunitySidebar;

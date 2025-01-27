import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import type { ISidebarElement } from './Sidebar';
import { useAppSelector } from '../../../../app/hooks';
import { UserRole } from '../../../../types/types';
import { selectRoles } from '../../../loginForm/loginFormSlice';

/**
 * The `SidebarContextType` interface defines the structure of the sidebar context.
 * @property {ISidebarElement[]} elements - The `elements` property represents the sidebar elements.
 * @property {(elements: ISidebarElement[]) => void} setElements - The `setElements` property represents the function to set the sidebar elements.
 * @property {string} activeItem - The `activeItem` property represents the active sidebar element.
 * @property {(item: string) => void} setActiveItem - The `setActiveItem` property represents the function to set the active sidebar element.
 */
export interface SidebarContextType {
  elements: ISidebarElement[];
  setElements: (elements: ISidebarElement[]) => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const defaultSidebarValues: SidebarContextType = {
  elements: [
    {
      title: 'Strona główna',
      path: '',
    },
    {
      title: 'Lokale',
      path: 'properties',
    },
    {
      title: 'Uchwały',
      path: 'resolutions',
    },
    {
      title: 'Właściciele',
      path: 'owners',
    },
    {
      title: 'Powiadomienia',
      path: 'notifications',
    },
    // {
    //   title: 'Kalendarz',
    //   path: 'calendar',
    // },
    {
      title: 'Zarządcy',
      path: 'managers',
    },
    {
      title: 'Opłaty',
      path: 'charges',
    },
    {
      title: 'Zgłoszenia',
      path: 'requests',
    },
  ],
  setElements: () => { },
  activeItem: '',
  setActiveItem: () => { },
};

const SidebarContext = createContext(defaultSidebarValues);

export const useSidebar = () => useContext(SidebarContext);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const userRole = useAppSelector(selectRoles);
  const isManager = userRole === UserRole.Manager || userRole === UserRole.Admin;

  const [elements, setElements] = useState(defaultSidebarValues);

  useEffect(() => {
    if (isManager) {
      setElements({
        ...defaultSidebarValues,
        elements: [
          ...defaultSidebarValues.elements,
          {
            title: 'Stawki',
            path: 'rates',
          },
        ],
      });
    }
  }, [isManager]);
  // const [activeItem, setActiveItem] = useState('Właściciele');
  // const [elements, setElements] = useState<ISidebarElement[]>([]);

  return (
    <SidebarContext.Provider value={elements}>
      {children}
    </SidebarContext.Provider>
  );
};

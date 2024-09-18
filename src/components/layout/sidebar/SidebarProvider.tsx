import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import type { ISidebarElement } from './Sidebar';
import { useGetUserDataQuery } from '../../userProfile/userDataApiSlice';
import { useAppSelector } from '../../../app/hooks';
import { selectRoles } from '../../loginForm/loginFormSlice';

interface SidebarContextType {
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
      title: 'Rachunki',
      path: 'bills',
    },
     {
      title: 'Zapytania',
      path: 'requests',
    },
  ],
  setElements: () => {},
  activeItem: '',
  setActiveItem: () => {},
};

const SidebarContext = createContext(defaultSidebarValues);

export const useSidebar = () => useContext(SidebarContext);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  // const [activeItem, setActiveItem] = useState('Właściciele');
  // const [elements, setElements] = useState<ISidebarElement[]>([]);

  return (
    <SidebarContext.Provider value={defaultSidebarValues}>
      {children}
    </SidebarContext.Provider>
  );
};

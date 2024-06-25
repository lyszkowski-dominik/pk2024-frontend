import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import type { ISidebarElement } from './Sidebar';

interface SidebarContextType {
  elements: ISidebarElement[];
  setElements: (elements: ISidebarElement[]) => void;
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const defaultSidebarValues: SidebarContextType = {
  elements: [],
  setElements: () => {
  },
  activeItem: '',
  setActiveItem: () => {
  }
};

const SidebarContext = createContext(defaultSidebarValues);

export const useSidebar = () => useContext(SidebarContext);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
                                                                  children
                                                                }) => {
  const [activeItem, setActiveItem] = useState('Właściciele');
  const [elements, setElements] = useState<ISidebarElement[]>([]);

  return (
    <SidebarContext.Provider value={{ elements, setElements, activeItem, setActiveItem }}>
      {children}
    </SidebarContext.Provider>
  );
};

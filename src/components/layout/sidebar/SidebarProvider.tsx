import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import type { ISidebarElement } from './Sidebar';

interface SidebarContextType {
  elements: ISidebarElement[];
  setElements: (elements: ISidebarElement[]) => void;
}

const defaultSidebarValues: SidebarContextType = {
  elements: [],
  setElements: () => {},
};

const SidebarContext = createContext(defaultSidebarValues);

export const useSidebar = () => useContext(SidebarContext);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
}) => {
  const [elements, setElements] = useState<ISidebarElement[]>([]);

  return (
    <SidebarContext.Provider value={{ elements, setElements }}>
      {children}
    </SidebarContext.Provider>
  );
};

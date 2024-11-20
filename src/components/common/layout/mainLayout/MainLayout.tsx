import { Outlet } from 'react-router';
import Menu from '../menuBar/Menu';
import Sidebar from '../sidebar/Sidebar';
import { SidebarProvider } from '../sidebar/SidebarProvider';
import styles from './MainLayout.module.scss';

/**
 * The type `MainLayoutProps` defines props for the `MainLayout` component in TypeScript React.
 * @param {any} children - The `children` property in the `MainLayoutProps` type represents the child components or elements that will be rendered inside the `MainLayout` component.
 */
export type MainLayoutProps = {
  children?: any;
};

/**
 *
 * @param {MainLayoutProps} props
 * @returns {JSX.Element} The `MainLayout` component returns the main layout of the application.
 */
const MainLayout = (props: MainLayoutProps) => {
  return (
    <>
      <SidebarProvider>
        <div className={styles.container}>
          <Sidebar />
          <div className={styles.content}>
            <Menu />
            <main>
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
};

export default MainLayout;

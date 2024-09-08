import { Outlet } from 'react-router';
import Menu from '../menuBar/Menu';
import Sidebar from '../sidebar/Sidebar';
import { SidebarProvider } from '../sidebar/SidebarProvider';
import styles from './MainLayout.module.scss';
import { NotificationProvider } from '../../notifications/NotificationContext';

type MainLayoutProps = {
  children?: any;
};

const MainLayout = (props: MainLayoutProps) => {
  return (
    <NotificationProvider>
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
    </NotificationProvider>
  );
};

export default MainLayout;

import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import styles from './Sidebar.module.scss';
import { useSidebar } from './SidebarProvider';
import { selectLogInStatus } from '../../loginForm/loginFormSlice';
import { useGetCommunitiesQuery } from '../../../app/slices/communitiesDataApiSlice';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { selectSelectedCommunity, setSelectedCommunity } from '../../../app/slices/sharedDataSlice';
import Spinner from '../../ui/spinner/Spinner';
import Icon from '../../ui/icon/Icon';



export interface ISidebarElement {
  title: string;
  onClick?: () => void;
  path?: string;
}

const Sidebar = () => {
  const { elements } = useSidebar();
  const [activeItem, setActiveIndex] = useState<number>(0);

  // const location = useLocation();
  const navigate = useNavigate();
  const selectedCommunity = useAppSelector(selectSelectedCommunity);
  // const dispatch = useAppDispatch();
  // const isLoggedIn = useAppSelector(selectLogInStatus);
  useEffect(() => {
    const path = window.location.pathname; // /hoa/1
    const pathParts = path.split('/');
    try {
      const module = pathParts[pathParts.indexOf('hoa') + 2];
      const index = elements.findIndex((element) => element.path === module);
      setActiveIndex(index);
    } catch (err) { /* empty */ }
  })

  const handleItemClick = (
    event: React.MouseEvent,
    index: number,
    element:ISidebarElement
  ) => {
    setActiveIndex(index);
    navigate('/hoa/' + selectedCommunity + '/' + element.path);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Icon name={'logo'} size={100} />
      </div>
      <ul>
        {elements.map((e, index) => (
          <li
            key={index}
            onClick={(event) => handleItemClick(event, index, e)}
            className={index === activeItem ? styles.activeItem : ''}
          >
            {e.title}
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <p>Footer</p>
      </div>
    </aside>
  );
};

export default Sidebar;

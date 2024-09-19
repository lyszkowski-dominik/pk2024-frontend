import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/hooks';
import styles from './Sidebar.module.scss';
import { useSidebar } from './SidebarProvider';
import { selectRoles } from '../../loginForm/loginFormSlice';
import { useEffect, useState } from 'react';
import { selectSelectedCommunity } from '../../../app/slices/sharedDataSlice';
import Icon from '../../ui/icon/Icon';

/**
 * The `ISidebarElement` interface defines the structure of the sidebar element.
 * @property {string} title - The `title` property represents the title of the sidebar element.
 * @property {() => void} onClick - The `onClick` property represents the function to be executed when the sidebar element is clicked.
 * @property {string} path - The `path` property represents the path of the sidebar element.
 */
export interface ISidebarElement {
  title: string;
  onClick?: () => void;
  path?: string;
}

/**
 * 
 * @returns {JSX.Element} The `Sidebar` component returns the sidebar of the application.
 */
const Sidebar = () => {
  let { elements } = useSidebar();
  const [activeItem, setActiveIndex] = useState<number>(0);
  const selectedCommunity = useAppSelector(selectSelectedCommunity);
  const navigate = useNavigate();

  const userRoles = useAppSelector(selectRoles);
  if (userRoles === 'owner') {
    elements = elements.filter((element) => {
      return element.path !== 'owners';
    });
  }

  useEffect(() => {
    const path = window.location.pathname; // /hoa/1
    const pathParts = path.split('/');
    const module = pathParts[pathParts.indexOf('hoa') + 2];

    if (module === undefined) {
      setActiveIndex(0);
    } else {
      const index = elements.findIndex((element) => element.path === module);
      setActiveIndex(index);
    }
  });

  const handleItemClick = (
    event: React.MouseEvent,
    index: number,
    element: ISidebarElement,
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
      {/* <div className={styles.footer}>
        <p>Footer</p>
      </div> */}
    </aside>
  );
};

export default Sidebar;

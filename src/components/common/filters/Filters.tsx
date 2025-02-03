import { ReactNode } from 'react';
import styles from './Filters.module.scss';

type FiltersProps = {
  children: ReactNode;
  isVisible: boolean;
  toggleVisibility: () => void;
};

const Filters = ({ children, isVisible, toggleVisibility }: FiltersProps) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filtersToggle} onClick={toggleVisibility}>
        {isVisible ? '- Filtry' : '+ Filtry'}
      </div>
      {isVisible && <div className={styles.filtersContainer}>{children}</div>}
    </div>
  );
};

export default Filters;

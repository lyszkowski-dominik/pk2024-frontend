import React, { useState } from 'react';
import styles from './Accordion.module.scss';

const Accordion = ({
  title,
  children,
  defaultOpen = false,
  onChange,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  onChange?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    onChange && onChange();
  };

  return (
    <div className={styles.accordion}>
      <div className={styles['accordion-header']} onClick={toggleAccordion}>
        <h2 className={styles['accordion-title']}>{title}</h2>
        <button className={styles['accordion-toggle']}>
          {isOpen ? '-' : '+'}
        </button>
      </div>
      {isOpen && <div className={styles['accordion-content']}>{children}</div>}
    </div>
  );
};

export default Accordion;

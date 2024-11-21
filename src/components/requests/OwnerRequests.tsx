import { useState } from 'react';

import styles from './ManagerRequests.module.scss';
import IconButton from '../ui/iconButton/IconButton';
import Modal from '../ui/modal/Modal';
import AddRequestForm from './AddRequestForm';
import RequestsList from './RequestsList';

const OwnerRequests = () => {
  const [isModalOn, setModalOn] = useState(false);

  return (
    <>
      {isModalOn && (
        <Modal>
          <AddRequestForm onClose={() => setModalOn(false)} />
        </Modal>
      )}
      <div className={styles.iconButtons}>
        <IconButton
          iconName="add"
          onClick={() => {
            setModalOn(true);
          }}
          altText="Add Request"
          size={24}
          color="var(--pink)"
        />
      </div>
      <RequestsList />
    </>
  );
};

export default OwnerRequests;

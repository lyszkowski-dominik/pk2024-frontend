import { useState } from 'react';
import styles from './Properties.module.scss';
import PropertiesList from './PropertiesList';
import IconButton from '../ui/iconButton/IconButton';
import AddPropertyForm from './AddPropertyForm';
import Modal from '../ui/modal/Modal';
import { ModalType } from './types';

const Properties = () => {
  const [openModal, setOpenModal] = useState({});
  const [isModalOn, setModalOn] = useState(false);

  const handleImportClick = () => {
    console.log('Import clicked');
  };

  const handleExportClick = () => {
    console.log('Export clicked');
  };

  return (
    <div className={styles.propertiesContainer}>
      {isModalOn && (
        <Modal>
          {openModal === ModalType.Add && (
            <AddPropertyForm isModalOn={setModalOn} />
          )}
        </Modal>
      )}
      <div className={styles.iconButtons}>
        <IconButton
          iconName="add"
          onClick={() => {
            setOpenModal(ModalType.Add);
            setModalOn(true);
          }}
          altText="Add Property"
          size={24}
          color="var(--pink)"
        />
        <IconButton
          iconName="import"
          onClick={handleImportClick}
          altText="Import Properties"
          size={24}
          color="var(--pink)"
        />
        <IconButton
          iconName="export"
          onClick={handleExportClick}
          altText="Export Properties"
          size={24}
          color="var(--pink)"
        />
      </div>
      <PropertiesList />
    </div>
  );
};

export default Properties;

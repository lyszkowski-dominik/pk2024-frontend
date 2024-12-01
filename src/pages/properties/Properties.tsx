import { useState } from 'react';
import styles from './Properties.module.scss';
import PropertiesList from '../../components/property/PropertiesList';
import IconButton from '../../components/ui/iconButton/IconButton';
import AddPropertyForm from '../../components/property/AddPropertyForm';
import Modal from '../../components/ui/modal/Modal';
import { ModalType } from '../../components/property/types';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { selectRoles } from '../../components/loginForm/loginFormSlice';

/**
 *
 * @returns {JSX.Element} The `Properties` component returns a list of properties.
 */
const Properties = () => {
  const [openModal, setOpenModal] = useState({});
  const [isModalOn, setModalOn] = useState(false);
  const selectedCommunityId = useAppSelector(selectSelectedCommunity);
  const role = useAppSelector(selectRoles);
  const isManager = role === 'manager';

  if (!selectedCommunityId) {
    return <div>No community selected</div>;
  }

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
            <AddPropertyForm onClose={() => setModalOn(false)} />
          )}
        </Modal>
      )}
      {isManager && (
        <div className={styles.iconButtons}>
          <IconButton
            iconName="add"
            onClick={() => {
              setOpenModal(ModalType.Add);
              setModalOn(true);
            }}
            altText="Dodaj lokal"
          />
          <IconButton
            iconName="import"
            onClick={handleImportClick}
            altText="Importuj lokale"
          />
          <IconButton
            iconName="export"
            onClick={handleExportClick}
            altText="Eksportuj lokale"
          />
        </div>
      )}
      <PropertiesList hoaId={selectedCommunityId} />
    </div>
  );
};

export default Properties;

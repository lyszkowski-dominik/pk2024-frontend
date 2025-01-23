import { useState } from 'react';
import styles from './Properties.module.scss';
import PropertiesList from '../../components/property/PropertiesList';
import IconButton from '../../components/ui/iconButton/IconButton';
import Modal from '../../components/ui/modal/Modal';
import { ModalType } from '../../components/property/types';
import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import { UserRole } from '../../types/types';
import PropertyForm from '../../components/property/PropertyForm';
import { downloadFile } from '../../utils/downloadFile';
import FileUploadForm from '../../components/common/forms/fileUploadForm/FileUploadForm';
import { propertiesQueryKeys } from '../../features/properties/propertiesTypes';

/**
 *
 * @returns {JSX.Element} The `Properties` component returns a list of properties.
 */
const Properties = () => {
  const [openModal, setOpenModal] = useState({});
  const [isModalOn, setModalOn] = useState(false);
  const selectedCommunityId = useAppSelector(selectSelectedCommunity);
  const role = useAppSelector(selectRoles);
  const isManager = role === UserRole.Manager;

  if (!selectedCommunityId) {
    return <div>No community selected</div>;
  }

  const handleImportClick = () => {
    setOpenModal(ModalType.Import);
    setModalOn(true);
  };

  const handleExportClick = () => {
    downloadFile(
      `/hoas/properties/export?hoa=${selectedCommunityId}`,
      'properties.csv',
    );
  };

  return (
    <div className={styles.propertiesContainer}>
      {isModalOn && (
        <Modal>
          {openModal === ModalType.Add && (
            <PropertyForm onClose={() => setModalOn(false)} />
          )}
          {openModal === ModalType.Import && (
            <>
              <h1>Import lokali</h1>
              <FileUploadForm
                url={`/hoas/properties/import/?hoa=${selectedCommunityId}`}
                onClose={() => setModalOn(false)}
                queryKeys={[
                  propertiesQueryKeys.filters({ hoaId: selectedCommunityId }),
                ]}
              />
            </>
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

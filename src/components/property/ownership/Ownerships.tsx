import { useState } from 'react';
import styles from '../Properties.module.scss';
import IconButton from '../../ui/iconButton/IconButton';
import Modal from '../../ui/modal/Modal';
import { ModalType } from '../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import OwnershipList from './OwnershipList';
import { selectRoles } from '../../loginForm/loginFormSlice';
import OwnershipForm from './OwnershipForm';
import { setUpdatedOwnerships } from '../../../app/slices/propertiesState';
import { DeleteOwnership } from '../../../utils/DeleteOwnership';
import { Button } from '@mui/material';

interface IProps {
  propertyId: number;
}

const Ownerships = ({ propertyId }: IProps) => {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState({});
  const [isModalOn, setModalOn] = useState(false);
  const [selectedOwnership, setSelectedOwnership] = useState<
    number | undefined
  >();
  const role = useAppSelector(selectRoles);
  const isManager = role === 'manager';

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
            <OwnershipForm isModalOn={setModalOn} propertyId={propertyId} />
          )}
          {openModal === ModalType.Edit && (
            <OwnershipForm
              isModalOn={setModalOn}
              propertyId={propertyId}
              ownershipId={selectedOwnership}
            />
          )}
          {openModal === ModalType.Delete && (
            <div>
              <h2>Czy na pewno chcesz usunąć tego właściciela?</h2>
              <div className={styles.modalButtons}>
                <Button
                variant='contained'
                color='error'
                  onClick={async () => {
                    await DeleteOwnership(selectedOwnership || -1);
                    setModalOn(false);
                    dispatch(setUpdatedOwnerships(true));
                  }}
                >
                  Usuń
                </Button>
                <Button
                color='secondary'
                  onClick={() => {
                    setModalOn(false);
                  }}
                >
                  Anuluj
                </Button>
              </div>
            </div>
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
            altText="Add Ownership"
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
      )}
      <OwnershipList
        propertyId={propertyId}
        onRowClicked={(id: number) => {
          setModalOn(true);
          setOpenModal(ModalType.Edit);
          setSelectedOwnership(id);
        }}
        onRowDelete={(id: number) => {
          setModalOn(true);
          setOpenModal(ModalType.Delete);
          setSelectedOwnership(id);
        }}
        isEditable={isManager}
      />
    </div>
  );
};

export default Ownerships;

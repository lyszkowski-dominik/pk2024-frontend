import { useState } from 'react';
import styles from '../../../pages/properties/Properties.module.scss';
import IconButton from '../../ui/iconButton/IconButton';
import Modal from '../../ui/modal/Modal';
import { ModalType } from '../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import OwnershipList from './OwnershipList';
import { selectRoles } from '../../loginForm/loginFormSlice';
import OwnershipForm from './OwnershipForm';
import { setUpdatedOwnerships } from '../../../features/properties/propertiesState';
import { DeleteOwnership } from '../../../features/ownerships/DeleteOwnership';
import { Button } from '@mui/material';
import { UserRole } from '../../../types/types';

/**
 * @property {number} propertyId - The `propertyId` property represents the id of the property.
 */
export interface IProps {
  propertyId: number;
}

/**
 *
 * @param {IProps} params
 * @returns {JSX.Element} The `Ownerships` component returns a list of ownerships.
 */
const Ownerships = ({ propertyId }: IProps) => {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState({});
  const [isModalOn, setModalOn] = useState(false);
  const [selectedOwnership, setSelectedOwnership] = useState<
    number | undefined
  >();
  const role = useAppSelector(selectRoles);
  const isManager = role === UserRole.Manager;

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
                  variant="contained"
                  color="error"
                  onClick={async () => {
                    await DeleteOwnership(selectedOwnership || -1);
                    setModalOn(false);
                    dispatch(setUpdatedOwnerships(true));
                  }}
                >
                  Usuń
                </Button>
                <Button
                  color="secondary"
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
            altText="Dodaj właściciela"
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

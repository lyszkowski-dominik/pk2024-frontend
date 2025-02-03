import { useState } from 'react';
import styles from '../../../pages/properties/Properties.module.scss';
import IconButton from '../../ui/iconButton/IconButton';
import Modal from '../../ui/modal/Modal';
import { ModalType } from '../types';
import { useAppSelector } from '../../../app/hooks';
import OwnershipList from './OwnershipList';
import { selectRoles } from '../../loginForm/loginFormSlice';
import OwnershipForm from './OwnershipForm';
import { UserRole } from '../../../types/types';
import DeleteOwnershipConfirmation from './DeleteOwnershipConfirmation';

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
        <>
          <Modal>
            {openModal === ModalType.Add && (
              <OwnershipForm
                onClose={() => setModalOn(false)}
                propertyId={propertyId}
              />
            )}
            {openModal === ModalType.Edit && selectedOwnership && (
              <OwnershipForm
                onClose={() => setModalOn(false)}
                propertyId={propertyId}
                ownershipId={selectedOwnership}
              />
            )}
          </Modal>
          {openModal === ModalType.Delete && selectedOwnership && (
            <DeleteOwnershipConfirmation
              id={selectedOwnership}
              onClose={() => setModalOn(false)}
              propertyId={propertyId}
            />
          )}
        </>
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

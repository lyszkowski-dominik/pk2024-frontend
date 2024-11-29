import { useState } from 'react';
import styles from './Resolutions.module.scss';
import { useAppSelector } from '../../app/hooks';
import Modal from '../../components/ui/modal/Modal';
import { ModalType } from '../../components/property/types';
import IconButton from '../../components/ui/iconButton/IconButton';
import AddResolutionForm from '../../components/resolutions/AddResolutionForm';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import ResolutionsList from '../../components/resolutions/ResolutionsList';

const Resolutions = () => {
  const userRole = useAppSelector(selectRoles);
  const canAddResolution = userRole === 'manager';

  const [isModalOn, setModalOn] = useState(false);
  const [openModal, setOpenModal] = useState({});

  return (
    <div className={styles.propertiesContainer}>
      {isModalOn && (
        <Modal>
          {openModal === ModalType.Add && (
            <AddResolutionForm
              onClose={() => {
                setModalOn(false);
              }}
            />
          )}
        </Modal>
      )}
      <div className={styles.iconButtons}>
        {canAddResolution && (
          <IconButton
            iconName="add"
            onClick={() => {
              setOpenModal(ModalType.Add);
              setModalOn(true);
            }}
            altText="Dodaj uchwałę"
            size={24}
            color="var(--pink)"
          />
        )}
      </div>
      <ResolutionsList />
    </div>
  );
};

export default Resolutions;

import { useState } from 'react';
import styles from './Resolutions.module.scss';
import { useAppSelector } from '../../app/hooks';
import Modal from '../../components/ui/modal/Modal';
import IconButton from '../../components/ui/iconButton/IconButton';
import AddResolutionForm from '../../components/resolutions/AddResolutionForm';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import ResolutionsList from '../../components/resolutions/ResolutionsList';
import { UserRole } from '../../types/types';

const Resolutions = () => {
  const userRole = useAppSelector(selectRoles);
  const canAddResolution = userRole === UserRole.Manager;

  const [isModalOn, setModalOn] = useState(false);

  return (
    <div className={styles.propertiesContainer}>
      {isModalOn && (
        <Modal>
          <AddResolutionForm
            onClose={() => {
              setModalOn(false);
            }}
          />
        </Modal>
      )}
      <div className={styles.iconButtons}>
        {canAddResolution && (
          <IconButton
            iconName="add"
            onClick={() => {
              setModalOn(true);
            }}
            altText="Dodaj uchwałę"
          />
        )}
      </div>
      <ResolutionsList />
    </div>
  );
};

export default Resolutions;

import styles from './Notifications.module.scss';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import Modal from '../../components/ui/modal/Modal';
import IconButton from '../../components/ui/iconButton/IconButton';
import { selectRoles } from '../../components/loginForm/loginFormSlice';
import AddNotificationForm from '../../components/notifications/AddNotificationForm';
import { UserRole } from '../../types/types';
import NotificationsList from '../../components/notifications/NotificationsList';

const Notifications = () => {
  const userRole = useAppSelector(selectRoles);
  const canAddNotification = userRole === UserRole.Manager;

  const [isModalOn, setModalOn] = useState(false);

  return (
    <div className={styles.propertiesContainer}>
      {isModalOn && (
        <Modal>
          <AddNotificationForm
            onClose={() => {
              setModalOn(false);
            }}
          />
        </Modal>
      )}
      {canAddNotification && (
        <div className={styles.iconButtons}>
          <IconButton
            iconName="add"
            onClick={() => {
              setModalOn(true);
            }}
            altText="Dodaj powiadomienie"
          />
        </div>
      )}

      <NotificationsList />
    </div>
  );
};

export default Notifications;

import { useAppSelector } from '../../app/hooks';
import { selectSelectedCommunity } from '../../features/communities/sharedDataSlice';
import { useNotifications } from '../alerts/NotificationContext';
import type { UserRole } from '../../types/types';
import { useRemoveUser } from '../../features/users/useRemoveUser';
import DeleteConfirmation from '../common/confirmationModals/DeleteConfirmation';

const RemoveUserConfirmation = ({
  userId,
  role,
  onClose,
}: {
  userId: number;
  role: UserRole;
  onClose: () => void;
}) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;
  const removeUser = useRemoveUser(hoaId, role);

  const onDelete = () =>
    removeUser.mutate(
      { hoaId, userId },
      {
        onSuccess: () => {
          onClose();
          addNotification('Użytkownik został usunięty.', 'success');
        },
        onError: (error: any) => {
          onClose();
          addNotification(
            `Użytkownik nie został usunięty. Błąd: ${error.details}`,
            'error',
          );
        },
      },
    );
// a tu kurwa nie
  return (
    <DeleteConfirmation
      header="Czy na pewno chcesz usunąć tego użytkownika?"
      isLoading={removeUser.isPending}
      onConfirm={onDelete}
      onCancel={onClose}
    />
  );
};

export default RemoveUserConfirmation;

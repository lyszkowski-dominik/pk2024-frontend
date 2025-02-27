import { useDeleteOwnership } from '../../../features/ownerships/useDeleteOwnership';
import { useNotifications } from '../../alerts/NotificationContext';
import DeleteConfirmation from '../../common/confirmationModals/DeleteConfirmation';

const DeleteOwnershipConfirmation = ({
  id,
  onClose,
  propertyId,
}: {
  id: number;
  onClose: () => void;
  propertyId: number;
}) => {
  const { addNotification } = useNotifications();

  const deleteOwnership = useDeleteOwnership(propertyId);
  const onDelete = () =>
    deleteOwnership.mutate(id, {
      onSuccess: () => {
        onClose();
        addNotification('Właściciele zostali usunięci.', 'success');
      },
      onError: (error: any) => {
        onClose();
        addNotification(
          `Nie udało się usunąć właścicieli. Błąd: ${error.details}`,
          'error',
        );
      },
    });

  return (
    <DeleteConfirmation
      header={`Czy na pewno chcesz usunąć właścicieli?`}
      isLoading={deleteOwnership.isPending}
      onConfirm={onDelete}
      onCancel={onClose}
    />
  );
};

export default DeleteOwnershipConfirmation;

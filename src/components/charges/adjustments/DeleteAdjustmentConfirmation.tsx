import { useAppSelector } from '../../../app/hooks';
import { useDeleteAdjustment } from '../../../features/adjustments/useDeleteAdjustment';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import { useNotifications } from '../../alerts/NotificationContext';
import DeleteConfirmation from '../../common/confirmationModals/DeleteConfirmation';

const DeleteAdjustmentConfirmation = ({
  id,
  onClose,
}: {
  id: number;
  onClose: () => void;
}) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;

  const deleteAdjustment = useDeleteAdjustment(hoaId);

  const onDelete = () =>
    deleteAdjustment.mutate(id, {
      onSuccess: () => {
        onClose();
        addNotification('Korekta została usunięta.', 'success');
      },
      onError: (error: any) => {
        onClose();
        addNotification(
          `Korekta nie została usunięta. Błąd: ${error.error}`,
          'error',
        );
      },
    });

  return (
    <DeleteConfirmation
      header={`Czy na pewno chcesz usunąć korektę?`}
      isLoading={deleteAdjustment.isPending}
      onConfirm={onDelete}
      onCancel={onClose}
    />
  );
};

export default DeleteAdjustmentConfirmation;

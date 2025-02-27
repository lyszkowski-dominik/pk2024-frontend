import { useAppSelector } from '../../../app/hooks';
import { useDeleteBillling } from '../../../features/billings/useDeleteBilling';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import { useNotifications } from '../../alerts/NotificationContext';
import DeleteConfirmation from '../../common/confirmationModals/DeleteConfirmation';

const DeleteBillingConfirmation = ({
  id,
  onClose,
}: {
  id: number;
  onClose: () => void;
}) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;

  const deleteBilling = useDeleteBillling(hoaId);

  const onDelete = () =>
    deleteBilling.mutate(id, {
      onSuccess: () => {
        onClose();
        addNotification('Rachunek został usunięty.', 'success');
      },
      onError: (error: any) => {
        onClose();
        addNotification(
          `Rachunek nie został usunięty. Błąd: ${error.error}`,
          'error',
        );
      },
    });

  return (
    <DeleteConfirmation
      header={`Czy na pewno chcesz usunąć rachunek?`}
      isLoading={deleteBilling.isPending}
      onConfirm={onDelete}
      onCancel={onClose}
    />
  );
};

export default DeleteBillingConfirmation;

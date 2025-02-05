import { useAppSelector } from '../../../app/hooks';
import { selectSelectedCommunity } from '../../../features/communities/sharedDataSlice';
import { useRemoveRate } from '../../../features/rates/useRemoveRate';
import { useNotifications } from '../../alerts/NotificationContext';
import DeleteConfirmation from '../../common/confirmationModals/DeleteConfirmation';

const DeleteRateConfirmation = ({
  id,
  onClose,
}: {
  id: number;
  onClose: () => void;
}) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;

  const deleteRate = useRemoveRate(hoaId);
  const onDelete = () =>
    deleteRate.mutate(id, {
      onSuccess: () => {
        onClose();
        addNotification('Rodzaj licznika został usunięty.', 'success');
      },
      onError: (error: any) => {
        onClose();
        addNotification(
          `Rodzaj licznika nie został usunięty. Błąd: ${error.details}`,
          'error',
        );
      },
    });

  return (
    <DeleteConfirmation
      header={`Czy na pewno chcesz usunąć wybrane stawki?`}
      isLoading={deleteRate.isPending}
      onConfirm={onDelete}
      onCancel={onClose}
    />
  );
};

export default DeleteRateConfirmation;

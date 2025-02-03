import { useAppSelector } from '../../../../app/hooks';
import { selectSelectedCommunity } from '../../../../features/communities/sharedDataSlice';
import { useDeleteMeter } from '../../../../features/meters/metersDevices/useDeleteMeter';
import { useNotifications } from '../../../alerts/NotificationContext';
import DeleteConfirmation from '../../../common/confirmationModals/DeleteConfirmation';

const DeleteMeterConfirmation = ({
  id,
  number,
  onClose,
}: {
  id: number;
  number: string;
  onClose: () => void;
}) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;

  const deleteMeter = useDeleteMeter(hoaId);
  const onDelete = () =>
    deleteMeter.mutate(id, {
      onSuccess: () => {
        onClose();
        addNotification('Licznik został usunięty.', 'success');
      },
      onError: (error: any) => {
        onClose();
        addNotification(
          `Licznik nie został usunięty. Błąd: ${error.error}`,
          'error',
        );
      },
    });

  return (
    <DeleteConfirmation
      header={`Czy na pewno chcesz usunąć licznik ${number}?`}
      isLoading={deleteMeter.isPending}
      onConfirm={onDelete}
      onCancel={onClose}
    />
  );
};

export default DeleteMeterConfirmation;

import { useAppSelector } from '../../../../app/hooks';
import { selectSelectedCommunity } from '../../../../features/communities/sharedDataSlice';
import { useDeleteMeterType } from '../../../../features/meters/meterTypes/useDeleteMeterType';
import { useNotifications } from '../../../alerts/NotificationContext';
import DeleteConfirmation from '../../../common/confirmationModals/DeleteConfirmation';

const DeleteMeterTypeConfirmation = ({
  id,
  label,
  onClose,
}: {
  id: number;
  label: string;
  onClose: () => void;
}) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;

  const deleteMeterType = useDeleteMeterType(hoaId);
  const onDelete = () =>
    deleteMeterType.mutate(id, {
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
      header={`Czy na pewno chcesz usunąć licznik typu ${label}?`}
      isLoading={deleteMeterType.isPending}
      onConfirm={onDelete}
      onCancel={onClose}
    />
  );
};

export default DeleteMeterTypeConfirmation;

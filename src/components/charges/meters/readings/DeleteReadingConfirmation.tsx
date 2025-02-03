import { useAppSelector } from '../../../../app/hooks';
import { selectSelectedCommunity } from '../../../../features/communities/sharedDataSlice';
import { useDeleteMeterReading } from '../../../../features/meters/meterReadings/useDeleteMeterReading';
import { useNotifications } from '../../../alerts/NotificationContext';
import DeleteConfirmation from '../../../common/confirmationModals/DeleteConfirmation';

const DeleteReadingConfirmation = ({
  id,
  date,
  number,
  onClose,
  meterId,
}: {
  id: number;
  date: string;
  number: string;
  onClose: () => void;
  meterId?: number;
}) => {
  const { addNotification } = useNotifications();
  const hoaId = useAppSelector(selectSelectedCommunity) || -1;

  const deleteReading = useDeleteMeterReading(hoaId, meterId);
  const onDelete = () =>
    deleteReading.mutate(id, {
      onSuccess: () => {
        onClose();
        addNotification('Odczyt został usunięty.', 'success');
      },
      onError: (error: any) => {
        onClose();
        addNotification(
          `Odczyt nie został usunięty. Błąd: ${error.details}`,
          'error',
        );
      },
    });

  return (
    <DeleteConfirmation
      header={`Czy na pewno chcesz usunąć odczyt z dnia ${date} dla licznika ${number}?`}
      isLoading={deleteReading.isPending}
      onConfirm={onDelete}
      onCancel={onClose}
    />
  );
};

export default DeleteReadingConfirmation;
